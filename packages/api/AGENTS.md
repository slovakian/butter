# ORPC Router Standard Operating Procedure (SOP)

This document serves as the **strict** standard operating procedure for any AI agent or developer working on the `orpc` router in this application. Adherence to these rules is mandatory to maintain architectural integrity, type safety, and deployment stability.

## 1. Router Structure & File Organization

### Strict Tree Architecture
The `orpc` router must remain a standard, normal tree structure. **Do not** use weird discriminator hacks or dynamic pathing that `orpc` does not natively support. The API structure must be predictable and static.

### File-to-Route Mapping
Routers are organized by the file directory to mirror the API tree, similar to how assets are organized in `packages/db/schema`.
- **Root Assets**: A major asset defined at the root is the parent.
- **Nested Children**: Children procedures are nested in the directory corresponding to the parent.
- **Aggregation**: Parent router aggregation happens in `index.ts` files (e.g., `routers/post/index.ts`).

**Example:**
A `create` procedure for a `like` inside a `post`:
- **File Location**: `routers/post/like/create.ts`
- **Exposed Route**: `post.like.create`

### Polymorphic Relationships
For database assets that have polymorphic relationships (e.g., something that can attach to multiple different kinds of parents):
- **Placement**: Place the procedure at the root level of the router.
- **Implementation**: Use the Zod input schema to handle the `targetType` and `targetId`.
- **Rule**: Do not create deeply nested, duplicated routes for polymorphic assets.

**Example:**
- **File Location**: `routers/reaction/create.ts`
- **Exposed Route**: `reaction.create`

### Admin Segregation
All administrative procedures must be **strictly isolated** under an `admin` namespace.
- **Example**: `admin.user.ban`
- **File Location**: `routers/admin/user/ban.ts`

## 2. Procedures & Context

### Available Procedures
We export two base procedures from our setup:
1.  `publicProcedure`: For endpoints accessible without authentication.
2.  `protectedProcedure`: Automatically includes an auth check via `authMiddleware`.

### Authentication
- `protectedProcedure` automatically includes an auth check via `authMiddleware`.
- If authentication fails, it throws an `ORPCError`.
- Therefore, the `session` object is guaranteed to be available and populated in the context of a `protectedProcedure`.

### Context Object (`createContext`)
The procedure handler's `context` object contains the following core services:

```typescript
export type CreateContextOutput = {
    req: Request;
    db: DbClient;
    auth: {
        client: Auth;
        session: Session | null;
    };
    env: CloudflareEnv;
};
```

### Cloudflare Environment & Bindings
We deploy via Alchemy to a Cloudflare Worker server environment. The `env` context object is crucial.
- It contains standard environment variables (like `DATABASE_URL`).
- It contains **Cloudflare bindings** (like our `Chatroom` Durable Object namespace).
- **Rule**: The agent must always consult the `CloudflareEnv` type (located in `env/env.ts`) and our `packages/infra` directory to understand available infrastructure before writing code.

## 3. Strict Type-Safe Error Handling (CRITICAL)

### Explicit Error Contracts
We strictly use `orpc`'s native typesafe error handling. **Do not** throw generic JavaScript `Error` objects for domain logic or unmapped `ORPCError` instances.

### Using Common Errors
Common errors have already been implemented and bound to our procedure builders. Therefore, they are injected directly into the handler's arguments.

### Handler Implementation
When writing a procedure handler, you must destructure `errors` alongside `input` and `context` from the callback arguments.

### Throwing Errors
To trigger an error condition, you must invoke and throw the specific error from the injected `errors` object. If the error requires a specific data payload that the frontend needs, pass it into the error function call as strictly typed by Zod.

### Example Procedure
```typescript
// Example of a protected procedure with error handling
export const create = protectedProcedure
  .input(z.object({
    chatroomId: z.string(),
    content: z.string().min(1)
  }))
  .handler(async ({ input, context, errors }) => {
    // 1. Destructure what you need
    const { db } = context;

    // 2. Perform logic
    const chatroom = await db.query.chatrooms.findFirst({
      where: (t, { eq }) => eq(t.id, input.chatroomId)
    });

    if (!chatroom) {
       // 3. Throw bound common error
       throw errors.NotFound({ 
         entity: "Chatroom",
         id: input.chatroomId 
       });
    }

    if (chatroom.isFull) {
       // 4. Throw bound common error with specific payload
       throw errors.ChatroomFull({
         maxCapacity: chatroom.capacity
       });
    }

    // ... proceed with creation
    return { success: true };
  });
```

## 4. Strict Agent Operational Rules

### No Unauthorized Packages
**Do not** install or import random npm packages to solve a problem.
- If a standard tool isn't already in the repo, you must **explicitly ask the human user** for permission or guidance.
- Rely on existing dependencies in `package.json`.

### Cloudflare Worker Constraints
All code must be compatible with the **Cloudflare Workers V8 isolate environment**.
- **Prohibited**: Standard Node.js `fs`, `net`, or other Node-specific modules (unless polyfilled/supported by CF compatibility flags).
- **Required**: Use Web Standards APIs (e.g., `fetch`, `Request`, `Response`) and Cloudflare-specific bindings.

### Self-Updating Documentation
If the human explicitly requests a change to:
- The core `createContext` implementation
- The `CloudflareEnv` type
- Global middlewares

The agent **must** update this `AGENTS.md` file to reflect those new structural changes immediately.
