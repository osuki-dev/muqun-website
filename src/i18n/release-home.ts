import type { SiteLocale } from "@/lib/locales";

export type ReleaseFeatureId =
  | "composer"
  | "tasks"
  | "voice"
  | "media"
  | "worktrees"
  | "storage"
  | "updates";
type Entry = readonly [title: string, description: string];
export interface ReleaseHomeCopy {
  heading: string;
  intro: string;
  compatibility: string;
  credentials: string;
  work: string;
  tools: string;
  appearance: string;
  features: Record<ReleaseFeatureId | "renderer" | "pad", Entry>;
}
/** Implemented 4.0 features. Store availability and Gateway capabilities remain separate. */
export const releaseHome: Record<SiteLocale, ReleaseHomeCopy> = {
  en: {
    heading: "One workspace, from the first goal to the next change.",
    intro:
      "Native sessions for Codex, OpenCode, DeepSeek Harness and T3 Code. Approve permissions, follow tasks and review diffs from your pocket — straight to your own computer.",
    compatibility:
      "Update through Google Play or the App Store. Agent, task and Git tools follow the connected Gateway’s capabilities; older Gateways keep their supported terminal and OpenCode paths.",
    credentials:
      "Agent credentials stay on your computer. Optional voice transcription uses the endpoint you configure in the app.",
    work: "Start and follow the work",
    tools: "Your everyday workspace",
    appearance: "Make it your own",
    features: {
      composer: [
        "Start from Home",
        "Choose a computer, agent, model, mode and folder, attach files, then send a goal straight into a conversation or terminal.",
      ],
      tasks: [
        "See what needs you",
        "Computer cards show active tasks, progress, decisions and recent work. Child tasks remain connected to their parent’s work.",
      ],
      voice: [
        "Speak, then review",
        "Hold Send to record and insert a transcript into your draft. Review it before sending; use your configured file or realtime transcription endpoint.",
      ],
      media: [
        "Replies beyond plain text",
        "Read native diagrams, preview conversation files and play inline audio when you choose. Audio stops when the preview closes or dictation starts.",
      ],
      worktrees: [
        "Git, in the same workspace",
        "Open Changes and Lazygit together. Browse linked worktrees when the Gateway supports them, without switching the terminal’s checkout.",
      ],
      storage: [
        "Keep temporary storage in check",
        "See reclaimable caches and choose automatic cleanup settings in Storage.",
      ],
      updates: [
        "Read the update before downloading",
        "Compatible app updates show release notes, download progress and a verified restart. Choose Later to defer the prompt for this launch.",
      ],
      renderer: [
        "A refreshed native renderer",
        "Skia Graphite draws terminals, theme artwork and effects, with Vulkan on Android. Reduced Motion keeps simple transitions.",
      ],
      pad: [
        "Room for the whole workspace",
        "Theme artwork and the Home composer sit alongside work on tablets. Detailed sheets use the screen; quick choices stay compact.",
      ],
    },
  },
  "zh-CN": {
    heading: "从第一个目标到下一次改动，都在同一工作区。",
    intro:
      "原生接入 Codex 与 OpenCode 等 AI 助手会话。在手机上完成权限审批、跟进任务与实时 Diff，直连你自己的电脑。",
    compatibility:
      "通过 Google Play 或 App Store 更新。助手、任务与 Git 功能取决于所连 Gateway 提供的能力；旧版仍可使用其支持的终端与 OpenCode。",
    credentials:
      "助手凭据留在你的电脑上。可选语音转写使用你在 App 中配置的服务端点。",
    work: "开始工作，跟进进展",
    tools: "日常工作区",
    appearance: "调成你的样子",
    features: {
      composer: [
        "从首页开始",
        "选择电脑、助手、模型、模式和目录，附上文件，再发送目标，直接打开会话或终端。",
      ],
      tasks: [
        "看见需要你的工作",
        "电脑卡片呈现活动任务、进度、待决定事项与最近工作；子任务保持在父任务的工作脉络中。",
      ],
      voice: [
        "说出来，再检查",
        "长按发送录音，把转写插入草稿，检查后再发送。可配置文件转写或实时转写服务。",
      ],
      media: [
        "回复不止文字",
        "阅读原生图表、预览会话文件，需要时播放内嵌音频。关闭预览或开始听写时，音频会停止。",
      ],
      worktrees: [
        "Git，就在工作区里",
        "改动与 Lazygit 在一起。Gateway 支持时可浏览关联工作树，不会切换当前终端所在的检出目录。",
      ],
      storage: ["管理临时存储", "在存储设置中查看可回收缓存，并配置自动清理。"],
      updates: [
        "下载前先看更新内容",
        "兼容的应用更新展示说明和下载进度，验证完成后重启。选择稍后可在本次启动中暂缓提示。",
      ],
      renderer: [
        "焕新的原生渲染器",
        "Skia Graphite 绘制终端、主题图片和效果，Android 使用 Vulkan；开启减少动态效果时保留简单转场。",
      ],
      pad: [
        "为整个工作区留出空间",
        "Pad 上主题图片、首页输入框与工作并排呈现。详细面板充分利用屏幕，快速选择保持紧凑。",
      ],
    },
  },
  "zh-TW": {
    heading: "從第一個目標到下一次變更，都在同一工作區。",
    intro:
      "原生接入 Codex 與 OpenCode 等 AI 助手工作階段。在手機上完成權限審批、跟進任務與即時 Diff，直連你自己的電腦。",
    compatibility:
      "透過 Google Play 或 App Store 更新。助手、任務與 Git 功能依所連 Gateway 提供的能力而定；舊版仍可使用其支援的終端機與 OpenCode。",
    credentials:
      "助手憑證留在你的電腦上。可選語音轉寫使用你在 App 中設定的服務端點。",
    work: "開始工作，追蹤進度",
    tools: "日常工作區",
    appearance: "調成你的樣子",
    features: {
      composer: [
        "從首頁開始",
        "選擇電腦、助手、模型、模式和目錄，附上檔案後送出目標，直接開啟對話或終端機。",
      ],
      tasks: [
        "看見需要你的工作",
        "電腦卡片呈現活動任務、進度、待決定事項與最近工作；子任務保留在父任務的工作脈絡中。",
      ],
      voice: [
        "說出來，再檢查",
        "長按送出錄音，將轉寫插入草稿，檢查後再送出。可設定檔案轉寫或即時轉寫服務。",
      ],
      media: [
        "回覆不只有文字",
        "閱讀原生圖表、預覽對話檔案，需要時播放內嵌音訊。關閉預覽或開始聽寫時，音訊會停止。",
      ],
      worktrees: [
        "Git，就在工作區裡",
        "變更與 Lazygit 放在一起。Gateway 支援時可瀏覽關聯工作樹，不會切換目前終端機的檢出目錄。",
      ],
      storage: ["管理暫存空間", "在儲存設定中查看可回收快取，並設定自動清理。"],
      updates: [
        "下載前先看更新內容",
        "相容的應用更新顯示說明與下載進度，驗證後重新啟動。選擇稍後可暫緩本次啟動的提示。",
      ],
      renderer: [
        "更新的原生繪圖引擎",
        "Skia Graphite 繪製終端機、主題圖片與效果，Android 使用 Vulkan；開啟減少動態效果時保留簡單轉場。",
      ],
      pad: [
        "為整個工作區留出空間",
        "Pad 上主題圖片、首頁輸入框與工作並排呈現。詳細面板充分利用螢幕，快速選擇保持精簡。",
      ],
    },
  },
  ja: {
    heading: "最初の目標から次の変更まで、ひとつのワークスペースで。",
    intro:
      "Codex、OpenCode、DeepSeek Harness、T3 Code のネイティブセッションに対応。スマホから権限承認やタスク追跡、差分確認を自分のマシン直結で行えます。",
    compatibility:
      "Google PlayまたはApp Storeから更新してください。エージェント、タスク、Gitの機能はGatewayが提供する能力に応じます。古いGatewayでも対応するターミナルとOpenCodeを使えます。",
    credentials:
      "エージェントの認証情報はパソコンに残ります。任意の音声文字起こしにはアプリで設定した接続先を使います。",
    work: "作業を始め、進み具合を追う",
    tools: "いつものワークスペース",
    appearance: "自分らしい見た目に",
    features: {
      composer: [
        "ホームから始める",
        "パソコン、エージェント、モデル、モード、フォルダを選び、ファイルを添えて目標を送ると、会話やターミナルが開きます。",
      ],
      tasks: [
        "あなたを待つ作業を確認",
        "パソコンのカードに実行中のタスク、進捗、判断待ち、最近の作業を表示。子タスクも親の作業とつながったままです。",
      ],
      voice: [
        "話してから、確認する",
        "送信を長押しして録音し、文字起こしを下書きへ。確認してから送信できます。ファイルまたはリアルタイムの文字起こしサービスを設定できます。",
      ],
      media: [
        "文字だけではない返信",
        "ネイティブ図、会話のファイル、選んだときだけ再生する音声プレビュー。プレビューを閉じるか音声入力を始めると再生は止まります。",
      ],
      worktrees: [
        "同じ作業場所でGitも",
        "ChangesとLazygitを一緒に利用。対応するGatewayでは関連ワークツリーを閲覧でき、ターミナルのチェックアウトは変わりません。",
      ],
      storage: [
        "一時ストレージを管理",
        "Storageで削除可能なキャッシュを確認し、自動クリーンアップを設定できます。",
      ],
      updates: [
        "ダウンロード前に更新内容を読む",
        "互換性のある更新ではリリースノートと進捗を表示し、検証後に再起動。後でを選ぶと今回の起動中は通知を延期します。",
      ],
      renderer: [
        "新しくなったネイティブ描画",
        "Skia Graphiteがターミナル、テーマ画像、効果を描画し、AndroidではVulkanを使います。視差効果を減らす設定では簡単な切り替えを保ちます。",
      ],
      pad: [
        "ワークスペース全体にゆとりを",
        "タブレットではテーマ画像とホームの入力欄を作業の横に配置。詳細シートは画面を活用し、素早い選択はコンパクトに。",
      ],
    },
  },
  ko: {
    heading: "첫 목표부터 다음 변경까지, 하나의 작업 공간에서.",
    intro:
      "Codex, OpenCode, DeepSeek Harness, T3 Code 네이티브 세션 지원. 내 컴퓨터에 직접 연결해 휴대폰에서 권한 승인, 작업 추적, 실시간 diff를 확인하세요.",
    compatibility:
      "Google Play 또는 App Store에서 업데이트하세요. 에이전트·작업·Git 기능은 연결된 Gateway의 지원 능력에 따릅니다. 이전 Gateway에서도 지원되는 터미널과 OpenCode를 쓸 수 있습니다.",
    credentials:
      "에이전트 자격 증명은 컴퓨터에 남습니다. 선택적인 음성 변환은 앱에서 설정한 엔드포인트를 사용합니다.",
    work: "일을 시작하고 진행 살피기",
    tools: "매일 쓰는 작업 공간",
    appearance: "내 취향대로",
    features: {
      composer: [
        "홈에서 시작",
        "컴퓨터, 에이전트, 모델, 모드와 폴더를 고르고 파일을 첨부해 목표를 보내면 대화 또는 터미널이 바로 열립니다.",
      ],
      tasks: [
        "나를 기다리는 작업 보기",
        "컴퓨터 카드가 활성 작업, 진행 상황, 결정 요청과 최근 작업을 보여 줍니다. 하위 작업도 상위 작업과 연결되어 있습니다.",
      ],
      voice: [
        "말하고, 검토하기",
        "보내기를 길게 눌러 녹음하고 변환된 글을 초안에 넣으세요. 검토한 뒤 전송합니다. 파일 또는 실시간 음성 변환 서비스를 설정할 수 있습니다.",
      ],
      media: [
        "글을 넘어서는 답변",
        "네이티브 다이어그램과 대화 파일을 보고 원할 때 인라인 오디오를 재생하세요. 미리보기를 닫거나 받아쓰기를 시작하면 재생이 멈춥니다.",
      ],
      worktrees: [
        "작업 공간 안의 Git",
        "Changes와 Lazygit을 함께 엽니다. Gateway가 지원하면 연결된 worktree를 탐색할 수 있으며 터미널의 체크아웃은 바뀌지 않습니다.",
      ],
      storage: [
        "임시 저장 공간 관리",
        "Storage에서 회수 가능한 캐시를 확인하고 자동 정리 설정을 고르세요.",
      ],
      updates: [
        "다운로드 전에 업데이트 읽기",
        "호환되는 업데이트는 릴리스 설명과 다운로드 진행을 보여 주고 검증 후 재시작합니다. 나중에를 고르면 이번 실행의 안내를 미룹니다.",
      ],
      renderer: [
        "새로워진 네이티브 렌더러",
        "Skia Graphite가 터미널, 테마 그림과 효과를 그리며 Android에서는 Vulkan을 사용합니다. 동작 줄이기에서는 간단한 전환을 유지합니다.",
      ],
      pad: [
        "작업 공간 전체를 위한 여유",
        "태블릿에서는 테마 그림과 홈 입력창이 작업 옆에 놓입니다. 자세한 화면은 넓게, 빠른 선택은 간결하게 보여 줍니다.",
      ],
    },
  },
  de: {
    heading: "Ein Arbeitsbereich, vom ersten Ziel bis zur nächsten Änderung.",
    intro:
      "Native Sitzungen für Codex, OpenCode, DeepSeek Harness und T3 Code. Berechtigungen freigeben, Aufgaben verfolgen und Diffs prüfen — direkt auf deinem eigenen Rechner.",
    compatibility:
      "Aktualisiere über Google Play oder den App Store. Agenten-, Aufgaben- und Git-Werkzeuge richten sich nach den Fähigkeiten des Gateways. Ältere Gateways behalten ihre unterstützten Terminal- und OpenCode-Wege.",
    credentials:
      "Agenten-Zugangsdaten bleiben auf deinem Rechner. Optionale Sprachtranskription nutzt den in der App eingerichteten Endpunkt.",
    work: "Arbeit starten und verfolgen",
    tools: "Dein täglicher Arbeitsbereich",
    appearance: "Dein eigener Stil",
    features: {
      composer: [
        "Auf Home anfangen",
        "Rechner, Agent, Modell, Modus und Ordner wählen, Dateien anhängen und ein Ziel direkt in eine Unterhaltung oder ein Terminal senden.",
      ],
      tasks: [
        "Sehen, was dich braucht",
        "Rechnerkarten zeigen aktive Aufgaben, Fortschritt, Entscheidungen und letzte Arbeit. Unteraufgaben bleiben mit ihrer übergeordneten Arbeit verbunden.",
      ],
      voice: [
        "Sprechen, dann prüfen",
        "Senden gedrückt halten, aufnehmen und die Transkription in den Entwurf einfügen. Vor dem Senden prüfen; der Datei- oder Echtzeit-Endpunkt ist konfigurierbar.",
      ],
      media: [
        "Antworten über Text hinaus",
        "Native Diagramme und Gesprächsdateien ansehen, Inline-Audio bewusst abspielen. Es stoppt beim Schließen der Vorschau oder beim Start der Spracheingabe.",
      ],
      worktrees: [
        "Git im selben Arbeitsbereich",
        "Changes und Lazygit gemeinsam öffnen. Verknüpfte Worktrees auf unterstützten Gateways ansehen, ohne den Terminal-Checkout zu wechseln.",
      ],
      storage: [
        "Temporären Speicher verwalten",
        "Rückgewinnbare Caches ansehen und automatische Bereinigung in Storage einstellen.",
      ],
      updates: [
        "Vor dem Download nachlesen",
        "Kompatible Updates zeigen Hinweise, Downloadfortschritt und einen verifizierten Neustart. Später verschiebt die Meldung für diesen App-Start.",
      ],
      renderer: [
        "Ein erneuerter nativer Renderer",
        "Skia Graphite zeichnet Terminals, Theme-Bilder und Effekte, auf Android mit Vulkan. Reduzierte Bewegung behält einfache Übergänge bei.",
      ],
      pad: [
        "Platz für den ganzen Arbeitsbereich",
        "Theme-Bilder und Home-Eingabe stehen auf Tablets neben der Arbeit. Detaillierte Ansichten nutzen den Bildschirm; schnelle Auswahl bleibt kompakt.",
      ],
    },
  },
  fr: {
    heading:
      "Un espace de travail, du premier objectif à la prochaine modification.",
    intro:
      "Sessions natives pour Codex, OpenCode, DeepSeek Harness et T3 Code. Approuvez les permissions, suivez les tâches et examinez les diffs depuis votre poche, relié à votre machine.",
    compatibility:
      "Mettez à jour via Google Play ou l’App Store. Les outils d’agent, de tâches et de Git suivent les capacités du Gateway. Les anciens Gateways conservent leurs accès compatibles au terminal et à OpenCode.",
    credentials:
      "Les identifiants des agents restent sur votre ordinateur. La transcription vocale facultative utilise le point d’accès configuré dans l’application.",
    work: "Démarrer et suivre le travail",
    tools: "Votre espace au quotidien",
    appearance: "À votre image",
    features: {
      composer: [
        "Commencer depuis l’accueil",
        "Choisissez ordinateur, agent, modèle, mode et dossier, joignez des fichiers puis envoyez un objectif dans une conversation ou un terminal.",
      ],
      tasks: [
        "Voir ce qui vous attend",
        "Les cartes d’ordinateur affichent tâches actives, progression, décisions et travail récent. Les sous-tâches restent liées au travail parent.",
      ],
      voice: [
        "Parler, puis relire",
        "Maintenez Envoyer pour enregistrer et insérer la transcription dans le brouillon. Relisez avant l’envoi ; configurez une transcription de fichier ou en temps réel.",
      ],
      media: [
        "Des réponses au-delà du texte",
        "Lisez les diagrammes natifs et les fichiers, puis lancez l’audio intégré à votre choix. Il s’arrête à la fermeture de l’aperçu ou au début de la dictée.",
      ],
      worktrees: [
        "Git dans le même espace",
        "Ouvrez Changes et Lazygit ensemble. Parcourez les worktrees liés si le Gateway le permet, sans changer le checkout du terminal.",
      ],
      storage: [
        "Maîtriser le stockage temporaire",
        "Consultez les caches récupérables et configurez le nettoyage automatique dans Storage.",
      ],
      updates: [
        "Lire avant de télécharger",
        "Les mises à jour compatibles affichent notes, progression et redémarrage après vérification. Plus tard reporte la demande pour ce lancement.",
      ],
      renderer: [
        "Un moteur natif renouvelé",
        "Skia Graphite dessine terminaux, images de thème et effets, avec Vulkan sur Android. Réduire les animations conserve des transitions simples.",
      ],
      pad: [
        "De la place pour tout l’espace",
        "Sur tablette, les images du thème et la saisie d’accueil accompagnent le travail. Les vues détaillées utilisent l’écran ; les choix rapides restent compacts.",
      ],
    },
  },
  es: {
    heading: "Un espacio, desde el primer objetivo hasta el siguiente cambio.",
    intro:
      "Sesiones nativas para Codex, OpenCode, DeepSeek Harness y T3 Code. Aprueba permisos, sigue tareas y revisa diffs desde tu bolsillo, directo a tu propia máquina.",
    compatibility:
      "Actualiza desde Google Play o App Store. Las herramientas de agentes, tareas y Git dependen de las capacidades del Gateway. Los Gateways antiguos conservan sus opciones compatibles de terminal y OpenCode.",
    credentials:
      "Las credenciales de los agentes permanecen en tu ordenador. La transcripción opcional usa el servicio que configures en la app.",
    work: "Empezar y seguir el trabajo",
    tools: "Tu espacio de cada día",
    appearance: "A tu manera",
    features: {
      composer: [
        "Empezar desde Inicio",
        "Elige ordenador, agente, modelo, modo y carpeta, adjunta archivos y envía un objetivo directamente a una conversación o terminal.",
      ],
      tasks: [
        "Ver qué necesita tu atención",
        "Las tarjetas muestran tareas activas, progreso, decisiones y trabajo reciente. Las subtareas siguen conectadas con el trabajo principal.",
      ],
      voice: [
        "Hablar y revisar",
        "Mantén Enviar para grabar e insertar la transcripción en el borrador. Revisa antes de enviar; configura un servicio de archivos o de transcripción en tiempo real.",
      ],
      media: [
        "Respuestas más allá del texto",
        "Lee diagramas nativos y archivos, y reproduce audio integrado cuando quieras. Se detiene al cerrar la vista previa o empezar el dictado.",
      ],
      worktrees: [
        "Git en el mismo espacio",
        "Abre Changes y Lazygit juntos. Explora worktrees vinculados si el Gateway lo admite, sin cambiar el checkout del terminal.",
      ],
      storage: [
        "Controlar el almacenamiento temporal",
        "Consulta cachés recuperables y configura la limpieza automática en Storage.",
      ],
      updates: [
        "Leer antes de descargar",
        "Las actualizaciones compatibles muestran notas, progreso y reinicio tras verificar. Más tarde aplaza el aviso durante este inicio.",
      ],
      renderer: [
        "Un renovado renderizador nativo",
        "Skia Graphite dibuja terminales, imágenes de temas y efectos, con Vulkan en Android. Reducir movimiento mantiene transiciones sencillas.",
      ],
      pad: [
        "Sitio para todo el espacio",
        "En tabletas, el tema y el cuadro de Inicio acompañan al trabajo. Las vistas detalladas aprovechan la pantalla; las opciones rápidas siguen compactas.",
      ],
    },
  },
  pt: {
    heading: "Um espaço, do primeiro objetivo à próxima alteração.",
    intro:
      "Sessões nativas para Codex, OpenCode, DeepSeek Harness e T3 Code. Aprove permissões, acompanhe tarefas e revise diffs do seu bolso, direto na sua máquina.",
    compatibility:
      "Atualize pelo Google Play ou pela App Store. Agentes, tarefas e Git seguem os recursos do Gateway conectado. Gateways antigos mantêm os caminhos compatíveis de terminal e OpenCode.",
    credentials:
      "As credenciais dos agentes ficam no computador. A transcrição opcional usa o serviço configurado no aplicativo.",
    work: "Começar e acompanhar o trabalho",
    tools: "Seu espaço do dia a dia",
    appearance: "Do seu jeito",
    features: {
      composer: [
        "Começar pela tela inicial",
        "Escolha computador, agente, modelo, modo e pasta, anexe arquivos e envie um objetivo direto para uma conversa ou terminal.",
      ],
      tasks: [
        "Ver o que precisa de você",
        "Os cartões mostram tarefas ativas, progresso, decisões e trabalho recente. Subtarefas continuam ligadas ao trabalho principal.",
      ],
      voice: [
        "Falar e revisar",
        "Segure Enviar para gravar e inserir a transcrição no rascunho. Revise antes de enviar; configure transcrição de arquivo ou em tempo real.",
      ],
      media: [
        "Respostas além do texto",
        "Leia diagramas nativos e arquivos e reproduza áudio integrado quando quiser. Ele para ao fechar a prévia ou começar o ditado.",
      ],
      worktrees: [
        "Git no mesmo espaço",
        "Abra Changes e Lazygit juntos. Explore worktrees vinculadas quando o Gateway permitir, sem trocar o checkout do terminal.",
      ],
      storage: [
        "Controlar o armazenamento temporário",
        "Veja caches recuperáveis e configure a limpeza automática em Storage.",
      ],
      updates: [
        "Ler antes de baixar",
        "Atualizações compatíveis mostram notas, progresso e reinício após verificação. Mais tarde adia o aviso durante esta abertura do app.",
      ],
      renderer: [
        "Um renderizador nativo renovado",
        "Skia Graphite desenha terminais, imagens de temas e efeitos, com Vulkan no Android. Reduzir movimento mantém transições simples.",
      ],
      pad: [
        "Espaço para todo o trabalho",
        "Em tablets, a arte do tema e o campo inicial ficam ao lado do trabalho. Telas detalhadas aproveitam a área; escolhas rápidas continuam compactas.",
      ],
    },
  },
  ru: {
    heading: "Одно пространство — от первой цели до следующего изменения.",
    intro:
      "Нативные сеансы для Codex, OpenCode, DeepSeek Harness и T3 Code. Подтверждайте разрешения, следите за задачами и проверяйте diff прямо с телефона на своем компьютере.",
    compatibility:
      "Обновляйте через Google Play или App Store. Возможности агентов, задач и Git зависят от Gateway. Старые Gateways сохраняют поддерживаемые пути терминала и OpenCode.",
    credentials:
      "Данные доступа агентов остаются на компьютере. Необязательное распознавание речи использует сервис, настроенный в приложении.",
    work: "Начать работу и следить за ней",
    tools: "Повседневное рабочее пространство",
    appearance: "Ваш собственный стиль",
    features: {
      composer: [
        "Начать с главного экрана",
        "Выберите компьютер, агента, модель, режим и папку, прикрепите файлы и отправьте цель прямо в диалог или терминал.",
      ],
      tasks: [
        "Увидеть, что требует внимания",
        "Карточки показывают активные задачи, прогресс, решения и недавнюю работу. Подзадачи остаются связанными с родительской работой.",
      ],
      voice: [
        "Скажите и проверьте",
        "Удерживайте Отправить для записи и добавления текста в черновик. Проверьте перед отправкой; настройте файловый или потоковый сервис распознавания.",
      ],
      media: [
        "Ответы не только текстом",
        "Читайте нативные диаграммы и файлы, запускайте встроенное аудио по желанию. Оно останавливается при закрытии предпросмотра или начале диктовки.",
      ],
      worktrees: [
        "Git в том же пространстве",
        "Открывайте Changes и Lazygit вместе. Просматривайте связанные worktrees на совместимом Gateway, не меняя checkout терминала.",
      ],
      storage: [
        "Управлять временным хранилищем",
        "Посмотрите доступные для очистки кэши и настройте автоматическую очистку в Storage.",
      ],
      updates: [
        "Прочитать перед загрузкой",
        "Совместимые обновления показывают описание, ход загрузки и перезапуск после проверки. Позже откладывает запрос до следующего запуска.",
      ],
      renderer: [
        "Обновлённый нативный рендерер",
        "Skia Graphite рисует терминалы, темы и эффекты; на Android используется Vulkan. Уменьшение движения сохраняет простые переходы.",
      ],
      pad: [
        "Место для всей работы",
        "На планшетах тема и ввод на главном экране соседствуют с работой. Подробные панели используют экран, быстрый выбор остаётся компактным.",
      ],
    },
  },
  vi: {
    heading: "Một không gian, từ mục tiêu đầu tiên đến thay đổi tiếp theo.",
    intro:
      "Phiên gốc cho Codex, OpenCode, DeepSeek Harness và T3 Code. Phê duyệt quyền, theo dõi tác vụ và xem diff trực tiếp trên máy của bạn ngay từ điện thoại.",
    compatibility:
      "Cập nhật qua Google Play hoặc App Store. Công cụ trợ lý, tác vụ và Git tùy thuộc khả năng Gateway. Gateway cũ giữ các đường terminal và OpenCode được hỗ trợ.",
    credentials:
      "Thông tin đăng nhập trợ lý ở lại máy tính. Chuyển giọng nói tùy chọn dùng dịch vụ bạn cấu hình trong ứng dụng.",
    work: "Bắt đầu và theo dõi công việc",
    tools: "Không gian hằng ngày",
    appearance: "Theo phong cách của bạn",
    features: {
      composer: [
        "Bắt đầu từ Trang chủ",
        "Chọn máy tính, trợ lý, mô hình, chế độ và thư mục, đính kèm tệp rồi gửi mục tiêu thẳng vào cuộc trò chuyện hoặc terminal.",
      ],
      tasks: [
        "Thấy việc cần bạn",
        "Thẻ máy tính hiển thị tác vụ đang chạy, tiến độ, quyết định và việc gần đây. Tác vụ con vẫn gắn với công việc cha.",
      ],
      voice: [
        "Nói rồi kiểm tra",
        "Giữ Gửi để ghi âm và chèn bản chuyển lời vào nháp. Kiểm tra trước khi gửi; cấu hình dịch vụ tệp hoặc chuyển lời thời gian thực.",
      ],
      media: [
        "Trả lời không chỉ bằng chữ",
        "Đọc sơ đồ gốc và tệp, phát âm thanh nội tuyến khi bạn chọn. Âm thanh dừng khi đóng xem trước hoặc bắt đầu đọc chính tả.",
      ],
      worktrees: [
        "Git trong cùng không gian",
        "Mở Changes và Lazygit cùng nhau. Duyệt worktree liên kết nếu Gateway hỗ trợ, không đổi checkout của terminal.",
      ],
      storage: [
        "Quản lý lưu trữ tạm",
        "Xem bộ nhớ đệm có thể thu hồi và chọn tự động dọn dẹp trong Storage.",
      ],
      updates: [
        "Đọc trước khi tải",
        "Bản cập nhật tương thích hiển thị ghi chú, tiến độ và khởi động lại sau xác minh. Để sau hoãn lời nhắc trong lần mở này.",
      ],
      renderer: [
        "Bộ kết xuất gốc được làm mới",
        "Skia Graphite vẽ terminal, ảnh chủ đề và hiệu ứng, dùng Vulkan trên Android. Giảm chuyển động giữ các chuyển cảnh đơn giản.",
      ],
      pad: [
        "Chỗ cho cả không gian làm việc",
        "Trên máy tính bảng, ảnh chủ đề và ô nhập Trang chủ nằm cạnh công việc. Bảng chi tiết tận dụng màn hình; lựa chọn nhanh vẫn gọn.",
      ],
    },
  },
  th: {
    heading: "พื้นที่เดียว ตั้งแต่เป้าหมายแรกถึงการเปลี่ยนแปลงถัดไป",
    intro:
      "เซสชันเนทีฟสำหรับ Codex, OpenCode, DeepSeek Harness และ T3 Code อนุมัติสิทธิ์ ติดตามงาน และตรวจดู diff จากมือถือของคุณตรงสู่คอมพิวเตอร์ของคุณเอง",
    compatibility:
      "อัปเดตผ่าน Google Play หรือ App Store เครื่องมือผู้ช่วย งาน และ Git ขึ้นกับความสามารถของ Gateway รุ่นเก่ายังคงใช้เทอร์มินัลและ OpenCode ที่รองรับได้",
    credentials:
      "ข้อมูลรับรองผู้ช่วยอยู่บนคอมพิวเตอร์ การถอดเสียงเสริมใช้บริการที่คุณตั้งค่าในแอป",
    work: "เริ่มและติดตามงาน",
    tools: "พื้นที่ทำงานประจำวัน",
    appearance: "ในสไตล์ของคุณ",
    features: {
      composer: [
        "เริ่มจากหน้าแรก",
        "เลือกคอมพิวเตอร์ ผู้ช่วย โมเดล โหมด และโฟลเดอร์ แนบไฟล์ แล้วส่งเป้าหมายเข้าสู่บทสนทนาหรือเทอร์มินัลโดยตรง",
      ],
      tasks: [
        "เห็นงานที่ต้องการคุณ",
        "การ์ดคอมพิวเตอร์แสดงงานที่กำลังทำ ความคืบหน้า การตัดสินใจ และงานล่าสุด งานย่อยยังเชื่อมกับงานหลัก",
      ],
      voice: [
        "พูดแล้วตรวจทาน",
        "กดส่งค้างเพื่อบันทึกและใส่ข้อความถอดเสียงในฉบับร่าง ตรวจทานก่อนส่ง ตั้งค่าบริการถอดเสียงจากไฟล์หรือแบบเรียลไทม์ได้",
      ],
      media: [
        "คำตอบที่ไม่ใช่แค่ข้อความ",
        "อ่านแผนภาพเนทีฟและไฟล์ แล้วเลือกเล่นเสียงในบทสนทนา เสียงหยุดเมื่อปิดตัวอย่างหรือเริ่มป้อนเสียง",
      ],
      worktrees: [
        "Git ในพื้นที่เดียวกัน",
        "เปิด Changes และ Lazygit ร่วมกัน ดู worktree ที่เชื่อมกันเมื่อ Gateway รองรับ โดยไม่เปลี่ยน checkout ของเทอร์มินัล",
      ],
      storage: [
        "ดูแลพื้นที่เก็บชั่วคราว",
        "ดูแคชที่คืนพื้นที่ได้และตั้งค่าล้างอัตโนมัติใน Storage",
      ],
      updates: [
        "อ่านก่อนดาวน์โหลด",
        "อัปเดตที่เข้ากันได้แสดงรายละเอียด ความคืบหน้า และเริ่มใหม่หลังตรวจสอบ เลือกภายหลังเพื่อเลื่อนแจ้งเตือนในการเปิดครั้งนี้",
      ],
      renderer: [
        "ตัวเรนเดอร์เนทีฟที่ปรับใหม่",
        "Skia Graphite วาดเทอร์มินัล ภาพธีม และเอฟเฟกต์ โดยใช้ Vulkan บน Android ลดการเคลื่อนไหวจะคงการเปลี่ยนฉากแบบเรียบง่ายไว้",
      ],
      pad: [
        "ที่ว่างสำหรับทั้งพื้นที่ทำงาน",
        "บนแท็บเล็ต ภาพธีมและช่องป้อนหน้าแรกอยู่ข้างงาน แผงรายละเอียดใช้พื้นที่จอ ส่วนการเลือกเร็วคงขนาดกะทัดรัด",
      ],
    },
  },
};
