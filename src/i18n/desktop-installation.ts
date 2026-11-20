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
    setup: "This command installs Desktop only. If Gateway is missing when you open Desktop, the app asks before installing it and shows the progress.",
    pending: "Preview download pending",
    requirements: "System requirements",
    details: "The installer downloads the prebuilt package with curl and verifies its SHA-256 before installing it.",
  },
  "zh-CN": {
    title: "安装桌面版",
    preview: "预览版",
    setup: "这条命令只安装桌面版。打开后若缺少 Gateway，应用会先询问，确认后再显示安装进度。",
    pending: "预览版安装包尚未发布",
    requirements: "系统要求",
    details: "安装脚本使用 curl 下载预编译包，并在安装前验证 SHA-256。",
  },
  "zh-TW": {
    title: "安裝桌面版",
    preview: "預覽版",
    setup: "這個指令只安裝桌面版。開啟後若缺少 Gateway，應用程式會先詢問，確認後再顯示安裝進度。",
    pending: "預覽版安裝套件尚未發佈",
    requirements: "系統需求",
    details: "安裝指令碼使用 curl 下載預先編譯的套件，並在安裝前驗證 SHA-256。",
  },
  "ja": {
    title: "Desktop をインストール",
    preview: "プレビュー版",
    setup: "このコマンドは Desktop だけをインストールします。起動時に Gateway が見つからなければ確認画面が開き、同意後にインストールの進捗を表示します。",
    pending: "プレビュー版の公開待ち",
    requirements: "システム要件",
    details: "インストーラは curl でビルド済みパッケージをダウンロードし、インストール前に SHA-256 を検証します。",
  },
  "ko": {
    title: "Desktop 설치",
    preview: "프리뷰",
    setup: "이 명령은 Desktop만 설치합니다. Desktop을 열었을 때 Gateway가 없으면 먼저 설치 여부를 묻고, 동의하면 진행 상황을 표시합니다.",
    pending: "프리뷰 패키지 출시 대기 중",
    requirements: "시스템 요구 사항",
    details: "설치 스크립트는 curl로 빌드된 패키지를 다운로드하고 설치 전에 SHA-256을 검증합니다.",
  },
  "de": {
    title: "Desktop installieren",
    preview: "Preview",
    setup: "Der Befehl installiert nur Desktop. Fehlt Gateway beim Start, fragt Desktop vor der Installation nach und zeigt anschließend den Fortschritt an.",
    pending: "Preview-Paket noch nicht veröffentlicht",
    requirements: "Systemvoraussetzungen",
    details: "Der Installer lädt das fertige Paket mit curl herunter und prüft vor der Installation dessen SHA-256-Prüfsumme.",
  },
  "fr": {
    title: "Installer Desktop",
    preview: "Préversion",
    setup: "Cette commande installe uniquement Desktop. Au démarrage, si Gateway est absent, Desktop demande votre accord puis affiche la progression de son installation.",
    pending: "Paquet de préversion en attente de publication",
    requirements: "Configuration requise",
    details: "Le programme d’installation télécharge le paquet précompilé avec curl et vérifie sa somme SHA-256 avant de l’installer.",
  },
  "es": {
    title: "Instalar Desktop",
    preview: "Versión preliminar",
    setup: "Este comando instala solo Desktop. Si falta Gateway al abrir la aplicación, Desktop pide permiso antes de instalarlo y muestra el progreso.",
    pending: "Paquete preliminar pendiente de publicación",
    requirements: "Requisitos del sistema",
    details: "El instalador descarga el paquete precompilado con curl y verifica su suma SHA-256 antes de instalarlo.",
  },
  "pt": {
    title: "Instalar o Desktop",
    preview: "Prévia",
    setup: "Este comando instala apenas o Desktop. Se o Gateway estiver ausente ao abrir o aplicativo, o Desktop pede autorização e mostra o progresso da instalação.",
    pending: "Pacote de prévia aguardando publicação",
    requirements: "Requisitos do sistema",
    details: "O instalador baixa o pacote pré-compilado com curl e verifica a soma SHA-256 antes da instalação.",
  },
  "ru": {
    title: "Установка Desktop",
    preview: "Предварительная версия",
    setup: "Команда устанавливает только Desktop. Если при запуске Gateway не найден, Desktop предложит установить его и после вашего согласия покажет ход установки.",
    pending: "Пакет ещё не опубликован",
    requirements: "Системные требования",
    details: "Установщик загружает готовый пакет с помощью curl и проверяет контрольную сумму SHA-256 перед установкой.",
  },
  "th": {
    title: "ติดตั้ง Desktop",
    preview: "รุ่นพรีวิว",
    setup: "คำสั่งนี้ติดตั้งเฉพาะ Desktop เมื่อเปิดแอป หากไม่มี Gateway แอปจะขออนุญาตก่อนติดตั้งและแสดงความคืบหน้า",
    pending: "แพ็กเกจพรีวิวยังไม่เผยแพร่",
    requirements: "ข้อกำหนดของระบบ",
    details: "ตัวติดตั้งใช้ curl ดาวน์โหลดแพ็กเกจที่สร้างไว้แล้ว และตรวจสอบค่า SHA-256 ก่อนติดตั้ง",
  },
  "vi": {
    title: "Cài đặt Desktop",
    preview: "Bản xem trước",
    setup: "Lệnh này chỉ cài Desktop. Khi mở ứng dụng, nếu thiếu Gateway, Desktop sẽ hỏi trước khi cài đặt và hiển thị tiến độ sau khi bạn đồng ý.",
    pending: "Gói xem trước chưa được phát hành",
    requirements: "Yêu cầu hệ thống",
    details: "Trình cài dùng curl để tải gói dựng sẵn và kiểm tra mã SHA-256 trước khi cài đặt.",
  },
};
