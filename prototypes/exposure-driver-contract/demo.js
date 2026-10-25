// Exposure Driver Contract Demo Logic (Issue #15)

const state = {
  currentDriver: "effect",
  activeSessions: new Set(),
  clientCookies: new Map(),
  lastRequest: null,
  lastResponse: null,
  oauthPending: null,
  activeTab: 0,
};

function getDriverCapabilities(driver) {
  if (driver === "effect") {
    return { name: "Effect RPC", supportsNavigations: true, nativeOrigin: false, format: "JSON" };
  }
  if (driver === "next-hybrid") {
    return { name: "Next.js (Hybrid)", supportsNavigations: true, nativeOrigin: true, format: "RSC Flight" };
  }
  return { name: "Next.js (Actions Only)", supportsNavigations: false, nativeOrigin: true, format: "RSC Flight" };
}

function executeExposure(driver, req) {
  state.lastRequest = req;
  const initialSessions = state.activeSessions.size;

  if (driver === "effect") {
    if (req.type === "call") {
      if (req.origin && req.origin !== "https://app.butter.dev") {
        return {
          status: 403,
          rejected: true,
          sideEffectOccurred: false,
          headers: { "Cache-Control": "no-store", "Content-Type": "application/json" },
          cookies: new Map(),
          body: { error: "CSRF: Untrusted Origin" },
        };
      }
      const token = "sess_eff_" + Math.random().toString(36).slice(2);
      state.activeSessions.add(token);
      const cookies = new Map();
      cookies.set("session_token", {
        name: "session_token", value: token, httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 2592000,
      });
      state.clientCookies.set("session_token", cookies.get("session_token"));

      return {
        status: 200,
        rejected: false,
        sideEffectOccurred: state.activeSessions.size > initialSessions,
        headers: { "Cache-Control": "no-store, max-age=0", "Content-Type": "application/json" },
        cookies,
        body: { success: true, sessionToken: token },
      };
    }

    if (req.action === "oauthStart") {
      const st = "st_" + Math.random().toString(36).slice(2);
      const pk = "pk_" + Math.random().toString(36).slice(2);
      state.oauthPending = { state: st, pkce: pk };
      const cookies = new Map();
      cookies.set("oauth_state", { name: "oauth_state", value: st, httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 600 });
      cookies.set("oauth_pkce", { name: "oauth_pkce", value: pk, httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 600 });
      state.clientCookies.set("oauth_state", cookies.get("oauth_state"));
      state.clientCookies.set("oauth_pkce", cookies.get("oauth_pkce"));

      return {
        status: 302,
        rejected: false,
        redirectUrl: `https://github.com/login/oauth/authorize?state=${st}&code_challenge=${pk}`,
        headers: { Location: "https://github.com/login/oauth/authorize?...", "Cache-Control": "no-store" },
        cookies,
      };
    }
    if (req.action === "oauthCallback") {
      if (!req.queryState || req.queryState !== state.oauthPending?.state) {
        return { status: 403, rejected: true, headers: { "Cache-Control": "no-store" }, cookies: new Map() };
      }
      const token = "sess_eff_" + Math.random().toString(36).slice(2);
      state.activeSessions.add(token);
      const cookies = new Map();
      cookies.set("session_token", { name: "session_token", value: token, httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 2592000 });
      cookies.set("oauth_state", { name: "oauth_state", value: "", maxAge: 0 });
      cookies.set("oauth_pkce", { name: "oauth_pkce", value: "", maxAge: 0 });
      state.clientCookies.set("session_token", cookies.get("session_token"));
      state.clientCookies.delete("oauth_state");
      state.clientCookies.delete("oauth_pkce");

      return {
        status: 302,
        rejected: false,
        redirectUrl: "https://app.butter.dev/dashboard",
        headers: { Location: "/dashboard", "Cache-Control": "no-store" },
        cookies,
      };
    }
  }

  // Next.js Server Actions
  if (req.type === "call") {
    if (req.origin) {
      const originHost = new URL(req.origin).host;
      if (originHost !== "app.butter.dev") {
        return {
          status: 500,
          rejected: true,
          sideEffectOccurred: false,
          headers: { "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate" },
          cookies: new Map(),
          body: "0:E{\"message\":\"Invalid Server Actions request.\"}\n",
        };
      }
    }
    const token = "sess_nxt_" + Math.random().toString(36).slice(2);
    state.activeSessions.add(token);
    const cookies = new Map();
    cookies.set("session_token", {
      name: "session_token", value: token, httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 2592000,
    });
    state.clientCookies.set("session_token", cookies.get("session_token"));

    return {
      status: 200,
      rejected: false,
      sideEffectOccurred: state.activeSessions.size > initialSessions,
      headers: { "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate" },
      cookies,
      body: `0:{"success":true,"sessionToken":"${token}"}\n`,
    };
  }

  if (driver === "next-actions-only") {
    return {
      status: 405,
      rejected: true,
      error: "Server Actions are POST-only; cannot perform GET navigation.",
      headers: {},
      cookies: new Map(),
    };
  }

  if (req.action === "oauthStart") {
    const st = "st_nxt_" + Math.random().toString(36).slice(2);
    const pk = "pk_nxt_" + Math.random().toString(36).slice(2);
    state.oauthPending = { state: st, pkce: pk };
    const cookies = new Map();
    cookies.set("oauth_state", { name: "oauth_state", value: st, httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 600 });
    cookies.set("oauth_pkce", { name: "oauth_pkce", value: pk, httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 600 });
    state.clientCookies.set("oauth_state", cookies.get("oauth_state"));
    state.clientCookies.set("oauth_pkce", cookies.get("oauth_pkce"));

    return {
      status: 302,
      rejected: false,
      redirectUrl: `https://github.com/login/oauth/authorize?state=${st}&code_challenge=${pk}`,
      headers: { Location: "https://github.com/login/oauth/authorize?...", "Cache-Control": "no-store" },
      cookies,
    };
  }
  if (req.action === "oauthCallback") {
    if (!req.queryState || req.queryState !== state.oauthPending?.state) {
      return { status: 403, rejected: true, headers: { "Cache-Control": "no-store" }, cookies: new Map() };
    }
    const token = "sess_nxt_" + Math.random().toString(36).slice(2);
    state.activeSessions.add(token);
    const cookies = new Map();
    cookies.set("session_token", { name: "session_token", value: token, httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 2592000 });
    cookies.set("oauth_state", { name: "oauth_state", value: "", maxAge: 0 });
    cookies.set("oauth_pkce", { name: "oauth_pkce", value: "", maxAge: 0 });
    state.clientCookies.set("session_token", cookies.get("session_token"));
    state.clientCookies.delete("oauth_state");
    state.clientCookies.delete("oauth_pkce");

    return {
      status: 302,
      rejected: false,
      redirectUrl: "https://app.butter.dev/dashboard",
      headers: { Location: "/dashboard", "Cache-Control": "no-store" },
      cookies,
    };
  }
}

