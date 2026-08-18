import type { MuqunCopy } from './types';

/**
 * The source of truth for Muqun's page copy. Every other locale is a
 * translation of this file and must keep the same keys.
 */
export const copy: MuqunCopy = {
  meta: {
    title: 'Muqun — Your agents, anywhere',
    description:
      'Your coding agent stops to ask permission while you are away from the desk. Muqun puts that answer on your phone: the real terminal, approvals from the Lock Screen, and a new task started from your pocket — straight to your own Mac or Linux machine.',
  },
  hero: {
    paneLabel: 'muqun',
    paneState: 'agent waiting',
    eyebrow: 'pane 2 · claude code · blocked 00:14',
    heading: 'Your agent is waiting for one keypress.',
    sub: 'One command, one scan — then every agent on your machine reports to your phone.',
    appStore: 'Get Muqun',
    googlePlay: 'Get it on Google Play',
    installLabel: 'Then, on your own machine:',
    copyLabel: 'Copy the install command',
    copiedLabel: 'Copied',
    terminalAlt:
      'A terminal pane where a coding agent has stopped to ask permission to edit a file, with the first choice selected and the cursor waiting.',
    deviceAlt:
      'Muqun’s home screen: one server ONLINE, its agents listed down a coral thread, each marked Working, Blocked or Idle.',
    videoPlayLabel: 'Play the 21-second intro film',
    videoLength: '0:21',
    promptLegend: 'The agent’s three answers',
    promptHint: 'Press 1, 2 or 3 — or answer it from the Lock Screen.',
    promptCaption:
      'A terminal pane stopped on a permission prompt: a coding agent has asked to edit src/theme.ts and is waiting for one of three answers.',
  },
  pillars: {
    paneLabel: 'what it is for',
    items: [
      {
        pane: 'approve',
        state: 'waiting',
        title: 'Answer it before the coffee cools',
        line: 'The permission prompt arrives as a push you can answer from the Lock Screen — Approve, Approve always, Deny.',
        alt: 'An illustration of the notification Muqun sends when an agent asks permission, with its three answer buttons.',
      },
      {
        pane: 'watch',
        state: 'streaming',
        title: 'Check any agent’s progress, from anywhere',
        line: 'The real terminal grid, live, in the agent’s own colours. Long-press to select and copy the exact bytes, or pull down for earlier output.',
        alt: 'A coding agent’s output in Muqun: a coloured diff, a bordered table and a green pass line.',
      },
      {
        pane: 'send',
        state: 'ready',
        title: 'Hand the agent a picture',
        line: 'Attach an image or a file straight from your phone — the mockup, the bug, the whiteboard. Type it or dictate it.',
        alt: 'Muqun’s composer with an image staged for upload above it, ticked and ready, next to the paperclip that attached it.',
      },
      {
        pane: 'dispatch',
        state: 'ready',
        title: 'Start the next one from your pocket',
        line: 'Pick the agent, pick a directory the session already knows, type the prompt. It lands in a fresh pane.',
        alt: 'An illustration of Muqun’s new-task sheet: an agent, a working directory, and a prompt field.',
      },
      {
        pane: 'away',
        state: '15m',
        title: 'Come back to a sentence, not a log',
        line: 'Reopen a machine you left fifteen minutes ago and Muqun leads with what moved: which agents finished, which are still asking, and how many times they stopped while nobody was watching.',
        alt: 'An illustration of Muqun’s While you were away card: three agents, where each one ended up, and how many times it stopped to ask.',
      },
      {
        pane: 'serve',
        state: 'port',
        title: 'Open the dev server in your pocket',
        line: 'Type a port and Muqun opens it in your phone’s browser, over the same private address the terminal already uses. No tunnel to stand up, nothing published to the internet.',
        alt: 'An illustration of Muqun’s Open a web service sheet: recent ports, a port field and an Open button.',
      },
    ],
    dispatchAgent: 'agent',
    dispatchFolder: 'directory',
    dispatchPrompt: 'prompt',
    dispatchSend: 'Start',
  },
  craft: {
    paneLabel: 'in the hand',
    paneNote: 'gestures and keys',
    heading: 'A terminal you can drive with two thumbs.',
    lead: 'A phone is not a keyboard, and pretending otherwise is how every other terminal client feels wrong. These are the gestures Muqun answers, and why each one is the shape it is.',
    items: [
      {
        gesture: 'two fingers',
        line: 'Sweep sideways anywhere on a panel to move through that workspace’s tabs. Muqun tells the sweep from a pinch before it moves you, so zooming in never lands you on a different tab.',
      },
      {
        gesture: 'pinch',
        line: 'Zoom the grid until the type is the size your eyes want. Every panel remembers its own, because the editor and the agent are not read at the same distance.',
      },
      {
        gesture: 'pull down',
        line: 'Reach back through output that has already scrolled past. One tap on the marker returns you to the newest line.',
      },
      {
        gesture: 'long-press',
        line: 'Select output, drag to widen the selection, and copy the exact bytes — the characters the program actually printed, not a picture of them.',
      },
      {
        gesture: 'every key',
        line: 'The on-screen row is laid out like a keyboard and sends the moment you press it, which is the whole reason nvim, less and REPLs behave here.',
      },
      {
        gesture: 'vim’s own row',
        line: 'Editor panels get the key row vim expects, LazyVim leader combos included, and follow the mode nvim is actually in rather than the one you last chose.',
      },
      {
        gesture: '@',
        line: 'Mention a file instead of typing its path. Photos and documents attach from the same composer, and the agent’s own slash commands run from it too.',
      },
      {
        gesture: 'tap a file',
        line: 'Read what the session wrote without leaving the app: syntax highlighting, coloured diffs and image previews.',
      },
    ],
  },
  setup: {
    paneLabel: 'setup',
    paneNote: 'about a minute',
    heading: 'One command. One scan.',
    lead: 'Muqun talks to a Gateway on your own computer, not to a server of ours. Installing it is one line, and it does the rest itself.',
    steps: [
      {
        title: 'Run this on your machine',
        body: 'It downloads a ready-built program — no Rust, no compiler — then configures it, starts it, and opens the pairing panel for you.',
      },
      {
        title: 'The QR is already on screen',
        body: 'On a first install, the Gateway opens its own pane next to your others, with the code already in it.',
      },
      {
        title: 'Scan it, and you are in',
        body: 'Point Muqun’s camera at the panel and type back the short code your computer shows. The server goes green, and its panes are on your phone.',
      },
    ],
    inspectLead: 'Prefer to read it first? Download it, read that file, then run that same file:',
    panelFallbackLabel: 'Panel not showing?',
    panelFallbackBody: 'Open it yourself, from any terminal:',
    panelFallbackAfter: 'Once a device is paired, the panel shows its manager instead — press p in it to bring a QR back.',
    panelCopyLabel: 'Copy the command that opens the panel',
    inspectCopyLabel: 'Copy all three commands',
    onlineLabel: 'online',
    qrPanelAlt:
      'An illustration of the Gateway panel inside a terminal session, offering a pairing QR code and the keys p, x and u.',
    onlinePanelAlt:
      'An illustration of the server card in Muqun once pairing finishes, reading ONLINE in green.',
    pairPhoneAlt:
      'Muqun on a phone with nothing paired yet: an empty server list and one button, Pair a server.',
    panelsPhoneAlt:
      'Muqun on a phone once pairing is done: one of the machine’s panes open — an editor holding src/theme.ts — with the other panes in a strip along the bottom, Claude Code, nvim, zsh.',
    requirements: [
      'tmux, or Herdr 0.7.5 or newer, on macOS or Linux. Windows is not supported yet.',
      'No account, no subscription, no in-app purchase.',
      'Same Wi-Fi works; Tailscale is better.',
    ],
    tailscaleBefore: 'We recommend putting both devices on Tailscale and using',
    tailscaleLink: 'Tailscale Serve',
    tailscaleAfter:
      'for a private HTTPS address — no port forwarding, and nothing of yours on the public internet. Use Serve, not Funnel.',
    updatingLabel: 'Updating later:',
    updatingBody:
      'run the same command again. It updates the Gateway and restarts it, and your paired phones stay paired.',
    openSourceBefore: 'The Gateway is open source —',
    openSourceLink: 'read the code and the full setup guide',
  },
  review: {
    status: 'In review with Apple',
    note: 'Muqun is with Apple for review. This is where the App Store link will be.',
  },
  delight: {
    paneLabel: 'make it yours',
    paneNote: 'take your pick · light and dark',
    heading: 'Pick a theme. The terminal changes with it.',
    line: 'Every pack repaints the app and the terminal together, and each one has a light half and a dark one. Thirty-two of them ship; here are five, on the same session:',
    themeAlt: 'The same Muqun session in the {pack} pack.',
  },
  promise: {
    paneLabel: 'the deal',
    lines: [
      'Your phone pairs directly with your own machine.',
      'No Muqun account, and no relay of ours in between.',
      'No ads, no analytics, no third-party tracking SDKs.',
      'One purchase, and every update after it is free.',
      'Ask for a feature or report what broke; the issue tracker is where the next version comes from.',
    ],
    link: 'Read the privacy policy',
    feedbackLink: 'Ask for a feature or report a bug',
  },
  footer: {
    heading: 'Your agents, anywhere.',
    appStore: 'Get Muqun',
    googlePlay: 'Google Play',
    installLabel: 'Install the Gateway',
    support: 'Support',
  },
  support: {
    metaTitle: 'Muqun Support',
    metaDescription:
      'Help with installing the Gateway, pairing Muqun, secure Tailscale connections, notifications, and device access.',
    eyebrow: 'Muqun · Support',
    heading: 'Keep your own machine within reach.',
    lead: 'Start with the checks below. If Muqun still cannot connect, send us the device model, iOS or Android version, your backend (tmux or Herdr) and its version, the Gateway version, and the exact message shown in the app. Never send a Gateway token or pairing QR.',
    emailCta: 'Email Muqun support',
    issueCta: 'Open an issue',
    contactBefore: 'Email:',
    contactAfter: 'Typical response time: within two business days.',
    networkEyebrow: 'Recommended network',
    networkHeading: 'Use Tailscale on both devices.',
    networkBadge: 'phone → tailnet → computer',
    networkBody:
      'We strongly recommend putting your phone and the Gateway computer on the same Tailscale tailnet. It avoids router port forwarding and keeps the Gateway off the public internet. Tailscale Serve can add a private HTTPS address; do not use Tailscale Funnel for Muqun.',
    networkLink: 'Read the Tailscale Serve guide',
    checksHeading: 'Quick checks',
    topics: [
      {
        title: 'Pair a computer',
        body: 'Install the Gateway on a computer you own — it works with tmux or Herdr — open its manager panel, then scan the pairing QR in Muqun. The confirmation code shown on the computer finishes pairing.',
      },
      {
        title: 'Fix a connection',
        body: 'Check that tmux, or Herdr 0.7.5 or later, and the latest Gateway are running. Confirm the phone and computer can reach the same private address, then reopen the server in Muqun.',
      },
      {
        title: 'Remove a device',
        body: 'Delete a server from the Muqun home screen to revoke this phone from that Gateway. You can also revoke any paired device from the Gateway manager panel.',
      },
      {
        title: 'Restore notifications',
        body: 'Enable notifications for Muqun in your phone’s system settings and in Muqun Settings. Reopen the paired server so Muqun can register the current device token with your Gateway.',
      },
    ],
    safetyHeading: 'Privacy and safe reporting',
    safetyBody:
      'Support never needs your access token, full terminal output, source code, or pairing QR. Remove secrets before attaching screenshots or logs.',
    safetyLink: 'Read the privacy policy',
  },
};
