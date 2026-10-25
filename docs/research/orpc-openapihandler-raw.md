# Can oRPC's OpenAPIHandler serve raw, non-JSON, and RFC-shaped endpoints?

Research for [Can oRPC's OpenAPIHandler serve raw, non-JSON, and RFC-shaped endpoints?](https://github.com/slovakian/butter/issues/42), addressing the open verification caveat in Decision 4 ("declared but raw" escape hatch) of [Is every Exposure derived from a runtime contract on exposable?](https://github.com/slovakian/butter/issues/39). Checked on 2026-10-25 against npm metadata (`@orpc/openapi@2.0.0-beta.46`, `@orpc/server@2.0.0-beta.46`), and the `middleapi/orpc` and `middleapi/standard-server` source code repositories.

---

## TL;DR

- **Yes to all three.** oRPC `2.0.0-beta.x`'s `OpenAPIHandler` **can** serve raw endpoints. It does not need to be restricted to the fetch handler; HTTP-shaped doors in Butter (both fetch and oRPC `OpenAPIHandler`) can serve raw escape hatches.
- **1. Exact raw request body (webhook signature checks):** **Yes, via `requestBodyHint: 'octet-stream'` and `inputStructure: 'detailed'`.** By default, `application/json` is eagerly parsed into a JavaScript object via `re.text()` and `parseEmptyableJSON()`, discarding the raw wire bytes and consuming the body stream (`re.bodyUsed = true`). Re-stringifying the object fails HMAC signature checks. Setting `requestBodyHint: 'octet-stream'` tells `@standard-server/fetch` to bypass JSON parsing and pass `re.body` as a `ReadableStream<Uint8Array>` (or `'file'` for a `File`/`Blob`). You **must** use `inputStructure: 'detailed'` because in compact mode, `OpenAPIHandlerCodec` discards non-plain-object bodies if any path parameters exist.
- **2. Accept unparsed content types (such as SAML XML):** **Yes.** oRPC and `@standard-server` do not reject unknown MIME types (no 415 error is thrown). When `resolveStandardBodyHint()` sees an unhandled `Content-Type` (like `application/saml+xml` or `text/xml`), it falls back to `'file'` (if `Content-Length` is present) or `'octet-stream'`. The procedure receives a `File` (Blob) or `ReadableStream<Uint8Array>` and reads the text via `await input.body.text()` or `await new Response(input.body).text()`. Setting `requestBodyHint: 'octet-stream'` guarantees this regardless of incoming headers.
- **3. RFC-shaped error bodies with custom status codes (e.g. RFC 6749 `{"error": "invalid_grant"}`):** **Yes.**
  - A procedure _cannot_ return status >= 400 from its normal output: `isValidDetailedOutput()` explicitly throws a `TypeError` if `output.status > 399`.
  - However, error responses can be customized in two ways:
    1. **`errorStatusMap` + `customErrorResponseBodyEncoder`**: Handlers configure `errorStatusMap: { INVALID_GRANT: 400 }` and `customErrorResponseBodyEncoder: (err) => ({ error: 'invalid_grant', error_description: err.message })`. When the procedure throws `new ORPCError('INVALID_GRANT', ...)`, oRPC outputs HTTP 400 and the custom RFC JSON body. (`OpenAPIGenerator` mirrors this via `customErrorResponseBodySchema`).
    2. **`interceptors`**: `encodeError()` hardcodes `headers: {}`. If RFC compliance requires custom HTTP headers (such as `Cache-Control: no-store` / `Pragma: no-cache` per RFC 6749 §5.2, or `WWW-Authenticate` per RFC 6750), an `interceptor` on `OpenAPIHandler` can catch the error and return a full `StandardResponse` (`{ status: 400, headers: { 'cache-control': 'no-store' }, body: { error: 'invalid_grant' } }`).

---

## 1. Reading the exact raw request body (webhook signature checks)

### Why default parsing fails signature checks

When a webhook (e.g., Stripe, GitHub, Svix) sends a POST request with `Content-Type: application/json`:

1. `OpenAPIHandler` delegates request conversion to `@standard-server/fetch`'s `toStandardLazyRequest(request)`.
2. When decoding input, `toStandardBody(request, { hint })` checks the hint. When no hint is configured on the procedure, `resolveStandardBodyHint()` evaluates the `content-type` header:
   ```ts
   if (mimeType === "application/json") {
     return "json";
   }
   ```
3. With hint `'json'`, `toStandardBody()` executes:
   ```ts
   if (hint === "json") {
     const text = await re.text();
     return parseEmptyableJSON(text);
   }
   ```
   The raw `text` is a local variable inside `toStandardBody` and is immediately discarded after parsing.
4. The underlying fetch `request.body` stream is now consumed (`re.bodyUsed === true`).
5. `JSON.stringify(input)` cannot reproduce the original wire payload reliably (property ordering, whitespace, float precision, unicode escapes). As a result, HMAC-SHA256 signature verification fails.

### The solution: `requestBodyHint: 'octet-stream'`

oRPC allows procedures to supply metadata via `os.meta(openapi({ ... }))`. Setting `requestBodyHint: 'octet-stream'` overrides header-based hint inference:

```ts
request.resolveBody(meta?.requestBodyHint);
```

When `hint === 'octet-stream'`:

1. `toStandardBody()` bypasses `json`, `form-data`, `url-search-params`, `event-stream`, and `file`.
2. It returns the raw stream directly:
   ```ts
   return (
     re.body ??
     new ReadableStream({
       start(c) {
         c.close();
       },
     })
   );
   ```
3. In `OpenAPISerializer.deserialize()`:
   ```ts
   if (
     data === undefined ||
     data instanceof ReadableStream ||
     data instanceof Blob
   ) {
     return data;
   }
   ```
   The `ReadableStream` passes through untouched.

### The `compact` vs `detailed` trap

In `OpenAPIHandlerCodecCore.decodeInput()`:

```ts
if (inputStructure === "compact") {
  const data = isBodylessMethod(request.method)
    ? this.deserializeQuery(request.url, meta?.queryStyles)
    : this.serializer.deserialize(
        await request.resolveBody(meta?.requestBodyHint)
      );

  if (data === undefined) return params;
  if (!params || Object.keys(params).length < 1) return data;

  // Non-object data (primitive, array, Blob, ReadableStream, ...) cannot be merged with params.
  // Prefer params to stay consistent with the OpenAPI generator, which only describes path params here.
  if (!isPlainObject(data)) {
    return params;
  }

  return { ...data, ...params };
}
```

If a route has path parameters (e.g. `/webhooks/{source}`) and uses default `compact` input structure, `isPlainObject(data)` evaluates to `false` for a `ReadableStream` or `Blob`. **The body is silently dropped in favor of `params`!**

**Rule:** Any raw endpoint in oRPC **must specify `inputStructure: 'detailed'`**. The procedure then receives:

```ts
input: {
  params: Record<string, unknown>;
  query: unknown;
  headers: Record<string, string | string[] | undefined>;
  body: ReadableStream<Uint8Array>;
}
```

From `input.body`, the handler can read the exact raw body:

```ts
const rawBody = await new Response(input.body).text();
// or: const rawBuffer = await new Response(input.body).arrayBuffer()
```

If the handler also requires the parsed JSON payload, it calls `JSON.parse(rawBody)` itself after verifying the signature.

---

## 2. Accepting unparsed content types (SAML XML, etc.)

### How unparsed MIME types are handled

When a request arrives with a content type that oRPC does not natively parse (e.g., `application/saml+xml`, `application/xml`, `text/xml`, or proprietary formats):

1. `resolveStandardBodyHint()` in `@standard-server/core`:
   ```ts
   if (mimeType === "application/json") return "json";
   if (mimeType === "multipart/form-data") return "form-data";
   if (mimeType === "application/x-www-form-urlencoded")
     return "url-search-params";
   if (mimeType === "text/event-stream") return "event-stream";

   if (contentLength !== undefined) {
     return "file";
   }

   return "octet-stream";
   ```
2. For any other MIME type:
   - If `Content-Length` is present (the norm for HTTP POST): it resolves as `'file'`. In `toStandardBody()`, this yields a `File` (an instance of `Blob`) via `await re.blob()`.
   - If `Content-Length` is absent (e.g., chunked transfer encoding): it resolves as `'octet-stream'`, yielding `re.body` as a `ReadableStream<Uint8Array>`.
3. Neither `@standard-server` nor `OpenAPIHandler` throws a 415 `Unsupported Media Type` or rejects unrecognized content types.
4. In `OpenAPISerializer.deserialize()`, both `Blob` and `ReadableStream` are returned as-is.
5. In the procedure (with `inputStructure: 'detailed'`):
   - If received as a `File` / `Blob`: `const xml = await input.body.text()`.
   - If received as a `ReadableStream`: `const xml = await new Response(input.body).text()`.
6. To guarantee stream behavior regardless of `Content-Length`, set `requestBodyHint: 'octet-stream'`.

---

## 3. Returning RFC-shaped error bodies and custom status codes

### Why procedures cannot return 4xx via `output`

In `OpenAPIHandlerCodecCore`:

```ts
function isValidDetailedOutput(output: unknown): output is { status?: number, body?: unknown, headers?: object } {
  ...
  if (output.status !== undefined && (
    typeof output.status !== 'number'
    || !Number.isInteger(output.status)
    || output.status > 399
  )) {
    return false
  }
  ...
}
```

If a procedure returns `{ status: 400, body: { error: 'invalid_grant' } }`, `encodeOutput()` throws: `TypeError: Invalid "detailed" output structure returned by procedure (...): status (number <400)`. Statuses >= 400 cannot be returned through normal output.

### Mechanism A: `errorStatusMap` + `customErrorResponseBodyEncoder`

oRPC provides native error customization options on `OpenAPIHandler`:

```ts
const handler = new OpenAPIHandler(router, {
  errorStatusMap: {
    ...COMMON_ERROR_STATUS_MAP,
    INVALID_GRANT: 400,
    UNAUTHORIZED_CLIENT: 401,
  },
  customErrorResponseBodyEncoder: (error) => {
    if (
      error.code === "INVALID_GRANT" ||
      error.code === "UNAUTHORIZED_CLIENT"
    ) {
      return {
        error: error.code.toLowerCase(),
        error_description: error.message,
      };
    }
    return null; // falls back to oRPC's default error JSON
  },
});
```

Inside the procedure:

```ts
throw new ORPCError("INVALID_GRANT", { message: "Refresh token expired" });
```

- Status code emitted: `400`.
- Response body emitted: `{"error":"invalid_grant","error_description":"Refresh token expired"}`.
- OpenAPI schema documentation: In `OpenAPIGenerator`, pass `errorStatusMap` and `customErrorResponseBodySchema` to reflect the RFC shape in the generated OpenAPI contract.

### Header limitation and Mechanism B: `interceptors`

In `OpenAPIHandlerCodecCore.encodeError()`:

```ts
encodeError(error: AnyORPCError): Promisable<StandardResponse> {
  const status = getOwn(this.errorStatusMap, error.code) ?? DEFAULT_ERROR_STATUS

  return {
    status,
    headers: {},
    body: this.serializer.serialize(this.customErrorResponseBodySerializer?.(error) ?? error.toJSON()),
  }
}
```

Notice that `headers: {}` is hardcoded. `customErrorResponseBodyEncoder` cannot attach response headers.

RFC 6749 §5.2 requires OAuth error responses to include:

```http
Cache-Control: no-store
Pragma: no-cache
```

And RFC 6750 §3 requires 401 responses to include:

```http
WWW-Authenticate: Bearer error="invalid_token", error_description="..."
```

To set custom headers on an error response, use an `interceptor` on `OpenAPIHandler`:

```ts
const handler = new OpenAPIHandler(router, {
  interceptors: [
    async ({ next }) => {
      try {
        return await next();
      } catch (err) {
        if (err instanceof OAuthError) {
          return {
            status: err.status,
            headers: {
              "cache-control": "no-store",
              pragma: "no-cache",
              ...(err.wwwAuthenticate
                ? { "www-authenticate": err.wwwAuthenticate }
                : {}),
            },
            body: {
              error: err.code,
              error_description: err.message,
            },
          };
        }
        throw err;
      }
    },
  ],
});
```

`StandardHandler.handle()` runs `interceptors` around the entire execution. If an interceptor returns a `StandardResponse`, it short-circuits before `encodeError()` runs, and `@standard-server/fetch`'s `toFetchResponse()` serializes the custom status, headers, and body cleanly.

---

## 4. Complete Recipe for a Declared Raw Procedure in oRPC

Here is how a Slice defines a "declared but raw" endpoint under oRPC:

```ts
import { os, ORPCError } from "@orpc/server";
import { openapi, OpenAPIHandler } from "@orpc/openapi";
import * as z from "zod";

// 1. Raw Webhook Procedure
export const stripeWebhook = os
  .meta(
    openapi({
      method: "POST",
      path: "/webhooks/stripe",
      inputStructure: "detailed",
      requestBodyHint: "octet-stream", // bypasses JSON decoding; gives raw ReadableStream
    })
  )
  .input(
    z.object({
      headers: z.record(
        z.string(),
        z.union([z.string(), z.array(z.string()), z.undefined()])
      ),
      body: z.instanceof(ReadableStream),
    })
  )
  .handler(async ({ input }) => {
    const rawBody = await new Response(input.body).text();
    const signature = input.headers["stripe-signature"];

    if (typeof signature !== "string") {
      throw new ORPCError("BAD_REQUEST", { message: "Missing signature" });
    }

    // Verify signature against raw string
    const event = verifyStripeSignature(rawBody, signature);
    return { received: true };
  });

// 2. Raw SAML XML Procedure
export const samlAcs = os
  .meta(
    openapi({
      method: "POST",
      path: "/auth/saml/acs",
      inputStructure: "detailed",
      requestBodyHint: "octet-stream",
    })
  )
  .input(
    z.object({
      headers: z.record(
        z.string(),
        z.union([z.string(), z.array(z.string()), z.undefined()])
      ),
      body: z.instanceof(ReadableStream),
    })
  )
  .handler(async ({ input }) => {
    const xml = await new Response(input.body).text();
    return parseAndVerifySaml(xml);
  });
```

---

## 5. Architectural Consequences for Butter (Decision 4)

Decision 4 in [Is every Exposure derived from a runtime contract on exposable?](https://github.com/slovakian/butter/issues/39) stated:

> **Served only by HTTP-shaped doors.** The fetch handler always; oRPC's `OpenAPIHandler` only if it can pass the raw request through (unverified).

This investigation resolves the "(unverified)" qualifier:

1. **oRPC `OpenAPIHandler` CAN serve raw endpoints.** It has full capability to accept raw bodies, unparsed content types, and RFC-shaped errors.
2. **Door capabilities:**
   - **Fetch handler:** Serves calls, navigations, and declared raw endpoints.
   - **oRPC `OpenAPIHandler`:** Serves calls, navigations (via `successStatus: 302` + `Location` header in `detailed` output), and declared raw endpoints (via `inputStructure: 'detailed'` + `requestBodyHint: 'octet-stream'`).
   - **RPC-protocol doors (Effect RPC, oRPC RPC handler):** Serve calls only. They cannot serve navigations or raw endpoints.
3. **Generator rules for Butter's oRPC generator:** When deriving an oRPC procedure for an endpoint marked with Butter's `raw` annotation:
   - Must emit `inputStructure: 'detailed'`.
   - Must emit `requestBodyHint: 'octet-stream'`.
   - If RFC error headers are required, must configure an error interceptor on the generated handler.

---

## Sources

- **oRPC OpenAPI Handler**:
  - `packages/openapi/src/adapters/fetch/openapi-handler.ts` (`middleapi/orpc`)
  - `packages/openapi/src/adapters/standard/openapi-handler-codec.ts` (`OpenAPIHandlerCodecCore`, `decodeInput`, `encodeOutput`, `encodeError`, `isValidDetailedOutput`)
  - `packages/openapi/src/openapi-serializer.ts` (`deserialize`, handling of `ReadableStream` and `Blob`)
  - `packages/openapi/src/openapi-generator-operation.ts` (`buildErrorResponse`, `customErrorResponseBodySchema`)
  - `packages/openapi/src/adapters/standard/openapi-handler-codec.test.ts` (unit tests covering non-plain-object body dropping in compact mode, binary body passthrough, and custom error encoders)
- **oRPC Server & Client**:
  - `packages/server/src/adapters/standard/handler.ts` (`StandardHandler.handle`, interceptors, error conversion)
  - `packages/server/src/adapters/fetch/handler.ts` (`FetchHandler`)
  - `packages/client/src/error.ts` (`ORPCError`, `COMMON_ERROR_STATUS_MAP`)
- **Standard Server Transport**:
  - `packages/core/src/utils.ts` (`middleapi/standard-server`: `resolveStandardBodyHint`)
  - `packages/fetch/src/body.ts` (`toStandardBody`, `toFetchBody`)
  - `packages/fetch/src/request.ts` (`toStandardLazyRequest`)
  - `packages/fetch/src/response.ts` (`toFetchResponse`)
- **Documentation**:
  - [OpenAPI Handler](https://orpc.dev/docs/openapi/handler)
  - [Input and Output Mapping](https://orpc.dev/docs/openapi/input-and-output-mapping)
  - [OpenAPI Serializer](https://orpc.dev/docs/openapi/serializer)
  - [Binary Data](https://orpc.dev/docs/binary-data)
