/**
 * The user guide's copy, one object per locale, in the arrangement
 * `world.ts`, `gateway-help.ts` and `themes.ts` use: a single file, typed
 * against `SiteLocale`, so a language with no entry here is a build error
 * rather than a page that quietly serves English.
 *
 * ── Why every locale currently points at the same object ────────────────────
 * The guide is written in English and has not been translated yet. The eleven
 * other locales are aliases of `en` rather than eleven copies of the same
 * English strings: a copy would look translated to anyone grepping this file,
 * and the day a real translation lands it would have to be found among twelve
 * identical blocks. One alias per locale, under one TODO, is the findable
 * version of "not translated yet" — delete the alias and write the object.
 *
 * The support page mixes this with `muqun/*.ts`: the parts of the page that
 * were already translated (the heading, the lead, the quick checks, the
 * contact and safety blocks) keep coming from there and stay translated. Only
 * what is new here is English everywhere.
 *
 * Register rule, as everywhere else on this site: `eyebrow` is mono, ASCII and
 * untranslated — a command, a path, a flag. Anything with a translated word in
 * it belongs in `heading` or `lead`, which are proportional.
 *
 * Nothing here may describe a capability the product does not ship. Every
 * command, path, port, config key and version in this file was read out of
 * `osuki-dev/muqun-gateway` and `osuki-dev/muqun-app`, or off the gateway's own
 * `--help`, on 2026-09-18.
 */
import type { SiteLocale } from '@/lib/locales';

/** One entry of the in-page table of contents, and one section's anchor. */
export interface GuideAnchor {
  /** The `id` on the section. Deep-linked from inside the app; never rename. */
  id: string;
  /** Proportional, translated. What the section is called in the contents. */
  label: string;
}

/** A numbered thing to do, optionally with one command under it. */
export interface GuideStep {
  title: string;
  body: string;
  /** Literal, ASCII. Rendered verbatim in a `CodeBlock`. */
  code?: string;
  /** Mono, ASCII. The caption above the command. */
  codeLabel?: string;
}

/** A term and what it means. The config table and the troubleshooting list. */
export interface GuideEntry {
  /** Proportional where it is prose, mono where it is a key or a command. */
  term: string;
  detail: string;
}

export interface UserGuide {
  /** Translated. The accessible name of the contents nav. */
  contentsLabel: string;
  /** The order the sections appear in, and the contents list. */
  contents: readonly GuideAnchor[];

  getStarted: {
    eyebrow: string;
    heading: string;
    lead: string;
    steps: readonly GuideStep[];
    /** Read before running the command. */
    requirements: readonly string[];
    pairingNote: string;
    codeNote: string;
  };

  terminal: {
    eyebrow: string;
    heading: string;
    lead: string;
    /** Translated. What is happening on the screen, not "a screenshot". */
    shotAlt: string;
    entries: readonly GuideEntry[];
    note: string;
  };

  opencode: {
    eyebrow: string;
    heading: string;
    lead: string;
    /** The one sentence this section exists to say. */
    noSignIn: string;
    prerequisitesHeading: string;
    prerequisites: readonly string[];
    entries: readonly GuideEntry[];
    note: string;
  };

  gateway: {
    eyebrow: string;
    heading: string;
    lead: string;
    configHeading: string;
    configBody: string;
    configPathLabel: string;
    configPath: string;
    configKeys: readonly GuideEntry[];
    portsHeading: string;
    portsBody: string;
    modesHeading: string;
    modesBody: string;
    autostartHeading: string;
    autostartBody: string;
    managerHeading: string;
    managerBody: string;
    managerKeys: readonly GuideEntry[];
    capabilitiesHeading: string;
    capabilitiesBody: string;
    upgradeHeading: string;
    upgradeBody: string;
    logsHeading: string;
    logsBody: string;
    logsCommandLabel: string;
    logsCommand: string;
  };

  themes: {
    eyebrow: string;
    heading: string;
    lead: string;
    /** Translated. What is happening on the screen, not "a screenshot". */
    shotAlt: string;
    entries: readonly GuideEntry[];
    galleryLink: string;
  };

  troubleshooting: {
    eyebrow: string;
    heading: string;
    lead: string;
    entries: readonly GuideEntry[];
  };

