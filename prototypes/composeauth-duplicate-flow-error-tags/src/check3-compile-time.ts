import { Effect, Schema } from "effect";
import { HttpApiEndpoint, HttpApiGroup } from "effect/http-api";

import { composeAuth, joinContracts } from "./check2-cross-slice.ts";

// ============================================================================
// 10 Slices with realistic Flow Errors
// ============================================================================

// 1. rate-limit (owns RateLimited)
export class RateLimited extends Schema.TaggedError<RateLimited>()(
  "RateLimited",
  {
    retryAfter: Schema.Number,
  }
) {}

// 2. core (owns Unauthorized, SessionExpired)
export class Unauthorized extends Schema.TaggedError<Unauthorized>()(
  "Unauthorized",
  {}
) {}

export class SessionExpired extends Schema.TaggedError<SessionExpired>()(
  "SessionExpired",
  {}
) {}

// 3. email
export class EmailDeliveryFailed extends Schema.TaggedError<EmailDeliveryFailed>()(
  "EmailDeliveryFailed",
  {}
) {}

export class InvalidEmailAddress extends Schema.TaggedError<InvalidEmailAddress>()(
  "InvalidEmailAddress",
  {}
) {}

// 4. password
export class InvalidCredentials extends Schema.TaggedError<InvalidCredentials>()(
  "InvalidCredentials",
  {}
) {}

export class EmailTaken extends Schema.TaggedError<EmailTaken>()(
  "EmailTaken",
  {}
) {}

// 5. email-code
export class EmailCodeExpired extends Schema.TaggedError<EmailCodeExpired>()(
  "EmailCodeExpired",
  {}
) {}

export class EmailCodeInvalid extends Schema.TaggedError<EmailCodeInvalid>()(
  "EmailCodeInvalid",
  {}
) {}

// 6. oauth
export class OAuthStateMismatch extends Schema.TaggedError<OAuthStateMismatch>()(
  "OAuthStateMismatch",
  {}
) {}

export class OAuthProviderError extends Schema.TaggedError<OAuthProviderError>()(
  "OAuthProviderError",
  {}
) {}

// 7. oauth-github
export class GitHubAccountUnverified extends Schema.TaggedError<GitHubAccountUnverified>()(
  "GitHubAccountUnverified",
  {}
) {}

// 8. oauth-google
export class GoogleDomainNotAllowed extends Schema.TaggedError<GoogleDomainNotAllowed>()(
  "GoogleDomainNotAllowed",
  {}
) {}

// 9. two-factor
export class SecondFactorRequired extends Schema.TaggedError<SecondFactorRequired>()(
  "SecondFactorRequired",
  {}
) {}

export class TwoFactorCodeInvalid extends Schema.TaggedError<TwoFactorCodeInvalid>()(
  "TwoFactorCodeInvalid",
  {}
) {}

// 10. organizations
export class OrgNotFound extends Schema.TaggedError<OrgNotFound>()(
  "OrgNotFound",
  {}
) {}

export class OrgAccessDenied extends Schema.TaggedError<OrgAccessDenied>()(
  "OrgAccessDenied",
  {}
) {}

// ============================================================================
// Slice Actions definitions
// ============================================================================

const sliceCore = {
  actions: {
    getSession: Effect.fail(new SessionExpired()),
    revokeSession: Effect.fail(new Unauthorized()),
  },
  name: "core" as const,
};

const sliceRateLimit = {
  actions: {
    checkRateLimit: Effect.fail(new RateLimited({ retryAfter: 60 })),
  },
  name: "rateLimit" as const,
};

const sliceEmail = {
  actions: {
    sendVerification: Effect.fail(new EmailDeliveryFailed()),
  },
  name: "email" as const,
};

const slicePassword = {
  actions: {
    signIn: Effect.fail(new InvalidCredentials()),
    signUp: Effect.fail(new EmailTaken()),
  },
  name: "password" as const,
};

const sliceEmailCode = {
  actions: {
    sendCode: Effect.fail(new RateLimited({ retryAfter: 60 })),
    verifyCode: Effect.fail(new EmailCodeExpired()),
  },
  name: "emailCode" as const,
};

