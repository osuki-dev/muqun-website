import type { SiteLocale } from "@/lib/locales";
type Entry = readonly [title: string, description: string];
export type FeatureId =
  | "ssh"
  | "agents"
  | "changes"
  | "keyboard"
  | "pad"
  | "renderer"
  | "transitions"
  | "themes"
  | "simulator"
  | "approve"
  | "watch"
  | "send"
  | "files"
  | "serve"
  | "away";
export const featureCopy: Record<SiteLocale, Record<FeatureId, Entry>> = {
  th: {
    agents: ["ผู้ช่วยหลายตัว Gateway เดียว", "OpenCode, DeepSeek Harness และ T3 Code อยู่เคียงกัน แต่ละตัวมีไทล์และเซสชันของตัวเอง พื้นที่ทำงานแสดงเฉพาะสิ่งที่ผู้ช่วยตัวนั้นรองรับ"],
    changes: ["ทุกการเปลี่ยนแปลง เป็นแผนผัง", "แผ่นการเปลี่ยนแปลงเดียวกันสำหรับเทอร์มินัลและเซสชันผู้ช่วย แสดงเป็นแผนผังโฟลเดอร์พร้อมจำนวนบรรทัด โหลดแพตช์เมื่อเปิดไฟล์ และละทิ้งการเปลี่ยนแปลงได้ที่ไฟล์"],
    keyboard: ["คีย์บอร์ดเต็มรูปแบบบนแท็บเล็ต", "ปุ่มฟังก์ชัน ctrl alt และ shift ที่ล็อกได้ และคีย์ผสมที่เทอร์มินัลรับ เช่น Ctrl+Enter, Shift+Enter, Alt+ตัวอักษร เมื่อ Gateway ส่งได้"],
    pad: ["หน้าแรกบนแท็บเล็ตแบบหน้าคู่", "ปกของธีมอยู่ทางซ้าย เซสชันใหม่ ทำต่อ และการเชื่อมต่ออยู่ทางขวา การเปลี่ยนแปลง ไฟล์ และการเลือกดูธีมเปิดเต็มหน้าจอ"],
    renderer: ["ตัวเรนเดอร์ใหม่", "เทอร์มินัล ภาพ และการเปลี่ยนฉากวาดด้วย Skia Graphite ใช้ Vulkan บน Android และ Metal บน iPhone และ iPad ฉากเปิดจบลงด้วยการแตกออกเป็นชิ้นเล็ก ๆ"],
    transitions: ["การเปลี่ยนที่มองเห็นได้", "ธีมหรือโหมดใหม่แผ่ออกจากแถวที่แตะเหมือนระลอกน้ำ ฟอนต์ใหม่ปรากฏหลังแถบสแกน ความทึบของอินเทอร์เฟซตอนนี้มีผลกับทุกแผ่นและการแจ้งเตือน"],
  "ssh": [
    "SSH ได้ทุกที่",
    "รองรับรหัสผ่าน คีย์ และการตรวจสอบโฮสต์ เปิดเทอร์มินัลหรือเชื่อมต่อ Gateway ผ่านทันเนล"
  ],
  "themes": [
    "ธีมในแบบของคุณ",
    "ภาพพื้นหลัง ชุดสี และสีเทอร์มินัล ดูตัวอย่าง ปรับแต่ง แล้วใช้งานได้เลย"
  ],
  "simulator": [
    "เครื่องจำลองบนมือถือ",
    "เปิด ดูตัวอย่าง และควบคุมเครื่องจำลองผ่านบริการ simfarm ของคุณ"
  ],
  "approve": [
    "แตะแล้วทำงานต่อ",
    "ตอบคำขออนุญาตและคำถามของผู้ช่วย AI จากหน้าจอล็อก"
  ],
  "watch": [
    "เทอร์มินัลจริง",
    "ผลลัพธ์แบบเรียลไทม์ เลือกข้อความได้แม่นยำ ดูประวัติ พร้อมสีเดิมของผู้ช่วย"
  ],
  "send": [
    "ส่งไอเดียถัดไป",
    "ส่งรูปภาพและไฟล์ให้ผู้ช่วย AI"
  ],
  "files": [
    "ดูผลงานได้ทันที",
    "อ่านโค้ด ตรวจส่วนต่าง และดูภาพโดยไม่ต้องออกจากแอป"
  ],
  "serve": [
    "ดูเว็บของคุณ",
    "ระบุพอร์ตเพื่อเปิดเซิร์ฟเวอร์พัฒนาผ่านการเชื่อมต่อที่มีอยู่"
  ],
  "away": [
    "ห่างจากโต๊ะ ก็ยังเชื่อมต่อ",
    "สลับพื้นที่ทำงานและติดตามผู้ช่วย AI จากมือถือ"
  ]
},
  "zh-CN": {
    agents: ["一台 Gateway，多个 AI 助手", "OpenCode、DeepSeek Harness、T3 Code 并排出现，各有自己的入口和会话；工作台只显示这个助手支持的功能。"],
    changes: ["改动，一棵树看清", "终端和 AI 助手会话共用同一个改动面板：按目录树排列，带行数统计，打开文件时才加载补丁，在文件上就能丢弃改动。"],
    keyboard: ["Pad 上的完整键盘", "功能键，可锁定的 ctrl、alt、shift，还有终端真正需要的组合键——Ctrl+Enter、Shift+Enter、Alt+字母——只要 Gateway 能送达。"],
    pad: ["Pad 首页，像一张跨页", "左边是主题封面，右边是新会话、继续和连接。改动、文件和主题浏览在 Pad 上全屏打开。"],
    renderer: ["新的渲染器", "终端、主题图片和转场改用 Skia Graphite 绘制：Android 上用 Vulkan，iPhone 和 iPad 上用 Metal。开场动画结束时，画面会碎成小块散去。"],
    transitions: ["看得见的切换", "换主题或切换明暗时，新外观从你点的那一行像水波一样漾开；换字体时，一道扫描带掠过，新字体随之出现。界面背景透明度现在覆盖每个面板和通知。"],
    ssh: [
      "随时 SSH",
      "密码、密钥与主机验证。打开终端，或通过隧道连接 Gateway。",
    ],
    themes: ["你的专属主题", "壁纸、配色、终端颜色。预览、调整，即刻应用。"],
    simulator: [
      "手机里的模拟器",
      "通过自己的 simfarm 服务启动、预览和操作模拟器。",
    ],
    approve: ["轻点，继续工作", "在锁屏上回复 AI 助手的权限请求和提问。"],
    watch: ["真正的终端", "实时输出、精准选取、回看历史，保留AI 助手原本的配色。"],
    send: ["发出下一个想法", "把照片和文件发送给AI 助手。"],
    files: ["查看它的成果", "阅读代码、检查差异、预览图片，无需离开 App。"],
    serve: ["预览你的网页", "输入端口，通过已有连接打开开发服务器。"],
    away: ["离开桌面，保持连接", "从手机切换工作区，查看AI 助手进度。"],
  },
  ru: {
    agents: ["Несколько агентов, один Gateway", "OpenCode, DeepSeek Harness и T3 Code рядом: у каждого своя плитка и свои сеансы, а рабочая панель показывает только то, что этот агент умеет."],
    changes: ["Все изменения — деревом", "Один лист изменений для терминалов и сеансов агентов: дерево папок с итогами по строкам, патч загружается при открытии файла, отмена изменений — прямо на файле."],
    keyboard: ["Полная клавиатура на планшете", "Функциональные клавиши, залипающие ctrl, alt и shift и сочетания, которые понимает терминал, — Ctrl+Enter, Shift+Enter, Alt+буква, — везде, где Gateway может их доставить."],
    pad: ["Главный экран планшета как разворот", "Слева обложка темы, справа «Новый сеанс», «Продолжить» и «Подключения». Изменения, файлы и каталог тем открываются на весь экран."],
    renderer: ["Новый движок отрисовки", "Терминал, изображения и переходы рисует Skia Graphite — Vulkan на Android, Metal на iPhone и iPad. Заставка теперь заканчивается тем, что рассыпается на мелкие плитки."],
    transitions: ["Переходы, которые видно", "Новая тема или режим расходится от нажатой строки, как круги по воде; новый шрифт появляется за полосой сканирования. Прозрачность интерфейса теперь действует на каждый лист и уведомление."],
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
      "Отвечайте на запросы разрешений и вопросы агента с экрана блокировки.",
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
    agents: ["Nhiều trợ lý, một Gateway", "OpenCode, DeepSeek Harness và T3 Code nằm cạnh nhau, mỗi trợ lý có ô và phiên riêng, cùng bàn làm việc chỉ hiện những gì trợ lý đó hỗ trợ."],
    changes: ["Mọi thay đổi, dạng cây", "Một bảng Thay đổi chung cho terminal và phiên trợ lý: cây thư mục kèm tổng số dòng, bản vá chỉ tải khi mở tệp, và hủy thay đổi ngay trên tệp."],
    keyboard: ["Bàn phím đầy đủ trên máy tính bảng", "Phím chức năng, ctrl, alt và shift có thể khóa, cùng các tổ hợp terminal cần — Ctrl+Enter, Shift+Enter, Alt+chữ — ở bất cứ đâu Gateway chuyển được."],
    pad: ["Màn hình chính máy tính bảng như trang sách mở", "Bìa của chủ đề ở bên trái; Phiên mới, Tiếp tục và Kết nối ở bên phải. Thay đổi, Tệp và Duyệt chủ đề mở toàn màn hình."],
    renderer: ["Trình kết xuất mới", "Terminal, hình ảnh và hiệu ứng chuyển cảnh được vẽ bằng Skia Graphite — Vulkan trên Android, Metal trên iPhone và iPad. Đoạn mở đầu giờ kết thúc bằng cách vỡ thành từng mảnh nhỏ."],
    transitions: ["Chuyển đổi nhìn thấy được", "Chủ đề hoặc chế độ mới lan ra từ dòng bạn chạm như gợn sóng; phông chữ mới xuất hiện sau một dải quét. Độ mờ giao diện giờ áp dụng cho mọi bảng và thông báo."],
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
      "Trả lời yêu cầu cấp quyền và câu hỏi của trợ lý từ màn hình khóa.",
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
    agents: ["Several agents, one Gateway", "OpenCode, DeepSeek Harness and T3 Code side by side, each with its own tile, its own sessions and a workbench that shows only what that agent supports."],
    changes: ["Every change, as a tree", "One Changes sheet for terminals and agent sessions: a folder tree with line totals, each patch loaded when you open it, and Discard on the file."],
    keyboard: ["A whole keyboard on the Pad", "Function keys, sticky ctrl, alt and shift, and the chords a terminal takes — Ctrl+Enter, Shift+Enter, Alt+letters — wherever the Gateway can deliver them."],
    pad: ["A Pad Home like a spread", "The theme’s cover on the left; New session, Continue and Connections on the right. Changes, Files and Browse themes open full-screen."],
    renderer: ["A new renderer", "The terminal, the artwork and the transitions draw with Skia Graphite — Vulkan on Android, Metal on iPhone and iPad. The opening now ends by coming apart, tile by tile."],
    transitions: ["Change you can watch", "A new theme or mode spreads from the row you tapped like a ripple; a new font arrives behind a scan band. Interface opacity now reaches every sheet and notice."],
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
      "Answer an agent’s permission requests and questions from your Lock Screen.",
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
    agents: ["一台 Gateway，多個 AI 助手", "OpenCode、DeepSeek Harness、T3 Code 並排出現，各有自己的入口與工作階段；工作台只顯示該助手支援的功能。"],
    changes: ["變更，一棵樹看清", "終端機與 AI 助手工作階段共用同一個變更面板：依目錄樹排列，附行數統計，打開檔案時才載入修補，在檔案上就能捨棄變更。"],
    keyboard: ["Pad 上的完整鍵盤", "功能鍵，可鎖定的 ctrl、alt、shift，以及終端機真正需要的組合鍵——Ctrl+Enter、Shift+Enter、Alt+字母——只要 Gateway 能送達。"],
    pad: ["Pad 首頁，像一張跨頁", "左邊是主題封面，右邊是新工作階段、繼續與連線。變更、檔案與主題瀏覽在 Pad 上以全螢幕開啟。"],
    renderer: ["新的繪製引擎", "終端機、主題圖片與轉場改用 Skia Graphite 繪製：Android 上用 Vulkan，iPhone 與 iPad 上用 Metal。開場動畫結束時，畫面會碎成小塊散去。"],
    transitions: ["看得見的切換", "換主題或切換深淺色時，新外觀從你點的那一列像水波一樣擴散；換字型時，一道掃描帶掠過，新字型隨之出現。介面背景透明度現在涵蓋每個面板與通知。"],
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
    approve: ["點一下，繼續工作", "直接在鎖定畫面回應 AI 助手的授權要求與提問。"],
    watch: ["完整的終端機", "即時輸出、精準選取、捲動回看，保留原有配色。"],
    send: ["傳送下一個靈感", "將照片與檔案傳給 AI 助手。"],
    files: ["看看它做了什麼", "程式碼、差異、圖片，不離開 App 就能查看。"],
    serve: ["預覽你的網頁", "輸入通訊埠，透過現有連線開啟開發伺服器。"],
    away: ["一眼掌握進度", "回來就知道哪些已完成、哪些正等你。"],
  },
  ja: {
    agents: ["ひとつの Gateway に、複数のエージェント", "OpenCode、DeepSeek Harness、T3 Code が並び、それぞれにタイルとセッション。ワークベンチにはそのエージェントが対応する機能だけが出ます。"],
    changes: ["変更を、ツリーで", "ターミナルにもエージェントのセッションにも同じ変更シート。フォルダのツリーと行数、開いたときに読み込むパッチ、ファイルごとの破棄。"],
    keyboard: ["Pad に、キーボードをまるごと", "ファンクションキー、固定できる ctrl・alt・shift、そしてターミナルが受け取る組み合わせ — Ctrl+Enter、Shift+Enter、Alt+文字 — を、Gateway が届けられる限り。"],
    pad: ["見開きのような Pad のホーム", "左にテーマの表紙、右に新しいセッション、続き、接続。変更、ファイル、テーマの閲覧は全画面で開きます。"],
    renderer: ["新しい描画エンジン", "ターミナル、アートワーク、トランジションは Skia Graphite で描画。Android では Vulkan、iPhone と iPad では Metal。オープニングは小さなタイルに砕けて終わります。"],
    transitions: ["目に見える切り替え", "テーマやライト・ダークを変えると、タップした行から波紋のように広がり、フォントを変えるとスキャンの帯の後ろから新しい書体が現れます。インターフェースの不透明度はすべてのシートと通知に届きます。"],
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
      "ロック画面からエージェントの権限リクエストや質問に応答。",
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
    agents: ["Gateway 하나에 여러 에이전트", "OpenCode, DeepSeek Harness, T3 Code가 나란히 놓이고 각자 타일과 세션을 가져요. 작업 화면에는 그 에이전트가 지원하는 것만 보여요."],
    changes: ["모든 변경을 트리로", "터미널과 에이전트 세션이 같은 변경 사항 시트를 써요. 줄 수가 표시된 폴더 트리, 열 때 불러오는 패치, 파일마다 버리기."],
    keyboard: ["Pad에 온전한 키보드", "기능 키, 고정되는 ctrl·alt·shift, 그리고 터미널이 받는 조합 — Ctrl+Enter, Shift+Enter, Alt+문자 — 을 Gateway가 전달할 수 있는 곳이라면 어디서나."],
    pad: ["펼친 책 같은 Pad 홈", "왼쪽엔 테마 표지, 오른쪽엔 새 세션, 계속하기, 연결. 변경 사항, 파일, 테마 둘러보기는 전체 화면으로 열려요."],
    renderer: ["새 렌더러", "터미널, 아트워크, 전환 효과를 Skia Graphite로 그려요. Android는 Vulkan, iPhone과 iPad는 Metal. 오프닝은 작은 조각으로 흩어지며 끝나요."],
    transitions: ["눈에 보이는 전환", "테마나 라이트·다크를 바꾸면 누른 줄에서 물결처럼 퍼지고, 글꼴을 바꾸면 스캔 띠 뒤로 새 글꼴이 나타나요. 인터페이스 불투명도는 이제 모든 시트와 알림에 적용돼요."],
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
      "잠금 화면에서 에이전트의 권한 요청과 질문에 답하세요.",
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
    agents: ["Mehrere Agenten, ein Gateway", "OpenCode, DeepSeek Harness und T3 Code nebeneinander, jeder mit eigener Kachel und eigenen Sitzungen — und einer Werkbank, die nur zeigt, was dieser Agent kann."],
    changes: ["Jede Änderung als Baum", "Ein Änderungen-Sheet für Terminals und Agentensitzungen: ein Ordnerbaum mit Zeilensummen, jeder Patch erst beim Öffnen geladen, Verwerfen direkt an der Datei."],
    keyboard: ["Eine ganze Tastatur auf dem Pad", "Funktionstasten, feststellbares Strg, Alt und Shift und die Kombinationen, die ein Terminal versteht — Strg+Enter, Shift+Enter, Alt+Buchstabe —, wo das Gateway sie zustellen kann."],
    pad: ["Ein Pad-Home wie eine Doppelseite", "Links das Cover des Themes, rechts Neue Sitzung, Fortsetzen und Verbindungen. Änderungen, Dateien und Themes öffnen im Vollbild."],
    renderer: ["Ein neuer Renderer", "Terminal, Bilder und Übergänge zeichnet jetzt Skia Graphite — Vulkan auf Android, Metal auf iPhone und iPad. Der Vorspann endet, indem er in kleine Kacheln zerfällt."],
    transitions: ["Wechsel, die man sieht", "Ein neues Theme oder ein neuer Modus breitet sich wie eine Welle von der getippten Zeile aus; eine neue Schrift erscheint hinter einem Scan-Band. Die Interface-Deckkraft erreicht jetzt jedes Sheet und jede Meldung."],
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
      "Berechtigungsanfragen und Fragen direkt vom Sperrbildschirm beantworten.",
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
    agents: ["Plusieurs agents, un Gateway", "OpenCode, DeepSeek Harness et T3 Code côte à côte, chacun avec sa tuile, ses sessions et un atelier qui ne montre que ce que cet agent sait faire."],
    changes: ["Chaque modification, en arbre", "Une seule feuille Modifications pour les terminaux et les sessions d’agent : un arbre de dossiers avec les totaux de lignes, chaque patch chargé à l’ouverture, et l’annulation sur le fichier lui-même."],
    keyboard: ["Un clavier entier sur la tablette", "Touches de fonction, ctrl, alt et shift verrouillables, et les combinaisons qu’un terminal accepte — Ctrl+Entrée, Maj+Entrée, Alt+lettre — là où le Gateway peut les transmettre."],
    pad: ["Un accueil de tablette en double page", "La couverture du thème à gauche ; Nouvelle session, Continuer et Connexions à droite. Modifications, Fichiers et Parcourir les thèmes s’ouvrent en plein écran."],
    renderer: ["Un nouveau moteur de rendu", "Le terminal, les images et les transitions sont dessinés avec Skia Graphite — Vulkan sur Android, Metal sur iPhone et iPad. L’ouverture se termine désormais en se défaisant, tuile par tuile."],
    transitions: ["Des changements qu’on voit", "Un nouveau thème ou mode se propage depuis la ligne touchée comme une onde ; une nouvelle police arrive derrière une bande de balayage. L’opacité de l’interface atteint désormais chaque feuille et chaque avis."],
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
      "Répondez aux demandes d’autorisation et aux questions depuis l’écran verrouillé.",
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
    agents: ["Varios agentes, un Gateway", "OpenCode, DeepSeek Harness y T3 Code lado a lado, cada uno con su mosaico, sus sesiones y un banco de trabajo que solo muestra lo que ese agente admite."],
    changes: ["Cada cambio, en árbol", "Una sola hoja de Cambios para terminales y sesiones de agente: un árbol de carpetas con totales de líneas, cada parche cargado al abrirlo y Descartar en el archivo."],
    keyboard: ["Un teclado entero en la tableta", "Teclas de función, ctrl, alt y shift fijables, y las combinaciones que acepta un terminal — Ctrl+Intro, Mayús+Intro, Alt+letra — donde el Gateway pueda entregarlas."],
    pad: ["Un Inicio de tableta como una doble página", "La portada del tema a la izquierda; Nueva sesión, Continuar y Conexiones a la derecha. Cambios, Archivos y Explorar temas se abren a pantalla completa."],
    renderer: ["Un nuevo motor de dibujo", "El terminal, las imágenes y las transiciones se dibujan con Skia Graphite: Vulkan en Android, Metal en iPhone y iPad. La apertura ahora termina deshaciéndose, pieza a pieza."],
    transitions: ["Cambios que se ven", "Un tema o modo nuevo se extiende desde la fila que tocaste como una onda; una fuente nueva llega tras una banda de escaneo. La opacidad de la interfaz llega ahora a cada hoja y aviso."],
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
      "Responde a los permisos y preguntas del agente desde la pantalla de bloqueo.",
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
    agents: ["Vários agentes, um Gateway", "OpenCode, DeepSeek Harness e T3 Code lado a lado, cada um com seu bloco, suas sessões e uma bancada que só mostra o que aquele agente suporta."],
    changes: ["Cada alteração, em árvore", "Uma só folha de Alterações para terminais e sessões de agente: uma árvore de pastas com totais de linhas, cada patch carregado ao abrir e Descartar no arquivo."],
    keyboard: ["Um teclado inteiro no tablet", "Teclas de função, ctrl, alt e shift fixáveis, e as combinações que um terminal aceita — Ctrl+Enter, Shift+Enter, Alt+letra — onde o Gateway puder entregá-las."],
    pad: ["Uma tela inicial de tablet em página dupla", "A capa do tema à esquerda; Nova sessão, Continuar e Conexões à direita. Alterações, Arquivos e Explorar temas abrem em tela cheia."],
    renderer: ["Um novo renderizador", "O terminal, as imagens e as transições são desenhados com Skia Graphite — Vulkan no Android, Metal no iPhone e no iPad. A abertura agora termina se desfazendo, peça por peça."],
    transitions: ["Mudanças que se veem", "Um novo tema ou modo se espalha a partir da linha tocada como uma onda; uma nova fonte chega atrás de uma faixa de varredura. A opacidade da interface agora alcança cada folha e aviso."],
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
      "Responda às permissões e perguntas do agente pela tela bloqueada.",
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

/**
 * What the two real captures in the gallery show, for screen readers.
 * The captures are from the app on an Android tablet, light mode.
 */
export const featureMediaAlt: Record<SiteLocale, Record<"changes" | "keyboard", string>> = {
  en: {
    changes: "The Changes sheet on a tablet: five changed files in a folder tree, each marked Modified or Untracked with its line count, and Uncommitted changes chosen in the scope menu.",
    keyboard: "The tablet's on-screen keyboard: a row of shortcut keys, a function-key strip, a number row, ctrl, alt and shift, and Home, End, Page Up and Page Down beside the arrows.",
  },
  "zh-CN": {
    changes: "平板上的改动面板：五个改动文件按目录树排列，分别标着已修改或未跟踪和行数，范围菜单选的是“未提交的改动”。",
    keyboard: "平板上的屏幕键盘：一排快捷键、功能键行、数字行，ctrl、alt、shift，以及方向键旁的 Home、End、Page Up、Page Down。",
  },
  "zh-TW": {
    changes: "平板上的變更面板：五個變更檔案依目錄樹排列，各自標示已修改或未追蹤與行數，範圍選單選的是「未提交的變更」。",
    keyboard: "平板上的螢幕鍵盤：一排快捷鍵、功能鍵列、數字列，ctrl、alt、shift，以及方向鍵旁的 Home、End、Page Up、Page Down。",
  },
  ja: {
    changes: "タブレットの変更シート。変更された 5 つのファイルがフォルダのツリーに並び、それぞれ変更済みか未追跡かと行数が表示され、範囲メニューでは未コミットの変更が選ばれている。",
    keyboard: "タブレットのオンスクリーンキーボード。ショートカットキーの列、ファンクションキー、数字の列、ctrl・alt・shift、矢印キーの横に Home、End、Page Up、Page Down。",
  },
  ko: {
    changes: "태블릿의 변경 사항 시트: 변경된 파일 다섯 개가 폴더 트리로 놓이고, 각각 수정됨 또는 추적 안 됨과 줄 수가 표시되며, 범위 메뉴에서 커밋되지 않은 변경이 선택되어 있다.",
    keyboard: "태블릿의 화면 키보드: 단축키 줄, 기능 키 줄, 숫자 줄, ctrl·alt·shift, 화살표 옆의 Home, End, Page Up, Page Down.",
  },
  de: {
    changes: "Das Änderungen-Sheet auf einem Tablet: fünf geänderte Dateien in einem Ordnerbaum, jede als geändert oder nicht verfolgt markiert, mit Zeilenzahl; im Bereichsmenü sind die nicht committeten Änderungen gewählt.",
    keyboard: "Die Bildschirmtastatur auf dem Tablet: eine Reihe Kurzbefehle, eine Funktionstastenleiste, eine Zahlenreihe, Strg, Alt und Shift sowie Pos1, Ende, Bild auf und Bild ab neben den Pfeiltasten.",
  },
  fr: {
    changes: "La feuille Modifications sur une tablette : cinq fichiers modifiés dans un arbre de dossiers, chacun marqué modifié ou non suivi avec son nombre de lignes, et les modifications non validées choisies dans le menu de portée.",
    keyboard: "Le clavier à l’écran de la tablette : une rangée de raccourcis, une bande de touches de fonction, une rangée de chiffres, ctrl, alt et shift, et Début, Fin, Page préc. et Page suiv. à côté des flèches.",
  },
  es: {
    changes: "La hoja de Cambios en una tableta: cinco archivos cambiados en un árbol de carpetas, cada uno marcado como modificado o sin seguimiento con su número de líneas, y los cambios sin confirmar elegidos en el menú de alcance.",
    keyboard: "El teclado en pantalla de la tableta: una fila de atajos, una franja de teclas de función, una fila de números, ctrl, alt y shift, e Inicio, Fin, RePág y AvPág junto a las flechas.",
  },
  pt: {
    changes: "A folha de Alterações num tablet: cinco arquivos alterados numa árvore de pastas, cada um marcado como modificado ou não rastreado com seu número de linhas, e as alterações não confirmadas escolhidas no menu de escopo.",
    keyboard: "O teclado na tela do tablet: uma fileira de atalhos, uma faixa de teclas de função, uma fileira de números, ctrl, alt e shift, e Home, End, Page Up e Page Down ao lado das setas.",
  },
  ru: {
    changes: "Лист изменений на планшете: пять изменённых файлов в дереве папок, у каждого отметка «изменён» или «не отслеживается» и число строк; в меню области выбраны незафиксированные изменения.",
    keyboard: "Экранная клавиатура планшета: ряд быстрых клавиш, полоса функциональных клавиш, цифровой ряд, ctrl, alt и shift, а рядом со стрелками Home, End, Page Up и Page Down.",
  },
  vi: {
    changes: "Bảng Thay đổi trên máy tính bảng: năm tệp đã thay đổi trong cây thư mục, mỗi tệp ghi Đã sửa hoặc Chưa theo dõi kèm số dòng, và menu phạm vi đang chọn thay đổi chưa commit.",
    keyboard: "Bàn phím ảo trên máy tính bảng: một hàng phím tắt, dải phím chức năng, hàng số, ctrl, alt và shift, cùng Home, End, Page Up và Page Down cạnh các phím mũi tên.",
  },
  th: {
    changes: "แผ่นการเปลี่ยนแปลงบนแท็บเล็ต: ไฟล์ที่เปลี่ยนห้าไฟล์ในแผนผังโฟลเดอร์ แต่ละไฟล์ระบุว่าแก้ไขหรือยังไม่ติดตามพร้อมจำนวนบรรทัด และเมนูขอบเขตเลือกการเปลี่ยนแปลงที่ยังไม่คอมมิต",
    keyboard: "คีย์บอร์ดบนหน้าจอของแท็บเล็ต: แถวปุ่มลัด แถบปุ่มฟังก์ชัน แถวตัวเลข ctrl alt และ shift และ Home, End, Page Up, Page Down ข้างปุ่มลูกศร",
  },
};