const scenarios = [
  {
    title: "The CSRF Status Code Trap",
    text: "When an untrusted origin calls sign-in, Effect RPC returns 403, but Next.js Server Actions returns 500. A test asserting status === 403 fails on Next.js. The Driver Contract must abstract rejection via .rejected: boolean.",
    steps: [
      { label: "1. Cross-Origin on Effect RPC (403)", run: () => { setDriver("effect"); dispatch("signInAttack"); } },
      { label: "2. Cross-Origin on Next.js (500)", run: () => { setDriver("next-hybrid"); dispatch("signInAttack"); } },
    ],
  },
  {
    title: "Missing Origin Header Asymmetry",
    text: "If a test sends no Origin header, Next.js lets it through by design, whereas TanStack Start blocks it. Invariant tests must always send an explicit untrusted Origin.",
    steps: [
      { label: "1. Missing Origin on Next.js (Allowed)", run: () => { setDriver("next-hybrid"); dispatch("signInMissingOrigin"); } },
    ],
  },
  {
    title: "Server Actions Navigation Wall",
    text: "OAuth start and callback are browser GET navigations. Next.js Server Actions are POST-only. A Server-Action-only exposure cannot support OAuth without a companion Route Handler.",
    steps: [
      { label: "1. OAuth on Actions-Only (Fails)", run: () => { setDriver("next-actions-only"); dispatch("oauthStart"); } },
      { label: "2. OAuth on Hybrid Door (Succeeds)", run: () => { setDriver("next-hybrid"); dispatch("oauthStart"); } },
    ],
  },
  {
    title: "Cookie Attributes & Cache-Control",
    text: "Next.js forces Cache-Control: no-cache, no-store, max-age=0, must-revalidate on actions, while Effect RPC sets Cache-Control: no-store explicitly. Both satisfy the invariant.",
    steps: [
      { label: "1. Sign In (Check Session Cookie & No-Store)", run: () => { setDriver("effect"); dispatch("signInValid"); } },
    ],
  },
];

function selectTab(index) {
  state.activeTab = index;
  document.querySelectorAll(".tab").forEach((t, i) => {
    t.classList.toggle("active", i === index);
  });
  renderTabContent();
}

function renderTabContent() {
  const sc = scenarios[state.activeTab];
  let html = `<p style="font-size:0.9rem; color:var(--text); margin-bottom: 0.75rem;">${sc.text}</p>`;
  html += `<div class="btn-group">`;
  sc.steps.forEach((st, idx) => {
    html += `<button class="primary" onclick="runScenarioStep(${state.activeTab}, ${idx})">${st.label}</button>`;
  });
  html += `</div>`;
  document.getElementById("tab-content").innerHTML = html;
}

function runScenarioStep(tabIdx, stepIdx) {
  scenarios[tabIdx].steps[stepIdx].run();
}

