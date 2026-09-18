import type { SiteLocale } from '@/lib/locales';

/** One entry of the in-page table of contents, and one section's anchor. */
export interface GuideAnchor {
  /** The `id` on the section. Deep-linked from inside the app; never rename. */
  id: string;
  /** Proportional, translated. What the section is called in the contents. */
  label: string;
  /** Mono/proportional badge text for chapter cards. */
  meta: string;
  /** Brief summary for chapter deck cards. */
  desc: string;
}

/** One command, with the sentence that says when you would run it. */
export interface GuideCommand {
  /** Literal, ASCII. Rendered verbatim in a `CodeBlock`. */
  code: string;
  /** Mono, ASCII. The caption above the command. */
  label?: string;
  /** Translated. What this one does, above the block. */
  detail?: string;
}

/** A numbered thing to do. */
export interface GuideStep {
  title: string;
  body: string;
  commands?: readonly GuideCommand[];
  /** One line under the commands. The "pick one" rule. */
  note?: string;
}

/** A term and what it means. The config table and the troubleshooting list. */
export interface GuideEntry {
  /** Proportional where it is prose, mono where it is a key or a command. */
  term: string;
  detail: string;
}

export interface UserGuide {
  metaTitle: string;
  metaDescription: string;
  hero: {
    badge: string;
    heading: string;
    lead: string;
    startCta: string;
    diagnosticsCta: string;
    issueCta: string;
  };
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
    networkBadge: string;
    networkHeading: string;
    networkBody: string;
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
    noSignInBadge: string;
    noSignInHeading: string;
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
    /** A definition list, not a paragraph. One fact per row. */
    portsRows: readonly GuideEntry[];
    modesHeading: string;
    /** Two columns, compared row for row. `rows` are the same questions. */
    modes: readonly {
      title: string;
      /** Mono, ASCII. */
      label: string;
      code: string;
      rows: readonly GuideEntry[];
    }[];
    modesNote: string;
    autostartHeading: string;
    autostartSteps: readonly string[];
    autostartNote: string;
    autostartOffLabel: string;
    autostartOff: string;
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
    entries: readonly GuideEntry[];
    galleryLink: string;
  };

  troubleshooting: {
    eyebrow: string;
    heading: string;
    lead: string;
    checksHeading: string;
    checks: readonly GuideEntry[];
    entries: readonly GuideEntry[];
  };

  contact: {
    eyebrow: string;
    heading: string;
    lead: string;
    /** What a useful report carries. One sentence. */
    reportHint: string;
    issueCta: string;
    safetyHeading: string;
    safetyBody: string;
    safetyLink: string;
  };
}
