import type { UserGuide } from './types';

export const fr: UserGuide = {
  metaTitle: 'Guide d’utilisation & Référence Muqun',
  metaDescription:
    'Guide complet pour installer la Gateway, appairer votre téléphone, gérer vos espaces de travail, les commandes du terminal, l’agent OpenCode, les thèmes et le dépannage.',
  hero: {
    badge: 'GUIDE D’UTILISATION · MANUEL DE RÉFÉRENCE',
    heading: 'Tout ce dont vous avez besoin pour garder votre machine à portée de main.',
    lead: 'Muqun connecte votre téléphone directement à votre propre ordinateur ou serveur. Découvrez comment installer et configurer la Gateway, naviguer dans vos terminaux, piloter l’agent autonome OpenCode, installer des thèmes et résoudre les problèmes de connexion.',
    startCta: 'Commencer ↓',
    diagnosticsCta: 'Diagnostics ↓',
    issueCta: 'Signaler un problème',
  },
  contentsLabel: 'Sur cette page',
  contents: [
    {
      id: 'get-started',
      label: 'Commencer',
      meta: 'Procédure · ~5 min',
      desc: 'Installer la Gateway, choisir le mode, appairage QR et configuration tailnet.',
    },
    {
      id: 'terminal',
      label: 'Le terminal',
      meta: 'tmux · herdr',
      desc: 'Espaces de travail, groupes, panneaux, barre de touches et outils mobiles.',
    },
    {
      id: 'opencode',
      label: 'L’agent OpenCode',
      meta: 'Agent autonome',
      desc: 'Service d’agent local, modèles, diffs en direct et demandes d’autorisation.',
    },
    {
      id: 'gateway',
      label: 'Configurer la Gateway',
      meta: 'Référence config.json',
      desc: 'Clés de configuration, ports, modes de service, démarrage auto et raccourcis.',
    },
    {
      id: 'themes',
      label: 'Thèmes',
      meta: '24 packs inclus',
      desc: 'Thèmes visuels, format .muqun-theme, curseurs d’opacité et création.',
    },
    {
      id: 'troubleshooting',
      label: 'Dépannage',
      meta: 'Diagnostics & vérifications',
      desc: 'Vérifications rapides, erreurs d’appairage, codes expirés et remèdes courants.',
    },
    {
      id: 'contact',
      label: 'Contact',
      meta: 'github · issues',
      desc: 'Liste de signalement, consignes de sécurité et politique de confidentialité.',
    },
  ],

  getStarted: {
    eyebrow: 'muqun-gateway',
    heading: 'Installez la Gateway, puis appairez votre téléphone.',
    lead: 'Muqun communique avec un seul programme sur votre propre ordinateur : la Gateway. Vous l’installez, la lancez et appairez votre téléphone une seule fois. Aucun compte à créer, rien ne transite par nos serveurs.',
    steps: [
      {
        title: 'Exécutez l’installateur sur votre ordinateur',
        body: 'Il place un binaire unique dans ~/.local/bin/muqun-gateway, le configure et ouvre l’écran d’appairage au premier lancement. Compatible macOS et Linux (Windows n’est pas encore pris en charge).',
        commands: [{ code: 'curl -fsSL https://muqun.dev/gateway.sh | sh', label: 'install' }],
      },
      {
        title: 'Lancez-la selon l’un des deux modes',
        body: 'Vous pouvez soit la lancer vous-même, soit la confier au système pour la maintenir active. Les deux options rendent la Gateway opérationnelle ; la différence réside dans le comportement au redémarrage.',
        commands: [
          {
            code: 'muqun-gateway start',
            label: 'direct',
            detail:
              'Tourne en arrière-plan et continue même après la fermeture du terminal — jusqu’au redémarrage de la machine. muqun-gateway stop l’arrête.',
          },
          {
            code: 'muqun-gateway service install',
            label: 'service',
            detail:
              'L’enregistre auprès du système d’initialisation de votre utilisateur (systemd sous Linux, LaunchAgent sous macOS). Démarre à la connexion et redémarre après un crash ou un reboot. muqun-gateway service uninstall supprime le service tout en conservant vos appairages.',
          },
        ],
        note: 'Choisissez l’un ou l’autre : avec le service installé, un arrêt manuel via stop sera immédiatement relancé par le superviseur.',
      },
      {
        title: 'Ouvrez le gestionnaire d’appairage',
        body: 'Quel que soit le mode de démarrage, voici l’étape suivante. Le gestionnaire est un panneau plein écran dans votre terminal affichant le QR code, l’état d’exécution et la liste des appareils autorisés.',
        commands: [{ code: 'muqun-gateway manage', label: 'pair' }],
      },
      {
        title: 'Scannez puis saisissez le code',
        body: 'Scannez le QR code dans Muqun. L’ordinateur affiche alors un code court au format XXXX-XXXX ; le saisir dans l’application valide l’appairage. Scanner seul ne suffit pas — le code prouve que la personne tenant le téléphone est bien vous.',
      },
    ],
    requirements: [
      'macOS ou Linux, sur un ordinateur dont vous êtes administrateur (Windows non supporté).',
      'tmux ou Herdr 0.7.5 ou supérieur déjà installé — la Gateway pilote l’un d’eux sans le remplacer.',
      'Les deux appareils sur le même réseau privé. Tailscale est la solution recommandée (utilisez Tailscale Serve, jamais Funnel).',
      'Aucun compte, aucun abonnement et aucun relais intermédiaire nous appartenant.',
    ],
    pairingNote:
      'Impossible de scanner ? Entrez manuellement l’adresse de la Gateway dans l’application (affichée dans le gestionnaire), puis saisissez le même code court.',
    codeNote:
      'Le code est valable 5 minutes et s’annule après 8 essais infructueux. Appuyez sur p dans le gestionnaire pour générer un nouveau QR et un nouveau code.',
    networkBadge: 'RÉSEAU PRIVÉ RECOMMANDÉ',
    networkHeading: 'Utilisez Tailscale sur les deux appareils.',
    networkBody:
      'Nous vous recommandons vivement de placer votre téléphone et votre ordinateur sur le même réseau Tailscale tailnet. Cela évite toute redirection de port et protège votre Gateway d’Internet. Tailscale Serve permet d’ajouter une adresse HTTPS privée (n’utilisez pas Tailscale Funnel avec Muqun).',
  },

  gateway: {
    eyebrow: 'config.json',
    heading: 'Configuration de la Gateway.',
    lead: 'La plupart des utilisateurs n’ont jamais besoin d’ouvrir ce fichier. Il sert pour les cas particuliers : changer de port, persister au redémarrage, ou indiquer un chemin OpenCode non standard.',
    configHeading: 'Le fichier de configuration',
    configBody:
      'Au format JSON, il est généré automatiquement lors de l’installation. Ne le modifiez manuellement que si nécessaire et redémarrez ensuite la Gateway. Sur macOS, il se situe dans ~/Library/Application Support/muqun-gateway/. Les appareils appairés et les journaux sont stockés dans ~/.local/share/muqun-gateway/.',
    configPathLabel: 'linux',
    configPath: '~/.config/muqun-gateway/config.json',
    configKeys: [
      { term: 'label', detail: 'Le nom affiché par l’application pour cet ordinateur.' },
      {
        term: 'listen',
        detail:
          'L’adresse et le port d’écoute. Par défaut 0.0.0.0:23847 (ou 127.0.0.1 si l’adresse publiée est locale).',
      },
      {
        term: 'public_url',
        detail:
          'L’adresse encodée dans le QR d’appairage. Modifiez-la avec u dans le gestionnaire plutôt qu’à la main.',
      },
      {
        term: 'transport_encryption',
        detail:
          'Chiffrement du transport, défini sur required par défaut. Modifie les futurs appairages sans altérer les existants.',
      },
      {
        term: 'sessions',
        detail:
          'Les backends de terminaux montés (tmux, Herdr ou les deux). Géré via muqun-gateway backend.',
      },
      {
        term: 'autostart_backends',
        detail:
          'Backends démarrés avec la Gateway. Vide par défaut pour éviter tout lancement imprévu.',
      },
      {
        term: 'rich_agent_pushes',
        detail:
          'Désactivé par défaut. Si activé, les questions de l’agent sont insérées dans la notification, ce qui expose le texte sur l’écran de verrouillage.',
      },
      {
        term: 'opencode.autostart',
        detail:
          'Activé par défaut : la Gateway lance OpenCode si aucun service n’est détecté. Désactivable via "opencode": { "autostart": false }.',
      },
      {
        term: 'opencode.binary',
        detail:
          'Chemin de l’exécutable OpenCode. À spécifier si votre service ne dispose pas du PATH de votre shell habituel.',
      },
    ],
    portsHeading: 'Ports & Écoute',
    portsRows: [
      { term: 'Défaut', detail: 'Un seul port TCP : 23847.' },
      { term: 'Modifier', detail: 'muqun-gateway setup --port N, puis redémarrez.' },
      {
        term: 'Adresse liée',
        detail:
          '127.0.0.1 si l’adresse publiée est locale, 0.0.0.0 sinon.',
      },
      {
        term: 'Sur un tailnet',
        detail: 'Aucune redirection de port sur votre routeur, c’est pourquoi nous le conseillons.',
      },
    ],
    modesHeading: 'Deux modes de fonctionnement',
    modes: [
      {
        title: 'Lancement direct manuel',
        label: 'direct',
        code: 'muqun-gateway start',
        rows: [
          { term: 'Démarrage', detail: 'Quand vous lancez la commande.' },
          { term: 'Arrêt', detail: 'muqun-gateway stop ou reboot de la machine.' },
          { term: 'Survit au reboot', detail: 'Non.' },
          { term: 'Désinstallation', detail: 'Rien à faire, un simple stop suffit.' },
        ],
      },
      {
        title: 'En tant que service système',
        label: 'service',
        code: 'muqun-gateway service install',
        rows: [
          { term: 'Démarrage', detail: 'À la connexion de session et après un crash.' },
          { term: 'Arrêt', detail: 'Uniquement via service uninstall.' },
          { term: 'Survit au reboot', detail: 'Oui.' },
          { term: 'Désinstallation', detail: 'service uninstall (appairages préservés).' },
        ],
      },
    ],
    modesNote:
      'Unité utilisateur systemd sous Linux, LaunchAgent sous macOS. Jamais de privilèges root, aucun fichier hors de votre répertoire personnel.',
    autostartHeading: 'Comment OpenCode est démarré',
    autostartSteps: [
      'Vérifie si un service OpenCode fonctionne déjà en lisant l’adresse publiée dans ~/.local/state/opencode/service.json.',
      'S’il existe, s’y rattache directement et préserve vos sessions existantes.',
      'Sinon, lance opencode serve --service et surveille le processus, en détectant automatiquement tout changement de port.',
    ],
    autostartNote:
      'Pas d’OpenCode installé ? Rien ne s’y attache et seul l’écran d’agent indique l’état hors ligne ; le terminal n’est pas affecté.',
    autostartOffLabel: 'config.json',
    autostartOff: '"opencode": { "autostart": false }',
    managerHeading: 'Gestionnaire d’appairage',
    managerBody:
      'Lancé avec muqun-gateway manage. Il liste les processus et appareils autorisés avec les raccourcis suivants :',
    managerKeys: [
      { term: 'p', detail: 'Afficher à nouveau le QR code pour associer un nouvel appareil.' },
      { term: 'x', detail: 'Révoquer l’accès d’un appareil.' },
      { term: 'u', detail: 'Modifier l’adresse encodée dans le QR (a pour la redétecter).' },
      { term: 's / t', detail: 'Démarrer ou arrêter la Gateway sans quitter.' },
      { term: 'm / h', detail: 'Ajouter un backend tmux ou Herdr (f pour défaut, d pour supprimer).' },
      { term: 'e', detail: 'Modifier le chiffrement pour les futurs appairages.' },
      { term: 'q', detail: 'Quitter le gestionnaire (n’arrête jamais vos sessions).' },
    ],
    capabilitiesHeading: 'Rétrocompatibilité',
    capabilitiesBody:
      'L’application interroge la Gateway sur ses capacités réelles plutôt que de deviner par sa version, et masque les fonctionnalités absentes sans planter. Une ancienne Gateway reste un excellent terminal. Seule la collaboration multi-agents requiert Herdr 0.9.0 ou supérieur sur la session.',
    upgradeHeading: 'Mise à niveau',
    upgradeBody:
      'Exécutez simplement la même commande d’installation. Elle remplace le binaire, conserve vos clés, votre adresse, votre configuration et vos appairages. Si vous aviez installé le service, relancez service install une fois après la mise à niveau.',
    logsHeading: 'Journaux',
    logsBody:
      'En mode direct et avec macOS LaunchAgent, les logs sont inscrits dans ~/.local/share/muqun-gateway/gateway.log. Sous Linux avec systemd, ils vont dans journalctl. Pour plus de détails, définissez MUQUN_LOG=debug (ou RUST_LOG=debug) avant le démarrage.',
    logsCommandLabel: 'linux · mode service',
    logsCommand: 'journalctl --user -u dev.osuki.muqun-gateway',
  },

  terminal: {
    eyebrow: 'workspace · group.panel',
    heading: 'Votre vrai terminal.',
    lead: 'Il s’agit de votre véritable terminal, pas d’une simple retranscription. La Gateway pilote tmux ou Herdr sur votre ordinateur et l’application en dessine le contenu — vous retrouvez exactement la session laissée sur votre bureau.',
    shotAlt:
      'Un panneau nvim ouvert sur un fichier TypeScript avec onglets Claude Code, nvim et zsh et la barre de touches.',
    entries: [
      {
        term: 'Espaces, groupes et terminaux',
        detail:
          'Trois niveaux : espace · groupe.panneau. Un espace correspond à un projet, un groupe regroupe plusieurs terminaux, et un terminal est un shell. Muqun affiche un terminal à la fois en plein écran, sans découper l’affichage mobile de façon illisible.',
      },
      {
        term: 'Changer de vue',
        detail:
          'Faites glisser la pilule de titre en haut pour changer d’espace de travail. Les puces au-dessus de la saisie basculent entre les terminaux d’un même groupe.',
      },
      {
        term: 'Panneau des processus',
        detail:
          'Le tiroir liste tous les espaces, groupes et terminaux actifs de la machine. Un appui long permet d’accéder aux actions de fermeture en toute sécurité.',
      },
      {
        term: 'Barre de touches dédiée',
        detail:
          'La bande au-dessus du champ de saisie fournit les touches essentielles absentes du clavier mobile : Échap, Tab, ⌃C, flèches, ainsi que des touches contextuelles adaptées à l’application en cours (⇧TAB et ⌃O sous Claude Code, :w et gg sous nvim). Désactivable dans Réglages → Terminal.',
      },
      {
        term: 'Zone de composition (Composer)',
        detail:
          'Police à chasse fixe, multiligne, touche Entrée dédiée aux retours à la ligne — l’envoi se fait par un bouton pour éviter toute exécution accidentelle.',
      },
      {
        term: 'Historique de défilement',
        detail:
          'Tirez vers le bas depuis le haut du terminal pour charger l’historique. Un bouton « Dernier » apparaît dès que vous quittez le bas de page pour y revenir instantanément sans être interrompu par les nouveaux flux.',
      },
      {
        term: 'Modifications Git (Changes)',
        detail:
          'Consultez l’état Git du répertoire : fichiers modifiés, filtres Staged/Unstaged et diffs inline. Visible uniquement quand le panneau est dans un dépôt Git compatible.',
      },
      {
        term: 'Fichiers (Files)',
        detail:
          'Accédez aux fichiers générés pendant vos sessions — images, code et documents — lisibles sans quitter l’application.',
      },
      {
        term: 'Ouvrir dans le navigateur',
        detail:
          'Entrez le port de votre serveur de dev local et Muqun l’ouvre à travers le tunnel existant, sans publication sur Internet.',
      },
      {
        term: 'Actions rapides',
        detail:
          'Commandes enregistrées, prompts favoris et combinaisons de touches fréquentes. Entièrement personnalisables.',
      },
    ],
    note: 'Muqun reste un observateur : ouvrir une session ne modifie pas votre agencement et fermer l’application n’arrête aucun processus.',
  },

  opencode: {
    eyebrow: 'opencode serve --service',
    heading: 'L’agent OpenCode.',
    lead: 'Une interface pensée spécifiquement pour OpenCode plutôt qu’un simple agent dans un terminal : basculez entre vos sessions, inspectez les diffs de chaque outil sous forme de cartes et répondez aux questions en un clic.',
    noSignInBadge: 'RUNTIME LOCAL · AUCUN COMPTE REQUIS',
    noSignInHeading: 'Votre ordinateur discute directement avec vos fournisseurs d’IA.',
    noSignIn:
      'Aucune connexion nécessaire. Muqun ne gère aucun compte et ne vous demande aucune clé d’API. C’est OpenCode sur votre ordinateur qui communique directement avec vos fournisseurs. La Gateway ne fait transiter aucun identifiant.',
    prerequisitesHeading: 'Prérequis',
    prerequisites: [
      'OpenCode 2.0.1 ou plus récent installé sur le même ordinateur que la Gateway.',
      'Au moins un fournisseur configuré dans OpenCode (filtre dédié aux modèles gratuits inclus).',
      'Le service OpenCode actif (démarré ou rattaché automatiquement par la Gateway).',
      'Une version récente de la Gateway compatible avec l’interface agent.',
    ],
    entries: [
      {
        term: 'Sessions et sous-agents',
        detail:
          'Chaque session possède son propre contexte. Si une tâche délègue à des sous-agents, ils apparaissent en retrait sous la session principale pour une lecture claire.',
      },
      {
        term: 'Espaces de travail',
        detail:
          'Changez le répertoire de travail de l’agent en un clin d’œil. Choisir un espace rouvre directement sa dernière session active.',
      },
      {
        term: 'Modèles et profils d’agents',
        detail:
          'Sélectionnez parmi vos modèles configurés avec affichage de la taille de fenêtre contextuelle et badge Free. Basculez entre Build, Plan, Explore et vos agents sur mesure.',
      },
      {
        term: 'Commandes / et compétences',
        detail:
          'Tapez / dans la saisie. Certaines commandes sont traitées directement par l’application (/new, /models, /undo) ; les autres s’exécutent sur l’hôte.',
      },
      {
        term: 'Pièces jointes et mentions @',
        detail:
          'Envoyez des photos ou des fichiers. Les images sont réencodées pour purger les métadonnées EXIF. Tapez @ pour cibler un fichier du projet sans devoir décrire son chemin.',
      },
      {
        term: 'Permissions et questions',
        detail:
          'Lorsque l’agent s’apprête à exécuter une commande ou modifier un fichier, une carte vous invite à choisir : Autoriser, Toujours autoriser ou Refuser (accessible également depuis les notifications).',
      },
      {
        term: 'Tâches d’arrière-plan et file d’attente',
        detail:
          'Détachez les opérations longues en arrière-plan. Pendant qu’un tour s’exécute, vos nouveaux messages peuvent intervenir immédiatement ou être mis en attente.',
      },
      {
        term: 'Contexte et compaction',
        detail:
          'Surveillez l’utilisation de la fenêtre contextuelle, les jetons consommés et l’estimation du coût. Les synthèses automatiques d’historique sont signalées dans la chronologie.',
      },
      {
        term: 'Annulation (Undo)',
        detail:
          '/undo rétablit l’espace de travail à l’état précédant votre dernier message ; /redo annule l’opération. Conçu volontairement sous forme de commande pour éviter les fausses manipulations.',
      },
    ],
    note: 'Les appels d’outils s’affichent sous forme de cartes avec diffs unifiés, exactement comme dans la vue Modifications.',
  },

  themes: {
    eyebrow: 'muqun.dev/themes',
    heading: 'Thèmes.',
    lead: 'Un thème transforme à la fois l’application et le terminal. Chaque pack inclut une déclinaison claire et une déclinaison sombre. 24 packs sont fournis d’office ; explorez le catalogue communautaire pour en découvrir davantage.',
    entries: [
      {
        term: '24 packs intégrés',
        detail:
          'Dans Réglages → Apparence → Thème, retrouvez Catppuccin, Gruvbox, Kanagawa, Rosé Pine, Tokyo Night et Everforest.',
      },
      {
        term: 'Parcourir le catalogue',
        detail:
          'Consultez le catalogue officiel sur muqun.dev. Aucun téléchargement ne s’effectue avant d’ouvrir une fiche, et le poids du pack est précisé à l’avance.',
      },
      {
        term: 'Structure d’un thème',
        detail:
          'Un fichier .muqun-theme est une archive zip contenant theme.json et un dossier assets d’images. .muqun-theme.json est la version textuelle sans images.',
      },
      {
        term: 'Personnalisations couvertes',
        detail:
          '17 couleurs d’interface par mode, couleurs du terminal (curseur, sélection, 16 slots ANSI), illustrations pour 11 écrans et icônes d’actions.',
      },
      {
        term: 'Limites de taille',
        detail:
          'Manifeste jusqu’à 256 KiB, jusqu’à 32 images de 8 MiB max chacune, 25 MiB maximum pour l’archive globale.',
      },
      {
        term: 'Installer depuis un fichier',
        detail:
          'Ouvrez un .muqun-theme depuis vos fichiers ou via AirDrop, ou utilisez « Importer un fichier » dans l’application.',
      },
      {
        term: 'Installer depuis un lien',
        detail:
          'Indiquez une URL ou un dépôt GitHub. La provenance des ressources est contrôlée avant le téléchargement.',
      },
      {
        term: 'Installer depuis le terminal',
        detail:
          'Touchez un chemin .muqun-theme dans la sortie console pour obtenir une prévisualisation instantanée.',
      },
      {
        term: 'Aperçu avant application',
        detail:
          'Le thème s’applique temporairement à l’ensemble de l’application pour vous permettre de naviguer avant de confirmer l’application définitive.',
      },
      {
        term: 'Opacité d’arrière-plan',
        detail:
          'Ajustez séparément l’opacité du fond de l’interface et celle du terminal pour laisser transparaître vos fonds d’écran.',
      },
      {
        term: 'Créer votre thème',
        detail:
          'Grâce à la compétence agent dédiée intégrée à Muqun, décrivez simplement le style désiré pour obtenir un thème prêt à l’emploi.',
      },
      {
        term: 'Publier dans le catalogue',
        detail:
          'Le catalogue est un dépôt GitHub public. Soumettez une Pull Request pour être référencé sur muqun.dev en quelques minutes.',
      },
      {
        term: 'Supprimer des thèmes',
        detail:
          'Glissez sur une ligne dans la liste des thèmes pour le désinstaller. Réglages → Stockage permet de nettoyer les thèmes inutilisés.',
      },
    ],
    galleryLink: 'Parcourir le catalogue de thèmes',
  },

  troubleshooting: {
    eyebrow: 'when it does not connect',
    heading: 'Dépannage.',
    lead: 'La majorité des problèmes de connexion proviennent de l’une de ces 4 causes : la Gateway est arrêtée, l’adresse est inaccessible, l’appairage a sauté ou OpenCode est hors ligne.',
    checksHeading: 'Vérifications rapides',
    checks: [
      {
        term: 'Appairer un ordinateur',
        detail:
          'Installez la Gateway (compatible tmux ou Herdr), ouvrez le gestionnaire, scannez le QR avec Muqun et saisissez le code affiché à l’écran.',
      },
      {
        term: 'Rétablir une connexion',
        detail:
          'Vérifiez que tmux ou Herdr 0.7.5+ et la Gateway sont lancés. Assurez-vous que les deux appareils accèdent à la même adresse privée.',
      },
      {
        term: 'Supprimer un appareil',
        detail:
          'Supprimez le serveur depuis l’écran d’accueil pour révoquer l’accès du téléphone. Vous pouvez aussi le faire depuis le gestionnaire de la Gateway.',
      },
      {
        term: 'Réactiver les notifications',
        detail:
          'Activez les notifications dans les réglages système du téléphone et dans Muqun. Rouvrez le serveur pour réenregistrer le jeton auprès de la Gateway.',
      },
    ],
    entries: [
      {
        term: 'Impossible d’appairer',
        detail:
          'Le message « Could not reach the gateway » indique que le téléphone ne peut joindre l’adresse du QR. Vérifiez muqun-gateway status sur l’ordinateur et assurez-vous d’être sur le même Wi-Fi ou le même tailnet Tailscale. Une Gateway liée à 127.0.0.1 n’est pas accessible de l’extérieur ; changez son adresse avec u dans le gestionnaire.',
      },
      {
        term: 'Code refusé ou expiré',
        detail:
          'Le code comporte 8 caractères et expire au bout de 5 minutes ou 8 échecs. Appuyez sur p dans le gestionnaire pour régénérer un QR et un code frais. Les caractères ambigus (0, 1, I, L, O) sont exclus.',
      },
      {
        term: 'Signification de la pastille',
        detail:
          'Une pastille pleine indique une réponse confirmée (vert pour ONLINE, gris pour OFFLINE). Un cercle vide avec NOT CONNECTED signifie qu’aucun test n’a encore eu lieu ; touchez pour ouvrir le serveur.',
      },
      {
        term: 'Demande de nouvel appairage',
        detail:
          'Le jeton de cet appareil a été révoqué ou perdu lors d’une réinitialisation de la Gateway. Il suffit de réappairer en scannant le QR code à nouveau.',
      },
      {
        term: 'OpenCode introuvable',
        detail:
          'Si l’écran agent indique OpenCode service offline, lancez opencode serve --service sur l’hôte et touchez Revérifier. Si le service tourne déjà, indiquez son chemin absolu dans config.json sous opencode.binary.',
      },
      {
        term: 'Modèles grisés ou aucun gratuit',
        detail:
          '« À configurer sur l’hôte » signifie que le fournisseur n’est pas paramétré dans OpenCode. Désactivez le filtre « Gratuit uniquement » si vous souhaitez afficher l’ensemble des modèles disponibles.',
      },
      {
        term: 'L’agent veut sortir du workspace',
        detail:
          'Les demandes de lecture ou d’écriture hors de l’espace de travail affichent le chemin cible exact. Vérifiez attentivement le chemin avant d’accorder l’autorisation.',
      },
      {
        term: 'Bouton Modifications absent',
        detail:
          'Il n’apparaît que lorsque le terminal se trouve dans un dépôt Git et que la Gateway supporte la fonctionnalité Diff. Mettez à jour votre Gateway si nécessaire.',
      },
      {
        term: 'Gateway plus récente requise',
        detail:
          'Les anciennes versions continuent de fonctionner comme terminal. La collaboration multi-agents requiert Herdr 0.9.0 ou supérieur sur la session.',
      },
      {
        term: 'Hôte derrière un proxy',
        detail:
          'C’est votre ordinateur qui dialogue avec vos fournisseurs d’IA. Si un proxy est requis, configurez-le directement dans OpenCode sur la machine.',
      },
    ],
  },

  contact: {
    eyebrow: 'github · issues',
    heading: 'Encore bloqué ?',
    lead: 'Ouvrez un ticket sur GitHub. Tous les retours sont lus attentivement et nourrissent les futures versions.',
    reportHint:
      'Précisez la version de l’application, celle de la Gateway et l’action réalisée juste avant l’erreur.',
    issueCta: 'Ouvrir un ticket sur GitHub',
    safetyHeading: 'Confidentialité et signalement sécurisé',
    safetyBody:
      'L’assistance n’a jamais besoin de vos jetons d’accès, de vos sorties terminal complètes, de votre code source ou de vos QR codes. Masquez toute information sensible avant de joindre des captures d’écran ou des logs.',
    safetyLink: 'Lire la politique de confidentialité',
  },
};
