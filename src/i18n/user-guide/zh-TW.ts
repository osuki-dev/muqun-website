import type { UserGuide } from './types';

export const zhTW: UserGuide = {
  metaTitle: '牧群 使用者指南與參考手冊',
  metaDescription:
    '安裝 Gateway、手機配對、工作區管理、終端機按鍵列、OpenCode 自主代理、主題客製化及連線疑難排解的完整手冊。',
  hero: {
    badge: '使用者指南 · 參考手冊',
    heading: '觸手可及，掌控你的每一台電腦。',
    lead: '牧群將手機與你自己的電腦或伺服器直接相連。了解如何安裝與設定 Gateway、切換終端機工作區、操控 OpenCode 自主代理、安裝主題並排解連線問題。',
    startCta: '開始使用 ↓',
    diagnosticsCta: '問題排解 ↓',
    issueCta: '回報問題',
  },
  contentsLabel: '本頁目錄',
  contents: [
    {
      id: 'get-started',
      label: '開始使用',
      meta: '操作步驟 · 約 5 分鐘',
      desc: '安裝 Gateway、選擇啟動模式、QR 碼配對與 tailnet 設定。',
    },
    {
      id: 'terminal',
      label: '終端機',
      meta: 'tmux · herdr',
      desc: '工作區、分組、面板、專為行動端設計的按鍵列與開發工具。',
    },
    {
      id: 'opencode',
      label: 'OpenCode 代理',
      meta: '自主代理',
      desc: '本機 Agent 服務、模型切換、內嵌 Diff 工具呼叫與授權審批。',
    },
    {
      id: 'gateway',
      label: '設定 Gateway',
      meta: 'config.json 參考',
      desc: '設定參數字典、通訊埠綁定、守護程序服務模式與管理員快速鍵。',
    },
    {
      id: 'themes',
      label: '主題系統',
      meta: '內建 24 款主題包',
      desc: '視覺主題、.muqun-theme 套件格式、背景不透明度調整與主題製作。',
    },
    {
      id: 'troubleshooting',
      label: '疑難排解',
      meta: '連線診斷與速查',
      desc: '快速檢查清單、配對失敗排解、確認碼過期及常見問題解法。',
    },
    {
      id: 'contact',
      label: '聯絡與支援',
      meta: 'github · issues',
      desc: 'Issue 提交清單、敏感資訊脫敏規範與隱私保障承諾。',
    },
  ],

  getStarted: {
    eyebrow: 'muqun-gateway',
    heading: '安裝 Gateway，配對你的手機。',
    lead: '牧群僅與你自己電腦上的一個程式通訊：Gateway。在電腦上安裝並啟動它，然後用手機完成一次配對。無需註冊任何帳號，你的任何資料都不會經過我們的伺服器。',
    steps: [
      {
        title: '在電腦上執行安裝指令碼',
        body: '指令碼會將單一執行檔安裝至 ~/.local/bin/muqun-gateway，完成初始設定，並在首次執行時自動開啟配對畫面。支援 macOS 與 Linux；目前尚未支援 Windows。',
        commands: [{ code: 'curl -fsSL https://muqun.dev/gateway.sh | sh', label: 'install' }],
      },
      {
        title: '選擇兩種執行模式之一啟動',
        body: '你可以手動啟動它，也可以交由系統常駐保活。兩種方式都能啟動 Gateway，差別在於系統重新開機後的行為。',
        commands: [
          {
            code: 'muqun-gateway start',
            label: 'direct',
            detail:
              '在背景執行，關閉終端機後依然保持執行，直到電腦重開機。執行 muqun-gateway stop 即可停止。',
          },
          {
            code: 'muqun-gateway service install',
            label: 'service',
            detail:
              '註冊到當前使用者的初始化系統（Linux 下為 systemd 使用者單元，macOS 下為 LaunchAgent）。開機登入後自動啟動，當機或重開機後自動恢復。執行 muqun-gateway service uninstall 可取消註冊並保留已配對裝置。',
          },
        ],
        note: '二選一，請勿同時使用：安裝系統服務後，手動執行 stop 會被服務守護程序立即重新喚醒。',
      },
      {
        title: '開啟配對管理員',
        body: '無論採用哪種啟動方式，這都是下一步。管理員是終端機裡的全螢幕面板，顯示配對 QR 碼、執行狀態以及目前持有存取權杖的所有裝置。安裝程式首次會自動開啟；之後你可以隨時用此指令重新開啟。',
        commands: [{ code: 'muqun-gateway manage', label: 'pair' }],
      },
      {
        title: '掃描並輸入確認短碼',
        body: '在手機上的牧群中掃描 QR 碼。電腦螢幕上會顯示一組形如 XXXX-XXXX 的短碼，在 App 中輸入即可完成配對。單憑掃描無法完成配對——輸入短碼才能證明拿著手機的人就是電腦前的你。',
      },
    ],
    requirements: [
      'macOS 或 Linux，必須是你擁有完整權限的電腦。目前尚未支援 Windows。',
      '已預先安裝 tmux 或 Herdr（0.7.5 或更新版本）——Gateway 負責驅動它們，而非取代它們。',
      '兩台裝置處於同一個私有網路。建議使用 Tailscale；請使用 Tailscale Serve，請勿使用 Funnel。',
      '無帳號系統、無訂閱收費，中間沒有任何我們的轉送節點。',
    ],
    pairingNote:
      '無法掃描？可以在 App 中手動輸入 Gateway 位址（管理員會印出目前對外發布的連線位址），然後再輸入相同的短碼。',
    codeNote:
      '短碼有效時間為 5 分鐘，輸錯 8 次後將作廢。在管理員中按 p 鍵可立即重新整理產生全新的 QR 碼與確認碼。',
    networkBadge: '推薦私有網路',
    networkHeading: '在兩台裝置上都使用 Tailscale。',
    networkBody:
      '我們強烈建議將手機與執行 Gateway 的電腦放入同一個 Tailscale tailnet。這樣可以免除路由器通訊埠轉發，並避免將 Gateway 暴露在公開網際網路上。Tailscale Serve 可以提供私有 HTTPS 位址；請勿為牧群使用 Tailscale Funnel。',
  },

  gateway: {
    eyebrow: 'config.json',
    heading: '設定 Gateway。',
    lead: '大多數人不需要手動修改設定。僅在特定需求下需要調整：更換連接埠、隨系統開機自啟、或 OpenCode 安裝在非標準路徑等。',
    configHeading: '設定檔結構',
    configBody:
      '設定採用 JSON 格式，Gateway 在安裝時會自動建立。只有在需要調整下列鍵值時才需手動編輯，編輯後必須重新啟動 Gateway——設定僅在啟動時讀取，執行中的 Gateway 不會自動偵測變更。在 macOS 上該檔案位於 ~/Library/Application Support/muqun-gateway/；同級目錄下存放 pairing.json；已配對裝置、推播權杖及執行日誌存放在狀態目錄 ~/.local/share/muqun-gateway/。',
    configPathLabel: 'linux',
    configPath: '~/.config/muqun-gateway/config.json',
    configKeys: [
      { term: 'label', detail: 'App 中為這台電腦顯示的自訂名稱。' },
      {
        term: 'listen',
        detail:
          '監聽的 Socket 位址（主機與通訊埠）。預設為 0.0.0.0:23847；若發布的位址為本機回環位址，則繫結到 127.0.0.1。',
      },
      {
        term: 'public_url',
        detail:
          '編碼到配對 QR 碼中的連線位址——即手機實際撥號連線的位址。建議在管理員中按 u 修改，而非手動編輯。',
      },
      {
        term: 'transport_encryption',
        detail:
          '傳輸加密設定，預設為必要（required）。已配對裝置會保持配對時的加密模式，修改此項僅影響後續新配對的裝置。',
      },
      {
        term: 'sessions',
        detail:
          '此 Gateway 掛載的終端機後端（tmux、Herdr，或兩者同時）。可透過 muqun-gateway backend 進行管理。',
      },
      {
        term: 'autostart_backends',
        detail:
          '隨 Gateway 啟動自動載入的終端機後端。預設為空：啟動終端機伺服器必須由使用者明確啟用。',
      },
      {
        term: 'rich_agent_pushes',
        detail:
          '預設關閉。開啟後，代理的問題與選項會直接內嵌在推播通知內文中——這會讓終端機文字顯示在鎖定螢幕上並經過系統推播伺服器，因此預設關閉。',
      },
      {
        term: 'opencode.autostart',
        detail:
          '預設開啟：當 Gateway 偵測到沒有執行中的 OpenCode 服務時，會自動啟動。設定 "opencode": { "autostart": false } 可關閉自動啟動。',
      },
      {
        term: 'opencode.binary',
        detail:
          '指定啟動的 OpenCode 執行檔路徑。未指定時，Gateway 會使用 ~/.opencode/bin 中的路徑或系統 PATH。當背景服務無法讀取登入 Shell 的 PATH 時，可用此項固定路徑。',
      },
    ],
    portsHeading: '通訊埠與繫結',
    portsRows: [
      { term: '預設連接埠', detail: '單一 TCP 連接埠，23847。' },
      { term: '變更連接埠', detail: '執行 muqun-gateway setup --port N，然後重新啟動 Gateway。' },
      {
        term: '監聽位址',
        detail:
          '當發布的位址為回環位址時監聽 127.0.0.1，否則監聽 0.0.0.0。',
      },
      {
        term: '在 tailnet 上',
        detail: '無需在路由器上做任何通訊埠轉發，這也是我們強烈推薦的原因。',
      },
    ],
    modesHeading: '兩種常駐執行模式',
    modes: [
      {
        title: '手動背景啟動',
        label: 'direct',
        code: 'muqun-gateway start',
        rows: [
          { term: '何時啟動', detail: '手動執行指令時。' },
          { term: '何時停止', detail: '執行 muqun-gateway stop，或電腦重新開機後。' },
          { term: '重開機後自啟', detail: '否。' },
          { term: '如何卸載', detail: '無需卸載，直接 stop。' },
        ],
      },
      {
        title: '作為系統服務',
        label: 'service',
        code: 'muqun-gateway service install',
        rows: [
          { term: '何時啟動', detail: '使用者登入時自動啟動，當機後自動恢復。' },
          { term: '何時停止', detail: '僅在執行 service uninstall 時停止。' },
          { term: '重開機後自啟', detail: '是。' },
          { term: '如何卸載', detail: '執行 service uninstall，已配對裝置不受影響。' },
        ],
      },
    ],
    modesNote:
      'Linux 下為 systemd 使用者單元，macOS 下為 LaunchAgent。絕不使用 root 權限，絕不超出使用者家目錄。',
    autostartHeading: 'OpenCode 啟動機制',
    autostartSteps: [
      'Gateway 首先檢查是否存在已正常運作的 OpenCode 服務，讀取其發布在 ~/.local/state/opencode/service.json 中的位址。',
      '若已存在，則直接連結掛載，你原本執行的 opencode serve 工作階段得以完整保留。',
      '若未發現，Gateway 會自動執行 opencode serve --service 並進行監控。在執行過程中會持續監測狀態檔案，當 OpenCode 在新通訊埠重啟時能自動重新識別。',
    ],
    autostartNote:
      '電腦上未安裝 OpenCode？Gateway 不會附加任何內容，僅手機端的 Agent 面板會顯示離線，終端機功能完全不受影響。',
    autostartOffLabel: 'config.json',
    autostartOff: '"opencode": { "autostart": false }',
    managerHeading: '配對管理員面板',
    managerBody:
      '執行 muqun-gateway manage 即可開啟。面板內列出當前執行狀態及所有已授權裝置，支援以下快速鍵：',
    managerKeys: [
      { term: 'p', detail: '重新顯示配對 QR 碼，以新增裝置。' },
      { term: 'x', detail: '撤銷所選裝置的存取權限。' },
      { term: 'u', detail: '修改 QR 碼中編碼的連線位址；輸入 a 可自動重新偵測。' },
      { term: 's / t', detail: '無需離開管理員，直接啟動或停止 Gateway。' },
      { term: 'm / h', detail: '新增 tmux 或 Herdr 後端；f 設為預設，d 移除後端。' },
      { term: 'e', detail: '變更傳輸加密模式（影響後續新配對的裝置）。' },
      { term: 'q', detail: '關閉管理員。關閉絕不會終止你的終端機工作階段。' },
    ],
    capabilitiesHeading: '舊版 Gateway 向後相容',
    capabilitiesBody:
      '牧群 App 會主動向 Gateway 詢問其支援的功能特性，而非僅憑版本號猜測；缺少的功能會自動隱藏而非拋出錯誤。因此舊版 Gateway 依然可以作為出色的終端機使用：你只是暫時無法使用較新的功能面板，但連線絕不會中斷。代理協同工作（Agent collaboration）是唯一有額外後端要求的功能——該工作階段需要連線至 Herdr 0.9.0 或更新版本，tmux 工作階段暫不支援。缺少對應功能時，App 會明確指出需要升級哪個元件。',
    upgradeHeading: '版本升級',
    upgradeBody:
      '再次執行相同的安裝指令即可完成升級。它會直接在原地替換執行檔，並完整保留你的伺服器身分金鑰、連線位址、設定檔以及手機配對關係。若先前安裝了系統服務，升級後請再執行一次 service install：服務單元包含子行程生命週期規則，重新整理才能避免 Gateway 重啟時意外連帶終止終端機工作階段。',
    logsHeading: '查看執行日誌',
    logsBody:
      '直接啟動模式下，Gateway 的日誌寫入 ~/.local/share/muqun-gateway/gateway.log，macOS LaunchAgent 亦同。Linux systemd 模式下日誌寫入系統日誌中。若需更詳細資訊，啟動前可設定環境變數 MUQUN_LOG=debug（或 RUST_LOG=debug）；預設日誌層級為 info。',
    logsCommandLabel: 'linux · 服務模式',
    logsCommand: 'journalctl --user -u dev.osuki.muqun-gateway',
  },

  terminal: {
    eyebrow: 'workspace · group.panel',
    heading: '真實終端機體驗。',
    lead: '這是你電腦上的真實終端機，而不是畫面截圖或輸出日誌。Gateway 在你的電腦上驅動 tmux 或 Herdr，手機端直接渲染其內容——桌面留下的進度，在手機上原封不動接續，關閉 App 也絕對不會干擾到終端機執行。',
    shotAlt:
      '一個開啟 TypeScript 檔案的 nvim 窗格，底部包含同組內 Claude Code、nvim 與 zsh 標籤，輸入框上方帶有專用按鍵列。',
    entries: [
      {
        term: '工作區、分組與終端機',
        detail:
          '三個層級，位址格式為 工作區 · 分組.面板。工作區是你的專案目錄，分組是其中的一組終端機，終端機就是單一 Shell。牧群在手機上一屏只顯示一個終端機而不切分多重視窗：在手機上分割畫面根本無法閱讀。',
      },
      {
        term: '在層級間切換',
        detail:
          '左右滑動頂部標題膠囊可切換工作區。輸入框上方的標籤按鈕可切換目前分組內的各個終端機。若需跨分組或跨工作區跳轉，展開面板抽屜即可點選直達。',
      },
      {
        term: '執行中的程序與面板清單',
        detail:
          '面板抽屜列出電腦上的所有工作區、分組與終端機，也是新增終端機的入口。長按某一行可彈出操作選單，包含關閉面板——關閉操作絕不會因為誤觸而發生。',
      },
      {
        term: '終端機專用按鍵列',
        detail:
          '輸入框上方的一排按鍵提供了終端機必需但手機鍵盤缺乏的重要按鍵：Esc、Tab、⌃C、方向鍵，並能根據窗格目前執行的程式智慧動態變換——Shell 下顯示常用指令，Claude Code 下顯示 ⇧TAB 與 ⌃O，nvim 下顯示 :w 與 gg。nvim 插入模式下自動以 Esc 居首。點選鍵盤按鈕可叫出完整虛擬鍵盤。若不需要，可在「設定 → 終端機」中隨時關閉此按鍵列。',
      },
      {
        term: '獨立輸入框（Composer）',
        detail:
          '等寬字體、支援多行輸入，Enter 鍵直接換行——只有點選發送按鈕才會送出指令，避免誤觸直接執行危險指令。輸入框上方的提示文字會跟隨當前窗格狀態切換：執行終端機指令、傳送訊息或在編輯器中輸入。',
      },
      {
        term: '歷史輸出與平滑捲動',
        detail:
          '從終端機頂部下拉可載入更多歷史捲動輸出，載入時會顯示指示符號。一旦離開螢幕底部的即時串流，點選出現的「最新」膠囊即可瞬間回到底部。閱讀上方內容時，新輸出絕不會強行把畫面拉走。',
      },
      {
        term: '變更（Changes）',
        detail:
          '檢視窗格所在目錄的 Git 狀態：已修改檔案總數計數，支援「全部」、「暫存」與「未暫存」篩選，並能直接檢視程式碼 Diff。按鈕帶有變更計數標記，僅在窗格處於 Git 倉儲且 Gateway 支援 git_diff 功能時才會出現。',
      },
      {
        term: '檔案瀏覽器（Files）',
        detail:
          '檢視工作階段生成的所有內容——圖片、程式碼與各類文件，支援搜尋與篩選，無需離開 App 即可直接預覽閱讀。',
      },
      {
        term: '在瀏覽器中開啟服務',
        detail:
          '輸入本機開發伺服器監聽的通訊埠，牧群會直接透過已建立的通道開啟它。完全不暴露至公網。若無法存取，通常是因為電腦上的服務僅綁定在 localhost。',
      },
      {
        term: '快速動作（Quick actions）',
        detail:
          '儲存常用指令、常用 Prompt 與快速鍵組合，最常用的操作排在最前。支援自由新增與編輯預設指令。',
      },
    ],
    note: '牧群始終只作為觀察者：開啟工作階段絕不會打亂你的視窗排版，關閉手機 App 也絕不會停止任何背景工作。',
  },

  opencode: {
    eyebrow: 'opencode serve --service',
    heading: 'OpenCode 自主代理。',
    lead: '專為 OpenCode 打造的專屬畫面，而非侷促在終端機裡的簡單文字互動：自由切換工作階段、以視覺化卡片展示內嵌 Diff 的工具呼叫，代理提出的問題以互動表單呈現，輕點即可確認。',
    noSignInBadge: '本機執行階段 · 零帳號依賴',
    noSignInHeading: '你的電腦直接與模型服務商通訊。',
    noSignIn:
      '全程無需登入。牧群不提供帳號體系，也不會向你索取 API 金鑰，因為與大模型通訊的不是手機 App，而是你自己電腦上的 OpenCode。你在電腦上設定好 Provider、模型、代理與技能，Gateway 絕不會轉傳任何憑證資料。',
    prerequisitesHeading: '使用先決條件',
    prerequisites: [
      '在執行 Gateway 的電腦上安裝 OpenCode 2.0.1 或更新版本。',
      '在 OpenCode 中至少設定好一個模型提供商。支援設定各類免費模型，模型選擇器內建「僅免費」過濾條件。',
      'OpenCode 服務正常運作。Gateway 預設會自動為你啟動該服務，也會自動連線你手動啟動的既有服務。',
      'Gateway 版本足夠新並支援 Agent 介面。若版本過舊，OpenCode 按鈕會自動隱藏，終端機功能完全不受影響。',
    ],
    entries: [
      {
        term: '工作階段與子代理',
        detail:
          '每個工作階段都是擁有獨立脈絡的對話，支援按工作區或全域匯總檢視。當任務產生子代理（Subagent）時，會以縮排卡片形式掛載在父對話下，複雜分工依然一清二楚。',
      },
      {
        term: '工作區切換',
        detail:
          '隨時切換代理的工作目錄，或手動輸入路徑開啟新工作區。選定工作區會直接還原其最近一次的對話，無需每次從頭開啟新對話。',
      },
      {
        term: '模型與代理角色',
        detail:
          '「選擇模型」面板列出已設定服務商實際提供的可用模型清單，標示各模型脈絡視窗大小，並在免費模型上標註 Free 標記。「選擇代理」可在 Build、Plan、Explore 及電腦上自訂的 Agent 間快速切換。',
      },
      {
        term: '斜線指令與技能（Skills）',
        detail:
          '在輸入框中輸入 / 即可開啟指令選單。部分指令由手機端直接回應（/new、/models、/compact、/undo、/export），其餘指令轉發至電腦端執行。電腦端設定的技能也會一併顯示在清單中，執行時會在紀錄中清楚標示。',
      },
      {
        term: '附件發送與檔案提及',
        detail:
          '支援傳送相片、相簿圖片或任意檔案。圖片在傳送時會自動重新編碼，抹除 EXIF 等隱私中繼資料。在輸入框輸入 @ 可直接搜尋並引用工作區中的檔案，省去手工描述的繁複。',
      },
      {
        term: '權限確認與問題回覆',
        detail:
          '當代理需要執行指令、修改檔案或讀取工作區外的檔案時，會彈出確認卡片展示路徑與細節，提供「允許」、「一律允許」與「拒絕」三個選項——與系統通知按鈕文字完全一致，在鎖定螢幕上即可直接審批。代理提問時會呈現為小表單供你填寫。亦可開啟「自動核准所有動作」以供觀察，但具破壞性的危險指令即便在此模式下依然會被強行攔截。',
      },
      {
        term: '背景工作與排隊執行',
        detail:
          '耗時較長的工具呼叫可一鍵脫離至背景執行，在頂部匣欄中即時觀察進度。當目前回合正在執行時，你新輸入的文字可選擇立即介入引導，或是在本輪結束後排隊執行；排隊中的訊息在送出前支援隨時撤回。',
      },
      {
        term: '脈絡佔用與自動壓縮',
        detail:
          '脈絡抽屜即時顯示當前模型視窗使用百分比、本次對話消耗的 Token 數量以及預估費用。當對話過長時會自動執行歷史壓縮，並在時間軸中明確標記壓縮發生的時間點與是否為自動觸發。',
      },
      {
        term: '版本復原（Undo）',
        detail:
          '輸入 /undo 可將工作區檔案狀態瞬間復原到你上一條訊息發出之前；輸入 /redo 可取消尚未定案的復原。特意設計為明確指令而非單鍵按鈕，杜絕意外誤觸。',
      },
    ],
    note: '所有工具呼叫均以卡片呈現：檔案編輯卡片內嵌標準 Unified Diff 程式碼差異比較，與 Changes 審查檢視保持完全一致。',
  },

  themes: {
    eyebrow: 'muqun.dev/themes',
    heading: '主題系統。',
    lead: '主題能夠同時重繪 App 介面與終端機配色，每一款主題包都包含淺色與深色兩套獨立方案。App 內建 24 款經典主題，社群目錄中更有豐富擴充。',
    entries: [
      {
        term: '內建 24 款精選主題',
        detail:
          '在「設定 → 外觀 → 主題」中可直接選用，包括 Catppuccin、Gruvbox、Kanagawa、Rosé Pine、Tokyo Night 與 Everforest 等知名配色。色彩模式（系統、淺色或深色）決定顯示該主題的哪個明暗分支，而不是替換主題本身。',
      },
      {
        term: '線上瀏覽主題目錄',
        detail:
          '點選「瀏覽主題」可直接造訪 muqun.dev 上的主題目錄。只有當你點開某一款主題時才會下載，清單內會預先標註套件檔案大小。',
      },
      {
        term: '主題套件的檔案構成',
        detail:
          '一個 .muqun-theme 檔案本質上是一個 Zip 壓縮檔，內部包含一個 theme.json 設定檔及存放 PNG、JPEG 或 WebP 圖片的 assets 資源資料夾——不允許包含其他任何檔案。.muqun-theme.json 則是純色主題的獨立資訊清單，不包含圖片資源。',
      },
      {
        term: '主題資訊清單涵蓋的範圍',
        detail:
          '每種模式下的 17 種介面顏色；終端機的背景色、前景色、游標顏色、連結與文字選取反白，以及全部 16 個標準 ANSI 顏色槽位；覆蓋 11 個核心介面的背景插圖（從 Shell 背景到首頁看板）；最多 3 個自訂圖示（返回、傳送、附件）；以及介面和終端機的初始不透明度設定。必須同時提供淺色與深色兩套方案。不允許使用外部字型、SVG 或動畫檔案。',
      },
      {
        term: '檔案大小與規格限制',
        detail:
          '資訊清單檔案大小上限為 256 KiB，最多包含 32 張圖片且單張不超過 8 MiB，打包後的主題總大小上限為 25 MiB。',
      },
      {
        term: '從本機檔案安裝',
        detail:
          '透過檔案管理員、AirDrop 或系統分享面板開啟 .muqun-theme 檔案，牧群會自動彈出匯入提示，亦可在主題抽屜中點選「匯入檔案」。若檔案格式不符會被完整拒絕，絕不會發生半生不熟的錯誤載入。',
      },
      {
        term: '從網路連結安裝',
        detail:
          '「匯入連結」支援輸入公開主題 URL 或 GitHub 倉儲位址（目前唯一支援的倉儲代管服務）。你可以指定分支、Commit 雜湊，若資訊清單不在根目錄還可指定檔案路徑。在下載任何資源前，審查卡片會明確告知圖片資源的代管網域。',
      },
      {
        term: '在終端機中一鍵安裝',
        detail:
          '點選終端機輸出中出現的 .muqun-theme 檔案路徑，App 會彈出預覽卡片：在你主動確認套用前，不會對現有環境產生任何影響。',
      },
      {
        term: '套用前全螢幕即時預覽',
        detail:
          '無論透過哪種途徑安裝，流程皆相同：主題下載、解壓縮並處理好資源後，整個 App 會暫時套用新外觀供你隨處巡覽體驗。在你點選「套用主題」前，現行主題完全不受影響。',
      },
      {
        term: '背景不透明度微調',
        detail:
          '自訂主題提供兩個獨立滑桿：「介面背景不透明度」（僅調整彩色底色，不影響文字、圖示與插圖）與「終端機背景不透明度」（讓 App 底圖透射到終端機文字後方）。兩個滑桿均支援全範圍滑動，低於建議閾值時 App 會發出文字可讀性警告，但絕不會強行阻止你。內建主題不提供不透明度調節。',
      },
      {
        term: '親手製作一款主題',
        detail:
          'App 內不設複雜的調色工具：主題是以工程化檔案形式編寫的。牧群提供專門的主題製作 Agent 技能，你只需向代理描述你想要的視覺風格（點選「建立牧群主題」快速動作即可啟動），代理便會自動產生設定檔、繪製素材並打包成可匯入的主題。',
      },
      {
        term: '發布至社群目錄',
        detail:
          '主題目錄是一個公開的 GitHub 倉儲並接受 Pull Request：將你的 src/<id> 資料夾提交 PR，合併後 CI 會自動打包，幾分鐘內便會收錄在 muqun.dev 官方網站上。工具鏈會自動建構基礎骨架並在提交前嚴格檢查色彩對比度。',
      },
      {
        term: '刪除與空間清理',
        detail:
          '在主題清單中滑動某一行並確認，即可從本機徹底移除該主題。「設定 → 儲存空間」中還提供「清理未使用主題」功能，一鍵清除所有目前未套用的歷史主題資源。',
      },
    ],
    galleryLink: '瀏覽主題目錄',
  },

  troubleshooting: {
    eyebrow: 'when it does not connect',
    heading: '疑難排解與速查。',
    lead: '絕大多數連線問題都可以歸納為四種原因之一：Gateway 未啟動、手機無法連線到位址、裝置配對權杖遺失，或電腦端的 OpenCode 服務未正常運作。',
    checksHeading: '快速檢查清單',
    checks: [
      {
        term: '配對電腦',
        detail:
          '在自己的電腦上安裝 Gateway（支援 tmux 或 Herdr），開啟管理員面板，在手機端牧群中掃描 QR 碼，並在 App 中輸入電腦上顯示的確認碼即可完成配對。',
      },
      {
        term: '檢查連線',
        detail:
          '確認 tmux 或 Herdr（0.7.5+）以及最新版 Gateway 正在執行。確認手機與電腦能連線到相同的私有位址，然後在牧群中重新開啟該伺服器連線。',
      },
      {
        term: '移除裝置',
        detail:
          '在牧群首頁向左滑動刪除伺服器，即可撤銷這台手機對該 Gateway 的存取權限。你也可以在電腦端 Gateway 管理員面板中隨時撤銷任意已配對裝置。',
      },
      {
        term: '恢復推播通知',
        detail:
          '在手機系統設定與牧群 App 設定中同時開啟通知權限。重新開啟已配對的伺服器，以便牧群將最新的裝置推播權杖重新註冊至 Gateway。',
      },
    ],
    entries: [
      {
        term: '無法完成配對',
        detail:
          '提示「無法連線至閘道（Could not reach the gateway）」代表 QR 碼中編碼的位址在當前手機網路環境下無法連通。在電腦上執行 muqun-gateway status 查看狀態，確認手機足以連線到該位址——例如處於同一個 Wi-Fi，或更好的是同一個 tailnet。若 Gateway 僅繫結在本機回環位址（127.0.0.1），除本機外任何外部裝置均無法存取；可在管理員中按 u 發布真實區域網路 IP，或透過儲存的 SSH 主機進行通道配對。',
      },
      {
        term: '確認碼被拒絕或已過期',
        detail:
          '短碼由 8 個字元組成，有效時間為 5 分鐘，輸錯 8 次後將被強制作廢。在管理員中按 p 鍵可重新產生一組全新的 QR 碼與短碼。短碼字元集中已排除容易混淆的 0、1、I、L 和 O，若看到外觀相似的字元請注意區分。',
      },
      {
        term: '狀態指示圓點的意義',
        detail:
          '實心圓點表示 App 已經完成探測並取得明確回應：顯示為綠色代表 ONLINE 線上，顯示為灰色代表 OFFLINE 離線。空心圓環並標註 NOT CONNECTED 表示尚未發起探測——這不是故障錯誤，點選開啟伺服器即可立即建立連線。',
      },
      {
        term: '提示需要重新配對',
        detail:
          '代表此手機對應的裝置權杖在 Gateway 端已不存在——可能是在管理員中手動撤銷了權限，或是 Gateway 狀態目錄重建導致權杖遺失。重新完成一次掃描配對即可，手機上的其他設定與資料完全不受影響。',
      },
      {
        term: '找不到 OpenCode 服務',
        detail:
          'Agent 畫面提示 OpenCode service offline，並提示你在電腦上執行 opencode serve --service。在電腦上執行該指令，然後點選手機上的「重新檢查」。若電腦上已經在執行但依然提示找不到，通常是因為 Gateway 偵測到的執行檔路徑與你手動執行的不同：在 config.json 中明確指定 opencode.binary 為完整絕對路徑後重新啟動 Gateway。',
      },
      {
        term: '模型顯示為灰色，或沒有免費模型',
        detail:
          '提示「需要在電腦端設定」代表該提供商尚未在 OpenCode 中完成設定——在電腦端完成設定後重新開啟選擇器即可。「此主機無可用免費模型」代表「僅免費」過濾條件篩除掉了所有模型，並非系統錯誤；關閉該篩選條件即可檢視服務商提供的全部模型。牧群會在畫面上顯示每次對話的預估費用，但自身絕不收取任何模型費用，也不干預你與服務商之間的通訊。',
      },
      {
        term: '代理請求存取工作區以外的路徑',
        detail:
          '提示「讀取工作區外內容」或「寫入工作區外內容」正如其字面意義，彈出的卡片上會清晰標示涉及的具體絕對路徑。點選「允許」授權本次，「一律允許」記住該路徑，「拒絕」則攔截本次動作。安全機制正在發揮防護作用——審批前請務必仔細核對目標路徑。',
      },
      {
        term: '找不到「變更（Changes）」按鈕',
        detail:
          '該按鈕僅在當前終端機窗格處於 Git 倉儲目錄內、且 Gateway 版本足夠新並支援 Diff 功能時才會顯現。重新執行安裝指令碼升級 Gateway 即可。',
      },
      {
        term: '部分功能提示需要更新 Gateway',
        detail:
          '牧群會主動探測 Gateway 的功能支援集，舊版 Gateway 只是無法使用新功能，終端機核心連線完全不受影響。將工作指派給子代理這一功能額外需要工作階段後端為 Herdr 0.9.0 或更新版本（tmux 工作階段暫不支援），缺少時 App 會明確指出需要升級哪個元件。',
      },
      {
        term: '電腦處於 Proxy 代理伺服器之後',
        detail:
          '與大模型提供商通訊的是你的電腦，因此如果電腦需要透過 Proxy 才能連線外網，必須在電腦端的 OpenCode 中妥善設定網路代理環境變數。牧群不會轉發也不會接觸此類流量。',
      },
    ],
  },

  contact: {
    eyebrow: 'github · issues',
    heading: '仍未解決？',
    lead: '前往 GitHub 提交 Issue。每一次版本迭代與問題修正都來自於此，每一條回饋都會被認真審視。',
    reportHint:
      '請附上 App 版本號、Gateway 版本號，以及問題發生前的具體操作步驟。',
    issueCta: '在 GitHub 上提交 Issue',
    safetyHeading: '隱私保障與安全提報規範',
    safetyBody:
      '技術支援絕不需要你的存取權杖、完整的終端機輸出、原始碼或配對 QR 碼。在附加螢幕截圖或日誌前，請務必移除所有敏感資訊。',
    safetyLink: '閱讀隱私權政策',
  },
};
