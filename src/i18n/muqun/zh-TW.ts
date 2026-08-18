import type { MuqunCopy } from './types';

/**
 * Traditional Chinese (Taiwan) copy for the Muqun page. Translated from the
 * English source of truth in en.ts; keys and structure must stay identical.
 *
 * The app is called 牧群 here. Herdr, tmux, Tailscale, Gateway, Osuki, Claude
 * Code, nvim, the shell commands and the theme pack names are never
 * translated.
 */
export const copy: MuqunCopy = {
  meta: {
    title: '牧群 — 你的代理程式，隨時隨地',
    description:
      '你人不在桌前的時候，程式開發代理程式停下來請求授權。牧群把那個回答放進你的手機：真正的終端機、鎖定畫面上的核准，以及從口袋裡開始的新任務——直連你自己的 Mac 或 Linux 電腦。',
  },
  hero: {
    paneLabel: '牧群',
    paneState: '代理程式等待中',
    eyebrow: '面板 2 · claude code · 等待回應 00:14',
    heading: '你的代理程式在等一個按鍵。',
    sub: '一行指令、一次掃描——之後你電腦上的每個代理程式，都會把狀況回報到你的手機。',
    appStore: '取得牧群',
    googlePlay: '在 Google Play 取得',
    installLabel: '接著，在你自己的電腦上：',
    copyLabel: '複製安裝指令',
    copiedLabel: '已複製',
    terminalAlt:
      '一個終端機面板，程式開發代理程式停下來請求編輯檔案的授權，第一個選項已選取，游標停在那裡等著。',
    deviceAlt:
      '牧群的首頁：一台伺服器標示為線上，它的代理程式沿著一條珊瑚色的線排開，各自標示為工作中、等待回應或閒置。',
    videoPlayLabel: '播放 21 秒的介紹影片',
    videoLength: '0:21',
    promptLegend: '代理的三個回答',
    promptHint: '按 1、2 或 3——也可以在鎖定畫面上回答。',
    promptCaption:
      '停在權限詢問上的終端機窗格：一個編碼代理要求編輯 src/theme.ts，正在等三個回答的其中一個。',
  },
  pillars: {
    paneLabel: '這是拿來做什麼的',
    items: [
      {
        pane: '核准',
        state: '等待中',
        title: '趁咖啡還沒涼，回答它',
        line: '授權要求會以推播送到你手上，在鎖定畫面就能回答——核准、核准且不再詢問、拒絕。',
        alt: '牧群在代理程式請求授權時送出的通知示意圖，上面有三個回答按鈕。',
      },
      {
        pane: '觀看',
        state: '串流中',
        title: '在任何地方，看任何代理程式的進度',
        line: '真正的終端機畫面，即時，帶著代理程式自己的顏色。長按可以選取並複製確切的內容，往下拉可以看更早的輸出。',
        alt: '牧群裡程式開發代理程式的輸出：一份帶色彩的 diff、一張有框線的表格，以及一行綠色的通過訊息。',
      },
      {
        pane: '傳送',
        state: '就緒',
        title: '把一張圖交到代理程式手上',
        line: '直接從手機附加圖片或檔案——設計稿、出錯的畫面、白板上的字。可以打字，也可以用鍵盤上的語音輸入鍵。',
        alt: '牧群的輸入框，一張照片已經附在準備送給代理程式的訊息上。',
      },
      {
        pane: '交辦',
        state: '就緒',
        title: '從口袋裡開始下一件事',
        line: '挑一個代理程式，挑一個這個工作階段已經知道的目錄，打上提示詞。它會落在一個全新的面板裡。',
        alt: '牧群新增任務頁面的示意圖：一個代理程式、一個工作目錄，以及一個提示詞欄位。',
      },
      {
        pane: 'away',
        state: '15m',
        title: '回來時看到的是一句話，不是一份日誌',
        line: '隔了十五分鐘再打開一台機器，牧群會先講有什麼動過：哪些代理做完了、哪些還在問，以及沒人看著的時候它們停下來過幾次。',
        alt: '牧群「你不在的時候」卡片的示意圖：三個代理、各自最後停在哪裡，以及為了發問而停下來的次數。',
      },
      {
        pane: 'serve',
        state: 'port',
        title: '把開發伺服器開在口袋裡',
        line: '輸入一個埠號，牧群就用終端機已經在用的那個私有位址，在手機瀏覽器裡把它打開。不用架通道，也不用把任何東西放上網際網路。',
        alt: '牧群「開啟網頁服務」面板的示意圖：最近用過的埠號、一個埠號欄位，以及一顆「開啟」按鈕。',
      },
    ],
    dispatchAgent: '代理程式',
    dispatchFolder: '目錄',
    dispatchPrompt: '提示詞',
    dispatchSend: '開始',
  },
  craft: {
    paneLabel: '握在手裡是什麼感覺',
    paneNote: '手勢與按鍵',
    heading: '一個能用兩根拇指開的終端機。',
    lead: '手機不是鍵盤，硬把它當鍵盤用，正是其他終端機 App 用起來都不對勁的原因。以下是牧群認得的手勢，以及每一個為什麼長成這樣。',
    items: [
      {
        gesture: '兩指',
        line: '在面板上任何地方橫向滑動，就能在這個工作區的分頁之間移動。牧群會先分辨這是橫掃還是縮放，才決定要不要帶你走，所以放大畫面永遠不會把你丟到別的分頁去。',
      },
      {
        gesture: '兩指縮放',
        line: '把字縮放到你眼睛想要的大小。每個面板各自記住自己的比例——編輯器和代理程式本來就不是在同一個距離下讀的。',
      },
      {
        gesture: '下拉',
        line: '把已經捲過去的輸出拉回來看。點一下標記，就回到最新的一行。',
      },
      {
        gesture: '長按',
        line: '選取輸出，拖曳延伸選取範圍，複製到的是精確的位元組——程式真正印出來的那些字元，不是它們的截圖。',
      },
      {
        gesture: '每一個鍵',
        line: '螢幕鍵盤照著鍵盤的樣子排列，按下去的瞬間就送出，這正是 nvim、less 和各種 REPL 在這裡能正常操作的原因。',
      },
      {
        gesture: 'vim 的按鍵列',
        line: '編輯器面板會拿到 vim 預期的那一排按鍵，含 LazyVim 的 leader 組合鍵，而且跟著 nvim 當下真正的模式走，不是跟著你上次選的那個。',
      },
      {
        gesture: '@',
        line: '用 @ 提及檔案，不必打路徑。照片和文件從同一個輸入區附加，代理程式自己的斜線指令也從這裡執行。',
      },
      {
        gesture: '點一下檔案',
        line: '不離開 App 就能讀這個工作階段寫出來的東西：語法標色、彩色 diff，還有圖片預覽。',
      },
    ],
  },
  setup: {
    paneLabel: '安裝',
    paneNote: '大約一分鐘',
    heading: '一行指令。一次掃描。',
    lead: '牧群連的是你自己電腦上的 Gateway，不是我們的伺服器。安裝它只要一行，剩下的它自己會做。',
    steps: [
      {
        title: '在你的電腦上執行這一行',
        body: '它會下載編譯好的程式——不需要 Rust，也不需要編譯器——接著完成設定、啟動它，並開啟配對面板。',
      },
      {
        title: 'QR 碼已經在畫面上了',
        body: '第一次安裝時，Gateway 會開啟自己的面板，就在其他面板旁邊，碼已經在裡面了。',
      },
      {
        title: '掃描它，你就進去了',
        body: '把牧群的相機對準那個面板，再把電腦上顯示的短碼輸入回去。伺服器會轉綠，它的面板就在你的手機上了。',
      },
    ],
    inspectLead: '想先讀過再說？先下載，讀過那個檔案，再執行同一個檔案：',
    panelFallbackLabel: '面板沒出現？',
    panelFallbackBody: '在任何終端機裡，都可以自己把它打開：',
    panelFallbackAfter: '裝置配對之後，面板會改成顯示它的管理介面——在裡面按 p，就能把 QR 碼叫回來。',
    panelCopyLabel: '複製開啟面板的指令',
    inspectCopyLabel: '複製這三行指令',
    onlineLabel: '線上',
    qrPanelAlt:
      '終端機工作階段裡 Gateway 面板的示意圖，上面有配對用的 QR 碼，以及 p、x、u 三個按鍵。',
    onlinePanelAlt:
      '配對完成後，牧群裡那張伺服器卡片的示意圖，以綠色顯示「線上」。',
    pairPhoneAlt:
      '還沒配對任何東西時，手機上的牧群：伺服器清單是空的，只有一顆「配對伺服器」按鈕。',
    panelsPhoneAlt:
      '配對完成後，手機上的牧群：機器上的其中一個分頁開著——一個顯示 src/theme.ts 的編輯器——其餘分頁排在下方那條列上，Claude Code、nvim、zsh。',
    requirements: [
      'tmux，或 Herdr 0.7.5 或更新版本，在 macOS 或 Linux 上。目前尚未支援 Windows。',
      '免帳號、免訂閱，也沒有應用程式內購。',
      '同一個 Wi-Fi 就可以；Tailscale 更好。',
    ],
    tailscaleBefore: '我們建議把兩台裝置都放進 Tailscale，並使用',
    tailscaleLink: 'Tailscale Serve',
    tailscaleAfter:
      '取得一個私有的 HTTPS 位址——不必做通訊埠轉送，你的東西也不會出現在公開網路上。請用 Serve，不要用 Funnel。',
    updatingLabel: '日後更新：',
    updatingBody:
      '再執行一次同一行指令。它會更新 Gateway 並重新啟動，已配對的手機仍維持配對。',
    openSourceBefore: 'Gateway 是開源的——',
    openSourceLink: '閱讀原始碼與完整安裝指南',
  },
  review: {
    status: 'Apple 審核中',
    note: '牧群正在 Apple 審核中。App Store 連結會出現在這裡。',
  },
  delight: {
    paneLabel: '調成你喜歡的樣子',
    paneNote: '隨你挑 · 淺色與深色',
    heading: '挑一組主題，終端機跟著換。',
    line: '每一組套件都會同時換掉牧群與終端機的配色，而且每組都有淺色與深色兩半。一共 32 組，同一個工作階段先看其中五組：',
    themeAlt: '同一個牧群工作階段，套用 {pack} 套件。',
  },
  promise: {
    paneLabel: '說好的事',
    lines: [
      '你的手機直接和你自己的電腦配對。',
      '沒有牧群帳號，中間也沒有任何屬於我們的中繼伺服器。',
      '沒有廣告、沒有分析追蹤、沒有第三方追蹤 SDK。',
      '買斷一次，之後的每一次更新都免費。',
      '想要什麼功能、遇到什麼問題都可以提；下一版就是從那裡長出來的。',
    ],
    link: '閱讀隱私權政策',
    feedbackLink: '提出功能建議或回報問題',
  },
  footer: {
    heading: '你的代理程式，隨時隨地。',
    appStore: '取得牧群',
    googlePlay: 'Google Play',
    installLabel: '安裝 Gateway',
    support: '支援',
  },
  support: {
    metaTitle: '牧群支援',
    metaDescription:
      '協助你安裝 Gateway、配對牧群、建立安全的 Tailscale 連線，以及處理通知與裝置存取權。',
    eyebrow: '牧群 · 支援',
    heading: '讓你自己的電腦隨時觸手可及。',
    lead: '先從下方的檢查項目開始。如果牧群仍然無法連線，請提供裝置型號、iOS 或 Android 版本、你使用的後端（tmux 或 Herdr）與其版本、Gateway 版本，以及應用程式中顯示的完整訊息。切勿傳送 Gateway 權杖或配對用的 QR 碼。',
    emailCta: '寄信給牧群支援',
    issueCta: '建立 issue',
    contactBefore: '電子郵件：',
    contactAfter: '一般回覆時間：兩個工作天內。',
    networkEyebrow: '建議的網路設定',
    networkHeading: '兩台裝置都使用 Tailscale。',
    networkBadge: '手機 → tailnet → 電腦',
    networkBody:
      '我們強烈建議把手機和執行 Gateway 的電腦放進同一個 Tailscale tailnet。這樣就不必在路由器上做通訊埠轉送，也能讓 Gateway 不暴露在公開網路上。Tailscale Serve 可以再加上一個私有的 HTTPS 位址；請勿為牧群使用 Tailscale Funnel。',
    networkLink: '閱讀 Tailscale Serve 指南',
    checksHeading: '快速檢查',
    topics: [
      {
        title: '配對電腦',
        body: '在你自己的電腦上安裝 Gateway（同時支援 tmux 與 Herdr），開啟它的管理面板，然後在牧群裡掃描配對用的 QR 碼。輸入電腦上顯示的確認碼即完成配對。',
      },
      {
        title: '修復連線',
        body: '確認正在執行的是 tmux，或 Herdr 0.7.5 或更新版本，以及最新版的 Gateway。確認手機和電腦連得到同一個私有位址，然後在牧群裡重新開啟該伺服器。',
      },
      {
        title: '移除裝置',
        body: '在牧群的首頁刪除某台伺服器，即可撤銷這支手機對該 Gateway 的存取權。你也可以從 Gateway 管理面板撤銷任何已配對的裝置。',
      },
      {
        title: '恢復通知',
        body: '在手機的系統設定與牧群的設定中，都要為牧群開啟通知。重新開啟已配對的伺服器，牧群才能把目前的裝置權杖註冊到你的 Gateway。',
      },
    ],
    safetyHeading: '隱私與安全回報',
    safetyBody:
      '支援團隊絕不需要你的存取權杖、完整終端機輸出、原始碼或配對用的 QR 碼。附上截圖或紀錄檔之前，請先移除機密資訊。',
    safetyLink: '閱讀隱私權政策',
  },
};
