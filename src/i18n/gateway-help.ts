import type { SiteLocale } from '@/lib/locales';
interface GatewayHelp {
  steps: [string, string, string];
  manual: string;
  heading: string;
  labels: [string, string, string, string, string, string, string];
  serviceNote: string;
  keys: string;
}
export const gatewayHelp: Record<SiteLocale, GatewayHelp> = {
  en: {
    steps: ['Open the pairing manager on your computer', 'Scan its QR code in Muqun', 'Enter the short code shown on your computer in the app'],
    manual: 'Cannot scan? Enter the Gateway address in the app, then enter the same short code.',
    heading: 'Gateway commands',
    labels: ['Start in the background', 'Check process status and address', 'Stop the process', 'Enable automatic startup at login', 'Check the background service', 'Remove automatic startup', 'Show all commands and options'],
    serviceNote: 'If the service is installed, it restarts a stopped process. Use service uninstall to disable it; paired devices are kept.',
    keys: 'In the manager: p shows the QR code again · x revokes a device · u changes the connection address.',
  },
  'zh-CN': {
    steps: ['在电脑上打开配对管理器', '在牧群 App 中扫描二维码', '在 App 中输入电脑显示的短码'],
    manual: '无法扫码？在 App 中手动输入 Gateway 地址，再输入同一个短码。',
    heading: 'Gateway 命令帮助',
    labels: ['后台启动', '查看运行状态和地址', '停止进程', '设置登录后自动启动', '查看后台服务状态', '取消自动启动', '查看全部命令和选项'],
    serviceNote: '安装后台服务后，进程停止会自动重启。使用 service uninstall 可取消自动启动，已配对设备会保留。',
    keys: '管理器快捷键：p 重新显示二维码 · x 撤销设备授权 · u 修改连接地址。',
  },
  'zh-TW': {
    steps: ['在電腦上開啟配對管理員', '在牧群 App 中掃描 QR 碼', '在 App 中輸入電腦顯示的短碼'],
    manual: '無法掃描？在 App 中手動輸入 Gateway 位址，再輸入同一組短碼。',
    heading: 'Gateway 指令說明',
    labels: ['在背景啟動', '查看執行狀態與位址', '停止程序', '設定登入後自動啟動', '查看背景服務狀態', '取消自動啟動', '查看所有指令與選項'],
    serviceNote: '安裝背景服務後，程序停止會自動重新啟動。使用 service uninstall 可取消自動啟動，已配對裝置會保留。',
    keys: '管理員快速鍵：p 重新顯示 QR 碼 · x 撤銷裝置授權 · u 修改連線位址。',
  },
  ja: {
    steps: ['パソコンでペアリング管理画面を開く', 'Muqun アプリで QR コードを読み取る', 'パソコンに表示された短いコードをアプリに入力する'],
    manual: '読み取れない場合は、Gateway のアドレスをアプリに入力し、同じ短いコードで確認します。',
    heading: 'Gateway のコマンド',
    labels: ['バックグラウンドで起動', '実行状態とアドレスを確認', 'プロセスを停止', 'ログイン時の自動起動を設定', 'バックグラウンドサービスを確認', '自動起動を解除', 'すべてのコマンドとオプションを表示'],
    serviceNote: 'サービスを登録すると、停止したプロセスは再起動されます。service uninstall で解除できます。ペアリング済みの端末は保持されます。',
    keys: '管理画面のキー：p で QR コードを再表示 · x で端末の認証を取り消し · u で接続先を変更。',
  },
  ko: {
    steps: ['컴퓨터에서 페어링 관리자 열기', 'Muqun 앱에서 QR 코드 스캔', '컴퓨터에 표시된 짧은 코드를 앱에 입력'],
    manual: '스캔할 수 없나요? 앱에 Gateway 주소를 직접 입력한 뒤 같은 짧은 코드를 입력하세요.',
    heading: 'Gateway 명령어',
    labels: ['백그라운드에서 시작', '실행 상태와 주소 확인', '프로세스 중지', '로그인 시 자동 시작 설정', '백그라운드 서비스 확인', '자동 시작 해제', '모든 명령어와 옵션 보기'],
    serviceNote: '서비스가 설치되어 있으면 중지된 프로세스가 다시 시작됩니다. service uninstall로 해제할 수 있으며 페어링된 기기는 유지됩니다.',
    keys: '관리자 단축키: p QR 코드 다시 표시 · x 기기 인증 취소 · u 연결 주소 변경.',
  },
  de: {
    steps: ['Kopplungsmanager auf dem Computer öffnen', 'QR-Code in Muqun scannen', 'Den kurzen Code vom Computer in der App eingeben'],
    manual: 'Scannen nicht möglich? Die Gateway-Adresse in der App eingeben und mit demselben kurzen Code bestätigen.',
    heading: 'Gateway-Befehle',
    labels: ['Im Hintergrund starten', 'Prozessstatus und Adresse prüfen', 'Prozess stoppen', 'Automatisch bei Anmeldung starten', 'Hintergrunddienst prüfen', 'Autostart entfernen', 'Alle Befehle und Optionen anzeigen'],
    serviceNote: 'Ein installierter Dienst startet den gestoppten Prozess erneut. Mit service uninstall deaktivieren; gekoppelte Geräte bleiben erhalten.',
    keys: 'Im Manager: p zeigt den QR-Code erneut · x entzieht einem Gerät den Zugriff · u ändert die Verbindungsadresse.',
  },
  fr: {
    steps: ['Ouvrez le gestionnaire de jumelage sur votre ordinateur', 'Scannez le QR code dans Muqun', 'Saisissez dans l’app le code court affiché sur votre ordinateur'],
    manual: 'Impossible de scanner ? Saisissez l’adresse du Gateway dans l’app, puis le même code court.',
    heading: 'Commandes du Gateway',
    labels: ['Démarrer en arrière-plan', 'Vérifier l’état du processus et l’adresse', 'Arrêter le processus', 'Activer le démarrage à la connexion', 'Vérifier le service en arrière-plan', 'Désactiver le démarrage automatique', 'Afficher les commandes et options'],
    serviceNote: 'Si le service est installé, il relance le processus arrêté. Utilisez service uninstall pour le désactiver ; les appareils jumelés sont conservés.',
    keys: 'Dans le gestionnaire : p réaffiche le QR code · x révoque un appareil · u modifie l’adresse de connexion.',
  },
  es: {
    steps: ['Abre el gestor de vinculación en tu ordenador', 'Escanea el código QR en Muqun', 'Introduce en la app el código corto que aparece en tu ordenador'],
    manual: '¿No puedes escanear? Introduce la dirección del Gateway en la app y después el mismo código corto.',
    heading: 'Comandos del Gateway',
    labels: ['Iniciar en segundo plano', 'Consultar el estado y la dirección', 'Detener el proceso', 'Iniciar automáticamente al iniciar sesión', 'Consultar el servicio en segundo plano', 'Desactivar el inicio automático', 'Ver todos los comandos y opciones'],
    serviceNote: 'Si el servicio está instalado, reinicia el proceso detenido. Usa service uninstall para desactivarlo; los dispositivos vinculados se conservan.',
    keys: 'En el gestor: p vuelve a mostrar el QR · x revoca un dispositivo · u cambia la dirección de conexión.',
  },
  pt: {
    steps: ['Abra o gerenciador de pareamento no computador', 'Leia o código QR no Muqun', 'Digite no app o código curto exibido no computador'],
    manual: 'Não consegue ler o QR? Digite o endereço do Gateway no app e depois o mesmo código curto.',
    heading: 'Comandos do Gateway',
    labels: ['Iniciar em segundo plano', 'Verificar o estado e o endereço', 'Parar o processo', 'Iniciar automaticamente ao entrar na sessão', 'Verificar o serviço em segundo plano', 'Desativar a inicialização automática', 'Ver todos os comandos e opções'],
    serviceNote: 'Se o serviço estiver instalado, ele reinicia o processo parado. Use service uninstall para desativá-lo; os dispositivos pareados são mantidos.',
    keys: 'No gerenciador: p exibe o QR novamente · x revoga um dispositivo · u altera o endereço de conexão.',
  },
  ru: {
    steps: ['Откройте менеджер сопряжения на компьютере', 'Отсканируйте QR-код в Muqun', 'Введите в приложении короткий код с экрана компьютера'],
    manual: 'Не получается сканировать? Введите адрес Gateway в приложении, затем тот же короткий код.',
    heading: 'Команды Gateway',
    labels: ['Запустить в фоне', 'Проверить состояние и адрес', 'Остановить процесс', 'Включить запуск при входе в систему', 'Проверить фоновую службу', 'Отключить автоматический запуск', 'Показать все команды и параметры'],
    serviceNote: 'Установленная служба перезапускает остановленный процесс. Отключите её командой service uninstall; сопряжённые устройства сохранятся.',
    keys: 'В менеджере: p — снова показать QR-код · x — отозвать доступ устройства · u — изменить адрес подключения.',
  },
  vi: {
    steps: ['Mở trình quản lý ghép nối trên máy tính', 'Quét mã QR trong Muqun', 'Nhập mã ngắn hiển thị trên máy tính vào ứng dụng'],
    manual: 'Không quét được? Nhập địa chỉ Gateway vào ứng dụng, rồi nhập cùng mã ngắn đó.',
    heading: 'Lệnh Gateway',
    labels: ['Chạy dưới nền', 'Kiểm tra trạng thái và địa chỉ', 'Dừng tiến trình', 'Tự khởi động khi đăng nhập', 'Kiểm tra dịch vụ nền', 'Tắt tự khởi động', 'Xem mọi lệnh và tùy chọn'],
    serviceNote: 'Nếu đã cài dịch vụ, tiến trình bị dừng sẽ tự chạy lại. Dùng service uninstall để tắt; các thiết bị đã ghép nối vẫn được giữ lại.',
    keys: 'Trong trình quản lý: p hiện lại mã QR · x thu hồi quyền thiết bị · u đổi địa chỉ kết nối.',
  },
};
export const gatewayCommands = ['start', 'status', 'stop', 'service install', 'service status', 'service uninstall', '--help'] as const;
