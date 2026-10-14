/**
 * The product page's agents chapter, one object per locale, in the
 * arrangement `world.ts` and `gateway-help.ts` use: a single file, typed
 * against `SiteLocale`, so a language with no entry here is a build error
 * rather than a page that quietly serves English.
 *
 * Until 3.1 this was the OpenCode chapter and every locale aliased the
 * English object. In 4.0 a Gateway carries Codex, OpenCode, DeepSeek Harness
 * and T3 Code at once, the chapter speaks for all four, and every locale
 * has its own words.
 *
 * Nothing here may describe a capability the app does not ship. `facts` is
 * checked against the app and Gateway release notes, not against the pitch:
 * there is no sign-in anywhere in Muqun, permissions and questions really
 * are answerable from the lock screen, and the diffs in the tool cards are
 * the real ones.
 */
import type { SiteLocale } from '@/lib/locales';

export interface AgentHighlight {
  id: string;
  name: string;
  tag: string;
  desc: string;
}

export interface AgentsHome {
  /** Mono, ASCII, untranslated. Follows the page's `NN / LABEL` eyebrows. */
  eyebrow: string;
  heading: string;
  body: string;
  /** Highlight cards for the supported agents */
  cards: readonly AgentHighlight[];
  /** Three to five. One sentence each. */
  facts: readonly string[];
  /** Points at `/support/#agents`. */
  link: string;
}

const eyebrow = 'AGENTS';

