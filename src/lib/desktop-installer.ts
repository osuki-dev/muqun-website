/** Shared by Astro's local/static endpoint and the production Worker. */
export function desktopInstallerResponse(
  request: Request,
  script: string | null,
): Response {
  const headers = new Headers({
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-cache",
    "X-Content-Type-Options": "nosniff",
  });
  if (request.method !== "GET" && request.method !== "HEAD") {
    headers.set("Allow", "GET, HEAD");
    return new Response("Method not allowed\n", { status: 405, headers });
  }
  // Asset bindings can return an HTML fallback. Never send one into a shell.
  if (!script?.startsWith("#!/bin/sh\n")) {
    return new Response(
      request.method === "HEAD" ? null : "Desktop installer unavailable\n",
      {
        status: 503,
        headers,
      },
    );
  }
  return new Response(request.method === "HEAD" ? null : script, { headers });
}
