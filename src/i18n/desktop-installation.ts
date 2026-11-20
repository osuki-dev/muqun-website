import type { SiteLocale } from "@/lib/locales";

type Entry = readonly [title: string, body: string];
interface InstallationCopy {
  intro: string;
  installer: Entry;
  options: readonly [Entry, Entry, Entry];
  platforms: readonly [string, string];
}

export const desktopInstallation: Record<SiteLocale, InstallationCopy> = {
  en: {
    intro:
      "Install prebuilt packages, choose a release channel and start your first session.",
    installer: [
      "One installer. Prebuilt packages.",
      "The installer needs Python 3 and curl and downloads prebuilt packages without compiling. Gateway setup also needs an existing tmux or Herdr installation.",
    ],
    options: [
      [
        "Stable by default",
        "Installs stable Desktop and provisions a missing stable Gateway. An existing Gateway installation, service and configuration are reused.",
      ],
      [
        "Preview Desktop",
        "Installs the Desktop preview and, when missing, the preview Gateway. An existing Gateway is reused.",
      ],
      [
        "Without a local Gateway",
        "Skips Gateway setup for in-process local agent sessions or a paired remote computer.",
      ],
    ],
    platforms: [
      "Linux x86_64 installs for the current user under ~/.local. Use PREFIX for another location.",
      "Apple Silicon macOS installs to ~/Applications, or updates an existing writable copy in /Applications. The installer verifies the app’s signature and Gatekeeper assessment.",
    ],
  },
  "zh-CN": {
    intro: "安装预编译软件包、选择发布渠道并开始第一个会话。",
    installer: [
      "一个安装脚本，使用预编译包。",
      "安装脚本需要 Python 3 和 curl，下载预编译软件包，无需编译。Gateway 设置还需要已安装的 tmux 或 Herdr。",
    ],
    options: [
      [
        "默认使用稳定版",
        "安装稳定版 Desktop，并在缺少本机 Gateway 时安装其稳定版。已有的 Gateway 安装、服务和配置将被复用。",
      ],
      [
        "Desktop 预览版",
        "安装 Desktop 预览版。缺少本机 Gateway 时一并安装 Gateway 预览版；已有的 Gateway 会继续使用。",
      ],
      [
        "不安装本机 Gateway",
        "跳过 Gateway 设置，使用进程内的本机智能体会话或已配对的远程电脑。",
      ],
    ],
    platforms: [
      "Linux x86_64 默认安装到当前用户的 ~/.local。可用 PREFIX 指定其他位置。",
      "Apple Silicon macOS 默认安装到 ~/Applications；若 /Applications 中已有可写副本，则在原处更新。安装脚本会验证应用签名和 Gatekeeper 检查结果。",
    ],
  },
  "zh-TW": {
    intro: "安裝預先編譯的套件、選擇發佈管道並開始第一個工作階段。",
    installer: [
      "一個安裝指令碼，使用預先編譯套件。",
      "安裝指令碼需要 Python 3 與 curl，下載預先編譯的套件，無需編譯。Gateway 設定還需要已安裝的 tmux 或 Herdr。",
    ],
    options: [
      [
        "預設使用穩定版",
        "安裝穩定版 Desktop，並在缺少本機 Gateway 時安裝其穩定版。現有的 Gateway 安裝、服務與設定會被沿用。",
      ],
      [
        "Desktop 預覽版",
        "安裝 Desktop 預覽版。缺少本機 Gateway 時一併安裝 Gateway 預覽版；已有的 Gateway 會繼續使用。",
      ],
      [
        "不安裝本機 Gateway",
        "略過 Gateway 設定，使用程序內的本機智慧體工作階段或已配對的遠端電腦。",
      ],
    ],
    platforms: [
      "Linux x86_64 預設安裝到目前使用者的 ~/.local。可用 PREFIX 指定其他位置。",
      "Apple Silicon macOS 預設安裝到 ~/Applications；若 /Applications 已有可寫入的副本，則在原處更新。安裝指令碼會驗證應用程式簽署與 Gatekeeper 檢查結果。",
    ],
  },
  ja: {
    intro:
      "ビルド済みパッケージをインストールし、チャンネルを選んで最初のセッションへ。",
    installer: [
      "ひとつのインストーラ。ビルド済みパッケージ。",
      "インストーラには Python 3 と curl が必要です。ビルド済みパッケージをダウンロードするため、コンパイルは不要です。Gateway の設定にはインストール済みの tmux または Herdr も必要です。",
    ],
    options: [
      [
        "標準は安定版",
        "安定版 Desktop をインストールし、ローカル Gateway がなければ安定版を導入します。既存の Gateway、サービス、設定はそのまま利用します。",
      ],
      [
        "Desktop プレビュー",
        "Desktop プレビュー版をインストールします。Gateway がない場合はプレビュー版を追加し、既存の Gateway はそのまま使用します。",
      ],
      [
        "ローカル Gateway なし",
        "Gateway の設定を省略し、プロセス内のローカルセッションやペアリング済みのリモートコンピュータを使います。",
      ],
    ],
    platforms: [
      "Linux x86_64 は現在のユーザーの ~/.local にインストールされます。PREFIX で別の場所を指定できます。",
      "Apple Silicon macOS は ~/Applications にインストールします。/Applications に書き込み可能な既存コピーがあれば、そこで更新します。アプリの署名と Gatekeeper の評価も検証します。",
    ],
  },
  ko: {
    intro:
      "미리 빌드된 패키지를 설치하고 채널을 선택한 뒤 첫 세션을 시작하세요.",
    installer: [
      "하나의 설치 스크립트. 미리 빌드된 패키지.",
      "설치 스크립트는 Python 3와 curl이 필요하며 미리 빌드된 패키지를 다운로드하므로 컴파일하지 않습니다. Gateway 설정에는 설치된 tmux 또는 Herdr도 필요합니다.",
    ],
    options: [
      [
        "기본은 안정 버전",
        "안정 버전 Desktop을 설치하고 로컬 Gateway가 없으면 안정 버전을 설치합니다. 기존 Gateway 설치, 서비스와 설정은 재사용합니다.",
      ],
      [
        "Desktop 프리뷰",
        "Desktop 프리뷰를 설치하고, Gateway가 없으면 프리뷰 버전을 함께 설치합니다. 기존 Gateway는 그대로 사용합니다.",
      ],
      [
        "로컬 Gateway 없이",
        "Gateway 설정을 건너뛰고 프로세스 내 로컬 에이전트 세션이나 페어링된 원격 컴퓨터를 사용합니다.",
      ],
    ],
    platforms: [
      "Linux x86_64는 현재 사용자의 ~/.local에 설치됩니다. PREFIX로 다른 위치를 지정할 수 있습니다.",
      "Apple Silicon macOS는 ~/Applications에 설치하며 /Applications에 쓰기 가능한 기존 복사본이 있으면 그곳에서 업데이트합니다. 앱 서명과 Gatekeeper 평가를 검증합니다.",
    ],
  },
  de: {
    intro:
      "Fertige Pakete installieren, einen Kanal wählen und die erste Sitzung starten.",
    installer: [
      "Ein Installer. Fertige Pakete.",
      "Der Installer benötigt Python 3 und curl und lädt fertige Pakete ohne Kompilierung. Gateway benötigt außerdem ein installiertes tmux oder Herdr.",
    ],
    options: [
      [
        "Standard: stabil",
        "Installiert den stabilen Desktop und bei Bedarf einen stabilen lokalen Gateway. Vorhandene Gateway-Installationen, Dienste und Einstellungen werden weiterverwendet.",
      ],
      [
        "Desktop-Preview",
        "Installiert die Desktop-Preview und bei Bedarf die Gateway-Preview. Ein vorhandener Gateway wird weiterverwendet.",
      ],
      [
        "Ohne lokalen Gateway",
        "Überspringt die Gateway-Einrichtung für lokale Agentensitzungen im Prozess oder einen gekoppelten Remote-Computer.",
      ],
    ],
    platforms: [
      "Linux x86_64 installiert für den aktuellen Benutzer unter ~/.local. Mit PREFIX lässt sich ein anderer Ort wählen.",
      "Apple Silicon macOS installiert unter ~/Applications oder aktualisiert eine vorhandene beschreibbare Kopie in /Applications. Der Installer prüft die App-Signatur und die Gatekeeper-Bewertung.",
    ],
  },
  fr: {
    intro:
      "Installez des paquets précompilés, choisissez un canal et ouvrez votre première session.",
    installer: [
      "Un installateur. Des paquets précompilés.",
      "L’installateur nécessite Python 3 et curl et télécharge des paquets précompilés, sans compilation. Gateway nécessite aussi tmux ou Herdr déjà installé.",
    ],
    options: [
      [
        "Stable par défaut",
        "Installe Desktop stable et un Gateway stable local s’il manque. Les installations, services et réglages Gateway existants sont réutilisés.",
      ],
      [
        "Préversion Desktop",
        "Installe la préversion de Desktop et, si nécessaire, celle de Gateway. Un Gateway déjà installé est réutilisé.",
      ],
      [
        "Sans Gateway local",
        "Ignore la configuration Gateway pour utiliser les agents locaux dans le processus ou un ordinateur distant associé.",
      ],
    ],
    platforms: [
      "Linux x86_64 s’installe pour l’utilisateur courant dans ~/.local. Utilisez PREFIX pour choisir un autre emplacement.",
      "macOS Apple Silicon s’installe dans ~/Applications ou met à jour une copie existante modifiable dans /Applications. L’installateur vérifie la signature et l’évaluation Gatekeeper.",
    ],
  },
  es: {
    intro:
      "Instala paquetes precompilados, elige un canal y empieza tu primera sesión.",
    installer: [
      "Un instalador. Paquetes precompilados.",
      "El instalador necesita Python 3 y curl y descarga paquetes precompilados sin compilar. Gateway también necesita tmux o Herdr instalado.",
    ],
    options: [
      [
        "Estable por defecto",
        "Instala Desktop estable y un Gateway estable local si falta. Reutiliza las instalaciones, servicios y ajustes Gateway existentes.",
      ],
      [
        "Versión preliminar de Desktop",
        "Instala la versión preliminar de Desktop y, si falta Gateway, también su versión preliminar. Se conserva el Gateway existente.",
      ],
      [
        "Sin Gateway local",
        "Omite la configuración de Gateway para usar sesiones locales dentro del proceso o un ordenador remoto emparejado.",
      ],
    ],
    platforms: [
      "Linux x86_64 se instala para el usuario actual en ~/.local. Usa PREFIX para elegir otra ubicación.",
      "macOS Apple Silicon se instala en ~/Applications o actualiza una copia existente con permiso de escritura en /Applications. El instalador verifica la firma y la evaluación de Gatekeeper.",
    ],
  },
  pt: {
    intro:
      "Instale pacotes pré-compilados, escolha um canal e inicie sua primeira sessão.",
    installer: [
      "Um instalador. Pacotes pré-compilados.",
      "O instalador precisa de Python 3 e curl e baixa pacotes pré-compilados sem compilação. O Gateway também precisa de tmux ou Herdr instalado.",
    ],
    options: [
      [
        "Estável por padrão",
        "Instala o Desktop estável e um Gateway estável local se estiver ausente. Reutiliza instalações, serviços e configurações Gateway existentes.",
      ],
      [
        "Prévia do Desktop",
        "Instala a prévia do Desktop e, se necessário, a prévia do Gateway. Reutiliza o Gateway já instalado.",
      ],
      [
        "Sem Gateway local",
        "Ignora a configuração Gateway para usar agentes locais no processo ou um computador remoto pareado.",
      ],
    ],
    platforms: [
      "Linux x86_64 instala para o usuário atual em ~/.local. Use PREFIX para escolher outro local.",
      "macOS Apple Silicon instala em ~/Applications ou atualiza uma cópia existente com permissão de escrita em /Applications. O instalador verifica a assinatura e a avaliação do Gatekeeper.",
    ],
  },
  ru: {
    intro: "Установите готовые пакеты, выберите канал и начните первую сессию.",
    installer: [
      "Один установщик. Готовые пакеты.",
      "Установщик требует Python 3 и curl и загружает готовые пакеты без компиляции. Для настройки Gateway также нужен установленный tmux или Herdr.",
    ],
    options: [
      [
        "По умолчанию — стабильный",
        "Устанавливает стабильный Desktop и при необходимости стабильный локальный Gateway. Существующие установки, службы и настройки Gateway используются повторно.",
      ],
      [
        "Превью Desktop",
        "Устанавливает предварительную версию Desktop и при необходимости предварительную версию Gateway. Установленный Gateway используется повторно.",
      ],
      [
        "Без локального Gateway",
        "Пропускает настройку Gateway для локальных агентных сессий внутри процесса или сопряжённого удалённого компьютера.",
      ],
    ],
    platforms: [
      "Linux x86_64 устанавливается для текущего пользователя в ~/.local. Другое расположение задаётся через PREFIX.",
      "macOS Apple Silicon устанавливается в ~/Applications либо обновляет доступную для записи копию в /Applications. Установщик проверяет подпись приложения и оценку Gatekeeper.",
    ],
  },
  th: {
    intro: "ติดตั้งแพ็กเกจที่สร้างไว้แล้ว เลือกช่องทาง และเริ่มเซสชันแรก",
    installer: [
      "ตัวติดตั้งเดียว แพ็กเกจพร้อมใช้",
      "ตัวติดตั้งต้องใช้ Python 3 และ curl เพื่อดาวน์โหลดแพ็กเกจที่สร้างไว้แล้วโดยไม่ต้องคอมไพล์ การตั้งค่า Gateway ต้องมี tmux หรือ Herdr ติดตั้งไว้ด้วย",
    ],
    options: [
      [
        "ค่าเริ่มต้นคือรุ่นเสถียร",
        "ติดตั้ง Desktop รุ่นเสถียรและ Gateway รุ่นเสถียรในเครื่องหากยังไม่มี โดยใช้การติดตั้ง บริการ และการตั้งค่า Gateway ที่มีอยู่ต่อ",
      ],
      [
        "Desktop รุ่นพรีวิว",
        "ติดตั้ง Desktop รุ่นพรีวิว หากยังไม่มี Gateway จะติดตั้ง Gateway รุ่นพรีวิวด้วย หากมีอยู่แล้วจะใช้ Gateway เดิม",
      ],
      [
        "ไม่ใช้ Gateway ในเครื่อง",
        "ข้ามการตั้งค่า Gateway เพื่อใช้เอเจนต์ในโปรเซสหรือคอมพิวเตอร์ระยะไกลที่จับคู่แล้ว",
      ],
    ],
    platforms: [
      "Linux x86_64 ติดตั้งสำหรับผู้ใช้ปัจจุบันใน ~/.local ใช้ PREFIX เพื่อเลือกตำแหน่งอื่น",
      "macOS Apple Silicon ติดตั้งใน ~/Applications หรืออัปเดตสำเนาเดิมใน /Applications หากเขียนได้ ตัวติดตั้งตรวจลายเซ็นแอปและผลประเมิน Gatekeeper",
    ],
  },
  vi: {
    intro: "Cài gói dựng sẵn, chọn kênh và bắt đầu phiên đầu tiên.",
    installer: [
      "Một trình cài. Gói dựng sẵn.",
      "Trình cài cần Python 3 và curl để tải gói dựng sẵn, không cần biên dịch. Thiết lập Gateway cũng cần tmux hoặc Herdr được cài sẵn.",
    ],
    options: [
      [
        "Mặc định là ổn định",
        "Cài Desktop ổn định và Gateway ổn định cục bộ nếu thiếu. Tái sử dụng Gateway, dịch vụ và cấu hình hiện có.",
      ],
      [
        "Bản xem trước Desktop",
        "Cài đặt bản xem trước của Desktop và cả bản xem trước của Gateway nếu máy chưa có Gateway. Giữ nguyên Gateway hiện có.",
      ],
      [
        "Không có Gateway cục bộ",
        "Bỏ qua thiết lập Gateway để dùng agent cục bộ trong tiến trình hoặc máy từ xa đã ghép nối.",
      ],
    ],
    platforms: [
      "Linux x86_64 cài cho người dùng hiện tại tại ~/.local. Dùng PREFIX để chọn vị trí khác.",
      "macOS Apple Silicon cài vào ~/Applications hoặc cập nhật bản hiện có cho phép ghi trong /Applications. Trình cài kiểm tra chữ ký ứng dụng và đánh giá Gatekeeper.",
    ],
  },
};
