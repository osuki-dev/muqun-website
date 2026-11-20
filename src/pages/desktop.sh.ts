import type { APIRoute } from "astro";
import script from "../installers/install-desktop.sh?raw";
import { desktopInstallerResponse } from "../lib/desktop-installer";

/** Emits the reviewed installer into dist/ and serves the same bytes in dev. */
export const GET: APIRoute = ({ request }) =>
  desktopInstallerResponse(request, script);
export const HEAD = GET;
export const ALL = GET;
