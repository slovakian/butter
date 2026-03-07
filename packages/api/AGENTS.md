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

### Procedure Naming & Exposure
When aggregating procedures in `index.ts` or defining leaf routes, **strip redundant context** from the exposed key. The route path itself provides the namespace.
- **Concept**: The implementation function usually has a specific name (e.g., `applyThemeToUser`) to avoid conflicts, but the router key should be concise.
- **Rule**: The procedure key should not repeat the parent router's name.
- **Example**:
  - **Implementation**: `const applyThemeToUser = ...`
  - **Router Definition**: `export const themeRouter = { applyToUser: applyThemeToUser }`
  - **Resulting Path**: `theme.applyToUser` (NOT `theme.applyThemeToUser`)

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

## 5. Strict Type System Standards

### ZERO TOLERANCE for `any`
**Rule**: You must **NEVER** use `any`. This includes explicit `any` types (e.g., `arg: any`) and type assertions (e.g., `as any`).
- **Reasoning**: `any` silences the compiler and introduces potential runtime crashes. It is a failure of strict typing.
- **Methodology**:
  1.  **Unknown**: If you genuinely don't know a type, use `unknown`.
  2.  **Narrowing**: You must perform runtime checks (`typeof`, `instanceof`, `Array.isArray`) or use Zod schemas to narrow `unknown` to a specific type safely.
  3.  **Generics**: Use proper generic constraints (e.g., `<T extends SomeBase>`) instead of loose typing.

### Type Assertions & Casting
- **Avoid `as`**: Type assertions (e.g., `variable as User`) are dangerous and should be avoided unless strictly necessary for platform-specific reasons.
- **Preference**: Use **Type Guards** (functions returning `x is T`) or **Zod Parsing** to ensure data matches the expected shape at runtime.


## 6. Prisma Zod Generator Integration

We use `prisma-zod-generator` to automatically generate Zod schemas from our Prisma schema. This ensures our validation logic stays in sync with our database schema.

### Importing Schemas
**Rule**: Always import generated Zod schemas from the shared package:
```typescript
import { UserSchema, UserCreateInputSchema } from '@butter/shared/schemas';
```

### Validation in ORPC
ORPC supports both `.input()` and `.output()` validation. You should prefer to use both if possible to ensure full type safety.

- **Input Validation**: Use the generated **Input Schemas** (e.g., `UserCreateInputSchema`, `UserWhereInputSchema`) for `.input()`.
- **Output Validation**: Use the generated **Result Schemas** or **Pure Model Schemas** (e.g., `UserSchema`) for `.output()`.

### Schema Variants
The generator produces different types of schemas to suit different needs:

1.  **Pure Models** (e.g., `UserSchema`): Represents the model exactly as defined in Prisma. Useful for output validation.
2.  **Input Schemas** (e.g., `UserCreateInputSchema`): Represents the input arguments for Prisma Client operations. Essential for input validation.
3.  **Result Schemas**: Represents the return types of Prisma Client operations.


### Useful Tips
- **Drift Elimination**: Using these schemas eliminates drift between your API validation and database schema.
- **Type Safety**: Provides end-to-end type safety from the database to the API.
- **Customization**: The schemas can be extended or refined using standard Zod methods (e.g., `.omit()`, `.extend()`) if the generated schema needs strictly localized modification for a specific procedure.