  contact: {
    eyebrow: string;
    heading: string;
    lead: string;
  };
}

const en: UserGuide = {
  contentsLabel: 'On this page',
  contents: [
    { id: 'get-started', label: 'Get started' },
    { id: 'terminal', label: 'The terminal' },
    { id: 'opencode', label: 'The OpenCode agent' },
    { id: 'gateway', label: 'Configuring the Gateway' },
    { id: 'themes', label: 'Themes' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
    { id: 'contact', label: 'Contact' },
  ],

  getStarted: {
    eyebrow: 'muqun-gateway',
    heading: 'Install the Gateway, then pair your phone.',
    lead: 'Muqun talks to one program on your own computer: the Gateway. You install it there, start it, and pair the phone with it once. There is no account to make and nothing of yours passes through us.',
    steps: [
      {
        title: 'Run the installer on your computer',
        body: 'It puts a single binary at ~/.local/bin/muqun-gateway, configures it, and opens the pairing screen on a first run. macOS and Linux; Windows is not supported yet.',
        code: 'curl -fsSL https://muqun.dev/gateway.sh | sh',
        codeLabel: 'install',
      },
      {
        title: 'Start it',
        body: 'start runs the Gateway in the background and it keeps running after you close the terminal. status prints the address the app needs and whether the process is up. If you would rather have it come back after a reboot, install it as a service instead — see Configuring the Gateway below.',
        code: 'muqun-gateway start',
        codeLabel: 'start',
      },
      {
        title: 'Open the pairing manager',
        body: 'The manager is a full-screen panel in your terminal. It shows the QR code, what is running, and every device that currently holds a token. The installer opens it for you the first time; this is how you get back to it.',
        code: 'muqun-gateway manage',
        codeLabel: 'pair',
      },
      {
        title: 'Scan, then type the code',
        body: 'Scan the QR code in Muqun. The computer then shows a short code in the form XXXX-XXXX, and typing it in the app finishes the pairing. Scanning alone does not pair the phone — the code is what proves the person holding it is you.',
      },
    ],
    requirements: [
      'macOS or Linux, on a computer you own. Windows is not supported yet.',
      'tmux, or Herdr 0.7.5 or newer, already installed — the Gateway drives one of them rather than replacing it.',
      'Both devices on the same private network. Tailscale is the recommended way; use Tailscale Serve, never Funnel.',
      'No account, no subscription, and no relay of ours in between.',
    ],
    pairingNote:
      'Cannot scan? Enter the Gateway address in the app by hand — the manager prints the address it is publishing — and then type the same short code.',
    codeNote:
      'The code is valid for five minutes and dies after eight wrong attempts. Press p in the manager to show a fresh QR code and a fresh code.',
  },

  gateway: {
    eyebrow: 'config.json',
    heading: 'Configuring the Gateway.',
    lead: 'Most people never open the configuration. It is here for the cases that need it: a different port, a Gateway that should survive a reboot, a machine where OpenCode lives somewhere unusual.',
    configHeading: 'The configuration file',
    configBody:
      'It is JSON, and the Gateway writes it for you at setup. Edit it by hand only when you need one of the keys below, and restart the Gateway afterwards — configuration is read at startup and a running Gateway will not notice the change. On macOS the same file is under ~/Library/Application Support/muqun-gateway/. Beside it sits pairing.json; paired devices, push tokens and the log live in the state directory, ~/.local/share/muqun-gateway/.',
    configPathLabel: 'linux',
    configPath: '~/.config/muqun-gateway/config.json',
    configKeys: [
      { term: 'label', detail: 'The name the app shows for this computer.' },
      {
        term: 'listen',
        detail:
          'The socket it binds, host and port. Defaults to 0.0.0.0:23847, or to loopback when the published address is a loopback one.',
      },
      {
        term: 'public_url',
        detail:
          'The address encoded into the pairing QR — what the phone will actually dial. Change it with u in the manager rather than by hand.',
      },
      {
        term: 'transport_encryption',
        detail:
          'required by default, which is what you want. Devices keep whichever mode they paired in, so changing this affects the next device you pair, not the ones already there.',
      },
      {
        term: 'sessions',
        detail:
          'The terminal backends this Gateway mounts — tmux, Herdr, or both at once. Managed with muqun-gateway backend.',
      },
      {
        term: 'autostart_backends',
        detail:
          'Which of those start with the Gateway. Empty by default: starting a terminal server is an explicit opt-in.',
      },
      {
        term: 'rich_agent_pushes',
        detail:
          'Off by default. On, the agent’s question and its offered answers go into the push body itself — which puts terminal text on a lock screen and through Apple’s and Google’s servers. That is why it is off.',
      },
      {
        term: 'opencode.autostart',
        detail:
          'On by default. The Gateway starts OpenCode itself when it cannot find one already running.',
      },
      {
        term: 'opencode.binary',
        detail:
          'Which OpenCode to start. Absent means the one on your PATH. Set it when opencode is installed somewhere your login shell finds and a service does not.',
      },
    ],
    portsHeading: 'Ports',
    portsBody:
      'One TCP port, 23847 by default. Change it with setup --port and restart; the Gateway binds 127.0.0.1 when the address it publishes is a loopback address, and 0.0.0.0 otherwise. Nothing needs forwarding on your router if both devices are on a tailnet, which is the arrangement we recommend.',
    modesHeading: 'Service mode, or start it yourself',
    modesBody:
      'Pick one. muqun-gateway start runs it in the background until the machine restarts, and stop ends it. service install registers it with your own user’s init system instead — a systemd user unit on Linux, a LaunchAgent on macOS — so it starts at login and comes back after a crash or a reboot. Nothing is installed as root and nothing lands outside your home directory. With the service installed, stop is undone immediately by the supervisor; service uninstall is how you stop it for good, and it leaves your pairings, devices and configuration untouched.',
    autostartHeading: 'How OpenCode gets started',
    autostartBody:
      'The Gateway looks for an OpenCode service already running and healthy, and if it finds one it simply attaches to it — your own opencode serve keeps its sessions. Otherwise it starts one itself, as opencode serve --service, and watches it. OpenCode publishes its address in ~/.local/state/opencode/service.json, which the Gateway re-reads as it goes, so an OpenCode that restarts on a new port is picked up again on its own. If OpenCode is not installed at all, nothing attaches and only the agent screen is affected: the terminal keeps working exactly as before.',
    managerHeading: 'The pairing manager',
    managerBody:
      'muqun-gateway manage opens it. It lists what is running and every device that holds a token, and these are its keys:',
    managerKeys: [
      { term: 'p', detail: 'Show the pairing QR again, to add another device.' },
      { term: 'x', detail: 'Revoke one device’s access.' },
      { term: 'u', detail: 'Edit the address encoded into the QR; a re-detects it for you.' },
      { term: 's / t', detail: 'Start or stop the Gateway without leaving the manager.' },
      { term: 'm / h', detail: 'Add a tmux or a Herdr backend; f picks the default, d removes one.' },
      { term: 'e', detail: 'Change transport encryption for devices paired from now on.' },
      { term: 'q', detail: 'Close the manager. It never stops your terminal sessions.' },
    ],
    capabilitiesHeading: 'Older Gateways keep working',
    capabilitiesBody:
      'The app asks the Gateway what it can do rather than guessing from its version number, and hides what is not there instead of failing. So an older Gateway is still a perfectly good terminal: you lose the newer surfaces, not the connection. Agent collaboration is the one feature with a backend requirement of its own — it needs a connected Herdr 0.9.0 or newer for that session, and a tmux session never offers it. When it is missing the app says what to upgrade rather than hiding the option silently.',
    upgradeHeading: 'Upgrading',
    upgradeBody:
      'Run the same install command again. It replaces the binary in place, keeps your server identity, your address and your configuration, and your paired phones stay paired. If you had installed the service, run service install once more afterwards: the unit carries rules about child-process lifetimes, and refreshing it is what keeps a Gateway restart from taking your terminal sessions down with it.',
    logsHeading: 'Logs',
    logsBody:
      'Started with start, the Gateway writes to ~/.local/share/muqun-gateway/gateway.log, and so does the macOS LaunchAgent. Under systemd on Linux it goes to the journal instead. For more detail, set MUQUN_LOG (or RUST_LOG) to debug before starting it; the default is info.',
    logsCommandLabel: 'linux · service mode',
    logsCommand: 'journalctl --user -u dev.osuki.muqun-gateway',
  },

  terminal: {
    eyebrow: 'workspace · group.panel',
    heading: 'The terminal.',
    lead: 'It is your real terminal, not a transcript of one. The Gateway drives tmux or Herdr on your machine, and the app draws what is there — so the session you left on your desk is the session you pick up, and closing the app changes nothing about it.',
    shotAlt:
      'An nvim pane open on a TypeScript file, with chips along the bottom for the Claude Code, nvim and zsh terminals in the same group and the key row above the composer.',
    entries: [
      {
        term: 'Workspaces, groups and terminals',
        detail:
          'Three levels, addressed as workspace · group.panel. A workspace is a place you work, a group is a set of terminals in it, and a terminal is one shell. Muqun shows one terminal at a time and does not split the screen: two panes on a phone are two things you cannot read.',
      },
      {
        term: 'Moving between them',
        detail:
          'Swipe the title pill at the top sideways to change workspace. Swipe across the terminal with two fingers to move between groups. The chips above the composer move between the terminals of the group you are in.',
      },
      {
        term: 'What is running',
        detail:
          'The panels sheet lists every workspace, group and terminal on the machine, and is where you add one. Long-press a row for its actions, including closing it — a close is never one stray tap away.',
      },
      {
        term: 'The terminal key row',
        detail:
          'The strip above the composer sends the keys a terminal needs and a phone keyboard does not have: Esc, Tab, ⌃C, arrows, and a set that changes with what is running in the pane — shell keys in a shell, ⇧TAB and ⌃O under Claude Code, :w and gg under nvim. In insert mode in nvim it leads with Esc. There is a full on-screen keyboard behind the keyboard button when you need to type a keystroke it does not carry. You can turn the row off in Settings → Terminal.',
      },
      {
        term: 'The composer',
        detail:
          'Monospaced, multi-line, and Return makes a new line — sending is a button, because a command you did not mean to run is worse than a tap. What it says above the field follows the pane: Run a terminal command, Send a message, Type into this editor.',
      },
      {
        term: 'Earlier output',
        detail:
          'Pull down from the top of the terminal to load more scrollback; a chevron appears while there is more to fetch. Once you have scrolled away from the live end, a Latest pill takes you back. New output never yanks the screen out from under you while you are reading.',
      },
      {
        term: 'Changes',
        detail:
          'The git view for the directory the pane is in: the changed files with a count, filtered by All, Staged or Unstaged, and the diffs themselves. The button carries a badge with the number of changed files, and it only appears when the pane is inside a git checkout and the Gateway offers the git_diff capability.',
      },
      {
        term: 'Files',
        detail:
          'What the session wrote — images, code and documents, filterable and searchable, readable without leaving the app.',
      },
      {
        term: 'Open in your browser',
        detail:
          'Type the port your dev server is on and Muqun opens it through the connection you already have. Nothing is published to the internet. If nothing answers, the usual reason is a server bound to localhost on the host.',
      },
      {
        term: 'Quick actions',
        detail:
          'Saved commands, saved prompts and key combinations, with the ones you use most first. You can add your own and edit the defaults.',
      },
    ],
    note: 'Muqun only ever observes: opening a session does not re-lay-out your windows, and closing the app does not stop anything.',
  },

  opencode: {
    eyebrow: 'opencode serve --service',
    heading: 'The OpenCode agent.',
    lead: 'A screen built for OpenCode rather than a terminal with an agent in it: sessions you can switch between, tool calls as cards with the real diff inside them, and the agent’s questions arriving as something you answer with a tap.',
    noSignIn:
      'There is no sign-in. Muqun has no account and asks for no API key, because it is not the thing talking to your model provider — OpenCode on your own computer is. You configure providers, models, agents and skills there, the way you already do, and the Gateway passes no credential route through at all.',
    prerequisitesHeading: 'What it needs',
    prerequisites: [
      'OpenCode 2.0.1 installed on the same computer as the Gateway.',
      'At least one provider configured in OpenCode itself. Free models exist, and the model picker has a Free only filter for finding them.',
      'The OpenCode service running. The Gateway starts it for you by default, and attaches to one you started yourself.',
      'A Gateway new enough to offer the agent surface. Without it the OpenCode button is simply not there, and the terminal is unaffected.',
    ],
    entries: [
      {
        term: 'Sessions and subagents',
        detail:
          'Each session is a conversation with its own context, and they are listed per workspace or across all of them. A session that starts a subagent shows it indented underneath, so a task that fanned out is still one thing you can read.',
      },
      {
        term: 'Workspaces',
        detail:
          'Switch the directory the agent works in, or type a path to open a new one. Picking a workspace reopens its most recent session rather than starting a fresh one.',
      },
      {
        term: 'Models and agents',
        detail:
          'Choose a model lists what your providers actually offer, grouped by provider, with the context window on each row and a Free chip on the free ones. Choose an agent switches between Build, Plan, Explore and any custom agent on the host.',
      },
      {
        term: 'Slash commands and skills',
        detail:
          'Type / in the composer. Some commands the app answers itself — /new, /models, /compact, /undo, /export — and the rest come from the host, which wins when the names collide. Skills on the host appear in the same list and are marked in the transcript when one runs.',
      },
      {
        term: 'Attachments and file mentions',
        detail:
          'Send a photo, something from the library, or any file. Images are re-encoded on the way out, which drops their EXIF. Type @ to point the agent at a file in the workspace instead of describing it.',
      },
      {
        term: 'Permissions and questions',
        detail:
          'When the agent wants to run a command, write a file or read outside the workspace, the card says which and you answer Allow, Always allow or Deny — the same three words on the notification, so it can be answered from the lock screen. Questions the agent asks come through as a small form to fill in. Auto-approve every action exists for when you are watching; irreversibly destructive commands stay blocked even then.',
      },
      {
        term: 'Background tasks and queueing',
        detail:
          'A long tool call can be detached to the background and watched from a tray. While a turn is running you choose whether what you type steers it now or queues behind it, and a queued message can be pulled back before it goes.',
      },
      {
        term: 'Context and compaction',
        detail:
          'The context sheet shows how much of the model’s window is used, the tokens this session has spent and an estimated cost. Compaction summarises the history when it gets long, and the timeline marks where it happened and whether it was automatic.',
      },
      {
        term: 'Undo',
        detail:
          '/undo rolls the workspace back to before your last message; /redo cancels a rollback you have not kept. It is a command rather than a button, on purpose.',
      },
    ],
    note: 'Tool calls arrive as cards: an edit shows its unified diff inline, the same way the Changes viewer draws it.',
  },

  themes: {
    eyebrow: 'muqun.dev/themes',
    heading: 'Themes.',
    lead: 'A theme repaints the app and the terminal together, and every pack has a light half and a dark one. Twenty-four ship with the app; more live in the community catalogue.',
    shotAlt:
      'A session in the Tokyo Night pack: the app chrome and the terminal — a diff, a table and a pass mark — all carrying the same palette.',
    entries: [
      {
        term: 'The packs that ship',
        detail:
          'Twenty-four, under Settings → Appearance → Theme, including Catppuccin, Gruvbox, Kanagawa, Rosé Pine, Tokyo Night and Everforest. Colour mode — System, Light or Dark — picks which half of the pack you see, not which pack it is.',
      },
      {
        term: 'Browsing the catalogue',
        detail:
          'Browse themes reads the catalogue published here on muqun.dev. Nothing downloads until you open a row, and opening one shows the whole app wearing it before you decide — the theme you are using does not change until you tap Apply theme.',
      },
      {
        term: 'Installing one from elsewhere',
        detail:
          'Import a .muqun-theme file from Files, AirDrop or a share sheet, or import a link — a public theme URL, or a GitHub repository, optionally pinned to a branch or commit. Tapping a .muqun-theme path inside a terminal offers to preview it too. Everything is previewed before it is applied.',
      },
      {
        term: 'Making your own',
        detail:
          'A theme is a file, not a form: a manifest naming the interface colours, all sixteen ANSI terminal colours, artwork for the app’s surfaces and up to three custom icons, packaged with its images. There is no colour editor inside the app. The app ships a skill for writing one, so you can describe the look you want to your agent and have it build the package.',
      },
      {
        term: 'Background opacity',
        detail:
          'A theme of your own can also set how much of the app background shows through the interface and behind terminal text, with a separate slider for each. Below the recommended floor the app warns you that text is no longer guaranteed to stay readable.',
      },
    ],
    galleryLink: 'Browse the theme catalogue',
  },

  troubleshooting: {
    eyebrow: 'when it does not connect',
    heading: 'When something does not work.',
    lead: 'Almost everything here is one of four things: the Gateway is not running, the phone cannot reach its address, the pairing is gone, or OpenCode is not up on the host.',
    entries: [
      {
        term: 'It cannot pair',
        detail:
          'Could not reach the gateway means the address in the QR is not answering from where the phone is standing. Check muqun-gateway status on the computer, then check that the phone can reach that address at all — the same Wi-Fi, or better, the same tailnet. A Gateway bound to loopback is not reachable from anything but its own machine; either publish a real address with u in the manager, or pair through a saved SSH host, which is exactly what that option is for.',
      },
      {
        term: 'The code is refused or expired',
        detail:
          'The code is eight characters, lasts five minutes, and is burned after eight wrong tries. Press p in the manager for a fresh QR and a fresh code. The alphabet has no 0, 1, I, L or O in it, so a character that looks like one of those is something else.',
      },
      {
        term: 'The dot',
        detail:
          'A filled dot means the app asked and got an answer: ONLINE, or OFFLINE when nothing answered. A hollow ring reading NOT CONNECTED means it has not asked yet — it is not a failure, and opening the server resolves it.',
      },
      {
        term: 'It says to pair again',
        detail:
          'The device token for that Gateway is gone — revoked from the manager, or lost when the Gateway’s state was rebuilt. Pair the server again; nothing else on the phone is affected.',
      },
      {
        term: 'OpenCode is not found',
        detail:
          'The agent screen says OpenCode service offline and tells you to run opencode serve --service on the host. Run it, then tap Check again. If it is already running and still not found, it is usually a service that cannot see your PATH: set opencode.binary in the Gateway configuration to the full path of the binary and restart the Gateway.',
      },
      {
        term: 'A model is greyed out, or there are no free ones',
        detail:
          'Set up on the host means that provider is not configured in OpenCode — configure it there and reopen the picker. No free models on this host means the Free only filter matched nothing, not that something is wrong; turn the filter off to see everything your providers offer. Muqun shows an estimated cost per session but does not charge anything and does not stand between you and your provider.',
      },
      {
        term: 'The agent wants to leave the workspace',
        detail:
          'Read outside the workspace and Write outside the workspace are what they sound like, and the path is on the card. Allow is once, Always allow remembers it, Deny refuses. This prompt is doing its job — it is worth reading the path before answering.',
      },
      {
        term: 'The Changes button is missing',
        detail:
          'It appears only when the terminal is inside a git checkout and the Gateway is new enough to serve diffs. Upgrade the Gateway by re-running the install command.',
      },
      {
        term: 'Something needs a newer Gateway',
        detail:
          'The app asks the Gateway what it supports rather than guessing, so an old Gateway loses a feature and keeps the terminal. Assigning work to another assistant additionally needs Herdr 0.9.0 or newer on that session, and the app says which of the two to update.',
      },
      {
        term: 'The host is behind a proxy',
        detail:
          'Your machine is what talks to your model provider, so a host that needs a proxy to reach the internet needs OpenCode configured for it on that machine. Muqun neither proxies nor sees that traffic.',
      },
    ],
  },

  contact: {
    eyebrow: 'hello@muqun.dev',
    heading: 'Still stuck?',
    lead: 'Tell us what happened and we will work it out with you.',
  },
};

// TODO(i18n): English until translated
export const userGuide: Record<SiteLocale, UserGuide> = {
  en,
  'zh-CN': en,
  'zh-TW': en,
  ja: en,
  ko: en,
  th: en,
  vi: en,
  de: en,
  fr: en,
  es: en,
  pt: en,
  ru: en,
};
