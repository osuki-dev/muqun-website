import type { SiteLocale } from "@/lib/locales";
type Entry = readonly [title: string, description: string];
export type FeatureId =
  | "ssh"
  | "themes"
  | "simulator"
  | "approve"
  | "watch"
  | "send"
  | "files"
  | "serve"
  | "away";
export const featureCopy: Record<SiteLocale, Record<FeatureId, Entry>> = {
  "zh-CN": {
    ssh: [
      "随时 SSH",
      "密码、密钥与主机验证。打开终端，或通过隧道连接 Gateway。",
    ],
    themes: ["你的专属主题", "壁纸、配色、终端颜色。预览、调整，即刻应用。"],
    simulator: [
      "手机里的模拟器",
      "通过自己的 simfarm 服务启动、预览和操作模拟器。",
    ],
    approve: ["轻点，继续工作", "在锁屏上回复AI 助手的权限请求。"],
    watch: ["真正的终端", "实时输出、精准选取、回看历史，保留AI 助手原本的配色。"],
    send: ["发出下一个想法", "把照片和文件发送给AI 助手。"],
    files: ["查看它的成果", "阅读代码、检查差异、预览图片，无需离开 App。"],
    serve: ["预览你的网页", "输入端口，通过已有连接打开开发服务器。"],
    away: ["离开桌面，保持连接", "从手机切换工作区，查看AI 助手进度。"],
  },
  ru: {
    ssh: [
      "SSH откуда угодно",
      "Пароли, ключи и проверка хоста. Терминал или туннель к Gateway.",
    ],
    themes: [
      "Ваш собственный стиль",
      "Фон, палитра и цвета терминала. Настройте и примените.",
    ],
    simulator: [
      "Симулятор на телефоне",
      "Запускайте, просматривайте и управляйте симуляторами через свой simfarm.",
    ],
    approve: [
      "Одно касание — и дальше",
      "Отвечайте на запросы разрешений с экрана блокировки.",
    ],
    watch: [
      "Настоящий терминал",
      "Вывод в реальном времени, точное выделение и история. С цветами вашего агента.",
    ],
    send: ["Отправьте новую идею", "Отправляйте агенту фотографии и файлы."],
    files: [
      "Откройте результат",
      "Читайте код, проверяйте изменения и смотрите изображения прямо в приложении.",
    ],
    serve: [
      "Просмотр веб-приложения",
      "Укажите порт и откройте сервер разработки через имеющееся соединение.",
    ],
    away: [
      "Работа вдали от стола",
      "Переключайте рабочие пространства и следите за агентами с телефона.",
    ],
  },
  vi: {
    ssh: [
      "SSH ở mọi nơi",
      "Mật khẩu, khóa và xác minh máy chủ. Mở terminal hoặc tạo đường hầm đến Gateway.",
    ],
    themes: [
      "Giao diện của riêng bạn",
      "Hình nền, bảng màu và màu terminal. Xem trước, chỉnh sửa, áp dụng.",
    ],
    simulator: [
      "Trình mô phỏng trên điện thoại",
      "Khởi chạy, xem trước và điều khiển trình mô phỏng qua dịch vụ simfarm của bạn.",
    ],
    approve: [
      "Chạm để tiếp tục",
      "Trả lời yêu cầu cấp quyền của trợ lý từ màn hình khóa.",
    ],
    watch: [
      "Terminal thực thụ",
      "Đầu ra trực tiếp, chọn văn bản chính xác và lịch sử cuộn. Giữ nguyên màu của trợ lý.",
    ],
    send: ["Gửi ý tưởng tiếp theo", "Gửi ảnh và tệp cho trợ lý."],
    files: [
      "Xem thành quả",
      "Đọc mã, kiểm tra thay đổi và xem ảnh ngay trong ứng dụng.",
    ],
    serve: [
      "Xem trước ứng dụng web",
      "Nhập cổng để mở máy chủ phát triển qua kết nối hiện có.",
    ],
    away: [
      "Làm việc khi rời bàn",
      "Chuyển không gian làm việc và theo dõi trợ lý từ điện thoại.",
    ],
  },
  en: {
    ssh: [
      "SSH, anywhere",
      "Passwords, keys and host verification. Open a terminal or tunnel to your Gateway.",
    ],
    themes: [
      "Make it yours",
      "Your artwork, palette and terminal colours. Preview, adjust, apply.",
    ],
    simulator: [
      "Your simulator. On your phone.",
      "Start, preview and control simulators through your own simfarm service.",
    ],
    approve: [
      "One tap. Back to work.",
      "Answer agent permission requests from your Lock Screen.",
    ],
    watch: [
      "The real terminal",
      "Live output, exact text selection and scrollback. Your agent’s colours included.",
    ],
    send: ["Send the next idea", "Send photos and files to your agent."],
    files: [
      "Open what it made",
      "Read code, inspect diffs and preview images without leaving the app.",
    ],
    serve: [
      "Preview your web app",
      "Enter a port. Open your dev server over the same private connection.",
    ],
    away: [
      "Catch up in a glance",
      "See what finished and what needs you when you return.",
    ],
  },
  "zh-TW": {
    ssh: [
      "SSH，隨時連線",
      "密碼、金鑰、主機驗證。開啟終端機，或透過 SSH 通道連上 Gateway。",
    ],
    themes: [
      "換成你的樣子",
      "自訂背景圖片、配色與終端機色彩。預覽、調整，再套用。",
    ],
    simulator: [
      "手機，就是預覽視窗",
      "透過自己的 simfarm 服務，啟動、預覽並操作模擬器。",
    ],
    approve: ["點一下，繼續工作", "直接在鎖定畫面回應 AI 助手的授權要求。"],
    watch: ["完整的終端機", "即時輸出、精準選取、捲動回看，保留原有配色。"],
    send: ["傳送下一個靈感", "將照片與檔案傳給 AI 助手。"],
    files: ["看看它做了什麼", "程式碼、差異、圖片，不離開 App 就能查看。"],
    serve: ["預覽你的網頁", "輸入通訊埠，透過現有連線開啟開發伺服器。"],
    away: ["一眼掌握進度", "回來就知道哪些已完成、哪些正等你。"],
  },
  ja: {
    ssh: [
      "どこでもSSH",
      "パスワード、鍵、ホスト確認。ターミナルもGatewayへのトンネルも。",
    ],
    themes: [
      "あなたらしいテーマ",
      "画像、配色、ターミナルカラー。確認して、調整して、適用。",
    ],
    simulator: [
      "スマホがプレビュー画面に",
      "自分のsimfarmサービスでシミュレーターを起動・表示・操作。",
    ],
    approve: [
      "ワンタップで再開",
      "ロック画面からエージェントの権限リクエストに応答。",
    ],
    watch: [
      "本物のターミナル",
      "ライブ出力、正確なテキスト選択、履歴。エージェントの色もそのまま。",
    ],
    send: ["次のアイデアを送る", "写真やファイルをエージェントに送信。"],
    files: ["できたものを見る", "コード、差分、画像をアプリ内で確認。"],
    serve: [
      "Webアプリをプレビュー",
      "ポートを入力。同じプライベート接続で開発サーバーへ。",
    ],
    away: [
      "ひと目で追いつく",
      "戻ったら、完了した仕事と返事待ちがすぐわかる。",
    ],
  },
  ko: {
    ssh: [
      "어디서나 SSH",
      "비밀번호, 키, 호스트 확인. 터미널을 열거나 Gateway로 터널 연결.",
    ],
    themes: [
      "나만의 테마",
      "내 이미지, 팔레트, 터미널 색상. 미리 보고, 조정하고, 적용하세요.",
    ],
    simulator: [
      "휴대폰이 미리보기 화면으로",
      "내 simfarm 서비스로 시뮬레이터를 시작하고 보고 조작하세요.",
    ],
    approve: [
      "한 번 탭하면 다시 작업",
      "잠금 화면에서 에이전트의 권한 요청에 답하세요.",
    ],
    watch: [
      "진짜 터미널",
      "실시간 출력, 정확한 텍스트 선택과 기록. 원래 색상 그대로.",
    ],
    send: ["다음 아이디어 보내기", "에이전트에게 사진과 파일을 보내세요."],
    files: ["결과물 확인", "코드, 변경 사항, 이미지를 앱 안에서 확인하세요."],
    serve: [
      "웹 앱 미리보기",
      "포트를 입력하면 같은 비공개 연결로 개발 서버가 열려요.",
    ],
    away: [
      "한눈에 진행 상황",
      "돌아오면 완료된 일과 응답을 기다리는 일을 알려줘요.",
    ],
  },
  de: {
    ssh: [
      "SSH, überall",
      "Passwörter, Schlüssel und Hostprüfung. Terminal öffnen oder zum Gateway tunneln.",
    ],
    themes: [
      "Dein eigener Look",
      "Bilder, Palette und Terminalfarben. Vorschau, Anpassung, fertig.",
    ],
    simulator: [
      "Simulator aufs Handy",
      "Simulatoren über deinen simfarm-Dienst starten, ansehen und steuern.",
    ],
    approve: [
      "Ein Tipp. Weiter geht’s.",
      "Berechtigungsanfragen direkt vom Sperrbildschirm beantworten.",
    ],
    watch: [
      "Das echte Terminal",
      "Live-Ausgabe, genaue Textauswahl und Verlauf. In den Farben deines Agenten.",
    ],
    send: [
      "Die nächste Idee senden",
      "Fotos und Dateien an deinen Agenten senden.",
    ],
    files: [
      "Ergebnisse ansehen",
      "Code, Diffs und Bilder direkt in der App öffnen.",
    ],
    serve: [
      "Web-App ansehen",
      "Port eingeben. Dev-Server über dieselbe private Verbindung öffnen.",
    ],
    away: [
      "Sofort wieder im Bild",
      "Bei deiner Rückkehr sehen, was fertig ist und was auf dich wartet.",
    ],
  },
  fr: {
    ssh: [
      "SSH, partout",
      "Mots de passe, clés et vérification d’hôte. Terminal ou tunnel vers votre Gateway.",
    ],
    themes: [
      "À votre image",
      "Images, palette et couleurs de terminal. Prévisualisez, ajustez, appliquez.",
    ],
    simulator: [
      "Le simulateur sur votre téléphone",
      "Démarrez, affichez et contrôlez vos simulateurs via votre service simfarm.",
    ],
    approve: [
      "Un geste. Le travail reprend.",
      "Répondez aux demandes d’autorisation depuis l’écran verrouillé.",
    ],
    watch: [
      "Le vrai terminal",
      "Sortie en direct, sélection exacte et historique. Les couleurs de votre agent aussi.",
    ],
    send: [
      "Envoyez votre prochaine idée",
      "Envoyez des photos et des fichiers à votre agent.",
    ],
    files: [
      "Ouvrez le résultat",
      "Code, différences et images, sans quitter l’app.",
    ],
    serve: [
      "Prévisualisez votre app web",
      "Entrez un port. Ouvrez le serveur de développement via la même connexion privée.",
    ],
    away: [
      "Rattrapez tout d’un regard",
      "À votre retour, voyez ce qui est fini et ce qui vous attend.",
    ],
  },
  es: {
    ssh: [
      "SSH, estés donde estés",
      "Contraseñas, claves y verificación del host. Terminal o túnel a tu Gateway.",
    ],
    themes: [
      "A tu manera",
      "Tus imágenes, paleta y colores de terminal. Previsualiza, ajusta y aplica.",
    ],
    simulator: [
      "El simulador en tu teléfono",
      "Inicia, visualiza y controla simuladores mediante tu servicio simfarm.",
    ],
    approve: [
      "Un toque. Y sigue.",
      "Responde a los permisos del agente desde la pantalla de bloqueo.",
    ],
    watch: [
      "El terminal real",
      "Salida en directo, selección exacta e historial. Con los colores de tu agente.",
    ],
    send: ["Envía la próxima idea", "Envía fotos y archivos a tu agente."],
    files: [
      "Abre el resultado",
      "Código, diferencias e imágenes, sin salir de la app.",
    ],
    serve: [
      "Previsualiza tu app web",
      "Introduce un puerto. Abre tu servidor de desarrollo por la misma conexión privada.",
    ],
    away: [
      "Ponte al día de un vistazo",
      "Al volver, descubre qué terminó y qué te está esperando.",
    ],
  },
  pt: {
    ssh: [
      "SSH, de qualquer lugar",
      "Senhas, chaves e verificação do host. Terminal ou túnel para seu Gateway.",
    ],
    themes: [
      "Do seu jeito",
      "Suas imagens, paleta e cores do terminal. Visualize, ajuste e aplique.",
    ],
    simulator: [
      "O simulador no celular",
      "Inicie, visualize e controle simuladores pelo seu serviço simfarm.",
    ],
    approve: [
      "Um toque. De volta ao trabalho.",
      "Responda às permissões do agente pela tela bloqueada.",
    ],
    watch: [
      "O terminal de verdade",
      "Saída ao vivo, seleção exata e histórico. Com as cores do seu agente.",
    ],
    send: ["Envie a próxima ideia", "Envie fotos e arquivos ao seu agente."],
    files: [
      "Abra o resultado",
      "Código, diferenças e imagens sem sair do app.",
    ],
    serve: [
      "Veja seu app web",
      "Digite uma porta. Abra o servidor de desenvolvimento pela mesma conexão privada.",
    ],
    away: [
      "Atualize-se num relance",
      "Ao voltar, veja o que terminou e o que espera por você.",
    ],
  },
};