const sliceOAuth = {
  actions: {
    callback: Effect.fail(new OAuthStateMismatch()),
  },
  name: "oauth" as const,
};

const sliceOAuthGithub = {
  actions: {
    signIn: Effect.fail(new GitHubAccountUnverified()),
  },
  name: "oauthGithub" as const,
};

const sliceOAuthGoogle = {
  actions: {
    signIn: Effect.fail(new GoogleDomainNotAllowed()),
  },
  name: "oauthGoogle" as const,
};

const sliceTwoFactor = {
  actions: {
    verify: Effect.fail(new TwoFactorCodeInvalid()),
  },
  name: "twoFactor" as const,
};

const sliceOrganizations = {
  actions: {
    getOrg: Effect.fail(new OrgNotFound()),
  },
  name: "organizations" as const,
};

// ============================================================================
// 10 Slices composed via composeAuth
// ============================================================================

export const tenSlicesAuth = composeAuth({
  slices: [
    sliceCore,
    sliceRateLimit,
    sliceEmail,
    slicePassword,
    sliceEmailCode,
    sliceOAuth,
    sliceOAuthGithub,
    sliceOAuthGoogle,
    sliceTwoFactor,
    sliceOrganizations,
  ] as const,
});

// ============================================================================
// 10 Groups joined via joinContracts
// ============================================================================

const groupCore = HttpApiGroup.make("core").add(
  HttpApiEndpoint.post("getSession", "/getSession", {
    error: [SessionExpired, Unauthorized],
  }),
  HttpApiEndpoint.post("revokeSession", "/revokeSession", {
    error: [Unauthorized],
  })
);

const groupRateLimit = HttpApiGroup.make("rateLimit").add(
  HttpApiEndpoint.post("check", "/check", { error: [RateLimited] })
);

const groupEmail = HttpApiGroup.make("email").add(
  HttpApiEndpoint.post("send", "/send", {
    error: [EmailDeliveryFailed, InvalidEmailAddress],
  })
);

const groupPassword = HttpApiGroup.make("password").add(
  HttpApiEndpoint.post("signIn", "/signIn", {
    error: [InvalidCredentials, RateLimited],
  }),
  HttpApiEndpoint.post("signUp", "/signUp", {
    error: [EmailTaken, RateLimited],
  })
);

const groupEmailCode = HttpApiGroup.make("emailCode").add(
  HttpApiEndpoint.post("sendCode", "/sendCode", { error: [RateLimited] }),
  HttpApiEndpoint.post("verifyCode", "/verifyCode", {
    error: [EmailCodeExpired, EmailCodeInvalid, RateLimited],
  })
);

const groupOAuth = HttpApiGroup.make("oauth").add(
  HttpApiEndpoint.post("callback", "/callback", {
    error: [OAuthStateMismatch, OAuthProviderError, RateLimited],
  })
);

const groupOAuthGithub = HttpApiGroup.make("oauthGithub").add(
  HttpApiEndpoint.post("signIn", "/signIn", {
    error: [GitHubAccountUnverified, RateLimited],
  })
);

const groupOAuthGoogle = HttpApiGroup.make("oauthGoogle").add(
  HttpApiEndpoint.post("signIn", "/signIn", {
    error: [GoogleDomainNotAllowed, RateLimited],
  })
);

const groupTwoFactor = HttpApiGroup.make("twoFactor").add(
  HttpApiEndpoint.post("verify", "/verify", {
    error: [TwoFactorCodeInvalid, SecondFactorRequired, RateLimited],
  })
);

const groupOrganizations = HttpApiGroup.make("organizations").add(
  HttpApiEndpoint.post("getOrg", "/getOrg", {
    error: [OrgNotFound, OrgAccessDenied, Unauthorized],
  })
);

export const tenGroupsContract = joinContracts(
  groupCore,
  groupRateLimit,
  groupEmail,
  groupPassword,
  groupEmailCode,
  groupOAuth,
  groupOAuthGithub,
  groupOAuthGoogle,
  groupTwoFactor,
  groupOrganizations
);
