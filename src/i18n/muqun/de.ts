import type { MuqunCopy } from './types';

/**
 * German (de) translation of Muqun's page copy. Keys and structure must
 * match en.ts, which stays the source of truth.
 */
export const copy: MuqunCopy = {
  meta: {
    title: 'Muqun — Deine Agenten, überall',
    description:
      'Dein Coding-Agent hält an und fragt um Erlaubnis, während du nicht am Schreibtisch bist. Muqun legt diese Antwort auf dein Telefon: das echte Terminal, Freigaben vom Sperrbildschirm und eine neue Aufgabe aus der Hosentasche — direkt auf deinen eigenen Mac oder Linux-Rechner.',
  },
  hero: {
    paneLabel: 'muqun',
    paneState: 'Agent wartet',
    eyebrow: 'panel 2 · claude code · blockiert 00:14',
    heading: 'Dein Agent wartet auf einen einzigen Tastendruck.',
    sub: 'Ein Befehl, ein Scan — danach meldet sich jeder Agent deines Rechners auf deinem Telefon.',
    appStore: 'Muqun laden',
    googlePlay: 'Jetzt bei Google Play',
    installLabel: 'Dann, auf deinem eigenen Rechner:',
    copyLabel: 'Installationsbefehl kopieren',
    copiedLabel: 'Kopiert',
    terminalAlt:
      'Ein Terminal-Panel, in dem ein Coding-Agent angehalten hat und um Erlaubnis bittet, eine Datei zu bearbeiten — die erste Option ist ausgewählt, der Cursor wartet.',
    deviceAlt:
      'Der Startbildschirm von Muqun: ein Server ONLINE, seine Agents an einem korallenfarbenen Faden aufgelistet, jeder als Arbeitet, Blockiert oder Inaktiv markiert.',
    videoPlayLabel: 'Den 21-sekündigen Intro-Film abspielen',
    videoLength: '0:21',
    promptLegend: 'Die drei Antworten des Agents',
    promptHint: 'Drücke 1, 2 oder 3 — oder antworte vom Sperrbildschirm aus.',
    promptCaption:
      'Ein Terminal-Panel, angehalten auf einer Berechtigungsfrage: ein Coding-Agent möchte src/theme.ts bearbeiten und wartet auf eine von drei Antworten.',
  },
  pillars: {
    paneLabel: 'wofür es da ist',
    items: [
      {
        pane: 'freigabe',
        state: 'wartet',
        title: 'Antworte, bevor der Kaffee kalt wird',
        line: 'Die Berechtigungsfrage kommt als Push, den du vom Sperrbildschirm aus beantwortest — Genehmigen, immer genehmigen, Ablehnen.',
        alt: 'Eine Illustration der Benachrichtigung, die Muqun schickt, wenn ein Agent um Erlaubnis bittet, mit ihren drei Antwortschaltflächen.',
      },
      {
        pane: 'mitlesen',
        state: 'streamt',
        title: 'Sieh den Fortschritt jedes Agents, von überall',
        line: 'Das echte Terminal-Raster, live, in den Farben des Agents. Lange drücken, um genau die Bytes zu markieren und zu kopieren, oder nach unten ziehen für frühere Ausgabe.',
        alt: 'Die Ausgabe eines Coding-Agents in Muqun: ein farbiges Diff, eine gerahmte Tabelle und eine grüne Erfolgszeile.',
      },
      {
        pane: 'senden',
        state: 'bereit',
        title: 'Gib dem Agent ein Bild in die Hand',
        line: 'Häng ein Bild oder eine Datei direkt vom Telefon an — das Mockup, den Bug, das Whiteboard. Tippe es oder diktiere es.',
        alt: 'Muquns Eingabezeile mit einem Foto, angehängt an die Nachricht, die gleich an den Agent geht.',
      },
      {
        pane: 'starten',
        state: 'bereit',
        title: 'Starte den nächsten aus der Hosentasche',
        line: 'Agent wählen, ein Verzeichnis wählen, das die Session schon kennt, Prompt tippen. Es landet in einem frischen Panel.',
        alt: 'Eine Illustration des Muqun-Blatts „Neue Aufgabe“: ein Agent, ein Arbeitsverzeichnis und ein Prompt-Feld.',
      },
      {
        pane: 'away',
        state: '15m',
        title: 'Komm zu einem Satz zurück, nicht zu einem Log',
        line: 'Öffne eine Maschine wieder, die du vor fünfzehn Minuten verlassen hast, und Muqun beginnt mit dem, was sich bewegt hat: welche Agents fertig sind, welche noch fragen, und wie oft sie angehalten haben, während niemand hingesehen hat.',
        alt: 'Eine Illustration von Muquns Karte „Während du weg warst“: drei Agents, wo jeder gelandet ist, und wie oft er angehalten hat, um zu fragen.',
      },
      {
        pane: 'serve',
        state: 'port',
        title: 'Öffne den Dev-Server in deiner Hosentasche',
        line: 'Tippe einen Port und Muqun öffnet ihn im Browser des Telefons, über dieselbe private Adresse, die das Terminal schon benutzt. Kein Tunnel, nichts im öffentlichen Internet.',
        alt: 'Eine Illustration von Muquns Blatt „Webdienst öffnen“: zuletzt benutzte Ports, ein Portfeld und ein Öffnen-Button.',
      },
    ],
    dispatchAgent: 'agent',
    dispatchFolder: 'verzeichnis',
    dispatchPrompt: 'prompt',
    dispatchSend: 'Starten',
  },
  craft: {
    paneLabel: 'wie es sich anfühlt',
    paneNote: 'gesten und tasten',
    heading: 'Ein Terminal, das sich mit zwei Daumen bedienen lässt.',
    lead: 'Ein Telefon ist keine Tastatur, und so zu tun als wäre es eine, ist der Grund, warum sich jeder andere Terminal-Client falsch anfühlt. Das sind die Gesten, auf die Muqun antwortet, und warum jede die Form hat, die sie hat.',
    items: [
      {
        gesture: 'zwei Finger',
        line: 'Wisch irgendwo auf einem Panel zur Seite, um durch die Tabs dieses Workspace zu gehen. Muqun unterscheidet den Wisch von einer Zoomgeste, bevor es dich bewegt — Aufziehen landet also nie in einem anderen Tab.',
      },
      {
        gesture: 'aufziehen',
        line: 'Zoom das Raster, bis die Schrift die Größe hat, die deine Augen wollen. Jedes Panel merkt sich seine eigene, denn Editor und Agent liest man nicht aus demselben Abstand.',
      },
      {
        gesture: 'nach unten ziehen',
        line: 'Greif zurück nach Ausgabe, die schon vorbeigelaufen ist. Ein Tipp auf die Marke bringt dich zur neuesten Zeile.',
      },
      {
        gesture: 'lange drücken',
        line: 'Ausgabe auswählen, die Auswahl aufziehen und die exakten Bytes kopieren — die Zeichen, die das Programm wirklich gedruckt hat, nicht ein Bild davon.',
      },
      {
        gesture: 'jede Taste',
        line: 'Die Tastenreihe ist wie eine Tastatur angeordnet und sendet in dem Moment, in dem du drückst. Genau deshalb verhalten sich nvim, less und REPLs hier richtig.',
      },
      {
        gesture: 'vims Tastenreihe',
        line: 'Editor-Panels bekommen die Reihe, die vim erwartet, samt LazyVims Leader-Kombinationen — und sie folgen dem Modus, in dem nvim gerade wirklich ist, nicht dem, den du zuletzt gewählt hast.',
      },
      {
        gesture: '@',
        line: 'Erwähne eine Datei, statt ihren Pfad zu tippen. Fotos und Dokumente hängst du aus demselben Eingabefeld an, und die eigenen Slash-Befehle des Agenten laufen auch von dort.',
      },
      {
        gesture: 'Datei antippen',
        line: 'Lies, was die Session geschrieben hat, ohne die App zu verlassen: Syntaxhervorhebung, farbige Diffs und Bildvorschauen.',
      },
    ],
  },
  setup: {
    paneLabel: 'Setup',
    paneNote: 'etwa eine Minute',
    heading: 'Ein Befehl. Ein Scan.',
    lead: 'Muqun spricht mit einem Gateway auf deinem eigenen Rechner, nicht mit einem Server von uns. Die Installation ist eine Zeile, den Rest erledigt es selbst.',
    steps: [
      {
        title: 'Führe das auf deinem Rechner aus',
        body: 'Es lädt ein fertig gebautes Programm herunter — kein Rust, kein Compiler —, richtet es ein, startet es und öffnet das Kopplungs-Panel.',
      },
      {
        title: 'Der QR-Code ist schon auf dem Bildschirm',
        body: 'Bei der ersten Installation öffnet das Gateway sein eigenes Panel direkt neben deinen anderen, mit dem Code schon darin.',
      },
      {
        title: 'Scanne ihn, und du bist drin',
        body: 'Richte Muquns Kamera auf das Panel und tippe den kurzen Code zurück, den dein Rechner anzeigt. Der Server wird grün, und seine Panels liegen auf deinem Telefon.',
      },
    ],
    inspectLead: 'Lieber vorher lesen? Lade sie herunter, lies diese Datei und führe dann genau diese Datei aus:',
    panelFallbackLabel: 'Panel nicht zu sehen?',
    panelFallbackBody: 'Öffne es selbst, in jedem Terminal:',
    panelFallbackAfter: 'Sobald ein Gerät gekoppelt ist, zeigt das Panel stattdessen seine Verwaltung — drücke darin p, um einen QR-Code zurückzuholen.',
    panelCopyLabel: 'Befehl kopieren, der das Panel öffnet',
    inspectCopyLabel: 'Alle drei Befehle kopieren',
    onlineLabel: 'online',
    qrPanelAlt:
      'Eine Illustration des Gateway-Panels in einer Terminal-Session, mit einem Kopplungs-QR-Code und den Tasten p, x und u.',
    onlinePanelAlt:
      'Eine Illustration der Serverkarte in Muqun nach der Kopplung, die grün VERBUNDEN anzeigt.',
    pairPhoneAlt:
      'Muqun auf einem Telefon, noch ohne Kopplung: eine leere Serverliste und ein einziger Button, Server koppeln.',
    panelsPhoneAlt:
      'Muqun auf einem Telefon nach der Kopplung: eine der Panes der Maschine ist offen — ein Editor mit src/theme.ts — die übrigen Panes in einer Leiste am unteren Rand, Claude Code, nvim, zsh.',
    requirements: [
      'tmux, oder Herdr 0.7.5 oder neuer, auf macOS oder Linux. Windows wird noch nicht unterstützt.',
      'Kein Konto, kein Abo, keine In-App-Käufe.',
      'Dasselbe Wi-Fi reicht; Tailscale ist besser.',
    ],
    tailscaleBefore: 'Wir empfehlen, beide Geräte in Tailscale zu holen und',
    tailscaleLink: 'Tailscale Serve',
    tailscaleAfter:
      'für eine private HTTPS-Adresse zu nutzen — keine Portfreigabe, und nichts von dir im öffentlichen Internet. Nimm Serve, nicht Funnel.',
    updatingLabel: 'Später aktualisieren:',
    updatingBody:
      'führe denselben Befehl noch einmal aus. Er aktualisiert das Gateway und startet es neu, und deine gekoppelten Telefone bleiben gekoppelt.',
    openSourceBefore: 'Das Gateway ist Open Source —',
    openSourceLink: 'lies den Code und die vollständige Einrichtungsanleitung',
  },
  review: {
    status: 'In Prüfung bei Apple',
    note: 'Muqun liegt gerade bei Apple zur Prüfung. Hier erscheint der App-Store-Link.',
  },
  delight: {
    paneLabel: 'mach es zu deinem',
    paneNote: 'freie Wahl · hell und dunkel',
    heading: 'Wähl ein Theme. Das Terminal zieht mit.',
    line: 'Jedes Pack färbt die App und das Terminal gemeinsam neu, und jedes hat eine helle und eine dunkle Hälfte. Zweiunddreißig sind dabei; hier fünf, an derselben Session:',
    themeAlt: 'Dieselbe Muqun-Session im Pack {pack}.',
  },
  promise: {
    paneLabel: 'die Abmachung',
    lines: [
      'Dein Telefon koppelt sich direkt mit deinem eigenen Rechner.',
      'Kein Muqun-Konto, und kein Relay von uns dazwischen.',
      'Keine Werbung, keine Analytics, keine Tracking-SDKs von Dritten.',
      'Einmal kaufen; jedes Update danach ist kostenlos.',
      'Wünsch dir eine Funktion oder melde, was kaputt ist — daraus entsteht die nächste Version.',
    ],
    link: 'Datenschutzerklärung lesen',
    feedbackLink: 'Funktion vorschlagen oder Fehler melden',
  },
  footer: {
    heading: 'Deine Agenten, überall dabei.',
    appStore: 'Muqun laden',
    googlePlay: 'Google Play',
    installLabel: 'Gateway installieren',
    support: 'Support',
  },
  support: {
    metaTitle: 'Muqun Support',
    metaDescription:
      'Hilfe zur Installation des Gateway, zum Koppeln von Muqun, zu sicheren Tailscale-Verbindungen, Benachrichtigungen und Gerätezugriff.',
    eyebrow: 'Muqun · Support',
    heading: 'Halte deinen eigenen Rechner in Reichweite.',
    lead: 'Fang mit den Prüfschritten unten an. Wenn Muqun sich immer noch nicht verbinden kann, schick uns Gerätemodell, iOS- oder Android-Version, dein Backend (tmux oder Herdr) mit seiner Version, die Gateway-Version und die exakte Meldung aus der App. Schick niemals ein Gateway-Token oder den Kopplungs-QR-Code.',
    emailCta: 'Muqun-Support anschreiben',
    issueCta: 'Issue eröffnen',
    contactBefore: 'E-Mail:',
    contactAfter: 'Übliche Antwortzeit: innerhalb von zwei Werktagen.',
    networkEyebrow: 'Empfohlenes Netzwerk',
    networkHeading: 'Nutze Tailscale auf beiden Geräten.',
    networkBadge: 'Handy → Tailnet → Rechner',
    networkBody:
      'Wir empfehlen dringend, dein Handy und den Gateway-Rechner in dasselbe Tailscale-Tailnet zu holen. Das erspart Portfreigaben im Router und hält das Gateway aus dem öffentlichen Internet heraus. Tailscale Serve kann eine private HTTPS-Adresse ergänzen; nutze Tailscale Funnel nicht für Muqun.',
    networkLink: 'Die Anleitung zu Tailscale Serve lesen',
    checksHeading: 'Schnelle Prüfschritte',
    topics: [
      {
        title: 'Einen Rechner koppeln',
        body: 'Installiere das Gateway auf einem Rechner, der dir gehört — es funktioniert mit tmux oder Herdr —, öffne dessen Verwaltungspanel und scanne dann den Kopplungs-QR-Code in Muqun. Der Bestätigungscode auf dem Rechner schließt die Kopplung ab.',
      },
      {
        title: 'Eine Verbindung reparieren',
        body: 'Prüfe, ob tmux, oder Herdr 0.7.5 oder neuer, und das aktuelle Gateway laufen. Stelle sicher, dass Handy und Rechner dieselbe private Adresse erreichen, und öffne den Server dann erneut in Muqun.',
      },
      {
        title: 'Ein Gerät entfernen',
        body: 'Lösche einen Server im Muqun-Startbildschirm, um diesem Handy den Zugriff auf das Gateway zu entziehen. Du kannst jedes gekoppelte Gerät auch im Verwaltungspanel des Gateway sperren.',
      },
      {
        title: 'Benachrichtigungen wiederherstellen',
        body: 'Aktiviere Benachrichtigungen für Muqun in den Systemeinstellungen deines Handys und in den Muqun-Einstellungen. Öffne den gekoppelten Server erneut, damit Muqun das aktuelle Gerätetoken bei deinem Gateway registrieren kann.',
      },
    ],
    safetyHeading: 'Datenschutz und sicheres Melden',
    safetyBody:
      'Der Support braucht nie dein Zugriffstoken, die vollständige Terminalausgabe, Quellcode oder den Kopplungs-QR-Code. Entferne Geheimnisse, bevor du Screenshots oder Logs anhängst.',
    safetyLink: 'Datenschutzerklärung lesen',
  },
};