export const agentsHome: Record<SiteLocale, AgentsHome> = {
  en: {
    eyebrow,
    heading: 'Your coding agents, on the phone.',
    body: 'Muqun has a screen built for coding agents rather than a terminal with an agent in it. Codex, OpenCode, DeepSeek Harness and T3 Code can share one Gateway: each gets its own tile on Home, and a session always goes back to the agent that started it. When one stops to ask you something, it arrives as a tap rather than a cursor blinking on a machine you are not sitting at.',
    cards: [
      { id: 'codex', name: 'Codex', tag: 'Default', desc: 'Auto-discovers PATH codex & adopts shared daemon, inheriting ~/.codex credentials.' },
      { id: 'opencode', name: 'OpenCode', tag: 'Zero-config', desc: 'Auto-starts service with full modes, model filtering, undo rollback and inline diffs.' },
      { id: 'deepseek', name: 'DeepSeek Harness', tag: 'Local / Hosted', desc: 'One command to attach host presets and deliver files directly on your machine.' },
      { id: 't3', name: 'T3 Code', tag: 'Persistent', desc: 'Pairs once to save credentials. Supports permission approvals and whole-turn rollbacks.' },
    ],
    facts: [
      'Codex and OpenCode are found and started by the Gateway; DeepSeek Harness and T3 Code take one command each on the host.',
      'Tool cards carrying the real diff, the same way the Changes sheet draws it.',
      'Permission prompts and questions answered from the phone, lock screen included.',
      'The workbench follows the agent: modes, models, slash commands and undo appear only where that agent has them.',
      'No sign-in, and no API key in the app. Your agents run on your machine.',
    ],
    link: 'How agents work',
  },
  'zh-CN': {
    eyebrow,
    heading: '你的编程 AI 助手，装进手机。',
    body: '牧群为编程 AI 助手做了专门的界面，而不是把助手塞进一个终端里。Codex、OpenCode、DeepSeek Harness 和 T3 Code 可以挂在同一台 Gateway 上：每个在首页都有自己的入口，会话也总会回到开启它的那个助手。它停下来问你问题时，你收到的是一条点一下就能回答的通知，而不是一台你不在跟前的电脑上闪烁的光标。',
    cards: [
      { id: 'codex', name: 'Codex', tag: '默认开启', desc: '自动接管 PATH 上的常驻 daemon，复用 ~/.codex 凭据，原生会话与工具卡片。' },
      { id: 'opencode', name: 'OpenCode', tag: '开箱即用', desc: '自动拉起服务，完整支持模型筛选、模式切换、撤销回滚与内嵌 Diff。' },
      { id: 'deepseek', name: 'DeepSeek Harness', tag: '本地/私有', desc: '单命令接入宿主机 Harness 预设模式，文件直达电脑。' },
      { id: 't3', name: 'T3 Code', tag: '持久凭据', desc: '配对一次保存凭据，支持安全权限审批与整轮回滚。' },
    ],
    facts: [
      'Codex 与 OpenCode 由 Gateway 自动发现并启动；DeepSeek Harness 和 T3 Code 在电脑上各一条命令就能接入。',
      '工具卡片里是真实的差异，画法和改动面板一致。',
      '权限请求和提问都能在手机上回答，锁屏上也行。',
      '工作台跟着助手走：模式、模型、斜杠命令和撤销，只在这个助手支持时出现。',
      '无需登录，App 里也不填 API 密钥。助手运行在你自己的电脑上。',
    ],
    link: '了解 AI 助手如何工作',
  },
  'zh-TW': {
    eyebrow,
    heading: '你的程式 AI 助手，放進手機。',
    body: '牧群為程式 AI 助手打造專屬畫面，而不是把助手塞進一個終端機。Codex、OpenCode、DeepSeek Harness 與 T3 Code 可以共用同一台 Gateway：每個在首頁都有自己的入口，工作階段也一定回到開啟它的那個助手。它停下來問你時，你收到的是點一下就能回答的通知，而不是一台你不在旁邊的電腦上閃爍的游標。',
    cards: [
      { id: 'codex', name: 'Codex', tag: '預設啟用', desc: '自動接管 PATH 上的常駐 daemon，複用 ~/.codex 憑證，原生工作階段與工具卡片。' },
      { id: 'opencode', name: 'OpenCode', tag: '開箱即用', desc: '自動啟動服務，完整支援模型篩選、模式切換、復原與內嵌 Diff。' },
      { id: 'deepseek', name: 'DeepSeek Harness', tag: '本地/私有', desc: '單一指令接入主機 Harness 預設模式，檔案直達電腦。' },
      { id: 't3', name: 'T3 Code', tag: '持久憑證', desc: '配對一次保存憑證，支援安全權限審批與整輪復原。' },
    ],
    facts: [
      'Codex 與 OpenCode 由 Gateway 自動找到並啟動；DeepSeek Harness 與 T3 Code 在電腦上各一道指令即可接上。',
      '工具卡片裡是真實的差異，畫法與變更面板相同。',
      '授權要求與提問都能在手機上回答，鎖定畫面也可以。',
      '工作台跟著助手調整：模式、模型、斜線指令與復原，只在該助手支援時出現。',
      '不需登入，App 也不需 API 金鑰。助手在你自己的電腦上執行。',
    ],
    link: '了解 AI 助手如何運作',
  },
  ja: {
    eyebrow,
    heading: 'コーディングエージェントを、スマホに。',
    body: 'Muqun には、ターミナルの中のエージェントではなく、コーディングエージェントのための画面があります。Codex、OpenCode、DeepSeek Harness、T3 Code は同じ Gateway に並べられ、それぞれホームに自分のタイルを持ち、セッションは必ず始めたエージェントに戻ります。エージェントが立ち止まって質問するときは、席を外したマシンで点滅するカーソルではなく、タップひとつで答えられる通知として届きます。',
    cards: [
      { id: 'codex', name: 'Codex', tag: '標準有効', desc: 'PATH 上の常駐 daemon を自動検知・起動し、~/.codex の認証情報を引き継ぎます。' },
      { id: 'opencode', name: 'OpenCode', tag: '設定不要', desc: 'サービスを自動起動。モデル選別・モード切替・Undo・インライン差分に完全対応。' },
      { id: 'deepseek', name: 'DeepSeek Harness', tag: 'ローカル/専用', desc: 'ホストのプリセットへ1コマンドで接続。添付ファイルも直接届きます。' },
      { id: 't3', name: 'T3 Code', tag: '認証保持', desc: '1度のペアリングで認証を保持。権限承認やターン単位のロールバックに対応。' },
    ],
    facts: [
      'Codex と OpenCode は Gateway が見つけて起動します。DeepSeek Harness と T3 Code はホストでコマンドひとつずつ。',
      'ツールカードには本物の差分。変更シートと同じ描き方です。',
      '権限の確認も質問も、ロック画面を含めスマホから答えられます。',
      'ワークベンチはエージェントに合わせて変わり、モード、モデル、スラッシュコマンド、取り消しは対応するエージェントにだけ出ます。',
      'サインインも、アプリへの API キー入力も不要。エージェントはあなたのマシンで動きます。',
    ],
    link: 'エージェントの仕組み',
  },
  ko: {
    eyebrow,
    heading: '코딩 에이전트를 휴대폰에서.',
    body: 'Muqun에는 터미널 속 에이전트가 아니라 코딩 에이전트를 위한 화면이 있어요. Codex, OpenCode, DeepSeek Harness, T3 Code가 한 Gateway에 함께 붙을 수 있고, 각자 홈에 타일을 가지며, 세션은 언제나 그 세션을 시작한 에이전트로 돌아가요. 에이전트가 멈춰서 질문하면, 자리에 없는 컴퓨터에서 깜박이는 커서가 아니라 탭 한 번으로 답할 수 있는 알림으로 도착해요.',
    cards: [
      { id: 'codex', name: 'Codex', tag: '기본 활성', desc: 'PATH의 상주 daemon을 자동 감지·연결하고 ~/.codex 자격 증명을 그대로 사용합니다.' },
      { id: 'opencode', name: 'OpenCode', tag: '설정 불필요', desc: '서비스 자동 실행. 모델 필터, 모드 전환, 실행 취소 및 인라인 diff 완벽 지원.' },
      { id: 'deepseek', name: 'DeepSeek Harness', tag: '로컬/호스팅', desc: '명령어 하나로 호스트 프리셋에 연결하고 파일을 컴퓨터로 직접 전달합니다.' },
      { id: 't3', name: 'T3 Code', tag: '자격증명 유지', desc: '한 번 페어링으로 자격증명을 유지하며 권한 승인과 턴 단위 롤백을 지원합니다.' },
    ],
    facts: [
      'Codex와 OpenCode는 Gateway가 찾아서 실행해요. DeepSeek Harness와 T3 Code는 호스트에서 명령 하나씩이면 돼요.',
      '도구 카드에는 실제 diff가 담겨 있고, 변경 사항 시트와 같은 방식으로 그려요.',
      '권한 요청과 질문은 잠금 화면을 포함해 휴대폰에서 답할 수 있어요.',
      '작업 화면은 에이전트를 따라가요. 모드, 모델, 슬래시 명령, 실행 취소는 그 에이전트가 지원할 때만 보여요.',
      '로그인도, 앱에 넣는 API 키도 없어요. 에이전트는 내 컴퓨터에서 실행돼요.',
    ],
    link: '에이전트 작동 방식',
  },
  de: {
    eyebrow,
    heading: 'Deine Coding-Agenten, auf dem Telefon.',
    body: 'Muqun hat einen eigenen Bildschirm für Coding-Agenten statt eines Terminals, in dem zufällig ein Agent läuft. Codex, OpenCode, DeepSeek Harness und T3 Code können sich ein Gateway teilen: Jeder bekommt seine eigene Kachel auf dem Home-Bildschirm, und eine Sitzung geht immer an den Agenten zurück, der sie begonnen hat. Hält einer an, um dich etwas zu fragen, kommt das als Tipp an — nicht als blinkender Cursor an einem Rechner, an dem du gerade nicht sitzt.',
    cards: [
      { id: 'codex', name: 'Codex', tag: 'Standard', desc: 'Erkennt PATH-Codex, übernimmt den gemeinsamen Daemon und nutzt ~/.codex-Anmeldedaten.' },
      { id: 'opencode', name: 'OpenCode', tag: 'Kein Setup', desc: 'Startet den Dienst automatisch; volle Unterstützung für Modi, Modelle, Undo und Inline-Diffs.' },
      { id: 'deepseek', name: 'DeepSeek Harness', tag: 'Lokal / Gehostet', desc: 'Ein Befehl genügt, um Host-Presets anzubinden und Dateien direkt zu übergeben.' },
      { id: 't3', name: 'T3 Code', tag: 'Dauerhaft', desc: 'Einmal koppeln, Anmeldedaten behalten. Unterstützt Freigaben und Runden-Rollbacks.' },
    ],
    facts: [
      'Codex und OpenCode findet und startet das Gateway selbst; DeepSeek Harness und T3 Code brauchen je einen Befehl auf dem Host.',
      'Tool-Karten mit dem echten Diff, so gezeichnet wie im Änderungen-Sheet.',
      'Berechtigungsanfragen und Fragen vom Telefon aus beantworten, auch vom Sperrbildschirm.',
      'Die Werkbank folgt dem Agenten: Modi, Modelle, Slash-Befehle und Rückgängig erscheinen nur, wo er sie hat.',
      'Keine Anmeldung und kein API-Schlüssel in der App. Deine Agenten laufen auf deinem Rechner.',
    ],
    link: 'So funktionieren Agenten',
  },
  fr: {
    eyebrow,
    heading: 'Vos agents de code, sur le téléphone.',
    body: 'Muqun a un écran pensé pour les agents de code, plutôt qu’un terminal avec un agent dedans. Codex, OpenCode, DeepSeek Harness et T3 Code peuvent partager un même Gateway : chacun a sa tuile sur l’accueil, et une session revient toujours à l’agent qui l’a commencée. Quand l’un d’eux s’arrête pour vous poser une question, elle arrive comme un geste à faire, pas comme un curseur qui clignote sur une machine devant laquelle vous n’êtes pas.',
    cards: [
      { id: 'codex', name: 'Codex', tag: 'Par défaut', desc: 'Détecte codex sur le PATH, adopte le daemon partagé et hérite des identifiants ~/.codex.' },
      { id: 'opencode', name: 'OpenCode', tag: 'Zéro config', desc: 'Démarre le service automatiquement : modes, modèles, annulation et diffs en ligne.' },
      { id: 'deepseek', name: 'DeepSeek Harness', tag: 'Local / Hébergé', desc: 'Une commande pour lier les préréglages de l’hôte et transférer les fichiers directs.' },
      { id: 't3', name: 'T3 Code', tag: 'Persistant', desc: 'Jumelé une seule fois. Gère les approbations de permissions et les annulations par tour.' },
    ],
    facts: [
      'Codex et OpenCode sont trouvés et démarrés par le Gateway ; DeepSeek Harness et T3 Code demandent une commande chacun sur l’hôte.',
      'Des cartes d’outil avec le vrai diff, dessiné comme dans la feuille Modifications.',
      'Demandes d’autorisation et questions traitées depuis le téléphone, écran verrouillé compris.',
      'L’atelier suit l’agent : modes, modèles, commandes slash et annulation n’apparaissent que s’il les propose.',
      'Pas de compte, pas de clé d’API dans l’app. Vos agents tournent sur votre machine.',
    ],
    link: 'Comment fonctionnent les agents',
  },
  es: {
    eyebrow,
    heading: 'Tus agentes de código, en el teléfono.',
    body: 'Muqun tiene una pantalla pensada para agentes de código, no un terminal con un agente dentro. Codex, OpenCode, DeepSeek Harness y T3 Code pueden compartir un mismo Gateway: cada uno tiene su propio mosaico en Inicio, y una sesión siempre vuelve al agente que la empezó. Cuando uno se detiene a preguntarte algo, llega como un toque, no como un cursor parpadeando en una máquina delante de la que no estás.',
    cards: [
      { id: 'codex', name: 'Codex', tag: 'Predeterminado', desc: 'Detecta codex en PATH, adopta el daemon compartido y hereda las credenciales de ~/.codex.' },
      { id: 'opencode', name: 'OpenCode', tag: 'Sin config', desc: 'Inicia el servicio automáticamente; modos completos, filtrado de modelos, deshacer y diffs.' },
      { id: 'deepseek', name: 'DeepSeek Harness', tag: 'Local / Remoto', desc: 'Un comando para enlazar ajustes del host y enviar archivos directamente a la máquina.' },
      { id: 't3', name: 'T3 Code', tag: 'Persistente', desc: 'Se vincula una vez. Admite aprobaciones de permisos y reversión por turnos completos.' },
    ],
    facts: [
      'El Gateway encuentra e inicia Codex y OpenCode; DeepSeek Harness y T3 Code necesitan un comando cada uno en el host.',
      'Tarjetas de herramienta con el diff real, dibujado igual que en la hoja de Cambios.',
      'Permisos y preguntas respondidos desde el teléfono, también en la pantalla de bloqueo.',
      'El banco de trabajo sigue al agente: modos, modelos, comandos de barra y deshacer solo aparecen donde ese agente los tiene.',
      'Sin cuenta y sin clave de API en la app. Tus agentes se ejecutan en tu máquina.',
    ],
    link: 'Cómo funcionan los agentes',
  },
  pt: {
    eyebrow,
    heading: 'Seus agentes de código, no celular.',
    body: 'O Muqun tem uma tela feita para agentes de código, e não um terminal com um agente dentro. Codex, OpenCode, DeepSeek Harness e T3 Code podem dividir o mesmo Gateway: cada um tem seu bloco na tela inicial, e uma sessão sempre volta ao agente que a começou. Quando um deles para e pergunta algo, isso chega como um toque, e não como um cursor piscando numa máquina em que você não está sentado.',
    cards: [
      { id: 'codex', name: 'Codex', tag: 'Padrão', desc: 'Detecta o codex no PATH, adota o daemon compartilhado e herda credenciais de ~/.codex.' },
      { id: 'opencode', name: 'OpenCode', tag: 'Sem config', desc: 'Inicia o serviço automaticamente; modos, modelos, desfazer e diffs integrados.' },
      { id: 'deepseek', name: 'DeepSeek Harness', tag: 'Local / Servidor', desc: 'Um comando para vincular predefinições do host e enviar arquivos diretamente à máquina.' },
      { id: 't3', name: 'T3 Code', tag: 'Persistente', desc: 'Emparelhe uma vez. Suporta aprovações de permissão e reversão de turnos inteiros.' },
    ],
    facts: [
      'O Gateway encontra e inicia o Codex e o OpenCode; DeepSeek Harness e T3 Code pedem um comando cada no host.',
      'Cartões de ferramenta com o diff real, desenhado como na folha de Alterações.',
      'Permissões e perguntas respondidas pelo celular, inclusive na tela bloqueada.',
      'A bancada acompanha o agente: modos, modelos, comandos de barra e desfazer só aparecem onde ele os tem.',
      'Sem login e sem chave de API no app. Seus agentes rodam na sua máquina.',
    ],
    link: 'Como os agentes funcionam',
  },
  ru: {
    eyebrow,
    heading: 'Ваши агенты для кода — в телефоне.',
    body: 'В Muqun есть отдельный экран для агентов, а не терминал, в котором случайно работает агент. Codex, OpenCode, DeepSeek Harness и T3 Code могут работать через один Gateway: у каждого своя плитка на главном экране, и сеанс всегда возвращается к тому агенту, который его начал. Когда агент останавливается и спрашивает вас, это приходит как уведомление, на которое можно ответить касанием, а не как мигающий курсор на компьютере, за которым вас нет.',
    cards: [
      { id: 'codex', name: 'Codex', tag: 'По умолчанию', desc: 'Находит codex в PATH, подключает общий daemon и наследует учетные данные из ~/.codex.' },
      { id: 'opencode', name: 'OpenCode', tag: 'Без настроек', desc: 'Автозапуск службы; полная поддержка режимов, моделей, отмены и встроенных diff.' },
      { id: 'deepseek', name: 'DeepSeek Harness', tag: 'Локальный', desc: 'Одна команда для подключения пресетов хоста и прямой передачи файлов.' },
      { id: 't3', name: 'T3 Code', tag: 'Постоянный', desc: 'Однократное сопряжение. Поддерживает подтверждение прав и откат целых ходов.' },
    ],
    facts: [
      'Codex и OpenCode Gateway находит и запускает сам; DeepSeek Harness и T3 Code подключаются одной командой на хосте.',
      'Карточки инструментов с настоящим diff, нарисованным так же, как в листе изменений.',
      'Запросы разрешений и вопросы — прямо с телефона, в том числе с экрана блокировки.',
      'Рабочая панель следует за агентом: режимы, модели, слэш-команды и отмена появляются, только если он их поддерживает.',
      'Без входа и без API-ключа в приложении. Агенты работают на вашем компьютере.',
    ],
    link: 'Как работают агенты',
  },
  vi: {
    eyebrow,
    heading: 'Các trợ lý lập trình, ngay trên điện thoại.',
    body: 'Muqun có một màn hình dành riêng cho trợ lý lập trình, thay vì một terminal có trợ lý chạy bên trong. Codex, OpenCode, DeepSeek Harness và T3 Code có thể dùng chung một Gateway: mỗi trợ lý có ô riêng trên màn hình chính, và một phiên luôn quay về đúng trợ lý đã mở nó. Khi trợ lý dừng lại để hỏi bạn, câu hỏi đến như một thông báo chạm là trả lời, chứ không phải con trỏ nhấp nháy trên chiếc máy bạn không ngồi trước.',
    cards: [
      { id: 'codex', name: 'Codex', tag: 'Mặc định', desc: 'Tự động tìm codex trên PATH, nhận daemon dùng chung và kế thừa thông tin xác thực ~/.codex.' },
      { id: 'opencode', name: 'OpenCode', tag: 'Không cần cài', desc: 'Tự khởi động dịch vụ; đầy đủ chế độ, lọc mô hình, hoàn tác và hiển thị diff trực tiếp.' },
      { id: 'deepseek', name: 'DeepSeek Harness', tag: 'Cục bộ / Máy chủ', desc: 'Một lệnh để gắn cài đặt máy chủ và gửi tệp trực tiếp đến máy tính.' },
      { id: 't3', name: 'T3 Code', tag: 'Lưu lâu dài', desc: 'Ghép nối một lần để lưu chứng chỉ. Hỗ trợ phê duyệt quyền và hoàn tác theo lượt.' },
    ],
    facts: [
      'Gateway tự tìm và khởi động Codex và OpenCode; DeepSeek Harness và T3 Code mỗi cái chỉ cần một lệnh trên máy chủ.',
      'Thẻ công cụ chứa diff thật, vẽ giống như trong bảng Thay đổi.',
      'Trả lời yêu cầu cấp quyền và câu hỏi từ điện thoại, kể cả trên màn hình khóa.',
      'Bàn làm việc đi theo trợ lý: chế độ, mô hình, lệnh gạch chéo và hoàn tác chỉ xuất hiện khi trợ lý đó hỗ trợ.',
      'Không đăng nhập, không nhập khóa API trong ứng dụng. Trợ lý chạy trên máy của bạn.',
    ],
    link: 'Cách các trợ lý hoạt động',
  },
  th: {
    eyebrow,
    heading: 'ผู้ช่วย AI เขียนโค้ดของคุณ บนมือถือ',
    body: 'Muqun มีหน้าจอที่ออกแบบมาเพื่อผู้ช่วย AI เขียนโค้ดโดยเฉพาะ ไม่ใช่แค่เทอร์มินัลที่มีผู้ช่วยทำงานอยู่ข้างใน Codex, OpenCode, DeepSeek Harness และ T3 Code ใช้ Gateway เดียวกันได้ แต่ละตัวมีไทล์ของตัวเองบนหน้าแรก และเซสชันจะกลับไปหาผู้ช่วยที่เริ่มมันเสมอ เมื่อผู้ช่วยหยุดเพื่อถามคุณ คำถามจะมาถึงเป็นการแจ้งเตือนที่แตะตอบได้ทันที ไม่ใช่เคอร์เซอร์กะพริบบนเครื่องที่คุณไม่ได้นั่งอยู่ตรงหน้า',
    cards: [
      { id: 'codex', name: 'Codex', tag: 'ค่าเริ่มต้น', desc: 'ตรวจหา codex บน PATH และเชื่อมต่อ daemon อัตโนมัติ พร้อมใช้ข้อมูลยืนยันตัวตนจาก ~/.codex' },
      { id: 'opencode', name: 'OpenCode', tag: 'พร้อมใช้ทันที', desc: 'เริ่มบริการอัตโนมัติ รองรับโหมด ตัวกรองโมเดล การเลิกทำ และ diff แบบอินไลน์ครบครัน' },
      { id: 'deepseek', name: 'DeepSeek Harness', tag: 'ในเครื่อง / โฮสต์', desc: 'คำสั่งเดียวเพื่อเชื่อมต่อพรีเซ็ตของเครื่องโฮสต์และส่งไฟล์ตรงสู่คอมพิวเตอร์' },
      { id: 't3', name: 'T3 Code', tag: 'บันทึกถาวร', desc: 'จับคู่ครั้งเดียวเพื่อบันทึกข้อมูลรับรอง รองรับการอนุมัติสิทธิ์และการย้อนกลับทั้งรอบ' },
    ],
    facts: [
      'Gateway ค้นหาและเริ่ม Codex และ OpenCode ให้เอง ส่วน DeepSeek Harness และ T3 Code ใช้คำสั่งเดียวบนเครื่องโฮสต์',
      'การ์ดเครื่องมือแสดง diff จริง วาดแบบเดียวกับแผ่นการเปลี่ยนแปลง',
      'ตอบคำขออนุญาตและคำถามจากมือถือได้ รวมถึงจากหน้าจอล็อก',
      'พื้นที่ทำงานปรับตามผู้ช่วย โหมด โมเดล คำสั่งสแลช และการเลิกทำจะแสดงเฉพาะเมื่อผู้ช่วยตัวนั้นรองรับ',
      'ไม่ต้องลงชื่อเข้าใช้ และไม่ต้องใส่ API key ในแอป ผู้ช่วยทำงานบนเครื่องของคุณ',
    ],
    link: 'ผู้ช่วย AI ทำงานอย่างไร',
  },
};
