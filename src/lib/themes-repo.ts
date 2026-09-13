/**
 * Which repository and ref the themes gallery reads, named once.
 *
 * Sources are merged to `main`; CI builds `index.json` and `dist/*.muqun-theme`
 * and publishes them on the `release` branch. The gallery therefore reads the
 * release ref by default, and the "source" links go to `main`.
 *
 * Both halves can be overridden through the environment, which is how a fork
 * or a staging branch is previewed without editing code:
 *
 *   PUBLIC_MUQUN_THEMES_REPO=someone/muqun-themes
 *   PUBLIC_MUQUN_THEMES_REF=preview
 *
 * `PUBLIC_` because the values reach the client bundle -- they are URLs the
 * browser fetches, and nothing secret. The function takes the environment as
 * an argument rather than reading one itself so the same rule serves
 * `import.meta.env` in the site and `process.env` in the dev-only plugin
 * (`scripts/themes-dev-source.mjs`), and the two cannot disagree.
 */

export const DEFAULT_THEMES_REPO = 'osuki-dev/muqun-themes';
export const DEFAULT_THEMES_REF = 'release';
/** Where a theme's authored source lives. Not configurable: sources are always on main. */
export const THEMES_SOURCE_REF = 'main';

const REPO = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
const REF = /^[A-Za-z0-9_./-]+$/;

export interface ThemesRepoConfig {
  /** `owner/name`. */
  repo: string;
  /** Branch or tag the built artefacts are read from. */
  ref: string;
  /** `https://github.com/<repo>` */
  repoUrl: string;
  /** Root of the ref's files on the raw host, trailing slash included. */
  rawBase: string;
  /** `https://github.com/<repo>/tree/main/src/` -- a theme's source is this plus its id. */
  sourceBase: string;
}

export function themesRepoConfig(
  env: Record<string, string | boolean | undefined> = {},
): ThemesRepoConfig {
  const pick = (key: string, fallback: string, pattern: RegExp) => {
    const value = env[key];
    return typeof value === 'string' && pattern.test(value.trim()) ? value.trim() : fallback;
  };
  const repo = pick('PUBLIC_MUQUN_THEMES_REPO', DEFAULT_THEMES_REPO, REPO);
  const ref = pick('PUBLIC_MUQUN_THEMES_REF', DEFAULT_THEMES_REF, REF);
  return {
    repo,
    ref,
    repoUrl: `https://github.com/${repo}`,
    rawBase: `https://raw.githubusercontent.com/${repo}/${ref}/`,
    sourceBase: `https://github.com/${repo}/tree/${THEMES_SOURCE_REF}/src/`,
  };
}
