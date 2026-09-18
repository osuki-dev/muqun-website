import type { UserGuide } from './types';

export const de: UserGuide = {
  metaTitle: 'Muqun Benutzerhandbuch & Referenz',
  metaDescription:
    'Vollständige Anleitung zu Gateway-Installation, Handy-Kopplung, Workspaces, Terminal-Bedienelementen, OpenCode-Agent, Themes und Fehlerdiagnose.',
  hero: {
    badge: 'BENUTZERHANDBUCH · REFERENZMANUAL',
    heading: 'Alles, was du brauchst, um deinen Rechner stets griffbereit zu haben.',
    lead: 'Muqun verbindet dein Smartphone direkt mit deinem eigenen Rechner oder Server. Erfahre, wie du das Gateway installierst und einrichtest, Terminal-Workspaces bedienst, den autonomen OpenCode-Agenten steuerst, Themes installierst und Verbindungsfehler behebst.',
    startCta: 'Erste Schritte ↓',
    diagnosticsCta: 'Fehlerdiagnose ↓',
    issueCta: 'Issue eröffnen',
  },
  contentsLabel: 'Auf dieser Seite',
  contents: [
    {
      id: 'get-started',
      label: 'Erste Schritte',
      nav: 'Start',
      meta: 'Ablauf · ca. 5 Min.',
      desc: 'Gateway installieren, Startmodus wählen, QR-Kopplung und Tailnet-Einrichtung.',
    },
    {
      id: 'terminal',
      label: 'Das Terminal',
      nav: 'Terminal',
      meta: 'tmux · herdr',
      desc: 'Workspaces, Gruppen, Panels, mobile Tastenleiste und Entwickler-Tools.',
    },
    {
      id: 'opencode',
      label: 'Der OpenCode-Agent',
      nav: 'Agent',
      meta: 'Autonomer Agent',
      desc: 'Lokaler Agent-Dienst, Modelle, Tool-Aufrufe mit Inline-Diffs und Freigaben.',
    },
    {
      id: 'gateway',
      label: 'Gateway-Konfiguration',
      nav: 'Gateway',
      meta: 'config.json Referenz',
      desc: 'Konfigurationsschlüssel, Ports, Dienstmodi, Autostart und Manager-Tastenkürzel.',
    },
    {
      id: 'themes',
      label: 'Themes',
      nav: 'Themes',
      meta: '24 mitgelieferte Packs',
      desc: 'Visuelle Themes, .muqun-theme Paketformat, Deckkraft-Regler und Erstellung.',
    },
    {
      id: 'troubleshooting',
      label: 'Fehlerbehebung',
      nav: 'Diagnose',
      meta: 'Diagnose & Prüfungen',
      desc: 'Schnellprüfungen, Kopplungsfehler, abgelaufene Codes und häufige Abhilfen.',
    },
    {
      id: 'contact',
      label: 'Kontakt',
      nav: 'Kontakt',
      meta: 'github · issues',
      desc: 'Issue-Checkliste, Richtlinien zur sicheren Meldung und Datenschutz.',
    },
  ],

  getStarted: {
    eyebrow: 'muqun-gateway',
    heading: 'Installiere das Gateway und kopple dein Handy.',
    lead: 'Muqun kommuniziert mit einem einzigen Programm auf deinem eigenen Rechner: dem Gateway. Du installierst es dort, startest es und koppelst das Smartphone einmalig. Es gibt kein Benutzerkonto und nichts von dir passiert unsere Server.',
    steps: [
      {
        title: 'Starte das Installationsskript auf deinem Rechner',
        body: 'Es legt eine einzelne Binärdatei unter ~/.local/bin/muqun-gateway ab, konfiguriert sie und öffnet beim ersten Start den Kopplungsbildschirm. Für macOS und Linux; Windows wird derzeit noch nicht unterstützt.',
        commands: [{ code: 'curl -fsSL https://muqun.dev/gateway.sh | sh', label: 'install' }],
      },
      {
        title: 'Starte es auf eine von zwei Arten',
        body: 'Entweder startest du es selbst oder übergibst es dem Betriebssystem zur permanenten Überwachung. Beide Wege führen zu einem laufenden Gateway; der Unterschied liegt im Verhalten bei einem Neustart.',
        commands: [
          {
            code: 'muqun-gateway start',
            label: 'direct',
            detail:
              'Läuft im Hintergrund und bleibt auch nach dem Schließen des Terminals aktiv — bis der Rechner neu startet. muqun-gateway stop beendet es.',
          },
          {
            code: 'muqun-gateway service install',
            label: 'service',
            detail:
              'Registriert es beim Init-System deines Benutzers — als systemd-User-Unit unter Linux oder LaunchAgent unter macOS. Startet bei der Anmeldung und kehrt nach einem Absturz oder Neustart automatisch zurück. muqun-gateway service uninstall entfernt die Registrierung und behält Kopplungen bei.',
          },
        ],
        note: 'Wähle genau eine Option: Wenn der Dienst installiert ist, wird ein manuelles stop vom Supervisor sofort wieder rückgängig gemacht.',
      },
      {
        title: 'Öffne das Verwaltungsfenster',
        body: 'Ganz gleich, wie du es gestartet hast: Das ist der nächste Schritt. Der Manager ist ein Vollbild-Panel in deinem Terminal, das den QR-Code, aktive Prozesse und jedes aktuell berechtigte Gerät anzeigt. Der Installer öffnet ihn beim ersten Mal automatisch; mit diesem Befehl kehrst du dorthin zurück.',
        commands: [{ code: 'muqun-gateway manage', label: 'pair' }],
      },
      {
        title: 'Scanne den QR-Code und tippe den Code ein',
        body: 'Scanne den QR-Code in Muqun. Der Rechner zeigt daraufhin einen kurzen Code im Format XXXX-XXXX an; die Eingabe in der App schließt die Kopplung ab. Das Scannen allein koppelt das Handy noch nicht — der Code beweist, dass die Person mit dem Handy du selbst bist.',
      },
    ],
    requirements: [
      'macOS oder Linux auf einem Rechner, den du selbst verwaltest (Windows wird noch nicht unterstützt).',
      'tmux oder Herdr 0.7.5 oder neuer muss bereits installiert sein — das Gateway steuert eines davon, statt es zu ersetzen.',
      'Beide Geräte im selben privaten Netzwerk. Tailscale ist der empfohlene Weg; verwende Tailscale Serve, niemals Funnel.',
      'Kein Konto, kein Abonnement und kein zwischengeschaltetes Relais von uns.',
    ],
    pairingNote:
      'Kannst du nicht scannen? Gib die Gateway-Adresse in der App manuell ein (der Manager gibt die veröffentlichte Adresse aus) und tippe denselben Bestätigungscode ein.',
    codeNote:
      'Der Code ist fünf Minuten gültig und verfällt nach acht Fehlversuchen. Drücke im Manager p, um einen frischen QR-Code und Bestätigungscode zu generieren.',
    networkBadge: 'EMPFOHLENES PRIVATES NETZWERK',
    networkHeading: 'Nutze Tailscale auf beiden Geräten.',
    networkBody:
      'Wir empfehlen dringend, dein Handy und den Gateway-Rechner in dasselbe Tailscale-Tailnet zu holen. Das erspart Portfreigaben im Router und hält das Gateway aus dem öffentlichen Internet heraus. Tailscale Serve kann eine private HTTPS-Adresse ergänzen; nutze Tailscale Funnel nicht für Muqun.',
  },

  gateway: {
    eyebrow: 'config.json',
    heading: 'Das Gateway konfigurieren.',
    lead: 'Die meisten Benutzer müssen die Konfiguration nie manuell öffnen. Sie existiert für Sonderfälle: ein anderer Port, ein Gateway, das Neustarts überleben soll, oder wenn OpenCode an einem unüblichen Pfad liegt.',
    configHeading: 'Die Konfigurationsdatei',
    configBody:
      'Sie ist im JSON-Format verfasst und wird beim Setup automatisch erzeugt. Bearbeite sie nur von Hand, wenn du einen der unten stehenden Schlüssel anpassen musst, und starte das Gateway danach neu — die Konfiguration wird nur beim Start eingelesen. Unter macOS liegt die Datei unter ~/Library/Application Support/muqun-gateway/. Daneben liegt pairing.json; gekoppelte Geräte, Push-Tokens und Logs befinden sich im Statusverzeichnis ~/.local/share/muqun-gateway/.',
    configPathLabel: 'linux',
    configPath: '~/.config/muqun-gateway/config.json',
    configKeys: [
      { term: 'label', detail: 'Der Name, den die App für diesen Rechner anzeigt.' },
      {
        term: 'listen',
        detail:
          'Der Socket, an den gebunden wird (Host und Port). Standard ist 0.0.0.0:23847, oder Loopback, wenn die veröffentlichte Adresse eine Loopback-Adresse ist.',
      },
      {
        term: 'public_url',
        detail:
          'Die im Kopplungs-QR codierte Adresse — das, was das Handy tatsächlich anruft. Ändere sie vorzugsweise im Manager mit u statt von Hand.',
      },
      {
        term: 'transport_encryption',
        detail:
          'Transportverschlüsselung, standardmäßig auf required (erforderlich). Geräte behalten den Modus, in dem sie gekoppelt wurden; Änderungen wirken sich erst auf künftig gekoppelte Geräte aus.',
      },
      {
        term: 'sessions',
        detail:
          'Die Terminal-Backends, die dieses Gateway einbindet — tmux, Herdr oder beide gleichzeitig. Wird über muqun-gateway backend verwaltet.',
      },
      {
        term: 'autostart_backends',
        detail:
          'Welche davon mit dem Gateway gestartet werden sollen. Standardmäßig leer, um unbeabsichtigte Serverstarts zu vermeiden.',
      },
      {
        term: 'rich_agent_pushes',
        detail:
          'Standardmäßig aus. Wenn aktiv, fließen Agent-Fragen und Optionen direkt in den Benachrichtigungstext ein — was Terminaltext auf den Sperrbildschirm und über Apple/Google-Server leitet.',
      },
      {
        term: 'opencode.autostart',
        detail:
          'Standardmäßig aktiv: Das Gateway startet OpenCode selbst, wenn es keinen laufenden Dienst findet. Mit "opencode": { "autostart": false } abschaltbar.',
      },
      {
        term: 'opencode.binary',
        detail:
          'Welche OpenCode-Binärdatei gestartet werden soll. Falls weggelassen, wird OpenCode in ~/.opencode/bin oder im System-PATH gesucht.',
      },
    ],
    portsHeading: 'Ports & Bindung',
    portsRows: [
      { term: 'Standard', detail: 'Ein TCP-Port: 23847.' },
      { term: 'Ändern', detail: 'muqun-gateway setup --port N ausführen und neu starten.' },
      {
        term: 'Bindung',
        detail:
          '127.0.0.1 wenn die publizierte Adresse Loopback ist, andernfalls 0.0.0.0.',
      },
      {
        term: 'Im Tailnet',
        detail: 'Keine Portweiterleitung im Router erforderlich — daher unsere Empfehlung.',
      },
    ],
    modesHeading: 'Zwei Wege zur permanenten Ausführung',
    modes: [
      {
        title: 'Selbst im Hintergrund starten',
        label: 'direct',
        code: 'muqun-gateway start',
        rows: [
          { term: 'Startet', detail: 'Wenn du den Befehl ausführst.' },
          { term: 'Stoppt', detail: 'muqun-gateway stop oder bei Rechner-Neustart.' },
          { term: 'Übersteht Neustart', detail: 'Nein.' },
          { term: 'Rückgängig', detail: 'Nichts nötig, einfach stop.' },
        ],
      },
      {
        title: 'Als Systemdienst registrieren',
        label: 'service',
        code: 'muqun-gateway service install',
        rows: [
          { term: 'Startet', detail: 'Bei Anmeldung und nach Abstürzen automatisch.' },
          { term: 'Stoppt', detail: 'Nur bei service uninstall.' },
          { term: 'Übersteht Neustart', detail: 'Ja.' },
          { term: 'Rückgängig', detail: 'service uninstall (Kopplungen bleiben erhalten).' },
        ],
      },
    ],
    modesNote:
      'Eine systemd-User-Unit unter Linux, ein LaunchAgent unter macOS. Niemals root, niemals außerhalb deines Home-Verzeichnisses.',
    autostartHeading: 'Wie OpenCode gestartet wird',
    autostartSteps: [
      'Das Gateway prüft, ob bereits ein intakter OpenCode-Dienst läuft, indem es die Adresse in ~/.local/state/opencode/service.json ausliest.',
      'Gefunden? Es dockt direkt daran an, und deine eigene opencode serve-Sitzung bleibt unberührt.',
      'Andernfalls startet es opencode serve --service selbst und überwacht den Prozess. Startet OpenCode auf einem neuen Port neu, wird dies automatisch erkannt.',
    ],
    autostartNote:
      'Kein OpenCode auf dem Rechner? Dann dockt nichts an; nur die Agent-Ansicht zeigt Offline, das Terminal bleibt völlig unbeeinträchtigt.',
    autostartOffLabel: 'config.json',
    autostartOff: '"opencode": { "autostart": false }',
    managerHeading: 'Das Verwaltungsfenster',
    managerBody:
      'Wird mit muqun-gateway manage geöffnet. Es listet aktive Prozesse und berechtigte Geräte auf und bietet folgende Tastenkürzel:',
    managerKeys: [
      { term: 'p', detail: 'Kopplungs-QR-Code erneut anzeigen, um ein weiteres Gerät hinzuzufügen.' },
      { term: 'x', detail: 'Zugriffsberechtigung für ein Gerät widerrufen.' },
      { term: 'u', detail: 'Im QR codierte Adresse bearbeiten (a führt eine automatische Neu-Erkennung durch).' },
      { term: 's / t', detail: 'Gateway starten oder stoppen, ohne den Manager zu verlassen.' },
      { term: 'm / h', detail: 'tmux- oder Herdr-Backend hinzufügen (f wählt Standard, d entfernt eines).' },
      { term: 'e', detail: 'Verschlüsselungsmodus für künftige Kopplungen ändern.' },
      { term: 'q', detail: 'Manager schließen. Beendet deine Terminalsitzungen niemals.' },
    ],
    capabilitiesHeading: 'Ältere Gateways bleiben kompatibel',
    capabilitiesBody:
      'Die App fragt das Gateway aktiv nach seinen Fähigkeiten, statt diese anhand der Versionsnummer zu erraten, und blendet nicht unterstützte Funktionen nahtlos aus. Ein älteres Gateway bleibt also ein voll funktionsfähiges Terminal. Lediglich die Agent-Kollaboration setzt Herdr 0.9.0 oder neuer in der jeweiligen Sitzung voraus (tmux unterstützt dies nicht).',
    upgradeHeading: 'Aktualisierung',
    upgradeBody:
      'Führe einfach denselben Installationsbefehl erneut aus. Er ersetzt die Binärdatei an Ort und Stelle, behält deine Server-Identität, Adresse, Konfiguration und alle Kopplungen bei. Falls du den Dienst installiert hattest, führe danach noch einmal service install aus.',
    logsHeading: 'Protokolle',
    logsBody:
      'Im Direktmodus und unter macOS LaunchAgent schreibt das Gateway nach ~/.local/share/muqun-gateway/gateway.log. Unter Linux mit systemd fließen die Logs ins Journal. Für mehr Details setze vor dem Start MUQUN_LOG=debug (oder RUST_LOG=debug); Standard ist info.',
    logsCommandLabel: 'linux · Dienstmodus',
    logsCommand: 'journalctl --user -u dev.osuki.muqun-gateway',
  },

  terminal: {
    eyebrow: 'workspace · group.panel',
    heading: 'Dein echtes Terminal.',
    lead: 'Kein Screenshot und kein nachträgliches Transkript, sondern dein lebendiges Terminal. Das Gateway steuert tmux oder Herdr auf deinem Rechner und die App zeichnet das Geschehen direkt nach — die Arbeit auf deinem Schreibtisch nimmst du nahtlos in die Hand, und das Schließen der App ändert daran nichts.',
    shotAlt:
      'Ein nvim-Pane mit einer geöffneten TypeScript-Datei, Auswahltasten für Claude Code, nvim und zsh sowie der Tastaturleiste über dem Eingabefeld.',
    entries: [
      {
        term: 'Workspaces, Gruppen und Terminals',
        detail:
          'Drei Ebenen, adressiert als Workspace · Gruppe.Panel. Ein Workspace ist dein Projektverzeichnis, eine Gruppe bündelt Terminals darin, und ein Terminal ist eine Shell. Muqun zeigt jeweils ein Terminal formatfüllend an, ohne den mobilen Bildschirm unleserlich zu spalten.',
      },
      {
        term: 'Navigation zwischen Ebenen',
        detail:
          'Wische über die Titelleiste oben, um den Workspace zu wechseln. Die Chips über dem Eingabefeld wechseln zwischen den Terminals der aktuellen Gruppe. Für alles Weitere öffnest du die Panel-Übersicht.',
      },
      {
        term: 'Aktive Prozesse und Panel-Verwaltung',
        detail:
          'Das Panel-Sheet listet jeden Workspace, jede Gruppe und jedes Terminal auf deinem Rechner auf. Durch langes Drücken öffnest du Aktionen wie das sichere Schließen eines Fensters.',
      },
      {
        term: 'Die Terminal-Tastenleiste',
        detail:
          'Die Leiste über dem Eingabefeld liefert Tasten, die auf Smartphone-Tastaturen fehlen: Esc, Tab, ⌃C, Pfeiltasten sowie kontextabhängige Tasten (Shell-Befehle, ⇧TAB und ⌃O unter Claude Code, :w und gg unter nvim). In nvim führt im Insert-Modus stets Esc. Unter Einstellungen → Terminal abschaltbar.',
      },
      {
        term: 'Das Eingabefeld (Composer)',
        detail:
          'Nichtproportional, mehrzeilig, und die Eingabetaste erzeugt einen Zeilenumbruch — gesendet wird per Button, da versehentlich ausgeführte Befehle vermieden werden müssen.',
      },
      {
        term: 'Frühere Ausgaben nachladen',
        detail:
          'Ziehe vom oberen Rand des Terminals nach unten, um mehr Scrollback zu laden. Sobald du das Live-Ende verlässt, bringt dich ein „Neueste“-Pill sofort zurück. Neue Ausgaben reißen den Bildschirm niemals weg, während du liest.',
      },
      {
        term: 'Änderungen (Changes)',
        detail:
          'Git-Status für das Verzeichnis des aktuellen Fensters: Geänderte Dateien mit Zähler, Filter nach Alle, Staged oder Unstaged sowie vollständige Diffs.',
      },
      {
        term: 'Dateien (Files)',
        detail:
          'Alles, was die Sitzung geschrieben hat — Bilder, Code und Dokumente — durchsuchbar und direkt in der App lesbar.',
      },
      {
        term: 'Im Browser öffnen',
        detail:
          'Tippe den Port deines lokalen Entwicklungsservers ein und Muqun öffnet ihn über die bestehende sichere Verbindung, ohne Freigabe im Internet.',
      },
      {
        term: 'Schnellaktionen (Quick actions)',
        detail:
          'Gespeicherte Befehle, Prompts und Tastenkombinationen, sortiert nach deiner Nutzungshäufigkeit. Frei anpassbar.',
      },
    ],
    note: 'Muqun beobachtet stets sicher: Das Öffnen einer Sitzung verändert deine Fensteranordnung nicht, und das Schließen der App stoppt keine Hintergrundprozesse.',
  },

  opencode: {
    eyebrow: 'opencode serve --service',
    heading: 'Der OpenCode-Agent.',
    lead: 'Ein Interface, das speziell für OpenCode entwickelt wurde, statt ein einfacher Terminal-Chatbot: Schneller Sitzungswechsel, Werkzeugaufrufe als visuelle Karten mit echten Unified Diffs und interaktive Freigaben.',
    noSignInBadge: 'LOKALE LAUFZEIT · KEIN BENUTZERKONTO',
    noSignInHeading: 'Dein Rechner spricht direkt mit deinen Modellanbietern.',
    noSignIn:
      'Kein Login erforderlich. Muqun führt keine Konten und verlangt keine API-Schlüssel. Der Rechner selbst kommuniziert über OpenCode mit deinen KI-Anbietern. Das Gateway leitet keinerlei Anmeldedaten weiter.',
    prerequisitesHeading: 'Voraussetzungen',
    prerequisites: [
      'OpenCode 2.0.1 oder neuer auf demselben Rechner wie das Gateway installiert.',
      'Mindestens ein konfigurierter Modellanbieter in OpenCode (inklusive Filter für kostenlose Modelle).',
      'Laufender OpenCode-Dienst (wird vom Gateway automatisch gestartet oder angebunden).',
      'Ein aktuelles Gateway, das die Agenten-Oberfläche unterstützt.',
    ],
    entries: [
      {
        term: 'Sitzungen und Subagents',
        detail:
          'Jede Sitzung besitzt ihren eigenen Kontext. Wenn ein Task Subagents startet, werden diese eingerückt darunter dargestellt, sodass parallele Arbeitsabläufe übersichtlich bleiben.',
      },
      {
        term: 'Workspaces wechseln',
        detail:
          'Wechsle das Arbeitsverzeichnis des Agenten oder öffne ein neues. Beim Auswählen wird die letzte Sitzung nahtlos fortgesetzt.',
      },
      {
        term: 'Modelle und Agentenrollen',
        detail:
          'Modellübersicht mit Kontextfenstergröße und Hinweisen auf kostenlose Modelle. Schneller Wechsel zwischen Rollen wie Build, Plan, Explore oder eigenen Agenten.',
      },
      {
        term: 'Slash-Befehle und Skills',
        detail:
          'Tippe / im Eingabefeld. Befehle wie /new, /models, /compact, /undo werden direkt beantwortet; andere laufen auf dem Host-Rechner.',
      },
      {
        term: 'Anhänge und @-Erwähnungen',
        detail:
          'Sende Fotos, Bilder oder Dateien. Bilder werden beim Senden neu encodiert, um EXIF-Metadaten zu entfernen. Mit @ referenzierst du Projektdateien direkt.',
      },
      {
        term: 'Berechtigungen und Rückfragen',
        detail:
          'Möchte der Agent Befehle ausführen oder Dateien verändern, entscheidest du per Tippen auf Erlauben, Immer erlauben oder Ablehnen — direkt auch auf dem Sperrbildschirm.',
      },
      {
        term: 'Hintergrundaufgaben & Warteschlange',
        detail:
          'Langwierige Tool-Ausführungen können in den Hintergrund verschoben werden. Neue Eingaben können sofort intervenieren oder für den nächsten Durchlauf eingereiht werden.',
      },
      {
        term: 'Kontext & automatische Verdichtung',
        detail:
          'Echtzeit-Einblick in Kontextfenster-Auslastung, Token-Verbrauch und geschätzte Kosten. Automatische Verlaufskomprimierung wird in der Timeline klar markiert.',
      },
      {
        term: 'Rückgängig machen (Undo)',
        detail:
          '/undo setzt das Arbeitsverzeichnis auf den Zustand vor deiner letzten Nachricht zurück; /redo hebt dies wieder auf. Bewusst als Befehl statt Button umgesetzt.',
      },
    ],
    note: 'Werkzeugaufrufe erscheinen als Karten: Dateiänderungen zeigen ein direktes Unified Diff, genau wie in der Changes-Ansicht.',
  },

  themes: {
    eyebrow: 'muqun.dev/themes',
    heading: 'Themes.',
    lead: 'Themes passen das Aussehen der App und des Terminals synchron an. Jedes Theme-Pack enthält eine helle und eine dunkle Variante. 24 Packs werden mitgeliefert; viele weitere gibt es im Katalog.',
    entries: [
      {
        term: '24 mitgelieferte Packs',
        detail:
          'Unter Einstellungen → Darstellung → Theme, inklusive Catppuccin, Gruvbox, Kanagawa, Rosé Pine, Tokyo Night und Everforest.',
      },
      {
        term: 'Katalog durchstöbern',
        detail:
          'Online-Katalog auf muqun.dev durchsuchen. Der Download startet erst beim Antippen, die Paketgröße wird vorab transparent angezeigt.',
      },
      {
        term: 'Aufbau eines Themes',
        detail:
          'Eine .muqun-theme-Datei ist ein Zip mit einer theme.json und einem assets-Ordner für Grafiken. .muqun-theme.json ist die bildfreie Variante.',
      },
      {
        term: 'Anpassungsumfang',
        detail:
          '17 Schnittstellenfarben je Modus, Terminalfarben für Cursor, Links und alle 16 ANSI-Slots, Grafiken für 11 Oberflächen und 3 benutzerdefinierte Icons.',
      },
      {
        term: 'Dateigrößenlimits',
        detail:
          'Manifest bis 256 KiB, bis zu 32 Bilder mit je max. 8 MiB, maximal 25 MiB für das gesamte Paket.',
      },
      {
        term: 'Aus Datei installieren',
        detail:
          'Öffne eine .muqun-theme-Datei über Dateien, AirDrop oder das Teilen-Menü, oder nutze „Datei importieren“ in der Theme-Auswahl.',
      },
      {
        term: 'Per Weblink installieren',
        detail:
          'Theme-URL oder GitHub-Repository angeben. Vor dem Download zeigt eine Prüfkarte die Host-Domain der Bilddateien an.',
      },
      {
        term: 'Direkt aus dem Terminal installieren',
        detail:
          'Tippe auf einen .muqun-theme-Pfad in der Terminalausgabe, um eine sofortige Vorschau anzuzeigen.',
      },
      {
        term: 'Vorschau vor dem Anwenden',
        detail:
          'Das Theme wird geladen und temporär auf die gesamte App angewendet. Dein bisheriges Theme bleibt unverändert, bis du auf „Theme anwenden“ tippst.',
      },
      {
        term: 'Hintergrund-Deckkraft',
        detail:
          'Zwei Regler für eigene Themes: Deckkraft des UI-Hintergrunds und des Terminal-Hintergrunds für subtile Durchschein-Effekte.',
      },
      {
        term: 'Themes selbst erstellen',
        detail:
          'Themes werden als Dateien verfasst. Mit dem mitgelieferten Agent-Skill beschreibst du einfach das gewünschte Design und erhältst ein fertiges Paket.',
      },
      {
        term: 'Im Katalog veröffentlichen',
        detail:
          'Der Katalog wird auf GitHub per Pull Request gepflegt. Nach dem Merge erscheint dein Theme automatisch auf muqun.dev.',
      },
      {
        term: 'Themes löschen',
        detail:
          'Einfach in der Themenliste zur Seite wischen. Unter Einstellungen → Speicher können ungenutzte Themes mit einem Klick aufgeräumt werden.',
      },
    ],
    galleryLink: 'Theme-Katalog durchstöbern',
  },

  troubleshooting: {
    eyebrow: 'when it does not connect',
    heading: 'Fehlerbehebung.',
    lead: 'Fast alle Verbindungsprobleme haben eine von vier Ursachen: Das Gateway läuft nicht, die Adresse ist nicht erreichbar, die Kopplung fehlt, oder OpenCode ist offline.',
    checksHeading: 'Schnellprüfungen',
    checks: [
      {
        term: 'Einen Rechner koppeln',
        detail:
          'Gateway auf dem Rechner installieren (unterstützt tmux oder Herdr), Manager öffnen, QR in Muqun scannen und Bestätigungscode eingeben.',
      },
      {
        term: 'Verbindung prüfen',
        detail:
          'Prüfen, ob tmux oder Herdr 0.7.5+ und das aktuelle Gateway laufen. Sicherstellen, dass beide Geräte dieselbe private Adresse erreichen.',
      },
      {
        term: 'Gerät entfernen',
        detail:
          'Server auf dem Muqun-Startbildschirm löschen, um den Zugriff zu entziehen. Alternativ im Gateway-Manager auf dem Rechner widerrufen.',
      },
      {
        term: 'Benachrichtigungen erneuern',
        detail:
          'Mitteilungen in den Systemeinstellungen und in Muqun aktivieren. Gekoppelten Server erneut öffnen, um das Token zu aktualisieren.',
      },
    ],
    entries: [
      {
        term: 'Kopplung schlägt fehl',
        detail:
          '„Could not reach the gateway“ bedeutet, dass die Adresse im QR-Code vom Handy aus nicht erreichbar ist. Prüfe muqun-gateway status und stelle sicher, dass beide Geräte im selben Wi-Fi oder Tailnet sind. Ein an 127.0.0.1 gebundenes Gateway ist von außen unerreichbar; passe dies mit u im Manager an.',
      },
      {
        term: 'Code abgelehnt oder abgelaufen',
        detail:
          'Der 8-stellige Code ist 5 Minuten gültig und verfällt nach 8 Fehlversuchen. Drücke p im Manager für einen neuen Code. Die Zeichen 0, 1, I, L, O kommen nicht vor.',
      },
      {
        term: 'Bedeutung des Statuspunkts',
        detail:
          'Ein ausgefüllter Punkt bedeutet eine bestätigte Rückmeldung (Grün: ONLINE, Grau: OFFLINE). Ein hohler Kreis mit NOT CONNECTED bedeutet, dass noch keine Prüfung stattfand — einfaches Antippen verbindet.',
      },
      {
        term: 'Aufforderung zur erneuten Kopplung',
        detail:
          'Das Gerätetoken auf dem Gateway existiert nicht mehr. Koppel den Server einfach erneut; deine übrigen Einstellungen auf dem Handy bleiben erhalten.',
      },
      {
        term: 'OpenCode wird nicht gefunden',
        detail:
          'Wenn die Agent-Ansicht offline meldet, starte opencode serve --service auf dem Rechner und tippe auf Erneut prüfen. Falls es bereits läuft, gib in config.json den absoluten Pfad unter opencode.binary an.',
      },
      {
        term: 'Modelle ausgegraut oder keine kostenlosen',
        detail:
          '„Auf dem Host einrichten“ bedeutet, dass der Provider in OpenCode noch nicht konfiguriert ist. Wenn keine kostenlosen Modelle erscheinen, deaktiviere den „Nur kostenlos“-Filter. Muqun verlangt keine eigenen Gebühren.',
      },
      {
        term: 'Agent möchte Workspace verlassen',
        detail:
          'Beim Lesen oder Schreiben außerhalb des Arbeitsverzeichnisses erscheint eine Sicherheitsabfrage mit Pfadangabe. Prüfe den Pfad vor dem Erlauben.',
      },
      {
        term: 'Changes-Button fehlt',
        detail:
          'Erscheint nur, wenn das Terminal in einem Git-Verzeichnis steht und das Gateway Diff-fähig ist. Installiere das neueste Gateway-Update.',
      },
      {
        term: 'Neueres Gateway erforderlich',
        detail:
          'Ältere Gateways behalten ihre Terminalfunktion. Für Agent-Kollaboration wird Herdr 0.9.0+ benötigt; die App weist auf das nötige Upgrade hin.',
      },
      {
        term: 'Rechner hinter einem Proxy',
        detail:
          'Dein Rechner kommuniziert mit den Modellanbietern. Falls ein Proxy für den Internetzugang nötig ist, konfiguriere diesen direkt in OpenCode auf dem Rechner.',
      },
    ],
  },

  contact: {
    eyebrow: 'github · issues',
    heading: 'Noch Fragen?',
    lead: 'Eröffne ein Issue auf GitHub. Jedes Feedback fließt direkt in die Weiterentwicklung ein.',
    reportHint:
      'Gib die App-Version, die Gateway-Version und die genauen Schritte vor dem Problem an.',
    issueCta: 'Issue auf GitHub eröffnen',
    safetyHeading: 'Datenschutz und sicheres Melden',
    safetyBody:
      'Der Support benötigt niemals Zugangstokens, vollständige Terminalausgaben, Quellcode oder Kopplungs-QRs. Entferne sensible Daten vor dem Hochladen von Screenshots oder Logs.',
    safetyLink: 'Datenschutzerklärung lesen',
  },
};
