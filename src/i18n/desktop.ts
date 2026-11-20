import type { SiteLocale } from "@/lib/locales";

type Entry = readonly [title: string, body: string];
export interface DesktopCopy {
  lead: string;
  accent: string;
  intro: string;
  guide: string;
  agents: string;
  workspace: string;
  features: readonly [Entry, Entry, Entry];
  routine: string;
  steps: readonly [Entry, Entry, Entry];
  connection: string;
  local: Entry;
  remote: Entry;
  ready: string;
  guideTitle: string;
  installation: string;
  compatibility: string;
  start: string;
  shortcuts: string;
  keys: readonly [string, string, string, string, string, string];
  troubleshooting: string;
  fixes: readonly [Entry, Entry, Entry];
  back: string;
}

export const desktopCopy: Record<SiteLocale, DesktopCopy> = {
  en: {
    lead: "Your agents.",
    accent: "A proper desktop.",
    intro:
      "Conversations, code, terminals and decisions. Bring your coding agents into one native workspace, on your computer and the computers you pair.",
    guide: "Installation & guide",
    agents: "Your existing agents. Your existing login.",
    workspace: "Keep the work in view.",
    features: [
      [
        "A conversation with context.",
        "Follow streaming replies, tool activity and code changes together. Add files, choose a model and keep a draft for each session.",
      ],
      [
        "Space to work side by side.",
        "Arrange conversations, terminals and file viewers in split panes. Keep the context you need beside the work you are doing.",
      ],
      [
        "Know when it needs you.",
        "Review waiting permissions and questions in Inbox. Open the session, make the decision and let the work continue.",
      ],
    ],
    routine: "From an idea to the next change.",
    steps: [
      [
        "Choose your starting point",
        "Pick a computer, installed agent and project folder. Use the agent’s existing authentication.",
      ],
      [
        "Give the work some room",
        "Send a goal, attach context and open a second pane when you need it. Review tool calls and changes as they arrive.",
      ],
      [
        "Stay with the thread",
        "Find sessions in the sidebar or command palette. Return to a draft, answer a question or continue the conversation.",
      ],
    ],
    connection: "At home on your computer. Connected to your others.",
    local: [
      "Work locally",
      "Desktop can run the agents plane in process. A separate Gateway service is not required for local coding-agent sessions.",
    ],
    remote: [
      "Reach another computer",
      "Pair a Gateway to work with its sessions. With a local Gateway service, Desktop and the mobile app can use the same sessions.",
    ],
    ready: "Make room for your next project.",
    guideTitle: "Desktop, from setup to everyday use.",
    installation: "Choose the right starting point.",
    compatibility:
      "Windows and Intel macOS packages are not included in the preview targets. Linux needs a compatible GPU stack and session D-Bus; embedded web content also needs WebKitGTK 4.1. Optional remote features depend on the connected Gateway and agent capabilities.",
    start: "Your first session.",
    shortcuts: "A few keys go a long way.",
    keys: [
      "Command palette",
      "Jump to a session",
      "Toggle sidebar",
      "Keyboard shortcuts",
      "Send message",
      "New line",
    ],
    troubleshooting: "When something is missing.",
    fixes: [
      [
        "An agent is unavailable",
        "Install and sign in to its CLI first. Check Settings → Agents, including the executable path and any provider-specific connection settings. Desktop does not sign in for you.",
      ],
      [
        "A remote feature is unavailable",
        "Check the selected computer and its Gateway connection. Some tools require newer Gateway capabilities; update only from the appropriate release channel.",
      ],
      [
        "Updating a candidate",
        "Close Desktop before replacing it, then reopen it. Keep configuration and conversation data. Updating Desktop alone does not require restarting a shared agent backend.",
      ],
    ],
    back: "Explore Desktop",
  },
  "zh-CN": {
    lead: "你的智能体。",
    accent: "完整的桌面工作台。",
    intro:
      "对话、代码、终端和决策，尽在同一个原生工作空间。连接本机或已配对的其他电脑，继续你的开发工作。",
    guide: "安装与使用指南",
    agents: "沿用你的智能体和登录。",
    workspace: "让工作始终在眼前。",
    features: [
      [
        "带着上下文对话。",
        "一起查看流式回复、工具活动和代码修改。添加文件、选择模型，并为每个会话保留草稿。",
      ],
      [
        "并排展开工作。",
        "将对话、终端和文件预览安排在分栏中，让所需上下文始终陪伴当前工作。",
      ],
      [
        "及时处理需要你的事。",
        "在收件箱查看待审批权限和问题。打开会话、作出决定，让工作继续。",
      ],
    ],
    routine: "从想法到下一次修改。",
    steps: [
      [
        "选择起点",
        "选择电脑、已安装的智能体和项目文件夹，沿用智能体现有的身份验证。",
      ],
      [
        "展开工作空间",
        "发送目标、附加上下文，按需打开第二个面板，随时查看工具调用和修改。",
      ],
      [
        "延续对话",
        "通过侧栏或命令面板找到会话，返回草稿、回答问题或继续讨论。",
      ],
    ],
    connection: "立足本机，连接你的其他电脑。",
    local: [
      "在本机工作",
      "Desktop 可在进程内运行智能体服务。本机编程会话不需要独立的 Gateway 服务。",
    ],
    remote: [
      "连接其他电脑",
      "配对 Gateway 后即可使用该电脑的会话。本机运行 Gateway 服务时，Desktop 和手机 App 可使用相同会话。",
    ],
    ready: "为下一个项目留出空间。",
    guideTitle: "Desktop：从安装到日常使用。",
    installation: "选择适合的起点。",
    compatibility:
      "预览目标不包含 Windows 和 Intel macOS 安装包。Linux 需要兼容的 GPU 驱动和会话 D-Bus，嵌入式网页还需要 WebKitGTK 4.1。远程可选功能取决于所连接的 Gateway 和智能体能力。",
    start: "开始第一个会话。",
    shortcuts: "几个快捷键，让操作更顺手。",
    keys: [
      "命令面板",
      "跳转到会话",
      "切换侧栏",
      "快捷键列表",
      "发送消息",
      "换行",
    ],
    troubleshooting: "遇到缺失功能时。",
    fixes: [
      [
        "智能体不可用",
        "先安装其 CLI 并登录。检查设置 → 智能体中的可执行文件路径及服务连接设置。Desktop 不会代你登录。",
      ],
      [
        "远程功能不可用",
        "检查所选电脑及 Gateway 连接。部分工具需要更新的 Gateway 能力，请使用对应发布渠道更新。",
      ],
      [
        "更新候选构建",
        "替换前先关闭 Desktop，再重新打开。保留配置和对话数据。仅更新 Desktop 无需重启共享智能体后端。",
      ],
    ],
    back: "了解 Desktop",
  },
  "zh-TW": {
    lead: "你的智慧體。",
    accent: "完整的桌面工作空間。",
    intro:
      "對話、程式碼、終端機與決策，盡在同一個原生工作空間。連接本機或已配對的其他電腦，繼續你的開發工作。",
    guide: "安裝與使用指南",
    agents: "沿用你的智慧體與登入。",
    workspace: "讓工作始終在眼前。",
    features: [
      [
        "帶著上下文對話。",
        "一起查看串流回覆、工具活動與程式碼變更。加入檔案、選擇模型，並為每個工作階段保留草稿。",
      ],
      [
        "並排展開工作。",
        "將對話、終端機與檔案預覽安排在分割窗格中，讓所需上下文陪伴目前工作。",
      ],
      [
        "及時處理需要你的事。",
        "在收件匣查看待核准權限與問題。開啟工作階段、作出決定，讓工作繼續。",
      ],
    ],
    routine: "從想法到下一次變更。",
    steps: [
      [
        "選擇起點",
        "選擇電腦、已安裝的智慧體與專案資料夾，沿用智慧體現有的驗證。",
      ],
      [
        "展開工作空間",
        "傳送目標、附加上下文，按需開啟第二個窗格，查看工具呼叫與變更。",
      ],
      [
        "延續對話",
        "透過側欄或命令面板找到工作階段，返回草稿、回答問題或繼續討論。",
      ],
    ],
    connection: "立足本機，連接你的其他電腦。",
    local: [
      "在本機工作",
      "Desktop 可在程序內執行智慧體服務。本機程式開發工作階段不需要獨立的 Gateway 服務。",
    ],
    remote: [
      "連接其他電腦",
      "配對 Gateway 後即可使用該電腦的工作階段。本機執行 Gateway 服務時，Desktop 與手機 App 可使用相同工作階段。",
    ],
    ready: "為下一個專案留出空間。",
    guideTitle: "Desktop：從安裝到日常使用。",
    installation: "選擇適合的起點。",
    compatibility:
      "預覽目標不包含 Windows 與 Intel macOS 套件。Linux 需要相容的 GPU 驅動與工作階段 D-Bus，內嵌網頁還需要 WebKitGTK 4.1。遠端選用功能取決於所連接的 Gateway 與智慧體能力。",
    start: "開始第一個工作階段。",
    shortcuts: "幾個快捷鍵，讓操作更順手。",
    keys: [
      "命令面板",
      "跳至工作階段",
      "切換側欄",
      "快捷鍵列表",
      "傳送訊息",
      "換行",
    ],
    troubleshooting: "遇到缺少功能時。",
    fixes: [
      [
        "智慧體無法使用",
        "先安裝其 CLI 並登入。檢查設定 → 智慧體中的執行檔路徑與服務連線設定。Desktop 不會代你登入。",
      ],
      [
        "遠端功能無法使用",
        "檢查所選電腦與 Gateway 連線。部分工具需要更新的 Gateway 能力，請使用對應發佈管道更新。",
      ],
      [
        "更新候選版本",
        "替換前先關閉 Desktop，再重新開啟。保留設定與對話資料。僅更新 Desktop 無需重新啟動共用智慧體後端。",
      ],
    ],
    back: "探索 Desktop",
  },
  ja: {
    lead: "あなたのエージェントに。",
    accent: "専用のデスクトップを。",
    intro:
      "会話、コード、ターミナル、判断をひとつのネイティブな作業空間へ。このコンピュータでも、ペアリングした別のコンピュータでも。",
    guide: "インストールとガイド",
    agents: "いつものエージェント。いつものログイン。",
    workspace: "作業の全体像を、そのままに。",
    features: [
      [
        "文脈のある会話。",
        "ストリーミング応答、ツールの動作、コードの変更をまとめて確認。ファイルやモデルを選び、セッションごとに下書きを残せます。",
      ],
      [
        "並べて作業できる広さ。",
        "会話、ターミナル、ファイルビューアを分割ペインに配置。必要な文脈を作業の隣に置けます。",
      ],
      [
        "あなたの出番を見逃さない。",
        "Inbox で保留中の権限や質問を確認。セッションを開いて判断すれば、作業を続けられます。",
      ],
    ],
    routine: "アイデアから、次の変更まで。",
    steps: [
      [
        "出発点を選ぶ",
        "コンピュータ、インストール済みエージェント、プロジェクトフォルダを選択。エージェントの既存の認証を使います。",
      ],
      [
        "作業を広げる",
        "目標と資料を送り、必要に応じて別のペインを開きます。ツール呼び出しや変更をその場で確認できます。",
      ],
      [
        "会話をつなぐ",
        "サイドバーやコマンドパレットからセッションへ。下書きに戻り、質問に答え、会話を続けられます。",
      ],
    ],
    connection: "このコンピュータを拠点に、ほかのコンピュータへ。",
    local: [
      "ローカルで作業",
      "Desktop はプロセス内でエージェント機能を実行できます。ローカルのコーディングセッションに別の Gateway サービスは不要です。",
    ],
    remote: [
      "別のコンピュータへ",
      "Gateway をペアリングして、そのセッションを利用。ローカル Gateway があれば Desktop とモバイルアプリで同じセッションを使えます。",
    ],
    ready: "次のプロジェクトのための場所を。",
    guideTitle: "Desktop の設定から日々の使い方まで。",
    installation: "適した始め方を選ぶ。",
    compatibility:
      "Windows と Intel macOS のパッケージは対象外です。Linux には対応 GPU 環境とセッション D-Bus、埋め込み Web コンテンツには WebKitGTK 4.1 が必要です。リモートの追加機能は接続先 Gateway とエージェントに依存します。",
    start: "最初のセッション。",
    shortcuts: "よく使うキーを覚える。",
    keys: [
      "コマンドパレット",
      "セッションへ移動",
      "サイドバー切替",
      "ショートカット一覧",
      "メッセージを送信",
      "改行",
    ],
    troubleshooting: "うまく見つからないとき。",
    fixes: [
      [
        "エージェントが使えない",
        "先に CLI をインストールし、ログインしてください。Settings → Agents で実行ファイルのパスや接続設定を確認します。Desktop が代わりにログインすることはありません。",
      ],
      [
        "リモート機能が使えない",
        "選択したコンピュータと Gateway の接続を確認してください。一部のツールには新しい Gateway が必要です。適切なリリースチャンネルで更新してください。",
      ],
      [
        "候補ビルドの更新",
        "Desktop を閉じてから置き換え、再び開いてください。設定と会話データは残してください。Desktop だけの更新で共有エージェントを再起動する必要はありません。",
      ],
    ],
    back: "Desktop を見る",
  },
  ko: {
    lead: "나의 에이전트.",
    accent: "제대로 된 데스크톱.",
    intro:
      "대화, 코드, 터미널, 의사 결정을 하나의 네이티브 작업 공간으로. 내 컴퓨터와 페어링한 다른 컴퓨터에서 코딩 에이전트와 함께하세요.",
    guide: "설치 및 사용 안내",
    agents: "기존 에이전트와 기존 로그인 그대로.",
    workspace: "작업을 한눈에.",
    features: [
      [
        "맥락이 이어지는 대화.",
        "스트리밍 답변, 도구 활동, 코드 변경을 함께 확인하세요. 파일과 모델을 선택하고 세션마다 초안을 유지합니다.",
      ],
      [
        "나란히 펼치는 작업.",
        "대화, 터미널, 파일 뷰어를 분할 창에 배치하세요. 필요한 맥락을 지금 하는 작업 곁에 둘 수 있습니다.",
      ],
      [
        "내가 필요할 때 알기.",
        "Inbox에서 대기 중인 권한과 질문을 확인하세요. 세션을 열고 결정하면 작업이 이어집니다.",
      ],
    ],
    routine: "아이디어에서 다음 변경까지.",
    steps: [
      [
        "시작점 선택",
        "컴퓨터, 설치된 에이전트, 프로젝트 폴더를 고릅니다. 에이전트의 기존 인증을 사용합니다.",
      ],
      [
        "작업 공간 펼치기",
        "목표와 맥락을 보내고 필요하면 두 번째 창을 여세요. 도구 호출과 변경 사항을 확인할 수 있습니다.",
      ],
      [
        "대화 이어가기",
        "사이드바나 명령 팔레트에서 세션을 찾으세요. 초안으로 돌아가거나 질문에 답하고 대화를 이어갑니다.",
      ],
    ],
    connection: "내 컴퓨터를 중심으로, 다른 컴퓨터까지.",
    local: [
      "로컬에서 작업",
      "Desktop은 프로세스 안에서 에이전트 기능을 실행할 수 있습니다. 로컬 코딩 세션에는 별도 Gateway 서비스가 필요하지 않습니다.",
    ],
    remote: [
      "다른 컴퓨터 연결",
      "Gateway를 페어링하여 해당 세션을 사용하세요. 로컬 Gateway가 있으면 Desktop과 모바일 앱이 같은 세션을 사용할 수 있습니다.",
    ],
    ready: "다음 프로젝트를 위한 공간.",
    guideTitle: "Desktop 설정부터 일상적인 사용까지.",
    installation: "적합한 시작점 선택.",
    compatibility:
      "Windows와 Intel macOS 패키지는 프리뷰 대상에 포함되지 않습니다. Linux에는 호환 GPU 환경과 세션 D-Bus가 필요하며 내장 웹 콘텐츠에는 WebKitGTK 4.1도 필요합니다. 원격 선택 기능은 연결된 Gateway와 에이전트의 기능에 따라 달라집니다.",
    start: "첫 번째 세션.",
    shortcuts: "자주 쓰는 단축키.",
    keys: [
      "명령 팔레트",
      "세션으로 이동",
      "사이드바 전환",
      "단축키 목록",
      "메시지 보내기",
      "줄 바꿈",
    ],
    troubleshooting: "무언가 보이지 않을 때.",
    fixes: [
      [
        "에이전트를 사용할 수 없음",
        "먼저 CLI를 설치하고 로그인하세요. Settings → Agents에서 실행 파일 경로와 연결 설정을 확인합니다. Desktop이 대신 로그인하지는 않습니다.",
      ],
      [
        "원격 기능을 사용할 수 없음",
        "선택한 컴퓨터와 Gateway 연결을 확인하세요. 일부 도구는 새로운 Gateway 기능이 필요합니다. 적절한 릴리스 채널에서 업데이트하세요.",
      ],
      [
        "후보 빌드 업데이트",
        "교체 전에 Desktop을 닫고 다시 여세요. 설정과 대화 데이터는 유지하세요. Desktop만 업데이트할 때 공유 에이전트 백엔드를 재시작할 필요는 없습니다.",
      ],
    ],
    back: "Desktop 둘러보기",
  },
  de: {
    lead: "Deine Agenten.",
    accent: "Ein echter Desktop.",
    intro:
      "Gespräche, Code, Terminals und Entscheidungen. Deine Coding-Agenten in einem nativen Arbeitsbereich – auf diesem und deinen gekoppelten Computern.",
    guide: "Installation & Anleitung",
    agents: "Deine Agenten. Deine bestehenden Logins.",
    workspace: "Die Arbeit im Blick behalten.",
    features: [
      [
        "Gespräche mit Kontext.",
        "Verfolge Antworten, Werkzeugaktivität und Codeänderungen gemeinsam. Füge Dateien hinzu, wähle ein Modell und behalte pro Sitzung einen Entwurf.",
      ],
      [
        "Platz für parallele Arbeit.",
        "Ordne Gespräche, Terminals und Dateiansichten in geteilten Bereichen an. Der nötige Kontext bleibt direkt neben deiner Arbeit.",
      ],
      [
        "Wissen, wann du gebraucht wirst.",
        "Prüfe ausstehende Berechtigungen und Fragen in Inbox. Öffne die Sitzung, entscheide und lass die Arbeit weitergehen.",
      ],
    ],
    routine: "Von der Idee zur nächsten Änderung.",
    steps: [
      [
        "Startpunkt wählen",
        "Wähle Computer, installierten Agenten und Projektordner. Die bestehende Anmeldung des Agenten bleibt erhalten.",
      ],
      [
        "Raum für die Arbeit",
        "Sende ein Ziel, füge Kontext hinzu und öffne bei Bedarf einen zweiten Bereich. Verfolge Werkzeugaufrufe und Änderungen.",
      ],
      [
        "Den Faden behalten",
        "Finde Sitzungen in der Seitenleiste oder Befehlspalette. Kehre zum Entwurf zurück, beantworte Fragen und setze das Gespräch fort.",
      ],
    ],
    connection: "Auf deinem Computer zu Hause. Mit deinen anderen verbunden.",
    local: [
      "Lokal arbeiten",
      "Desktop kann die Agenten direkt im Prozess betreiben. Für lokale Coding-Sitzungen ist kein separater Gateway-Dienst erforderlich.",
    ],
    remote: [
      "Andere Computer erreichen",
      "Kopple einen Gateway, um seine Sitzungen zu nutzen. Mit einem lokalen Gateway können Desktop und mobile App dieselben Sitzungen verwenden.",
    ],
    ready: "Platz für dein nächstes Projekt.",
    guideTitle: "Desktop: Einrichtung und tägliche Arbeit.",
    installation: "Den richtigen Einstieg wählen.",
    compatibility:
      "Windows und Intel macOS gehören nicht zu den Preview-Paketen. Linux benötigt einen kompatiblen GPU-Stack und Sitzungs-D-Bus; eingebettete Webinhalte benötigen WebKitGTK 4.1. Optionale Remote-Funktionen hängen von Gateway und Agent ab.",
    start: "Deine erste Sitzung.",
    shortcuts: "Wenige Tasten, kurze Wege.",
    keys: [
      "Befehlspalette",
      "Zur Sitzung springen",
      "Seitenleiste umschalten",
      "Tastenkürzel",
      "Nachricht senden",
      "Neue Zeile",
    ],
    troubleshooting: "Wenn etwas fehlt.",
    fixes: [
      [
        "Agent nicht verfügbar",
        "Installiere die CLI und melde dich an. Prüfe Settings → Agents, den Programmpfad und die Verbindungseinstellungen. Desktop meldet dich nicht automatisch an.",
      ],
      [
        "Remote-Funktion nicht verfügbar",
        "Prüfe den ausgewählten Computer und die Gateway-Verbindung. Manche Werkzeuge brauchen neuere Gateway-Funktionen. Nutze den passenden Veröffentlichungskanal.",
      ],
      [
        "Kandidaten aktualisieren",
        "Schließe Desktop vor dem Ersetzen und öffne es danach erneut. Behalte Konfiguration und Gespräche. Ein Desktop-Update allein erfordert keinen Neustart des gemeinsamen Agenten-Backends.",
      ],
    ],
    back: "Desktop entdecken",
  },
  fr: {
    lead: "Vos agents.",
    accent: "Un vrai bureau.",
    intro:
      "Conversations, code, terminaux et décisions. Réunissez vos agents de développement dans un espace natif, sur votre ordinateur et ceux que vous associez.",
    guide: "Installation et guide",
    agents: "Vos agents. Vos connexions habituelles.",
    workspace: "Gardez le travail en vue.",
    features: [
      [
        "Une conversation en contexte.",
        "Suivez ensemble les réponses, les outils et les modifications du code. Ajoutez des fichiers, choisissez un modèle et gardez un brouillon par session.",
      ],
      [
        "De la place pour travailler côte à côte.",
        "Disposez conversations, terminaux et fichiers dans des volets séparés. Le contexte nécessaire reste à côté du travail en cours.",
      ],
      [
        "Sachez quand intervenir.",
        "Consultez les autorisations et questions en attente dans Inbox. Ouvrez la session, prenez une décision et poursuivez le travail.",
      ],
    ],
    routine: "De l’idée à la prochaine modification.",
    steps: [
      [
        "Choisir un point de départ",
        "Sélectionnez un ordinateur, un agent installé et un dossier de projet. Utilisez l’authentification existante de l’agent.",
      ],
      [
        "Donner de l’espace au travail",
        "Envoyez un objectif, ajoutez du contexte et ouvrez un second volet si nécessaire. Suivez les outils et les modifications.",
      ],
      [
        "Garder le fil",
        "Retrouvez les sessions dans la barre latérale ou la palette de commandes. Revenez au brouillon, répondez ou poursuivez la conversation.",
      ],
    ],
    connection: "Chez vous sur votre ordinateur. Relié à vos autres machines.",
    local: [
      "Travailler en local",
      "Desktop peut exécuter les agents dans son propre processus. Aucun service Gateway séparé n’est nécessaire pour les sessions de développement locales.",
    ],
    remote: [
      "Accéder à un autre ordinateur",
      "Associez un Gateway pour utiliser ses sessions. Avec un Gateway local, Desktop et l’application mobile peuvent utiliser les mêmes sessions.",
    ],
    ready: "Une place pour votre prochain projet.",
    guideTitle: "Desktop, de la configuration au quotidien.",
    installation: "Choisir le bon départ.",
    compatibility:
      "Windows et macOS Intel ne font pas partie des paquets de préversion. Linux nécessite un environnement GPU compatible et un D-Bus de session ; le Web intégré nécessite WebKitGTK 4.1. Les fonctions distantes optionnelles dépendent du Gateway et de l’agent.",
    start: "Votre première session.",
    shortcuts: "Quelques touches suffisent.",
    keys: [
      "Palette de commandes",
      "Aller à une session",
      "Afficher la barre latérale",
      "Raccourcis clavier",
      "Envoyer le message",
      "Nouvelle ligne",
    ],
    troubleshooting: "Si quelque chose manque.",
    fixes: [
      [
        "Agent indisponible",
        "Installez sa CLI et connectez-vous. Vérifiez Settings → Agents, le chemin de l’exécutable et les paramètres de connexion. Desktop ne vous connecte pas automatiquement.",
      ],
      [
        "Fonction distante indisponible",
        "Vérifiez l’ordinateur sélectionné et sa connexion Gateway. Certains outils nécessitent des capacités plus récentes. Utilisez le canal de publication approprié.",
      ],
      [
        "Mettre à jour une version candidate",
        "Fermez Desktop avant de le remplacer, puis rouvrez-le. Conservez configuration et conversations. Une mise à jour de Desktop seule ne nécessite pas de redémarrer les agents partagés.",
      ],
    ],
    back: "Découvrir Desktop",
  },
  es: {
    lead: "Tus agentes.",
    accent: "Un escritorio de verdad.",
    intro:
      "Conversaciones, código, terminales y decisiones. Reúne tus agentes de programación en un espacio nativo, en tu ordenador y en los que emparejes.",
    guide: "Instalación y guía",
    agents: "Tus agentes. Tus inicios de sesión.",
    workspace: "Mantén el trabajo a la vista.",
    features: [
      [
        "Una conversación con contexto.",
        "Sigue las respuestas, las herramientas y los cambios de código juntos. Añade archivos, elige un modelo y conserva un borrador por sesión.",
      ],
      [
        "Espacio para trabajar en paralelo.",
        "Organiza conversaciones, terminales y archivos en paneles divididos. Mantén el contexto que necesitas junto al trabajo actual.",
      ],
      [
        "Sabe cuándo te necesita.",
        "Revisa permisos y preguntas pendientes en Inbox. Abre la sesión, toma la decisión y deja que el trabajo continúe.",
      ],
    ],
    routine: "De una idea al siguiente cambio.",
    steps: [
      [
        "Elige el punto de partida",
        "Selecciona un ordenador, un agente instalado y la carpeta del proyecto. Usa la autenticación que ya tiene el agente.",
      ],
      [
        "Dale espacio al trabajo",
        "Envía un objetivo, adjunta contexto y abre otro panel si lo necesitas. Revisa las herramientas y los cambios mientras llegan.",
      ],
      [
        "Mantén el hilo",
        "Encuentra sesiones en la barra lateral o la paleta de comandos. Recupera un borrador, responde preguntas o continúa la conversación.",
      ],
    ],
    connection: "En tu ordenador. Conectado a tus otros equipos.",
    local: [
      "Trabaja en local",
      "Desktop puede ejecutar los agentes en su propio proceso. Las sesiones de programación locales no necesitan un servicio Gateway independiente.",
    ],
    remote: [
      "Accede a otro ordenador",
      "Empareja un Gateway para usar sus sesiones. Con un Gateway local, Desktop y la app móvil pueden usar las mismas sesiones.",
    ],
    ready: "Haz sitio a tu próximo proyecto.",
    guideTitle: "Desktop, de la instalación al día a día.",
    installation: "Elige cómo empezar.",
    compatibility:
      "Windows y macOS Intel no están incluidos en los paquetes preliminares. Linux necesita una GPU compatible y D-Bus de sesión; el contenido web integrado requiere WebKitGTK 4.1. Las funciones remotas opcionales dependen del Gateway y del agente.",
    start: "Tu primera sesión.",
    shortcuts: "Unas pocas teclas bastan.",
    keys: [
      "Paleta de comandos",
      "Ir a una sesión",
      "Alternar barra lateral",
      "Atajos de teclado",
      "Enviar mensaje",
      "Nueva línea",
    ],
    troubleshooting: "Cuando falta algo.",
    fixes: [
      [
        "El agente no está disponible",
        "Instala su CLI e inicia sesión. Revisa Settings → Agents, la ruta del ejecutable y la conexión. Desktop no inicia sesión por ti.",
      ],
      [
        "Una función remota no está disponible",
        "Comprueba el ordenador seleccionado y la conexión Gateway. Algunas herramientas requieren capacidades más recientes. Actualiza desde el canal correspondiente.",
      ],
      [
        "Actualizar un candidato",
        "Cierra Desktop antes de reemplazarlo y vuelve a abrirlo. Conserva la configuración y las conversaciones. Actualizar solo Desktop no requiere reiniciar los agentes compartidos.",
      ],
    ],
    back: "Explorar Desktop",
  },
  pt: {
    lead: "Seus agentes.",
    accent: "Um desktop de verdade.",
    intro:
      "Conversas, código, terminais e decisões. Reúna seus agentes de programação em um espaço nativo, no seu computador e nos que você parear.",
    guide: "Instalação e guia",
    agents: "Seus agentes. Seus logins de sempre.",
    workspace: "Mantenha o trabalho à vista.",
    features: [
      [
        "Uma conversa com contexto.",
        "Acompanhe respostas, ferramentas e alterações de código juntas. Adicione arquivos, escolha um modelo e guarde um rascunho por sessão.",
      ],
      [
        "Espaço para trabalhar lado a lado.",
        "Organize conversas, terminais e arquivos em painéis divididos. Mantenha o contexto necessário ao lado do trabalho atual.",
      ],
      [
        "Saiba quando intervir.",
        "Revise permissões e perguntas pendentes no Inbox. Abra a sessão, decida e deixe o trabalho continuar.",
      ],
    ],
    routine: "Da ideia à próxima alteração.",
    steps: [
      [
        "Escolha o ponto de partida",
        "Selecione um computador, um agente instalado e a pasta do projeto. Use a autenticação existente do agente.",
      ],
      [
        "Dê espaço ao trabalho",
        "Envie um objetivo, anexe contexto e abra outro painel quando precisar. Acompanhe as ferramentas e as alterações.",
      ],
      [
        "Mantenha o fio da conversa",
        "Encontre sessões na barra lateral ou na paleta de comandos. Volte ao rascunho, responda uma pergunta ou continue a conversa.",
      ],
    ],
    connection: "Em casa no seu computador. Conectado aos demais.",
    local: [
      "Trabalhe localmente",
      "O Desktop pode executar os agentes no próprio processo. Sessões locais de programação não precisam de um serviço Gateway separado.",
    ],
    remote: [
      "Acesse outro computador",
      "Pareie um Gateway para usar suas sessões. Com um Gateway local, Desktop e aplicativo móvel podem usar as mesmas sessões.",
    ],
    ready: "Abra espaço para seu próximo projeto.",
    guideTitle: "Desktop, da configuração ao dia a dia.",
    installation: "Escolha por onde começar.",
    compatibility:
      "Windows e macOS Intel não estão incluídos nos pacotes da prévia. Linux precisa de GPU compatível e D-Bus de sessão; conteúdo web integrado requer WebKitGTK 4.1. Recursos remotos opcionais dependem do Gateway e do agente.",
    start: "Sua primeira sessão.",
    shortcuts: "Poucas teclas, muitos caminhos.",
    keys: [
      "Paleta de comandos",
      "Ir para uma sessão",
      "Alternar barra lateral",
      "Atalhos de teclado",
      "Enviar mensagem",
      "Nova linha",
    ],
    troubleshooting: "Quando algo está faltando.",
    fixes: [
      [
        "Agente indisponível",
        "Instale a CLI e faça login primeiro. Confira Settings → Agents, o caminho do executável e a conexão. O Desktop não faz login por você.",
      ],
      [
        "Recurso remoto indisponível",
        "Confira o computador selecionado e sua conexão Gateway. Algumas ferramentas precisam de capacidades mais recentes. Atualize pelo canal adequado.",
      ],
      [
        "Atualizar um candidato",
        "Feche o Desktop antes de substituí-lo e abra novamente. Preserve configurações e conversas. Atualizar apenas o Desktop não exige reiniciar os agentes compartilhados.",
      ],
    ],
    back: "Explorar Desktop",
  },
  ru: {
    lead: "Ваши агенты.",
    accent: "Полноценный десктоп.",
    intro:
      "Диалоги, код, терминалы и решения. Объедините агентов разработки в нативном рабочем пространстве на своём компьютере и подключённых устройствах.",
    guide: "Установка и руководство",
    agents: "Ваши агенты. Привычная авторизация.",
    workspace: "Вся работа перед глазами.",
    features: [
      [
        "Диалог с контекстом.",
        "Следите за ответами, инструментами и изменениями кода вместе. Добавляйте файлы, выбирайте модель и сохраняйте черновик для каждой сессии.",
      ],
      [
        "Место для работы рядом.",
        "Размещайте диалоги, терминалы и файлы в разделённых панелях. Нужный контекст остаётся рядом с текущей задачей.",
      ],
      [
        "Знайте, когда вы нужны.",
        "Проверяйте ожидающие разрешения и вопросы в Inbox. Откройте сессию, примите решение и продолжайте работу.",
      ],
    ],
    routine: "От идеи до следующего изменения.",
    steps: [
      [
        "Выберите начало",
        "Укажите компьютер, установленного агента и папку проекта. Используется существующая авторизация агента.",
      ],
      [
        "Дайте работе место",
        "Отправьте цель, приложите контекст и при необходимости откройте вторую панель. Проверяйте инструменты и изменения по мере появления.",
      ],
      [
        "Не теряйте нить",
        "Находите сессии в боковой панели или палитре команд. Возвращайтесь к черновику, отвечайте на вопросы и продолжайте диалог.",
      ],
    ],
    connection: "Дома на вашем компьютере. На связи с остальными.",
    local: [
      "Работайте локально",
      "Desktop может выполнять агентную часть внутри процесса. Для локальных сессий разработки отдельная служба Gateway не нужна.",
    ],
    remote: [
      "Подключите другой компьютер",
      "Создайте пару с Gateway для доступа к его сессиям. С локальным Gateway Desktop и мобильное приложение могут использовать одни и те же сессии.",
    ],
    ready: "Место для следующего проекта.",
    guideTitle: "Desktop: от настройки до ежедневной работы.",
    installation: "Выберите способ начать.",
    compatibility:
      "Пакеты Windows и Intel macOS не входят в превью. Linux требует совместимую графическую среду и сеансовую D-Bus; встроенный веб-контент требует WebKitGTK 4.1. Дополнительные удалённые функции зависят от Gateway и агента.",
    start: "Ваша первая сессия.",
    shortcuts: "Несколько полезных клавиш.",
    keys: [
      "Палитра команд",
      "Перейти к сессии",
      "Показать боковую панель",
      "Горячие клавиши",
      "Отправить сообщение",
      "Новая строка",
    ],
    troubleshooting: "Если чего-то не хватает.",
    fixes: [
      [
        "Агент недоступен",
        "Сначала установите CLI и войдите в аккаунт. Проверьте Settings → Agents, путь к программе и параметры подключения. Desktop не выполняет вход за вас.",
      ],
      [
        "Удалённая функция недоступна",
        "Проверьте выбранный компьютер и соединение Gateway. Некоторым инструментам нужны новые возможности Gateway. Обновляйтесь из нужного канала выпусков.",
      ],
      [
        "Обновление кандидата",
        "Закройте Desktop перед заменой и откройте снова. Сохраните настройки и диалоги. Обновление только Desktop не требует перезапуска общего агентного сервиса.",
      ],
    ],
    back: "Открыть Desktop",
  },
  th: {
    lead: "เอเจนต์ของคุณ",
    accent: "เดสก์ท็อปที่พร้อมทำงาน",
    intro:
      "บทสนทนา โค้ด เทอร์มินัล และการตัดสินใจ รวมเอเจนต์เขียนโค้ดไว้ในพื้นที่ทำงานเนทีฟเดียว ทั้งบนเครื่องนี้และเครื่องที่คุณจับคู่",
    guide: "การติดตั้งและคู่มือ",
    agents: "เอเจนต์เดิม การเข้าสู่ระบบเดิม",
    workspace: "มองเห็นงานได้ครบ",
    features: [
      [
        "บทสนทนาที่มีบริบท",
        "ติดตามคำตอบ การทำงานของเครื่องมือ และการเปลี่ยนแปลงโค้ดร่วมกัน เพิ่มไฟล์ เลือกโมเดล และเก็บฉบับร่างแยกตามเซสชัน",
      ],
      [
        "พื้นที่สำหรับทำงานคู่กัน",
        "จัดบทสนทนา เทอร์มินัล และไฟล์ในช่องแบ่งหน้าจอ วางบริบทที่ต้องการไว้ข้างงานที่กำลังทำ",
      ],
      [
        "รู้เมื่อถึงเวลาของคุณ",
        "ตรวจสิทธิ์และคำถามที่รออยู่ใน Inbox เปิดเซสชัน ตัดสินใจ แล้วให้งานดำเนินต่อ",
      ],
    ],
    routine: "จากไอเดียสู่การเปลี่ยนแปลงถัดไป",
    steps: [
      [
        "เลือกจุดเริ่มต้น",
        "เลือกคอมพิวเตอร์ เอเจนต์ที่ติดตั้ง และโฟลเดอร์โปรเจกต์ ใช้การยืนยันตัวตนเดิมของเอเจนต์",
      ],
      [
        "เพิ่มพื้นที่ให้งาน",
        "ส่งเป้าหมาย แนบบริบท และเปิดช่องที่สองเมื่อต้องการ ตรวจเครื่องมือและการเปลี่ยนแปลงระหว่างทำงาน",
      ],
      [
        "ต่อบทสนทนาได้เสมอ",
        "ค้นหาเซสชันในแถบด้านข้างหรือแผงคำสั่ง กลับไปที่ฉบับร่าง ตอบคำถาม หรือคุยต่อ",
      ],
    ],
    connection: "ทำงานบนเครื่องคุณ เชื่อมถึงเครื่องอื่นของคุณ",
    local: [
      "ทำงานในเครื่อง",
      "Desktop เรียกใช้ส่วนเอเจนต์ภายในโปรเซสได้ เซสชันเขียนโค้ดในเครื่องไม่จำเป็นต้องมีบริการ Gateway แยก",
    ],
    remote: [
      "เข้าถึงคอมพิวเตอร์อื่น",
      "จับคู่ Gateway เพื่อใช้เซสชันของเครื่องนั้น หากมี Gateway ในเครื่อง Desktop และแอปมือถือจะใช้เซสชันเดียวกันได้",
    ],
    ready: "เตรียมพื้นที่ให้โปรเจกต์ถัดไป",
    guideTitle: "Desktop ตั้งแต่เริ่มต้นจนถึงทุกวัน",
    installation: "เลือกจุดเริ่มต้นที่เหมาะสม",
    compatibility:
      "พรีวิวไม่รวมแพ็กเกจ Windows และ Intel macOS Linux ต้องมีระบบ GPU ที่รองรับและ D-Bus ของเซสชัน เนื้อหาเว็บแบบฝังต้องใช้ WebKitGTK 4.1 ฟีเจอร์ระยะไกลเพิ่มเติมขึ้นอยู่กับ Gateway และเอเจนต์ที่เชื่อมต่อ",
    start: "เซสชันแรกของคุณ",
    shortcuts: "ปุ่มไม่กี่ปุ่มช่วยได้มาก",
    keys: [
      "แผงคำสั่ง",
      "ไปยังเซสชัน",
      "สลับแถบด้านข้าง",
      "แป้นพิมพ์ลัด",
      "ส่งข้อความ",
      "ขึ้นบรรทัดใหม่",
    ],
    troubleshooting: "เมื่อมีบางอย่างหายไป",
    fixes: [
      [
        "เอเจนต์ใช้งานไม่ได้",
        "ติดตั้ง CLI และเข้าสู่ระบบก่อน ตรวจ Settings → Agents รวมถึงตำแหน่งโปรแกรมและการเชื่อมต่อ Desktop จะไม่เข้าสู่ระบบแทนคุณ",
      ],
      [
        "ฟีเจอร์ระยะไกลใช้ไม่ได้",
        "ตรวจคอมพิวเตอร์ที่เลือกและการเชื่อมต่อ Gateway เครื่องมือบางอย่างต้องใช้ Gateway รุ่นใหม่กว่า อัปเดตจากช่องทางที่เหมาะสม",
      ],
      [
        "อัปเดตรุ่นทดสอบ",
        "ปิด Desktop ก่อนแทนที่แล้วเปิดใหม่ เก็บการตั้งค่าและบทสนทนาไว้ การอัปเดต Desktop อย่างเดียวไม่ต้องเริ่มระบบเอเจนต์ที่ใช้ร่วมกันใหม่",
      ],
    ],
    back: "สำรวจ Desktop",
  },
  vi: {
    lead: "Agent của bạn.",
    accent: "Một desktop đúng nghĩa.",
    intro:
      "Hội thoại, mã nguồn, terminal và quyết định. Đưa các agent lập trình vào một không gian làm việc gốc, trên máy này và những máy bạn ghép nối.",
    guide: "Cài đặt và hướng dẫn",
    agents: "Agent quen thuộc. Đăng nhập sẵn có.",
    workspace: "Giữ công việc trong tầm mắt.",
    features: [
      [
        "Hội thoại có ngữ cảnh.",
        "Theo dõi câu trả lời, hoạt động công cụ và thay đổi mã cùng nhau. Thêm tệp, chọn mô hình và giữ bản nháp riêng cho mỗi phiên.",
      ],
      [
        "Không gian làm việc song song.",
        "Sắp xếp hội thoại, terminal và tệp trong các ngăn chia. Giữ ngữ cảnh cần thiết ngay cạnh công việc đang làm.",
      ],
      [
        "Biết khi nào cần bạn.",
        "Xem quyền và câu hỏi đang chờ trong Inbox. Mở phiên, đưa ra quyết định và để công việc tiếp tục.",
      ],
    ],
    routine: "Từ ý tưởng đến thay đổi tiếp theo.",
    steps: [
      [
        "Chọn điểm bắt đầu",
        "Chọn máy tính, agent đã cài và thư mục dự án. Dùng thông tin xác thực sẵn có của agent.",
      ],
      [
        "Dành chỗ cho công việc",
        "Gửi mục tiêu, đính kèm ngữ cảnh và mở ngăn thứ hai khi cần. Theo dõi công cụ và thay đổi ngay khi xuất hiện.",
      ],
      [
        "Giữ mạch hội thoại",
        "Tìm phiên trong thanh bên hoặc bảng lệnh. Trở lại bản nháp, trả lời câu hỏi hoặc tiếp tục hội thoại.",
      ],
    ],
    connection: "Tại máy của bạn. Kết nối các máy khác.",
    local: [
      "Làm việc cục bộ",
      "Desktop có thể chạy phần agent ngay trong tiến trình. Phiên lập trình cục bộ không cần dịch vụ Gateway riêng.",
    ],
    remote: [
      "Truy cập máy khác",
      "Ghép nối Gateway để dùng các phiên của máy đó. Với Gateway cục bộ, Desktop và ứng dụng di động có thể dùng cùng phiên.",
    ],
    ready: "Dành chỗ cho dự án tiếp theo.",
    guideTitle: "Desktop, từ thiết lập đến sử dụng hằng ngày.",
    installation: "Chọn cách bắt đầu phù hợp.",
    compatibility:
      "Gói Windows và Intel macOS không nằm trong mục tiêu xem trước. Linux cần GPU tương thích và D-Bus phiên; nội dung web nhúng cần WebKitGTK 4.1. Tính năng từ xa tùy chọn phụ thuộc vào Gateway và agent được kết nối.",
    start: "Phiên đầu tiên của bạn.",
    shortcuts: "Vài phím giúp đi xa hơn.",
    keys: [
      "Bảng lệnh",
      "Chuyển đến phiên",
      "Ẩn/hiện thanh bên",
      "Phím tắt",
      "Gửi tin nhắn",
      "Xuống dòng",
    ],
    troubleshooting: "Khi thiếu điều gì đó.",
    fixes: [
      [
        "Agent không khả dụng",
        "Cài CLI và đăng nhập trước. Kiểm tra Settings → Agents, đường dẫn chương trình và kết nối. Desktop không đăng nhập thay bạn.",
      ],
      [
        "Tính năng từ xa không khả dụng",
        "Kiểm tra máy đã chọn và kết nối Gateway. Một số công cụ cần khả năng Gateway mới hơn. Hãy cập nhật từ kênh phát hành phù hợp.",
      ],
      [
        "Cập nhật bản ứng viên",
        "Đóng Desktop trước khi thay rồi mở lại. Giữ cấu hình và hội thoại. Chỉ cập nhật Desktop không cần khởi động lại agent dùng chung.",
      ],
    ],
    back: "Khám phá Desktop",
  },
};
