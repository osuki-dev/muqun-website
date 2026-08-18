import type { MuqunCopy } from './types';

/**
 * French translation of Muqun's page copy. Keys and structure must match en.ts.
 */
export const copy: MuqunCopy = {
  meta: {
    title: 'Muqun — Vos agents, partout',
    description:
      'Votre agent de code s’arrête pour demander une autorisation pendant que vous êtes loin du bureau. Muqun met cette réponse sur votre téléphone : le vrai terminal, les autorisations depuis l’écran verrouillé, et une nouvelle tâche lancée depuis votre poche — droit vers votre propre machine Mac ou Linux.',
  },
  hero: {
    paneLabel: 'muqun',
    paneState: 'agent en attente',
    eyebrow: 'panneau 2 · claude code · bloqué 00:14',
    heading: 'Votre agent attend une seule touche.',
    sub: 'Une commande, un scan — ensuite chaque agent de votre machine vous rend compte sur votre téléphone.',
    appStore: 'Obtenir Muqun',
    googlePlay: 'Disponible sur Google Play',
    installLabel: 'Ensuite, sur votre propre machine :',
    copyLabel: 'Copier la commande d’installation',
    copiedLabel: 'Copié',
    terminalAlt:
      'Un panneau de terminal où un agent de code s’est arrêté pour demander l’autorisation de modifier un fichier, le premier choix sélectionné et le curseur en attente.',
    deviceAlt:
      'L’écran d’accueil de Muqun : un serveur EN LIGNE, ses agents listés le long d’un fil corail, chacun marqué En cours, Bloqué ou Inactif.',
    videoPlayLabel: 'Lire le film de présentation de 21 secondes',
    videoLength: '0:21',
    promptLegend: 'Les trois réponses de l’agent',
    promptHint: 'Appuie sur 1, 2 ou 3 — ou réponds depuis l’écran verrouillé.',
    promptCaption:
      'Un panneau de terminal arrêté sur une demande de permission : un agent de programmation demande à modifier src/theme.ts et attend l’une des trois réponses.',
  },
  pillars: {
    paneLabel: 'à quoi ça sert',
    items: [
      {
        pane: 'valider',
        state: 'attente',
        title: 'Répondez avant que le café refroidisse',
        line: 'La demande d’autorisation arrive en notification, et vous y répondez depuis l’écran verrouillé — Approuver, toujours approuver, Refuser.',
        alt: 'Une illustration de la notification que Muqun envoie quand un agent demande une autorisation, avec ses trois boutons de réponse.',
      },
      {
        pane: 'suivre',
        state: 'flux',
        title: 'Suivez l’avancement de n’importe quel agent, où que vous soyez',
        line: 'La vraie grille du terminal, en direct, dans les couleurs de l’agent. Appui long pour sélectionner et copier les octets exacts, ou tirez vers le bas pour la sortie plus ancienne.',
        alt: 'La sortie d’un agent de code dans Muqun : un diff en couleurs, un tableau encadré et une ligne verte de succès.',
      },
      {
        pane: 'envoyer',
        state: 'prêt',
        title: 'Donnez une image à l’agent',
        line: 'Joignez une image ou un fichier depuis votre téléphone — la maquette, le bug, le tableau blanc. Tapez le message ou dictez-le.',
        alt: 'La zone de saisie de Muqun avec une photo jointe au message sur le point de partir vers l’agent.',
      },
      {
        pane: 'lancer',
        state: 'prêt',
        title: 'Lancez le suivant depuis votre poche',
        line: 'Choisissez l’agent, choisissez un répertoire que la session connaît déjà, tapez le prompt. Il arrive dans un panneau tout neuf.',
        alt: 'Une illustration de la feuille « Nouvelle tâche » de Muqun : un agent, un répertoire de travail et un champ de prompt.',
      },
      {
        pane: 'away',
        state: '15m',
        title: 'Retrouve une phrase, pas un journal',
        line: 'Rouvre une machine laissée il y a quinze minutes et Muqun commence par ce qui a bougé : quels agents ont fini, lesquels attendent encore, et combien de fois ils se sont arrêtés pendant que personne ne regardait.',
        alt: 'Une illustration de la carte « Pendant ton absence » de Muqun : trois agents, où chacun en est, et combien de fois il s’est arrêté pour demander.',
      },
      {
        pane: 'serve',
        state: 'port',
        title: 'Ouvre le serveur de dev dans ta poche',
        line: 'Tape un port et Muqun l’ouvre dans le navigateur du téléphone, via la même adresse privée que le terminal utilise déjà. Aucun tunnel à monter, rien de publié sur internet.',
        alt: 'Une illustration de la feuille « Ouvrir un service web » de Muqun : les ports récents, un champ de port et un bouton Ouvrir.',
      },
    ],
    dispatchAgent: 'agent',
    dispatchFolder: 'répertoire',
    dispatchPrompt: 'prompt',
    dispatchSend: 'Démarrer',
  },
  craft: {
    paneLabel: 'ce que ça fait en main',
    paneNote: 'gestes et touches',
    heading: 'Un terminal que deux pouces suffisent à piloter.',
    lead: 'Un téléphone n’est pas un clavier, et faire comme si c’en était un est la raison pour laquelle tous les autres clients de terminal sonnent faux. Voici les gestes auxquels Muqun répond, et pourquoi chacun a la forme qu’il a.',
    items: [
      {
        gesture: 'deux doigts',
        line: 'Balayez latéralement n’importe où sur un panneau pour circuler entre les onglets de cet espace de travail. Muqun distingue le balayage du pincement avant de vous déplacer : zoomer ne vous fait donc jamais atterrir sur un autre onglet.',
      },
      {
        gesture: 'pincer',
        line: 'Zoomez la grille jusqu’à la taille que vos yeux réclament. Chaque panneau retient la sienne, car on ne lit pas l’éditeur et l’agent à la même distance.',
      },
      {
        gesture: 'tirer vers le bas',
        line: 'Remontez vers la sortie déjà passée. Un appui sur le repère vous ramène à la dernière ligne.',
      },
      {
        gesture: 'appui long',
        line: 'Sélectionnez la sortie, étendez la sélection en glissant, et copiez les octets exacts — les caractères que le programme a réellement imprimés, pas une image de ceux-ci.',
      },
      {
        gesture: 'chaque touche',
        line: 'La rangée à l’écran est disposée comme un clavier et envoie à l’instant où vous pressez. C’est toute la raison pour laquelle nvim, less et les REPL se comportent normalement ici.',
      },
      {
        gesture: 'la rangée de vim',
        line: 'Les panneaux d’éditeur reçoivent la rangée que vim attend, combinaisons leader de LazyVim comprises, et suivent le mode où nvim se trouve vraiment, pas celui que vous avez choisi en dernier.',
      },
      {
        gesture: '@',
        line: 'Mentionnez un fichier au lieu de taper son chemin. Photos et documents se joignent depuis la même zone de saisie, et les commandes slash propres à l’agent s’y lancent aussi.',
      },
      {
        gesture: 'toucher un fichier',
        line: 'Lisez ce que la session a écrit sans quitter l’app : coloration syntaxique, diffs en couleurs et aperçus d’images.',
      },
    ],
  },
  setup: {
    paneLabel: 'install',
    paneNote: 'environ une minute',
    heading: 'Une commande. Un scan.',
    lead: 'Muqun parle à un Gateway sur votre propre ordinateur, pas à un serveur qui nous appartient. L’installation tient en une ligne, et il fait le reste tout seul.',
    steps: [
      {
        title: 'Lancez ceci sur votre machine',
        body: 'Elle télécharge un programme prêt à l’emploi — pas de Rust, pas de compilateur — puis le configure, le démarre et ouvre le panneau d’appairage.',
      },
      {
        title: 'Le QR est déjà à l’écran',
        body: 'Dès la première installation, le Gateway ouvre son propre panneau, juste à côté des autres, avec le code déjà dedans.',
      },
      {
        title: 'Scannez-le, et vous y êtes',
        body: 'Pointez la caméra de Muqun sur le panneau et retapez le code court affiché par votre ordinateur. Le serveur passe au vert, et ses panneaux sont sur votre téléphone.',
      },
    ],
    inspectLead: 'Vous préférez le lire d’abord ? Téléchargez-le, lisez ce fichier, puis exécutez ce même fichier :',
    panelFallbackLabel: 'Le panneau n’apparaît pas ?',
    panelFallbackBody: 'Ouvrez-le vous-même, depuis n’importe quel terminal :',
    panelFallbackAfter: 'Une fois un appareil appairé, le panneau affiche son gestionnaire à la place — appuyez sur p dedans pour rappeler un QR.',
    panelCopyLabel: 'Copier la commande qui ouvre le panneau',
    inspectCopyLabel: 'Copier les trois commandes',
    onlineLabel: 'en ligne',
    qrPanelAlt:
      'Une illustration du panneau du Gateway dans une session de terminal, avec un QR code d’appairage et les touches p, x et u.',
    onlinePanelAlt:
      'Une illustration de la carte du serveur dans Muqun une fois l’appairage terminé, affichant CONNECTÉ en vert.',
    pairPhoneAlt:
      'Muqun sur un téléphone, avant tout appairage : une liste de serveurs vide et un seul bouton, Appairer un serveur.',
    panelsPhoneAlt:
      'Muqun sur un téléphone une fois l’appairage fait : un des volets de la machine est ouvert — un éditeur affichant src/theme.ts — les autres volets alignés en bas, Claude Code, nvim, zsh.',
    requirements: [
      'tmux, ou Herdr 0.7.5 ou plus récent, sur macOS ou Linux. Windows n’est pas encore pris en charge.',
      'Ni compte, ni abonnement, ni achat intégré.',
      'Le même Wi-Fi suffit ; Tailscale fait mieux.',
    ],
    tailscaleBefore: 'Nous recommandons de mettre les deux appareils sur Tailscale et d’utiliser',
    tailscaleLink: 'Tailscale Serve',
    tailscaleAfter:
      'pour obtenir une adresse HTTPS privée — pas de redirection de port, et rien de chez vous sur l’internet public. Utilisez Serve, pas Funnel.',
    updatingLabel: 'Mettre à jour plus tard :',
    updatingBody:
      'relancez la même commande. Elle met à jour le Gateway et le redémarre, et vos téléphones appairés le restent.',
    openSourceBefore: 'Le Gateway est open source —',
    openSourceLink: 'lire le code et le guide d’installation complet',
  },
  review: {
    status: 'En cours d’examen chez Apple',
    note: 'Muqun est en cours d’examen chez Apple. Le lien App Store apparaîtra ici.',
  },
  delight: {
    paneLabel: 'faites-en le vôtre',
    paneNote: 'à votre goût · clair et sombre',
    heading: 'Choisissez un thème. Le terminal suit.',
    line: 'Chaque pack repeint l’app et le terminal d’un seul coup, et chacun a une moitié claire et une moitié sombre. Il y en a trente-deux ; en voici cinq, sur la même session :',
    themeAlt: 'La même session Muqun dans le pack {pack}.',
  },
  promise: {
    paneLabel: 'le contrat',
    lines: [
      'Votre téléphone s’appaire directement avec votre propre machine.',
      'Pas de compte Muqun, et aucun relais de chez nous entre les deux.',
      'Ni publicité, ni analytics, ni SDK de pistage tiers.',
      'Un seul achat ; toutes les mises à jour ensuite sont gratuites.',
      'Demandez une fonction ou signalez ce qui casse : la prochaine version vient de là.',
    ],
    link: 'Lire la politique de confidentialité',
    feedbackLink: 'Proposer une fonction ou signaler un bug',
  },
  footer: {
    heading: 'Vos agents, où que vous soyez.',
    appStore: 'Obtenir Muqun',
    googlePlay: 'Google Play',
    installLabel: 'Installer le Gateway',
    support: 'Assistance',
  },
  support: {
    metaTitle: 'Assistance Muqun',
    metaDescription:
      "Aide pour installer le Gateway, appairer Muqun, sécuriser les connexions Tailscale, les notifications et l'accès des appareils.",
    eyebrow: 'Muqun · Assistance',
    heading: 'Gardez votre machine à portée de main.',
    lead: "Commencez par les vérifications ci-dessous. Si Muqun ne se connecte toujours pas, envoyez-nous le modèle de l'appareil, la version iOS ou Android, votre backend (tmux ou Herdr) et sa version, la version du Gateway et le message exact affiché dans l'app. N'envoyez jamais un jeton Gateway ni un QR d'appairage.",
    emailCta: "Écrire à l'assistance Muqun",
    issueCta: 'Ouvrir un ticket',
    contactBefore: 'E-mail :',
    contactAfter: 'Délai de réponse habituel : sous deux jours ouvrés.',
    networkEyebrow: 'Réseau recommandé',
    networkHeading: 'Utilisez Tailscale sur les deux appareils.',
    networkBadge: 'téléphone → tailnet → ordinateur',
    networkBody:
      "Nous recommandons vivement de placer votre téléphone et l'ordinateur du Gateway sur le même tailnet Tailscale. Cela évite la redirection de port sur le routeur et garde le Gateway hors de l'internet public. Tailscale Serve peut ajouter une adresse HTTPS privée ; n'utilisez pas Tailscale Funnel pour Muqun.",
    networkLink: 'Lire le guide Tailscale Serve',
    checksHeading: 'Vérifications rapides',
    topics: [
      {
        title: 'Appairer un ordinateur',
        body: "Installez le Gateway sur un ordinateur qui vous appartient — il fonctionne avec tmux ou Herdr —, ouvrez son panneau de gestion, puis scannez le QR d'appairage dans Muqun. Le code de confirmation affiché sur l'ordinateur termine l'appairage.",
      },
      {
        title: 'Réparer une connexion',
        body: "Vérifiez que tmux, ou Herdr 0.7.5 ou plus récent, ainsi que le dernier Gateway, sont bien lancés. Confirmez que le téléphone et l'ordinateur peuvent atteindre la même adresse privée, puis rouvrez le serveur dans Muqun.",
      },
      {
        title: 'Retirer un appareil',
        body: "Supprimez un serveur depuis l'écran d'accueil de Muqun pour révoquer ce téléphone auprès de ce Gateway. Vous pouvez aussi révoquer n'importe quel appareil appairé depuis le panneau de gestion du Gateway.",
      },
      {
        title: 'Rétablir les notifications',
        body: "Activez les notifications pour Muqun dans les réglages système de votre téléphone et dans les réglages de Muqun. Rouvrez le serveur appairé pour que Muqun puisse enregistrer le jeton actuel de l'appareil auprès de votre Gateway.",
      },
    ],
    safetyHeading: 'Confidentialité et signalement sûr',
    safetyBody:
      "L'assistance n'a jamais besoin de votre jeton d'accès, de la sortie complète du terminal, du code source ni du QR d'appairage. Retirez les secrets avant de joindre des captures d'écran ou des journaux.",
    safetyLink: 'Lire la politique de confidentialité',
  },
};
