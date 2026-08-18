/**
 * The only server-side code on muqun.dev, and it exists for two reasons the
 * static files cannot cover: one redirect that must never chain, and a set of
 * headers that must be on every response.
 */

interface Env {
  ASSETS: Fetcher;
}

/**
 * Where `curl -fsSL https://muqun.dev/gateway.sh | sh` actually goes.
 *
 * This is the canonical published address. `osuki.dev/muqun/gateway.sh` stays
 * alive for the Play listing and for anyone who already has it, and it keeps
 * its own direct 302 to the same file.
 *
 * Two addresses, each **one hop** to the same GitHub raw URL. Neither redirects
 * to the other, and that is the whole point: a cross-domain redirect in the
 * middle of a pipeline that ends in `sh` means the reader is trusting a second
 * domain they never typed. One hop, one place to audit, either way in.
 */
const GATEWAY_INSTALL_SCRIPT =
  'https://raw.githubusercontent.com/osuki-dev/muqun-gateway/main/install.sh';

/**
 * Sent on every response, including the assets.
 *
 * `/gateway.sh` makes this domain a code-execution path for anyone who trusts
 * it, which is the whole reason HSTS and `nosniff` are not optional here. The
 * rest are the ordinary floor.
 */
const SECURITY_HEADERS: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/gateway.sh') {
      return new Response(null, {
        status: 302,
        headers: { Location: GATEWAY_INSTALL_SCRIPT, ...SECURITY_HEADERS },
      });
    }

    const response = await env.ASSETS.fetch(request);
    // A new Response, because the one the asset binding hands back has
    // immutable headers.
    const headers = new Headers(response.headers);
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      headers.set(name, value);
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
