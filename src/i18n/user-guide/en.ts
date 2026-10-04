import type { UserGuide } from './types';

export const en: UserGuide = {
  metaTitle: 'Muqun User Guide & Reference',
  metaDescription:
    'Complete guide to installing the Gateway, pairing your phone, workspaces, terminal controls, coding agents (OpenCode, DeepSeek Harness, T3 Code), themes, and troubleshooting.',
  hero: {
    badge: 'USER GUIDE · REFERENCE MANUAL',
    heading: 'Everything you need to keep your machine in reach.',
    lead: 'Muqun connects your phone directly to your own computer or server. Learn how to install and configure the Gateway, navigate terminal workspaces, set up and drive your coding agents — OpenCode, DeepSeek Harness and T3 Code, install themes, and troubleshoot connections.',
    startCta: 'Get started ↓',
    diagnosticsCta: 'Diagnostics ↓',
    issueCta: 'Open an issue',
  },
  contentsLabel: 'On this page',
  contents: [
    {
      id: 'get-started',
      label: 'Get started',
      nav: 'start',
      meta: 'procedure · ~5 min',
      desc: 'Install the Gateway, choose start mode, QR pairing, and tailnet setup.',
    },
    {
      id: 'terminal',
      label: 'The terminal',
      nav: 'terminal',
      meta: 'tmux · herdr',
      desc: 'Workspaces, groups, panels, custom key row, and mobile developer tools.',
    },
    {
      id: 'agents',
      label: "Agents",
      nav: "agents",
      meta: "opencode · deepseek · t3",
      desc: "Agent sessions versus terminals, the three agents 3.1 supports, and setting each up on the host.",
    },
    {
      id: 'opencode',
      label: 'The OpenCode agent',
      nav: 'opencode',
      meta: 'autonomous agent',
      desc: 'Local agent service, models, tool calls with diffs, and permission forms.',
    },
    {
      id: 'gateway',
      label: 'Configuring the Gateway',
      nav: 'gateway',
      meta: 'config.json reference',
      desc: 'Configuration keys, ports, service modes, autostart, and manager shortcuts.',
    },
    {
      id: 'themes',
      label: 'Themes',
      nav: 'themes',
      meta: '24 bundled packs',
      desc: 'Visual themes, .muqun-theme package format, opacity sliders, and authoring.',
    },
    {
      id: 'troubleshooting',
      label: 'Troubleshooting',
      nav: 'debug',
      meta: 'diagnostics & checks',
      desc: 'Quick connection checks, pairing errors, expired codes, and common remedies.',
    },
    {
      id: 'contact',
      label: 'Contact',
      nav: 'contact',
      meta: 'github · issues',
      desc: 'Bug reporting checklist, safe reporting guidelines, and privacy policy.',
    },
  ],

  getStarted: {
    eyebrow: 'muqun-gateway',
    heading: 'Install the Gateway, then pair your phone.',
    lead: 'Muqun talks to one program on your own computer: the Gateway. You install it there, start it, and pair the phone with it once. There is no account to make and nothing of yours passes through us.',
    steps: [
      {
        title: 'Run the installer on your computer',
        body: 'It puts a single binary at ~/.local/bin/muqun-gateway, configures it, and opens the pairing screen on a first run. macOS and Linux; Windows is not supported yet.',
        commands: [{ code: 'curl -fsSL https://muqun.dev/gateway.sh | sh', label: 'install' }],
      },
      {
        title: 'Start it, one of two ways',
        body: 'Either you start it yourself, or you hand it to the machine to keep alive. Both leave you with a running Gateway; they differ in what happens when you reboot.',
        commands: [
          {
            code: 'muqun-gateway start',
            label: 'direct',
            detail:
              'Runs in the background, and keeps running after you close the terminal — until the machine restarts. muqun-gateway stop ends it.',
          },
          {
            code: 'muqun-gateway service install',
            label: 'service',
            detail:
              'Registers it with your own user’s init system — a systemd user unit on Linux, a LaunchAgent on macOS. It starts at login and comes back after a crash or a reboot. muqun-gateway service uninstall removes the registration and keeps your pairings.',
          },
        ],
        note: 'Pick one, never both: with the service installed, stop is undone by the supervisor.',
      },
      {
        title: 'Open the pairing manager',
        body: 'Either way of starting it, this is the next step. The manager is a full-screen panel in your terminal showing the QR code, what is running, and every device that currently holds a token. The installer opens it for you the first time; this is how you get back to it.',
        commands: [{ code: 'muqun-gateway manage', label: 'pair' }],
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
    networkBadge: 'RECOMMENDED PRIVATE NETWORK',
    networkHeading: 'Use Tailscale on both devices.',
    networkBody:
      'We strongly recommend putting your phone and the Gateway computer on the same Tailscale tailnet. It avoids router port forwarding and keeps the Gateway off the public internet. Tailscale Serve can add a private HTTPS address; do not use Tailscale Funnel for Muqun.',
  },

  agents: {
    eyebrow: "muqun-gateway agent",
    heading: "Agents.",
    lead: "A terminal is a shell you type into. An agent session is a conversation with a coding agent running on your computer — OpenCode, DeepSeek Harness or T3 Code — which the app draws as messages, tool cards and questions rather than as a screen of text. Both go through the same Gateway and the same pairing; they differ in what the Gateway talks to on your behalf.",
    versus: [
      { term: "A terminal", detail: "tmux or Herdr on the host. The app shows what the pane shows, and the keys you send are the keys the program receives — so any program works, including agents that live in a terminal, such as Claude Code and Codex." },
      { term: "An agent session", detail: "An agent the Gateway talks to over its own API. Every session belongs to one agent and always goes back to it. The workbench — modes, models, slash commands, skills, attachments, undo, compaction, background runs — shows only what that agent supports." },
    ],
    supportedHeading: "The agents 3.1 supports",
    supported: [
      { name: "OpenCode", id: "opencode", detail: "OpenCode needs no setup. The Gateway adopts an OpenCode service that is already running, or starts one itself; it needs OpenCode 2. Every part of the workbench is there." },
      { name: "DeepSeek Harness", id: "deepseek", detail: "DeepSeek Harness is off until you enable it. Start the Harness on the host, then point the Gateway at it. Its modes are its own presets, chosen when a session starts, and attachments reach it as files on the host." },
      { name: "T3 Code", id: "t3", detail: "T3 Code is off until the Gateway holds a credential for it. The Gateway pairs with T3 once and keeps that credential. It takes attachments, approvals and undo — a T3 undo rolls back whole turns, so the app asks before applying it." },
    ],
    cliHeading: "Set them up from the command line",
    cliBody: "On the computer running the Gateway. muqun-gateway agent checks each agent from your shell and prints its status, version and address, with the next step for any that is not ready. It exits non-zero while an enabled agent is not usable, so a script can check it too.",
    commands: [
      { code: "muqun-gateway agent", label: "status", detail: "Every agent’s status, with the next step to take." },
      { code: "muqun-gateway agent setup t3", label: "t3", detail: "Pairs T3 Code. On the same machine it issues a credential with t3 auth session issue — add --base-dir if T3 keeps its data somewhere else. For a T3 on another host, run t3 pair there and pass the code with --token CODE." },
      { code: "muqun-gateway agent setup deepseek", label: "deepseek", detail: "Finds a running DeepSeek Harness and enables it. It looks on ports 3080 and 19387; pass --endpoint URL if the Harness is elsewhere." },
      { code: "muqun-gateway agent setup opencode", label: "opencode", detail: "Changes nothing. It shows which OpenCode binary the Gateway would use and its version — it needs 2.x." },
    ],
    restartNote: "setup writes config.json and says whether the running Gateway has to restart to see the change. A Gateway installed as a service is restarted for you after a confirmation (--yes skips it); otherwise, restart it yourself.",
    manualHeading: "By hand, in config.json",
    manualBody: "The same settings, for when you would rather write them yourself. Add the blocks you need, then restart the Gateway. A code from t3 pair goes in pairing_token; on its next start the Gateway exchanges it once and no longer needs it. opencode.binary is only for pinning a particular OpenCode.",
    credentialNote: "The T3 credential lives in t3-credential.json in the Gateway’s state directory — ~/.local/share/muqun-gateway/ on Linux — readable only by you. If T3 revokes it or it expires, run agent setup t3 again.",
    phoneHeading: "On the phone",
    entries: [
      { term: "One tile per agent", detail: "Home shows a tile for each agent the Gateway reports, with the one you used last first. Past three, the rest are under More agents. When more than one is ready, New session asks which." },
      { term: "Questions arrive as pushes", detail: "When a session — a subagent’s included — asks you to fill in a form, every paired phone gets one notification that the agent needs your input. Permission requests push as before." },
      { term: "Needs setup", detail: "The Gateway can see the agent but holds no credential for it. The tile opens a guide with the exact command to run on the host — for T3 Code, t3 pair." },
      { term: "Needs update", detail: "The agent speaks a newer protocol than this Gateway knows. Update the Gateway on that computer by re-running the install command." },
      { term: "Not installed, Offline", detail: "The agent is not on the host, or is not running. The tile says which and opens a start guide written for that agent." },
      { term: "Older Gateways", detail: "A Gateway before 0.13 does not offer multi_agent, so the app stays in single-agent mode with OpenCode and says where a feature needs a newer Gateway." },
    ],
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
          'On by default: the Gateway starts OpenCode itself when it cannot find one already running. Set "opencode": { "autostart": false } to leave that to you.',
      },
      {
        term: 'opencode.binary',
        detail:
          'Which OpenCode to start. Left out, the Gateway uses the OpenCode in ~/.opencode/bin, or the one on your PATH. Set it to pin a particular binary — the usual reason being a service that cannot see the PATH your login shell has.',
      },
      { term: "deepseek", detail: "DeepSeek Harness. Attached only when enabled is true or an endpoint is given; token and secret if your Harness needs them. The Gateway never scans ports for it." },
      { term: "t3", detail: "T3 Code. enabled, url (http://127.0.0.1:3773 by default), and either pairing_token from t3 pair or a token you already hold. runtime_mode sets its permission policy; full-access by default." },
    ],
    portsHeading: 'Ports',
    portsRows: [
      { term: 'Default', detail: 'One TCP port, 23847.' },
      { term: 'Change it', detail: 'muqun-gateway setup --port N, then restart it.' },
      {
        term: 'What it binds',
        detail:
          '127.0.0.1 when the address it publishes is a loopback one, 0.0.0.0 otherwise.',
      },
      {
        term: 'On a tailnet',
        detail: 'Nothing to forward on your router, which is why we recommend one.',
      },
    ],
    modesHeading: 'Two ways to keep it running',
    modes: [
      {
        title: 'Start it yourself',
        label: 'direct',
        code: 'muqun-gateway start',
        rows: [
          { term: 'Starts', detail: 'When you run it.' },
          { term: 'Stops', detail: 'muqun-gateway stop, or a reboot.' },
          { term: 'Survives a reboot', detail: 'No.' },
          { term: 'Undo', detail: 'Nothing to undo.' },
        ],
      },
      {
        title: 'As a service',
        label: 'service',
        code: 'muqun-gateway service install',
        rows: [
          { term: 'Starts', detail: 'At login, and again after a crash.' },
          { term: 'Stops', detail: 'Only when you uninstall it.' },
          { term: 'Survives a reboot', detail: 'Yes.' },
          { term: 'Undo', detail: 'service uninstall. Pairings are kept.' },
        ],
      },
    ],
    modesNote:
      'A systemd user unit on Linux, a LaunchAgent on macOS. Never root, never outside your home directory.',
    autostartHeading: 'How OpenCode gets started',
    autostartSteps: [
      'It looks for an OpenCode service already running and healthy, reading the address OpenCode publishes in ~/.local/state/opencode/service.json.',
      'Found one? It attaches to that, and your own opencode serve keeps its sessions.',
      'Otherwise it starts opencode serve --service itself and watches it. It re-reads that file as it goes, so an OpenCode that comes back on a new port is picked up again on its own.',
    ],
    autostartNote:
      'No OpenCode on the machine? Nothing attaches, and only the agent screen notices — the terminal is unaffected.',
    autostartOffLabel: 'config.json',
    autostartOff: '"opencode": { "autostart": false }',
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
          'Swipe the title pill at the top sideways to change workspace. The chips above the composer move between the terminals of the group you are in. For anything further — another group, another workspace — open the panels sheet and pick the terminal you want.',
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
        detail: "The git view for the directory the pane is in, the same sheet an agent session uses — see The Changes sheet below. The button carries the number of changed files, and appears only when the pane is inside a git checkout and the Gateway can serve diffs.",
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
    changes: {
      heading: "The Changes sheet",
      lead: "Terminal panes and agent sessions share one Changes sheet. It runs git on the host, in the directory of the pane or the session.",
      entries: [
        { term: "The tree", detail: "Changed files as a folder tree, with a file count and line totals. Long names are shortened in the middle so the extension stays visible, and deep folders stop indenting after three levels." },
        { term: "Scope", detail: "The menu at the top switches between Uncommitted changes and Compared with the branch’s base — the merge-base with origin/HEAD, or else main or master." },
        { term: "Patches load when you open a file", detail: "The list carries no diffs, so a large change opens quickly. Show more context widens the patch you are reading." },
        { term: "Discard", detail: "On a file’s … menu, after a confirmation: a tracked file is restored, an untracked one deleted. The Gateway refuses when the repository is your home directory, and for any path that leads out of the repository — a symlink pointing outside it included." },
        { term: "On an older Gateway", detail: "Comparing with the base and Discard in a terminal need a Gateway that offers pane_vcs_files. Without it, the terminal sheet shows the same tree of uncommitted changes and nothing more." },
      ],
    },
    keyboard: {
      heading: "The Pad keyboard and extended keys",
      lead: "On a tablet the on-screen keyboard is a whole keyboard: a function-key strip you can hide, a number row, sticky ctrl, alt and shift (double-tap to lock), and Home, End, Page Up and Page Down over the arrows. Chords outside the classic set — Ctrl+Enter, Shift+Enter, Ctrl+arrows, Alt+letters, F-keys — are sent only when the Gateway says it can deliver them.",
      entries: [
        { term: "Keys it cannot send", detail: "A key the Gateway cannot deliver is drawn muted and says so when pressed. Holding a modifier dims what that combination cannot reach, and a refused chord still uses up a one-tap modifier." },
        { term: "Herdr", detail: "Delivers every chord. Nothing to set." },
        { term: "tmux", detail: "tmux 3.2 or newer with extended-keys on, and the program in the pane must ask for extended keys. Ctrl+Enter and Shift+Enter also need extended-keys-format csi-u." },
        { term: "Codex and Claude Code", detail: "Codex under tmux gets no Shift+Enter: use ⌃J for a new line. Claude Code takes \\ followed by Enter for a new line." },
      ],
      persistNote: "Those two take effect at once and last until the tmux server exits. To keep them, put the same two lines, without the leading tmux, in ~/.tmux.conf.",
    },
    note: 'Muqun only ever observes: opening a session does not re-lay-out your windows, and closing the app does not stop anything.',
  },

  opencode: {
    eyebrow: 'opencode serve --service',
    heading: 'The OpenCode agent.',
    lead: 'A screen built for OpenCode rather than a terminal with an agent in it: sessions you can switch between, tool calls as cards with the real diff inside them, and the agent’s questions arriving as something you answer with a tap.',
    noSignInBadge: 'LOCAL RUNTIME · ZERO ACCOUNT',
    noSignInHeading: 'Your computer talks directly to your model provider.',
    noSignIn:
      'There is no sign-in. Muqun has no account and asks for no API key, because it is not the thing talking to your model provider — OpenCode on your own computer is. You configure providers, models, agents and skills there, the way you already do, and the Gateway passes no credential route through at all.',
    prerequisitesHeading: 'What it needs',
    prerequisites: [
      'OpenCode 2.x installed on the same computer as the Gateway.',
      'At least one provider configured in OpenCode itself. Free models exist, and the model picker has a Free only filter for finding them.',
      'The OpenCode service running. The Gateway starts it for you by default, and attaches to one you started yourself.',
      'A Gateway new enough to offer the agent surface. Without it the OpenCode button is simply not there, and the terminal is unaffected.',
    ],
    entries: [
      {
        term: 'Sessions and subagents',
        detail:
          'Each session is a conversation with its own context, and they are listed per project or across all of them. A session that starts a subagent shows it indented underneath, so a task that fanned out is still one thing you can read.',
      },
      {
        term: 'Projects',
        detail:
          'Switch the directory the agent works in, or type a path to open a new one. Picking a project reopens its most recent session rather than starting a fresh one.',
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
          'Send a photo, something from the library, or any file. Images are re-encoded on the way out, which drops their EXIF. Type @ to point the agent at a file in the project instead of describing it.',
      },
      {
        term: 'Permissions and questions',
        detail:
          'When the agent wants to run a command, write a file or read outside the project, the card says which and you answer Allow, Always allow or Deny — the same three words on the notification, so it can be answered from the lock screen. Questions the agent asks come through as a small form to fill in. Auto-approve every action exists for when you are watching; irreversibly destructive commands stay blocked even then.',
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
          '/undo rolls the project back to before your last message; /redo cancels a rollback you have not kept. It is a command rather than a button, on purpose.',
      },
    ],
    note: 'Tool calls arrive as cards: an edit shows its unified diff inline, the same way the Changes viewer draws it.',
  },

  themes: {
    eyebrow: 'muqun.dev/themes',
    heading: 'Themes.',
    lead: 'A theme repaints the app and the terminal together, and every pack has a light half and a dark one. Twenty-four ship with the app; more live in the community catalogue.',
    entries: [
      {
        term: 'The packs that ship',
        detail:
          'Twenty-four, under Settings → Appearance → Theme, including Catppuccin, Gruvbox, Kanagawa, Rosé Pine, Tokyo Night and Everforest. Colour mode — System, Light or Dark — picks which half of the pack you see, not which pack it is.',
      },
      {
        term: 'Browsing the catalogue',
        detail:
          'Browse themes reads the catalogue published here on muqun.dev. Nothing downloads until you open a row, and the package size is on the row before you do.',
      },
      {
        term: 'What a theme is, as a file',
        detail:
          'A .muqun-theme is a zip holding one theme.json and an assets folder of PNG, JPEG or WebP images — nothing else is allowed inside. A .muqun-theme.json is the same manifest without the images, for a theme that is only colours.',
      },
      {
        term: 'What the manifest covers',
        detail:
          'Seventeen interface colours per mode; the terminal’s background, foreground, cursor, link and selection plus all sixteen ANSI slots; artwork for eleven surfaces, from the shell background to the Home hero; up to three custom icons — back, send and attach; and a starting opacity for the interface and the terminal. A light half and a dark half are both required. No fonts, no SVG and no animation.',
      },
      {
        term: 'Its limits',
        detail:
          'A manifest up to 256 KiB, up to 32 images at 8 MiB each, and 25 MiB for the packed theme.',
      },
      {
        term: 'Installing one from a file',
        detail:
          'Open a .muqun-theme from Files, AirDrop or a share sheet and Muqun offers it, or use Import file in the theme sheet. A file that is not a theme is refused rather than half-applied.',
      },
      {
        term: 'Installing one from a link',
        detail:
          'Import link takes a public theme URL, or a GitHub repository — the only repository host supported — where you can pin a branch or commit and name the theme file if it is not theme.json at the root. The review card names the host the images come from before anything downloads.',
      },
      {
        term: 'Installing one from a terminal',
        detail:
          'Tap a .muqun-theme path in terminal output and a card offers to preview it: nothing is applied until you say so.',
      },
      {
        term: 'Preview before apply',
        detail:
          'Every route ends the same way. The theme downloads, unpacks and prepares its images, then the whole app puts it on so you can look around. Your current theme is untouched until you tap Apply theme.',
      },
      {
        term: 'Background opacity',
        detail:
          'A theme of your own carries two sliders: Interface background opacity, which changes coloured backgrounds but not text, icons or artwork, and Terminal background opacity, which shows the app background behind terminal text. Both run the full range, and below the recommended floor the app warns that text is no longer guaranteed to stay readable rather than stopping you. Built-in packs do not have them.',
      },
      {
        term: 'Making one',
        detail:
          'There is no colour editor in the app: a theme is authored as a file. Muqun ships a skill for writing one, so you can describe the look you want to your agent — the Create a Muqun theme quick action starts it — and get back a manifest, the artwork and a packed theme you can import.',
      },
      {
        term: 'Publishing one',
        detail:
          'The catalogue is a repository that takes pull requests: open one with your src/<id> folder, and once it is merged CI packs it and it appears on muqun.dev within minutes. The toolchain scaffolds a theme and checks its contrast before you send it.',
      },
      {
        term: 'Removing one',
        detail:
          'Remove it from its row in the theme list and confirm; it goes from this device. Settings → Storage has Remove unused themes for clearing out everything you are no longer wearing.',
      },
    ],
    galleryLink: 'Browse the theme catalogue',
  },

  troubleshooting: {
    eyebrow: 'when it does not connect',
    heading: 'When something does not work.',
    lead: 'Almost everything here is one of four things: the Gateway is not running, the phone cannot reach its address, the pairing is gone, or OpenCode is not up on the host.',
    checksHeading: 'Quick checks',
    checks: [
      {
        term: 'Pair a computer',
        detail:
          'Install the Gateway on a computer you own — it works with tmux or Herdr — open its manager panel, then scan the pairing QR in Muqun. The confirmation code shown on the computer finishes pairing.',
      },
      {
        term: 'Fix a connection',
        detail:
          'Check that tmux, or Herdr 0.7.5 or later, and the latest Gateway are running. Confirm the phone and computer can reach the same private address, then reopen the server in Muqun.',
      },
      {
        term: 'Remove a device',
        detail:
          'Delete a server from the Muqun home screen to revoke this phone from that Gateway. You can also revoke any paired device from the Gateway manager panel.',
      },
      {
        term: 'Restore notifications',
        detail:
          'Enable notifications for Muqun in your phone’s system settings and in Muqun Settings. Reopen the paired server so Muqun can register the current device token with your Gateway.',
      },
    ],
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
          'The agent screen says OpenCode service offline and tells you to run opencode serve --service on the host. Run it, then tap Check again. If it is already running and still not found, the Gateway is usually looking at a different binary from the one you started: set opencode.binary in config.json to the full path and restart the Gateway.',
      },
      {
        term: 'A model is greyed out, or there are no free ones',
        detail:
          'Set up on the host means that provider is not configured in OpenCode — configure it there and reopen the picker. No free models on this host means the Free only filter matched nothing, not that something is wrong; turn the filter off to see everything your providers offer. Muqun shows an estimated cost per session but does not charge anything and does not stand between you and your provider.',
      },
      {
        term: 'The agent wants to leave the project',
        detail:
          'Read outside the project and Write outside the project are what they sound like, and the path is on the card. Allow is once, Always allow remembers it, Deny refuses. This prompt is doing its job — it is worth reading the path before answering.',
      },
      {
        term: 'The Changes button is missing',
        detail: "It appears only when the terminal is inside a git checkout and the Gateway is new enough to serve diffs. Comparing with the base and Discard need Gateway 0.13 or newer. Upgrade by re-running the install command.",
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
      { term: "Terminal unavailable", detail: "The Gateway is up but no terminal backend is running — tmux installed with no tmux server, or Herdr not started. The screen lists the Gateway’s backends and their state; start one and the terminal appears on its own. Agent sessions keep working meanwhile." },
      { term: "This terminal can’t send ⌃↵", detail: "The Gateway refused a chord. On tmux, run tmux set -s extended-keys on, and for Ctrl+Enter also tmux set -s extended-keys-format csi-u. The hint under the message repeats the Gateway’s own explanation." },
      { term: "An agent tile says Needs setup or Needs update", detail: "Run muqun-gateway agent on the host: it names the next step for each agent. Needs update means this Gateway is older than the agent’s protocol — re-run the install command." },
    ],
  },

  contact: {
    eyebrow: 'github · issues',
    heading: 'Still stuck?',
    lead: 'Open an issue. It is where the next version comes from, and it is read.',
    reportHint:
      'Include the app version, the Gateway version, and what you did just before it went wrong.',
    issueCta: 'Open an issue on GitHub',
    safetyHeading: 'Privacy and safe reporting',
    safetyBody:
      'Support never needs your access token, full terminal output, source code, or pairing QR. Remove secrets before attaching screenshots or logs.',
    safetyLink: 'Read the privacy policy',
  },
};
