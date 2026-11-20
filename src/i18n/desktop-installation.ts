import type { SiteLocale } from "@/lib/locales";

interface InstallationCopy {
  title: string;
  preview: string;
  pending: string;
  requirements: string;
  details: string;
}

export const desktopInstallation: Record<SiteLocale, InstallationCopy> = {
  "en": {
    title: "Install Desktop",
    preview: "Preview",
    pending: "Preview download pending",
    requirements: "System requirements",
    details: "The installer downloads the prebuilt package with curl and verifies its SHA-256 before installing it.",
  },
  "zh-CN": {
    title: "安装桌面版",
    preview: "预览版",
    pending: "预览版安装包尚未发布",
    requirements: "系统要求",
    details: "安装脚本使用 curl 下载预编译包，并在安装前验证 SHA-256。",
  },
  "zh-TW": {
    title: "安裝桌面版",
    preview: "預覽版",
    pending: "預覽版安裝套件尚未發佈",
    requirements: "系統需求",
    details: "安裝指令碼使用 curl 下載預先編譯的套件，並在安裝前驗證 SHA-256。",
  },
  "ja": {
    title: "Desktop をインストール",
    preview: "プレビュー版",
    pending: "プレビュー版の公開待ち",
    requirements: "システム要件",
    details: "インストーラは curl でビルド済みパッケージをダウンロードし、インストール前に SHA-256 を検証します。",
  },
  "ko": {
    title: "Desktop 설치",
    preview: "프리뷰",
    pending: "프리뷰 패키지 출시 대기 중",
    requirements: "시스템 요구 사항",
    details: "설치 스크립트는 curl로 빌드된 패키지를 다운로드하고 설치 전에 SHA-256을 검증합니다.",
  },
  "de": {
    title: "Desktop installieren",
    preview: "Preview",
    pending: "Preview-Paket noch nicht veröffentlicht",
    requirements: "Systemvoraussetzungen",
    details: "Der Installer lädt das fertige Paket mit curl herunter und prüft vor der Installation dessen SHA-256-Prüfsumme.",
  },
  "fr": {
    title: "Installer Desktop",
    preview: "Préversion",
    pending: "Paquet de préversion en attente de publication",
    requirements: "Configuration requise",
    details: "Le programme d’installation télécharge le paquet précompilé avec curl et vérifie sa somme SHA-256 avant de l’installer.",
  },
  "es": {
    title: "Instalar Desktop",
    preview: "Versión preliminar",
    pending: "Paquete preliminar pendiente de publicación",
    requirements: "Requisitos del sistema",
    details: "El instalador descarga el paquete precompilado con curl y verifica su suma SHA-256 antes de instalarlo.",
  },
  "pt": {
    title: "Instalar o Desktop",
    preview: "Prévia",
    pending: "Pacote de prévia aguardando publicação",
    requirements: "Requisitos do sistema",
    details: "O instalador baixa o pacote pré-compilado com curl e verifica a soma SHA-256 antes da instalação.",
  },
  "ru": {
    title: "Установка Desktop",
    preview: "Предварительная версия",
    pending: "Пакет ещё не опубликован",
    requirements: "Системные требования",
    details: "Установщик загружает готовый пакет с помощью curl и проверяет контрольную сумму SHA-256 перед установкой.",
  },
  "th": {
    title: "ติดตั้ง Desktop",
    preview: "รุ่นพรีวิว",
    pending: "แพ็กเกจพรีวิวยังไม่เผยแพร่",
    requirements: "ข้อกำหนดของระบบ",
    details: "ตัวติดตั้งใช้ curl ดาวน์โหลดแพ็กเกจที่สร้างไว้แล้ว และตรวจสอบค่า SHA-256 ก่อนติดตั้ง",
  },
  "vi": {
    title: "Cài đặt Desktop",
    preview: "Bản xem trước",
    pending: "Gói xem trước chưa được phát hành",
    requirements: "Yêu cầu hệ thống",
    details: "Trình cài dùng curl để tải gói dựng sẵn và kiểm tra mã SHA-256 trước khi cài đặt.",
  },
};
