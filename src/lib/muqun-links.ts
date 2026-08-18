/**
 * Every outbound link Muqun's pages depend on, in one place.
 *
 * The repositories moved to the `osuki-dev` org on 2026-07-29, before the 1.2.0
 * submission rather than after it -- the footer, the npm scope and the platform
 * SDK were already there, and asking people to pipe a shell script from a
 * personal account into their terminal sat badly on a page whose argument is
 * "no relay, no account, your machine".
 *
 * GitHub keeps redirecting the old paths, but everything published from here
 * names the new owner directly: a `curl | sh` that quietly redirects is exactly
 * what a careful reader will refuse to run.
 */

const GITHUB_OWNER = 'osuki-dev';

/**
 * The repository, named once. It was `herdr-gateway` until the gateway stopped
 * being for one backend. GitHub redirects the old path, which is precisely the
 * reason above for not publishing it.
 */
const GITHUB_REPO = 'muqun-gateway';

export const gatewayRepoUrl = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;

/**
 * The app itself. What the footer's GitHub link means.
 *
 * It used to point at the gateway, because for a while the gateway was the
 * only half of Muqun anyone could read. Now that the app is open too, a
 * visitor who clicks "GitHub" under an app's marketing page expects that app,
 * and the gateway has its own link in the setup block where it is actually
 * relevant.
 *
 * ── ORDERING, AND IT IS THE WHOLE NOTE ──────────────────────────────────────
 * This repository must be public before this site is deployed. While it is
 * private the link is a 404 for every visitor and a sign-in wall for anyone
 * with a GitHub session, which is worse than the gateway link it replaced.
 * The same rule `muqun-release.ts` applies to the App Store button applies
 * here for the same reason: publish the destination first, then the link.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const appRepoUrl = `https://github.com/${GITHUB_OWNER}/muqun-app`;

/**
 * Where the installer actually lives. Both published addresses 302 here.
 *
 * Kept exported even though nothing on this site reads it: it is the fact that
 * makes the redirect in `worker/index.ts` checkable, and the one thing a
 * careful reader wants after `curl -I` on the address they were given.
 */
export const gatewayInstallSourceUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/install.sh`;

/**
 * The address people are asked to paste.
 *
 * It is our own, and it 302s straight to the file in the repo — see
 * `worker/index.ts`, which is the only server-side code on this domain. At the
 * root rather than under a product segment, because this domain is the product:
 * `/muqun/gateway.sh` on a site called muqun.dev says the word twice.
 *
 * Publishing the raw.githubusercontent address directly would bake the account
 * name into a command that ends up in blog posts, chat logs and shell
 * histories, and the next move of the repository would then break every copy
 * of it.
 *
 * Serving a duplicate of the script here instead of redirecting would be worse
 * again: two copies that can drift, and us as the distribution point for a file
 * GitHub already hosts.
 *
 * ── On the address that used to be here ─────────────────────────────────────
 * This was `https://osuki.dev/muqun/gateway.sh` until the site split. That one
 * still works and still serves its own direct 302 to the same raw file. What it
 * deliberately does **not** do is redirect here, and this one does not redirect
 * there: a cross-domain hop in the middle of a pipeline ending in `sh` asks the
 * reader to trust a second domain they never typed. Two addresses, one hop
 * each, same file — neither depending on the other still being right.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const gatewayInstallUrl = 'https://muqun.dev/gateway.sh';

export const gatewayInstallCommand = `curl -fsSL ${gatewayInstallUrl} | sh`;

/**
 * Download, read, then run — the same file all three times.
 *
 * Deliberately not `curl … | less` followed by `curl … | sh`. That reads well
 * but is two separate requests, so anything able to serve the second one could
 * serve something other than what was reviewed in the first, and a server can
 * tell the difference between a pipe into a pager and a pipe into a shell.
 * Reviewing the artifact you then execute is the only version of this advice
 * that actually holds.
 */
export const gatewayInspectCommand = [
  `curl -fsSL ${gatewayInstallUrl} -o gateway.sh`,
  'less gateway.sh',
  'sh gateway.sh',
].join('\n');

/**
 * Reopening the Gateway's pairing screen, from any terminal.
 *
 * The install script opens it automatically on a first run, so most people
 * never need this. It is on the page anyway because the failure it covers is
 * the one that loses installs: someone runs the command, no QR appears, and
 * they are left looking at a terminal with nothing to scan and nothing to
 * type.
 *
 * `manage` belongs to the gateway itself, not to either terminal backend, so
 * it is the same command whether Muqun Gateway is running on tmux or on
 * Herdr — confirmed against the gateway's own source, which prints this
 * exact line once setup finishes. Deliberately not shortened: a
 * half-remembered version of it opens nothing and says nothing about why.
 */
export const gatewayManageCommand = 'muqun-gateway manage';

/**
 * Where "report a bug" and "ask for a feature" go.
 *
 * The app repository, not the old `muqun-feedback` tracker. A report that can
 * be answered with a commit belongs in the tree that commit lands in, and the
 * repository carries issue templates that ask for the version, the platform
 * and whether the bug reproduces in the offline demo -- the three answers that
 * decide where a report goes next.
 *
 * `muqun-feedback` is not dead and must not be closed: the shipped 1.3.0
 * binary has its address compiled in, so it keeps receiving reports from
 * everyone on that build no matter what this page says.
 *
 * Same ordering rule as `appRepoUrl` above: the repository has to be public
 * before this site is deployed, or this button is a 404.
 */
export const feedbackIssueUrl = `https://github.com/${GITHUB_OWNER}/muqun-app/issues/new/choose`;

export const appStoreUrl = 'https://apps.apple.com/app/muqun/id6793419283';

export const playStoreUrl = 'https://play.google.com/store/apps/details?id=dev.osuki.muqun';

export const supportEmail = 'muqun@osuki.dev';