function setDriver(driver) {
  state.currentDriver = driver;
  document.getElementById("btn-driver-effect").classList.toggle("active", driver === "effect");
  document.getElementById("btn-driver-next-hybrid").classList.toggle("active", driver === "next-hybrid");
  document.getElementById("btn-driver-next-only").classList.toggle("active", driver === "next-actions-only");
  renderState();
}

function dispatch(actionName) {
  let req;
  let summary = "";

  if (actionName === "signInValid") {
    req = { type: "call", action: "signIn", origin: "https://app.butter.dev" };
    summary = `Same-Origin Sign In dispatched to ${state.currentDriver}.`;
  } else if (actionName === "signInAttack") {
    req = { type: "call", action: "signIn", origin: "https://evil.com" };
    summary = "Cross-origin attack from https://evil.com. Check rejection status.";
  } else if (actionName === "signInMissingOrigin") {
    req = { type: "call", action: "signIn", origin: undefined };
    summary = "Missing Origin request. Notice Next.js allows it through.";
  } else if (actionName === "oauthStart") {
    req = { type: "nav", action: "oauthStart" };
    summary = "OAuth Start navigation (GET).";
  } else if (actionName === "oauthCallback") {
    req = { type: "nav", action: "oauthCallback", queryState: state.oauthPending?.state };
    summary = "Valid OAuth callback with matched state.";
  } else if (actionName === "oauthTampered") {
    req = { type: "nav", action: "oauthCallback", queryState: "tampered-state-123" };
    summary = "OAuth callback with tampered state.";
  }

  const res = executeExposure(state.currentDriver, req);
  state.lastResponse = res;

  const summaryElem = document.getElementById("action-summary");
  summaryElem.className = res.rejected ? "alert alert-break" : "alert alert-success";
  summaryElem.innerText = `${summary} Status: ${res.status}, Rejected: ${res.rejected}`;

  renderState();
}

function resetState() {
  state.activeSessions.clear();
  state.clientCookies.clear();
  state.lastRequest = null;
  state.lastResponse = null;
  state.oauthPending = null;
  document.getElementById("action-summary").className = "alert";
  document.getElementById("action-summary").innerText = "State reset.";
  renderState();
}

function renderState() {
  const caps = getDriverCapabilities(state.currentDriver);

  const invList = document.getElementById("invariants-list");
  const inv1Pass = state.lastResponse && state.lastRequest?.origin === "https://evil.com" ? state.lastResponse.rejected : true;
  const inv2Pass = state.clientCookies.has("session_token") ? state.clientCookies.get("session_token").httpOnly : true;
  const inv3Pass = state.lastResponse?.headers?.["Cache-Control"]?.toLowerCase().includes("no-store") ?? true;
  const inv4Pass = caps.supportsNavigations;

  invList.innerHTML = `
    <li>
      <span class="prop-label">1. Cross-Origin Rejection (CSRF)</span>
      <span class="badge ${inv1Pass ? "badge-pass" : "badge-fail"}">${inv1Pass ? "PASSED" : "FAILED"}</span>
    </li>
    <li>
      <span class="prop-label">2. Session Cookie Attributes (HttpOnly, Secure)</span>
      <span class="badge ${inv2Pass ? "badge-pass" : "badge-fail"}">${inv2Pass ? "PASSED" : "FAILED"}</span>
    </li>
    <li>
      <span class="prop-label">3. Cache-Control: no-store</span>
      <span class="badge ${inv3Pass ? "badge-pass" : "badge-fail"}">${inv3Pass ? "PASSED" : "FAILED"}</span>
    </li>
    <li>
      <span class="prop-label">4. OAuth State & PKCE Lifecycle</span>
      <span class="badge ${inv4Pass ? "badge-pass" : "badge-fail"}">${inv4Pass ? "PASSED" : "BREAK (No Navigations)"}</span>
    </li>
  `;

  const respProps = document.getElementById("response-props");
  if (state.lastResponse) {
    respProps.innerHTML = `
      <li><span class="prop-label">HTTP Status</span><span class="prop-val">${state.lastResponse.status}</span></li>
      <li><span class="prop-label">Rejected (Contract Flag)</span><span class="prop-val">${state.lastResponse.rejected}</span></li>
      <li><span class="prop-label">Side Effect Committed</span><span class="prop-val">${state.lastResponse.sideEffectOccurred ?? false}</span></li>
      <li><span class="prop-label">Wire Format</span><span class="prop-val">${caps.format}</span></li>
    `;
    document.getElementById("response-headers").innerText = JSON.stringify(state.lastResponse.headers, null, 2);
  } else {
    respProps.innerHTML = `<li><span class="prop-label">No response yet</span></li>`;
    document.getElementById("response-headers").innerText = "{}";
  }

  const cookieObj = {};
  state.clientCookies.forEach((v, k) => { cookieObj[k] = v; });
  document.getElementById("cookies-state").innerText = JSON.stringify(cookieObj, null, 2);
  document.getElementById("sessions-state").innerText = JSON.stringify(Array.from(state.activeSessions), null, 2);
}

selectTab(0);
renderState();
