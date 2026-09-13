import type { SiteLocale } from '@/lib/locales';
interface GatewayHelp {
  steps: [string, string, string];
  manual: string;
  heading: string;
  labels: [string, string, string, string, string, string, string];
  serviceNote: string;
  modes: [string, string];
  keys: string;
}
export const gatewayHelp: Record<SiteLocale, GatewayHelp> = {
  th: {
  "steps": [
    "เปิดตัวจัดการการจับคู่บนคอมพิวเตอร์",
    "สแกนรหัส QR ใน Muqun",
    "กรอกรหัสสั้นที่แสดงบนคอมพิวเตอร์ในแอป"
  ],
  "manual": "สแกนไม่ได้? กรอกที่อยู่ Gateway ในแอปด้วยตนเอง แล้วกรอกรหัสสั้นเดียวกัน",
  "heading": "คำสั่ง Gateway",
  "labels": [
    "เริ่มทำงานเบื้องหลัง",
    "ดูสถานะโปรเซสและที่อยู่",
    "หยุดโปรเซส",
    "เปิดการเริ่มอัตโนมัติเมื่อเข้าสู่ระบบ",
    "ดูสถานะบริการเบื้องหลัง",
    "ยกเลิกการเริ่มอัตโนมัติ",
    "ดูคำสั่งและตัวเลือกทั้งหมด"
  ],
  "modes": [
    "เริ่มโดยตรง",
    "โหมดบริการ"
  ],
  "serviceNote": "เลือกใช้เพียงโหมดเดียว การเริ่มโดยตรงใช้ start/stop ส่วนโหมดบริการใช้ได้เมื่อคุณเลือกติดตั้งบริการแล้วเท่านั้น และระบบจะเริ่มให้อัตโนมัติ อย่ารัน start ขณะบริการทำงาน หากต้องการกลับไปเริ่มโดยตรง ให้รัน service uninstall ก่อน อุปกรณ์ที่จับคู่ไว้จะยังอยู่",
  "keys": "ในตัวจัดการ: p แสดง QR อีกครั้ง · x เพิกถอนอุปกรณ์ · u เปลี่ยนที่อยู่เชื่อมต่อ"
},
  en: {
    steps: ['Open the pairing manager on your computer', 'Scan its QR code in Muqun', 'Enter the short code shown on your computer in the app'],
    manual: 'Cannot scan? Enter the Gateway address in the app, then enter the same short code.',
    heading: 'Gateway commands',
    labels: ['Start in the background', 'Check process status and address', 'Stop the process', 'Enable automatic startup at login', 'Check the background service', 'Remove automatic startup', 'Show all commands and options'],
    modes: ["Direct startup", "Service mode"],
    serviceNote: "Choose one mode only. Direct startup uses start/stop. Service mode is available only after you choose to install the service; it starts automatically. Do not run start alongside the service. To return to direct mode, run service uninstall first; paired devices are kept.",
    keys: 'In the manager: p shows the QR code again · x revokes a device · u changes the connection address.',
  },
  'zh-CN': {
    steps: ['在电脑上打开配对管理器', '在牧群 App 中扫描二维码', '在 App 中输入电脑显示的短码'],
    manual: '无法扫码？在 App 中手动输入 Gateway 地址，再输入同一个短码。',
    heading: 'Gateway 命令帮助',
    labels: ['后台启动', '查看运行状态和地址', '停止进程', '设置登录后自动启动', '查看后台服务状态', '取消自动启动', '查看全部命令和选项'],
    modes: ["直接启动", "服务模式"],
    serviceNote: "两种模式只能选一种。直接启动使用 start/stop；只有选择安装了服务，才使用服务模式，由系统自动启动。服务运行时不要再执行 start。切回直接启动前，先执行 service uninstall，已配对设备会保留。",
    keys: '管理器快捷键：p 重新显示二维码 · x 撤销设备授权 · u 修改连接地址。',
  },
  'zh-TW': {
    steps: ['在電腦上開啟配對管理員', '在牧群 App 中掃描 QR 碼', '在 App 中輸入電腦顯示的短碼'],
    manual: '無法掃描？在 App 中手動輸入 Gateway 位址，再輸入同一組短碼。',
    heading: 'Gateway 指令說明',
    labels: ['在背景啟動', '查看執行狀態與位址', '停止程序', '設定登入後自動啟動', '查看背景服務狀態', '取消自動啟動', '查看所有指令與選項'],
    modes: ["直接啟動", "服務模式"],
    serviceNote: "兩種模式只能擇一。直接啟動使用 start/stop；必須先選擇安裝服務，才能使用由系統自動啟動的服務模式。服務執行時請勿再執行 start。切回直接啟動前，請先執行 service uninstall，已配對裝置會保留。",
    keys: '管理員快速鍵：p 重新顯示 QR 碼 · x 撤銷裝置授權 · u 修改連線位址。',
  },
  ja: {
    steps: ['パソコンでペアリング管理画面を開く', 'Muqun アプリで QR コードを読み取る', 'パソコンに表示された短いコードをアプリに入力する'],
    manual: '読み取れない場合は、Gateway のアドレスをアプリに入力し、同じ短いコードで確認します。',
    heading: 'Gateway のコマンド',
    labels: ['バックグラウンドで起動', '実行状態とアドレスを確認', 'プロセスを停止', 'ログイン時の自動起動を設定', 'バックグラウンドサービスを確認', '自動起動を解除', 'すべてのコマンドとオプションを表示'],
    modes: ["直接起動", "サービスモード"],
    serviceNote: "起動方法はどちらか一方を選びます。直接起動では start/stop を使います。サービスモードはサービスのインストールを選択した場合のみ利用でき、自動起動します。サービス実行中に start を実行しないでください。直接起動に戻す前に service uninstall を実行します。ペアリングは保持されます。",
    keys: '管理画面のキー：p で QR コードを再表示 · x で端末の認証を取り消し · u で接続先を変更。',
  },
  ko: {
    steps: ['컴퓨터에서 페어링 관리자 열기', 'Muqun 앱에서 QR 코드 스캔', '컴퓨터에 표시된 짧은 코드를 앱에 입력'],
    manual: '스캔할 수 없나요? 앱에 Gateway 주소를 직접 입력한 뒤 같은 짧은 코드를 입력하세요.',
    heading: 'Gateway 명령어',
    labels: ['백그라운드에서 시작', '실행 상태와 주소 확인', '프로세스 중지', '로그인 시 자동 시작 설정', '백그라운드 서비스 확인', '자동 시작 해제', '모든 명령어와 옵션 보기'],
    modes: ["직접 실행", "서비스 모드"],
    serviceNote: "두 모드 중 하나만 사용하세요. 직접 실행은 start/stop을 사용합니다. 서비스 모드는 서비스 설치를 선택한 경우에만 사용할 수 있으며 자동으로 시작됩니다. 서비스 실행 중 start를 실행하지 마세요. 직접 실행으로 돌아가려면 먼저 service uninstall을 실행하세요. 페어링은 유지됩니다.",
    keys: '관리자 단축키: p QR 코드 다시 표시 · x 기기 인증 취소 · u 연결 주소 변경.',
  },
  de: {
    steps: ['Kopplungsmanager auf dem Computer öffnen', 'QR-Code in Muqun scannen', 'Den kurzen Code vom Computer in der App eingeben'],
    manual: 'Scannen nicht möglich? Die Gateway-Adresse in der App eingeben und mit demselben kurzen Code bestätigen.',
    heading: 'Gateway-Befehle',
    labels: ['Im Hintergrund starten', 'Prozessstatus und Adresse prüfen', 'Prozess stoppen', 'Automatisch bei Anmeldung starten', 'Hintergrunddienst prüfen', 'Autostart entfernen', 'Alle Befehle und Optionen anzeigen'],
    modes: ["Direkter Start", "Dienstmodus"],
    serviceNote: "Nur einen Modus verwenden. Der direkte Start nutzt start/stop. Der Dienstmodus setzt voraus, dass die Installation des Dienstes gewählt wurde; er startet automatisch. Nicht zusätzlich start ausführen. Vor dem Wechsel zum direkten Start service uninstall ausführen. Kopplungen bleiben erhalten.",
    keys: 'Im Manager: p zeigt den QR-Code erneut · x entzieht einem Gerät den Zugriff · u ändert die Verbindungsadresse.',
  },
  fr: {
    steps: ['Ouvrez le gestionnaire de jumelage sur votre ordinateur', 'Scannez le QR code dans Muqun', 'Saisissez dans l’app le code court affiché sur votre ordinateur'],
    manual: 'Impossible de scanner ? Saisissez l’adresse du Gateway dans l’app, puis le même code court.',
    heading: 'Commandes du Gateway',
    labels: ['Démarrer en arrière-plan', 'Vérifier l’état du processus et l’adresse', 'Arrêter le processus', 'Activer le démarrage à la connexion', 'Vérifier le service en arrière-plan', 'Désactiver le démarrage automatique', 'Afficher les commandes et options'],
    modes: ["Démarrage direct", "Mode service"],
    serviceNote: "Choisissez un seul mode. Le démarrage direct utilise start/stop. Le mode service nécessite de choisir son installation et démarre automatiquement. Ne lancez pas start en parallèle. Avant de revenir au démarrage direct, exécutez service uninstall. Les appareils jumelés sont conservés.",
    keys: 'Dans le gestionnaire : p réaffiche le QR code · x révoque un appareil · u modifie l’adresse de connexion.',
  },
  es: {
    steps: ['Abre el gestor de vinculación en tu ordenador', 'Escanea el código QR en Muqun', 'Introduce en la app el código corto que aparece en tu ordenador'],
    manual: '¿No puedes escanear? Introduce la dirección del Gateway en la app y después el mismo código corto.',
    heading: 'Comandos del Gateway',
    labels: ['Iniciar en segundo plano', 'Consultar el estado y la dirección', 'Detener el proceso', 'Iniciar automáticamente al iniciar sesión', 'Consultar el servicio en segundo plano', 'Desactivar el inicio automático', 'Ver todos los comandos y opciones'],
    modes: ["Inicio directo", "Modo servicio"],
    serviceNote: "Usa solo un modo. El inicio directo usa start/stop. El modo servicio requiere haber elegido instalar el servicio y se inicia automáticamente. No ejecutes start a la vez. Antes de volver al inicio directo, ejecuta service uninstall. Se conservan los dispositivos vinculados.",
    keys: 'En el gestor: p vuelve a mostrar el QR · x revoca un dispositivo · u cambia la dirección de conexión.',
  },
  pt: {
    steps: ['Abra o gerenciador de pareamento no computador', 'Leia o código QR no Muqun', 'Digite no app o código curto exibido no computador'],
    manual: 'Não consegue ler o QR? Digite o endereço do Gateway no app e depois o mesmo código curto.',
    heading: 'Comandos do Gateway',
    labels: ['Iniciar em segundo plano', 'Verificar o estado e o endereço', 'Parar o processo', 'Iniciar automaticamente ao entrar na sessão', 'Verificar o serviço em segundo plano', 'Desativar a inicialização automática', 'Ver todos os comandos e opções'],
    modes: ["Inicialização direta", "Modo de serviço"],
    serviceNote: "Escolha apenas um modo. A inicialização direta usa start/stop. O modo de serviço exige que você tenha escolhido instalar o serviço e inicia automaticamente. Não execute start ao mesmo tempo. Antes de voltar ao modo direto, execute service uninstall. Os dispositivos pareados são mantidos.",
    keys: 'No gerenciador: p exibe o QR novamente · x revoga um dispositivo · u altera o endereço de conexão.',
  },
  ru: {
    steps: ['Откройте менеджер сопряжения на компьютере', 'Отсканируйте QR-код в Muqun', 'Введите в приложении короткий код с экрана компьютера'],
    manual: 'Не получается сканировать? Введите адрес Gateway в приложении, затем тот же короткий код.',
    heading: 'Команды Gateway',
    labels: ['Запустить в фоне', 'Проверить состояние и адрес', 'Остановить процесс', 'Включить запуск при входе в систему', 'Проверить фоновую службу', 'Отключить автоматический запуск', 'Показать все команды и параметры'],
    modes: ["Прямой запуск", "Режим службы"],
    serviceNote: "Используйте только один режим. Прямой запуск управляется через start/stop. Режим службы доступен только после выбора её установки и запускается автоматически. Не выполняйте start одновременно со службой. Перед переходом к прямому запуску выполните service uninstall. Сопряжения сохраняются.",
    keys: 'В менеджере: p — снова показать QR-код · x — отозвать доступ устройства · u — изменить адрес подключения.',
  },
  vi: {
    steps: ['Mở trình quản lý ghép nối trên máy tính', 'Quét mã QR trong Muqun', 'Nhập mã ngắn hiển thị trên máy tính vào ứng dụng'],
    manual: 'Không quét được? Nhập địa chỉ Gateway vào ứng dụng, rồi nhập cùng mã ngắn đó.',
    heading: 'Lệnh Gateway',
    labels: ['Chạy dưới nền', 'Kiểm tra trạng thái và địa chỉ', 'Dừng tiến trình', 'Tự khởi động khi đăng nhập', 'Kiểm tra dịch vụ nền', 'Tắt tự khởi động', 'Xem mọi lệnh và tùy chọn'],
    modes: ["Khởi chạy trực tiếp", "Chế độ dịch vụ"],
    serviceNote: "Chỉ dùng một chế độ. Khởi chạy trực tiếp dùng start/stop. Chế độ dịch vụ chỉ có khi bạn chọn cài dịch vụ và sẽ tự khởi động. Không chạy start khi dịch vụ đang chạy. Trước khi chuyển về chế độ trực tiếp, chạy service uninstall. Các thiết bị đã ghép nối vẫn được giữ lại.",
    keys: 'Trong trình quản lý: p hiện lại mã QR · x thu hồi quyền thiết bị · u đổi địa chỉ kết nối.',
  },
};
export const gatewayCommands = ['start', 'status', 'stop', 'service install', 'service status', 'service uninstall', '--help'] as const;
