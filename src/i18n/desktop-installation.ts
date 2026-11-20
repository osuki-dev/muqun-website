import type { SiteLocale } from "@/lib/locales";

interface InstallationCopy {
  title: string;
  preview: string;
  setup: string;
  pending: string;
  requirements: string;
  details: string;
}

export const desktopInstallation: Record<SiteLocale, InstallationCopy> = {
  "en": {
    title: "Install Desktop",
    preview: "Preview",
    setup: "This command installs Desktop only. On first launch, if Gateway is missing, click Install. Desktop downloads and verifies Gateway, then installs it so you can enter the workspace.",
    pending: "Preview download pending",
    requirements: "System requirements",
    details: "The installer downloads the prebuilt package with curl and verifies its SHA-256 before installing it.",
  },
  "zh-CN": {
    title: "安装桌面版",
    preview: "预览版",
    setup: "这条命令只安装桌面版。首次打开时若缺少 Gateway，点击安装，桌面版会下载并校验 Gateway。安装完成后即可进入工作区。",
    pending: "预览版安装包尚未发布",
    requirements: "系统要求",
    details: "安装脚本使用 curl 下载预编译包，并在安装前验证 SHA-256。",
  },
  "zh-TW": {
    title: "安裝桌面版",
    preview: "預覽版",
    setup: "這個指令只安裝桌面版。首次開啟時若缺少 Gateway，點選安裝，桌面版會下載並驗證 Gateway。安裝完成後即可進入工作區。",
    pending: "預覽版安裝套件尚未發佈",
    requirements: "系統需求",
    details: "安裝指令碼使用 curl 下載預先編譯的套件，並在安裝前驗證 SHA-256。",
  },
  "ja": {
    title: "Desktop をインストール",
    preview: "プレビュー版",
    setup: "このコマンドは Desktop のみをインストールします。初回起動時に Gateway が見つからない場合は、インストールを選んでください。Desktop がダウンロードと検証を行い、インストールが完了するとワークスペースに入れます。",
    pending: "プレビュー版の公開待ち",
    requirements: "システム要件",
    details: "インストーラは curl でビルド済みパッケージをダウンロードし、インストール前に SHA-256 を検証します。",
  },
  "ko": {
    title: "Desktop 설치",
    preview: "프리뷰",
    setup: "이 명령은 Desktop만 설치합니다. 처음 실행할 때 Gateway가 없으면 설치를 누르세요. Desktop이 Gateway를 다운로드하고 검증한 뒤 설치하면 작업 공간에 들어갈 수 있습니다.",
    pending: "프리뷰 패키지 출시 대기 중",
    requirements: "시스템 요구 사항",
    details: "설치 스크립트는 curl로 빌드된 패키지를 다운로드하고 설치 전에 SHA-256을 검증합니다.",
  },
  "de": {
    title: "Desktop installieren",
    preview: "Preview",
    setup: "Der Befehl installiert nur Desktop. Fehlt Gateway beim ersten Start, klicke auf Installieren. Desktop lädt Gateway herunter, prüft und installiert es. Danach kannst du den Arbeitsbereich öffnen.",
    pending: "Preview-Paket noch nicht veröffentlicht",
    requirements: "Systemvoraussetzungen",
    details: "Der Installer lädt das fertige Paket mit curl herunter und prüft vor der Installation dessen SHA-256-Prüfsumme.",
  },
  "fr": {
    title: "Installer Desktop",
    preview: "Préversion",
    setup: "Cette commande installe uniquement Desktop. Si Gateway manque au premier lancement, cliquez sur Installer. Desktop télécharge, vérifie et installe Gateway. Vous pouvez ensuite accéder à votre espace de travail.",
    pending: "Paquet de préversion en attente de publication",
    requirements: "Configuration requise",
    details: "Le programme d’installation télécharge le paquet précompilé avec curl et vérifie sa somme SHA-256 avant de l’installer.",
  },
  "es": {
    title: "Instalar Desktop",
    preview: "Versión preliminar",
    setup: "Este comando instala solo Desktop. Si falta Gateway al iniciar por primera vez, pulsa Instalar. Desktop descarga, verifica e instala Gateway. Después puedes entrar en tu espacio de trabajo.",
    pending: "Paquete preliminar pendiente de publicación",
    requirements: "Requisitos del sistema",
    details: "El instalador descarga el paquete precompilado con curl y verifica su suma SHA-256 antes de instalarlo.",
  },
  "pt": {
    title: "Instalar o Desktop",
    preview: "Prévia",
    setup: "Este comando instala apenas o Desktop. Se o Gateway estiver ausente na primeira inicialização, clique em Instalar. O Desktop baixa, verifica e instala o Gateway. Depois, você pode entrar no espaço de trabalho.",
    pending: "Pacote de prévia aguardando publicação",
    requirements: "Requisitos do sistema",
    details: "O instalador baixa o pacote pré-compilado com curl e verifica a soma SHA-256 antes da instalação.",
  },
  "ru": {
    title: "Установка Desktop",
    preview: "Предварительная версия",
    setup: "Команда устанавливает только Desktop. Если при первом запуске Gateway не найден, нажмите «Установить». Desktop скачает, проверит и установит Gateway, после чего можно будет открыть рабочую область.",
    pending: "Пакет ещё не опубликован",
    requirements: "Системные требования",
    details: "Установщик загружает готовый пакет с помощью curl и проверяет контрольную сумму SHA-256 перед установкой.",
  },
  "th": {
    title: "ติดตั้ง Desktop",
    preview: "รุ่นพรีวิว",
    setup: "คำสั่งนี้ติดตั้งเฉพาะ Desktop เมื่อเปิดครั้งแรก หากไม่พบ Gateway ให้คลิกติดตั้ง Desktop จะดาวน์โหลด ตรวจสอบ และติดตั้ง Gateway จากนั้นคุณจะเข้าสู่พื้นที่ทำงานได้",
    pending: "แพ็กเกจพรีวิวยังไม่เผยแพร่",
    requirements: "ข้อกำหนดของระบบ",
    details: "ตัวติดตั้งใช้ curl ดาวน์โหลดแพ็กเกจที่สร้างไว้แล้ว และตรวจสอบค่า SHA-256 ก่อนติดตั้ง",
  },
  "vi": {
    title: "Cài đặt Desktop",
    preview: "Bản xem trước",
    setup: "Lệnh này chỉ cài Desktop. Nếu thiếu Gateway khi mở lần đầu, hãy chọn Cài đặt. Desktop sẽ tải xuống, xác minh và cài Gateway. Sau đó bạn có thể vào không gian làm việc.",
    pending: "Gói xem trước chưa được phát hành",
    requirements: "Yêu cầu hệ thống",
    details: "Trình cài dùng curl để tải gói dựng sẵn và kiểm tra mã SHA-256 trước khi cài đặt.",
  },
};
