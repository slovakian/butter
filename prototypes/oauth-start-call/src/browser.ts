// PROTOTYPE — a fake browser: a cookie jar with RFC 6265 Path rules, JS fetch, and top-level navigation.
import { BASE_URL } from "./edge.ts"
import { github, GITHUB } from "./flows.ts"

interface Jarred { name: string; value: string; path: string }

// RFC 6265 §5.1.4 default-path: the request path up to (not including) its last "/".
const defaultPath = (pathname: string) => {
  const i = pathname.lastIndexOf("/")
  return i <= 0 ? "/" : pathname.slice(0, i)
}
const pathMatches = (reqPath: string, cookiePath: string) =>
  reqPath === cookiePath || (reqPath.startsWith(cookiePath) && (cookiePath.endsWith("/") || reqPath[cookiePath.length] === "/"))

export const makeBrowser = (app: (req: Request) => Promise<Response>) => {
  let jar: Array<Jarred> = []
  let location = `${BASE_URL}/`

  const store = (res: Response, reqUrl: URL) => {
    for (const sc of res.headers.getSetCookie()) {
      const [pair, ...attrs] = sc.split(";").map((s) => s.trim())
      const name = pair!.slice(0, pair!.indexOf("="))
      const value = pair!.slice(pair!.indexOf("=") + 1)
      const pathAttr = attrs.find((a) => a.toLowerCase().startsWith("path="))
      const path = pathAttr ? pathAttr.slice(5) : defaultPath(reqUrl.pathname)
      const maxAge = attrs.find((a) => a.toLowerCase().startsWith("max-age="))
      jar = jar.filter((c) => !(c.name === name && c.path === path))
      if (maxAge !== "Max-Age=0") jar.push({ name, value, path })
    }
  }
  const cookieHeader = (url: URL) =>
    jar.filter((c) => pathMatches(url.pathname, c.path)).map((c) => `${c.name}=${c.value}`).join("; ")

  const send = async (url: URL, init: RequestInit = {}) => {
    const headers = new Headers(init.headers)
    const cookie = cookieHeader(url)
    if (cookie) headers.set("cookie", cookie)
    const res = await app(new Request(url, { ...init, headers }))
    store(res, url)
    return res
  }

  return {
    // what page JS does: same-origin fetch (cookies attached, Origin sent on POST)
    fetch: async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const req = input instanceof Request ? input : new Request(input, init)
      const url = new URL(req.url, BASE_URL)
      const headers = new Headers(req.headers)
      if (req.method !== "GET") headers.set("origin", BASE_URL)
      return send(url, { method: req.method, headers, body: req.method === "GET" ? undefined : await req.arrayBuffer() })
    },
    // what `location.assign(url)` / clicking a link does: top-level GETs, following redirects (and GitHub)
    navigate: async (start: string) => {
      let url = new URL(start, BASE_URL)
      const hops: Array<string> = []
      for (let i = 0; i < 10; i++) {
        hops.push(url.origin === BASE_URL ? url.pathname + url.search.replace(/(code|state)=[^&]+/g, "$1=…") : `${url.origin}${url.pathname}`)
        if (url.origin === GITHUB) {
          url = new URL(github.authorize(url))
          continue
        }
        const res = await send(url)
        const next = res.headers.get("location")
        if (res.status >= 300 && res.status < 400 && next) {
          url = new URL(next, url)
          continue
        }
        location = url.toString()
        return { landed: url.pathname + url.search, status: res.status, hops }
      }
      throw new Error("redirect loop")
    },
    get location() { return location },
    cookies: () => jar.map((c) => `${c.name} (Path=${c.path})`),
    clear: () => { jar = [] }
  }
}
export type Browser = ReturnType<typeof makeBrowser>
