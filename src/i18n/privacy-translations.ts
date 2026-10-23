import type { SiteLocale } from "@/lib/locales";

interface Policy {
  intro: string;
  sections: { title: string; paragraphs: string[] }[];
}

/** Every published locale carries the same policy scope; no silent English fallback. */
export const privacyTranslations: Record<SiteLocale, Policy> = {
  en: {
    intro:
      "This policy covers the Muqun mobile app and website. Muqun connects to a Gateway you control. There is no Muqun account, advertising, or advertising tracking. Optional AI and voice services process data as described below.",
    sections: [
      {
        title: "Data on your device",
        paragraphs: [
          "Muqun stores Gateway names, addresses, pairing details and credentials; SSH connection details and credentials if configured; preferences and quick commands; agent and project information, session lists and task records; themes, fonts and downloaded assets. Conversation and terminal content is also held in memory while you use it. Selected files, images and recordings can create temporary local copies.",
          "Gateway and SSH credentials are encrypted in the operating system’s secure credential storage. Voice settings, including the API key, also use secure credential storage. These entries use device-only accessibility on iOS. Other preferences, records and files use ordinary app storage; their backup behavior depends on the operating system. They are not all protected or deleted in the same way as credentials.",
        ],
      },
      {
        title: "Your Gateway, agents and AI providers",
        paragraphs: [
          "Terminal and agent connections go to the Gateway you pair, without an Osuki relay. The Gateway receives the credentials, workspace and session identifiers, commands, prompts, attachments and other content needed for your actions, and returns terminal output, conversations and tool results. If you use SSH, the configured SSH host also handles that connection.",
          "An agent running on your computer may send your prompts, files, code, conversation context and tool results to its configured AI model provider or other connected services. The recipients depend on your Gateway and agent configuration; the agent software is not necessarily the final provider. Review those services’ privacy and retention terms before sharing personal or confidential information. Use HTTPS or a trusted encrypted private network such as Tailscale; HTTP alone does not encrypt traffic.",
          "Pairing sends your device name and a locally generated installation identifier to the Gateway. When Gateway transport encryption is enabled, pairing establishes device-specific keys that protect supported app-to-Gateway requests and responses; the Gateway can still read the content. Gateway owners can disable this encryption, and older pairings may lack it. It does not protect onward connections to AI or voice services. In manual address pairing, the submitted pairing code itself is not protected by that code-based encryption, so use HTTPS or a trusted encrypted connection such as SSH or Tailscale.",
          "Where supported, opening agent account details or refreshing account limits asks the Gateway for a usage snapshot from the agent account configured on your computer. The app displays reported usage, limits, reset times, plan or credit information; it does not request the provider’s login credentials for this feature. These are account-wide snapshots, which may be temporarily cached by the Gateway, rather than a complete billing record.",
        ],
      },
      {
        title: "Camera, photos and files",
        paragraphs: [
          "When you scan a pairing QR code, camera frames are processed on your device and are not saved or uploaded. You can enter a Gateway address manually instead.",
          "Taking an attachment photo or choosing photos or files is different: Muqun starts uploading the selected items to the chosen Gateway after selection, before you send the message. File contents and details such as names and types are included. Removing an attachment from the draft does not recall an upload that has already reached the Gateway. Sending the message makes the attachment available to the agent, which may pass it to its configured providers.",
          "Viewing conversation images can fetch thumbnails, previews or originals from your Gateway. Opening an image or saving it may download the original, depending on Gateway support; selected upload images may also be resized before upload. Displayed or decrypted images can be kept in memory, image caches or temporary local files, so transport encryption does not mean there is no local image copy. Saving to Photos, Files or a sharing destination creates a separate copy outside the app’s cache, which you must manage there.",
        ],
      },
      {
        title: "Optional voice transcription",
        paragraphs: [
          "Audio is sent only when you configure a transcription service in Settings and actively use voice input with microphone permission. The built-in presets point to OpenAI; you can choose a compatible custom service. In file mode, a temporary recording is sent directly to that service when you finish recording. In realtime mode, audio is streamed directly to the service while recording. The request also includes the configured model, language and API key where applicable. This connection does not pass through your Gateway or an Osuki relay.",
          "The returned transcript goes into your draft for editing before you send it. Audio has already been shared with the transcription service at that point. Cancelling stops further recording and requests but cannot recall audio already transmitted. Muqun attempts to delete the temporary recording when the session finishes or is cancelled; interrupted cleanup can leave a local copy. You can stop using voice input, remove its configuration in Settings, or revoke microphone permission in system settings. Provider retention and deletion follow the service’s terms.",
        ],
      },
      {
        title: "App Lock",
        paragraphs: [
          "With App Lock enabled, your operating system performs biometric or passcode authentication. Muqun receives the result, not your biometric data or passcode.",
        ],
      },
      {
        title: "Optional notifications",
        paragraphs: [
          "When notifications are enabled, Muqun registers an Expo push token and sends it, your device name, platform and language to your Gateway. Delivery uses Expo and Apple or Google push services, which process the token, notification content and delivery metadata. Content depends on notifications generated by the Gateway and may include workspace or task information. Turning notifications off attempts to unregister the token from the Gateway and disables the app’s push registration; an unreachable Gateway may retain its record. You can also disable notifications in system settings.",
        ],
      },
      {
        title: "Updates, themes and website requests",
        paragraphs: [
          "App builds with online updates enabled contact updates.muqun.dev to check for and download updates and release notes. Requests include technical information such as platform, update channel, build compatibility and release identifiers; release-note requests include your selected language. The compatibility identifier describes the app build, not a biometric fingerprint. Cloudflare hosts this infrastructure and the website and can process IP addresses and request metadata needed to serve them.",
          "Browsing or importing online themes and other remote assets contacts muqun.dev, GitHub or the source you choose. Those hosts receive the requested address and ordinary connection metadata. Downloaded themes and assets are stored locally. The website stores your appearance preference in your browser’s local storage; you can clear it with browser site data. These service requests are separate from your terminal and agent connections.",
        ],
      },
      {
        title: "Retention, deletion and your choices",
        paragraphs: [
          "Remove saved Gateways and SSH hosts in the app and clear voice configuration to remove their saved connection records. Settings → Storage can clear supported image caches and temporary copies; it does not erase all app data, agent records, credentials or installed themes. Themes can be managed in the theme library. Local preferences and records remain until changed or removed through the relevant feature or app-data controls. Do not rely on uninstalling alone to remove iOS secure credential entries.",
          "Removing a local record, clearing a cache or uninstalling Muqun does not delete data from your Gateway, agent, AI provider, transcription service or notification provider. Supported session deletion requests are sent to the Gateway; this is not a guarantee that providers or backups are erased. Manage remote files, histories and device access with the Gateway operator and request provider deletion under their policies. Revoke Gateway access tokens or third-party API keys at their source to invalidate them. Muqun does not set or guarantee those services’ retention periods.",
        ],
      },
      {
        title: "Support, changes and contact",
        paragraphs: [
          "If you contact Osuki for support, we use the information you provide to respond. Avoid sending access tokens, private code or unredacted logs. We may revise this policy when features or services change; the revision date appears above. For privacy questions, contact us at:",
        ],
      },
    ],
  },
  "zh-CN": {
    intro:
      "本政策适用于牧群移动应用和网站。牧群连接由你管理的 Gateway，不设牧群账号，没有广告或广告追踪。可选 AI 和语音服务会按下文所述处理数据。",
    sections: [
      {
        title: "设备上的数据",
        paragraphs: [
          "牧群保存 Gateway 名称、地址、配对信息和凭据；已配置的 SSH 连接信息与凭据；偏好设置和快捷命令；代理、项目、会话列表和任务记录；主题、字体及下载的资源。使用期间，对话和终端内容也会保留在内存中。选取文件、图片和录音可能产生本地临时副本。",
          "Gateway 和 SSH 凭据经过加密，保存在操作系统的安全凭据存储中。语音配置（包括 API 密钥）也使用安全凭据存储。这些条目在 iOS 上采用仅限本机的访问级别。其他偏好、记录和文件使用普通应用存储，备份行为取决于操作系统；它们的保护和删除方式并不都与凭据相同。",
        ],
      },
      {
        title: "你的 Gateway、代理和 AI 服务商",
        paragraphs: [
          "终端和代理连接直接到达你配对的 Gateway，不经过 Osuki 中继。Gateway 接收完成操作所需的凭据、工作区及会话标识、命令、提示词、附件和其他内容，并返回终端输出、对话和工具结果。使用 SSH 时，已配置的 SSH 主机也会处理连接。",
          "电脑上运行的代理可能把提示词、文件、代码、对话上下文及工具结果发送给其配置的 AI 模型服务商或其他已连接服务。接收方取决于 Gateway 和代理配置，代理软件本身不一定是最终服务商。分享个人或机密信息前，请查看相关服务的隐私和保留条款。请使用 HTTPS 或 Tailscale 等可信的加密私有网络；HTTP 本身不加密流量。",
          "配对会将设备名称和本机生成的安装标识发送至 Gateway。启用 Gateway 传输加密时，配对建立设备专属密钥，保护受支持的应用与 Gateway 请求和响应；Gateway 仍可读取内容。管理者可以关闭此加密，旧配对也可能未启用。它不保护后续的 AI 或语音服务连接。手动地址配对时，提交的配对码本身不受基于该码的加密保护，因此请使用 HTTPS 或 SSH、Tailscale 等可信加密连接。",
          "在支持的情况下，打开代理账户详情或刷新账户额度，会请求 Gateway 查询电脑上已配置代理账户的用量快照。应用显示服务报告的用量、额度、重置时间、套餐或积分信息；此功能不要求你在应用中提供服务商登录凭据。这些信息是账户范围的快照，Gateway 可能临时缓存，并非完整账单记录。",
        ],
      },
      {
        title: "相机、照片和文件",
        paragraphs: [
          "扫描配对二维码时，相机画面在设备上处理，不会保存或上传。你也可以手动输入 Gateway 地址。",
          "拍摄附件照片或选取照片、文件的处理方式不同：选取后，牧群即开始向所选 Gateway 上传，无需等到发送消息。上传包含文件内容及名称、类型等信息。从草稿移除附件不会撤回已到达 Gateway 的上传。发送消息后，代理可以使用附件，并可能转交其配置的服务商。",
          "查看对话图片时，可能从 Gateway 获取缩略图、预览或原图。打开图片或保存时可能按 Gateway 支持情况下载原图；选取上传的图片也可能先调整尺寸。显示或解密的图片可保存在内存、图片缓存或本地临时文件中，因此传输加密不代表本机没有图片副本。保存至照片、文件或分享目标会产生应用缓存之外的独立副本，需要在对应位置管理。",
        ],
      },
      {
        title: "可选语音转写",
        paragraphs: [
          "只有你在设置中配置转写服务，并主动使用已获麦克风权限的语音输入时，才会发送音频。内置预设指向 OpenAI，你也可以选择兼容的自定义服务。文件模式在结束录音后，把临时录音直接发送到该服务；实时模式在录音期间直接传输音频。请求还会按配置携带模型、语言和 API 密钥。此连接不经过 Gateway 或 Osuki 中继。",
          "返回的文字放入草稿供你编辑，然后由你发送；此时音频已经分享给转写服务。取消会停止后续录音和请求，但不能撤回已传输的音频。会话完成或取消时，牧群会尝试删除临时录音；清理中断可能留下本地副本。你可以停止使用语音、在设置中清除语音配置，或在系统设置中撤销麦克风权限。服务商的数据保留和删除遵循其条款。",
        ],
      },
      {
        title: "应用锁",
        paragraphs: [
          "开启应用锁后，由操作系统进行生物识别或密码验证。牧群仅获得验证结果，不会获得生物识别数据或密码。",
        ],
      },
      {
        title: "可选通知",
        paragraphs: [
          "开启通知后，牧群注册 Expo 推送令牌，并将令牌、设备名称、平台和语言发送到 Gateway。通知由 Expo 及 Apple 或 Google 推送服务投递，它们会处理令牌、通知内容和投递元数据。内容取决于 Gateway 生成的通知，可能包含工作区或任务信息。关闭通知会尝试向 Gateway 注销令牌，并取消应用的推送注册；无法连接的 Gateway 可能仍保留记录。你也可以在系统设置中关闭通知。",
        ],
      },
      {
        title: "更新、主题和网站请求",
        paragraphs: [
          "启用在线更新的应用版本会连接 updates.muqun.dev 检查和下载更新及版本说明。请求包含平台、更新频道、构建兼容性和版本标识等技术信息；版本说明请求还包含所选语言。兼容性标识描述应用构建，并非生物识别指纹。Cloudflare 托管此基础设施和网站，可处理提供服务所需的 IP 地址和请求元数据。",
          "浏览或导入在线主题及其他远程资源时，会连接 muqun.dev、GitHub 或你选择的来源。这些站点会收到请求地址和常规连接元数据。下载的主题和资源保存在本地。网站将外观偏好保存在浏览器本地存储中，可通过清除网站数据删除。这些服务请求与终端和代理连接相互独立。",
        ],
      },
      {
        title: "保留、删除和你的选择",
        paragraphs: [
          "在应用中移除已保存的 Gateway、SSH 主机，或清除语音配置，可删除对应的已存连接记录。设置 → 存储可清理支持的图片缓存和临时副本，但不会清除全部应用数据、代理记录、凭据或已安装主题。主题可在主题库中管理。本地偏好和记录会保留至通过相应功能或应用数据管理方式修改或删除。不要仅依赖卸载来删除 iOS 安全凭据条目。",
          "删除本地记录、清理缓存或卸载牧群，不会删除 Gateway、代理、AI 服务商、转写服务或通知服务商的数据。支持的会话删除请求会发送到 Gateway，但不保证服务商或备份中的数据也被清除。请通过 Gateway 管理者管理远程文件、历史和设备权限，并按服务商政策请求删除数据。令牌或 API 密钥应在签发方撤销，才能失效。牧群不设定或保证这些服务的数据保留期限。",
        ],
      },
      {
        title: "支持、政策变更和联系",
        paragraphs: [
          "你联系 Osuki 寻求支持时，我们使用你提供的信息来回复。请勿发送访问令牌、私有代码或未经脱敏的日志。功能或服务变化时，我们可能修订本政策，修订日期见上方。如有隐私问题，请联系：",
        ],
      },
    ],
  },
  "zh-TW": {
    intro:
      "本政策適用於牧群行動應用程式及網站。牧群連接由你管理的 Gateway，不設牧群帳號，沒有廣告或廣告追蹤。選用 AI 與語音服務會依下文所述處理資料。",
    sections: [
      {
        title: "裝置上的資料",
        paragraphs: [
          "牧群儲存 Gateway 名稱、位址、配對資訊與憑證；已設定的 SSH 連線資訊與憑證；偏好設定與快速指令；代理程式、專案、工作階段清單與任務紀錄；主題、字型及下載資源。使用期間，對話與終端機內容也會保留在記憶體中。選取檔案、圖片及錄音可能產生本機暫存副本。",
          "Gateway 與 SSH 憑證經加密，儲存於作業系統的安全憑證儲存空間。語音設定（包括 API 金鑰）也使用安全憑證儲存。這些項目在 iOS 上採用僅限本機的存取層級。其他偏好、紀錄及檔案使用一般應用程式儲存，備份行為取決於作業系統；保護與刪除方式並不全都與憑證相同。",
        ],
      },
      {
        title: "你的 Gateway、代理程式及 AI 服務商",
        paragraphs: [
          "終端機與代理程式連線直接到達你配對的 Gateway，不經 Osuki 中繼。Gateway 接收操作所需的憑證、工作區與工作階段識別碼、指令、提示詞、附件及其他內容，並回傳終端機輸出、對話與工具結果。使用 SSH 時，已設定的 SSH 主機也會處理連線。",
          "電腦上的代理程式可能將提示詞、檔案、程式碼、對話脈絡及工具結果傳送給所設定的 AI 模型服務商或其他已連接服務。接收方取決於 Gateway 與代理程式設定；代理軟體本身不一定是最終服務商。分享個人或機密資訊前，請查看相關服務的隱私與保留條款。請使用 HTTPS 或 Tailscale 等可信任的加密私有網路；HTTP 本身不加密流量。",
          "配對會將裝置名稱及本機產生的安裝識別碼傳送至 Gateway。啟用 Gateway 傳輸加密時，配對建立裝置專屬金鑰，保護支援的應用程式與 Gateway 請求及回應；Gateway 仍可讀取內容。管理者可關閉此加密，舊配對也可能未啟用。它不保護後續的 AI 或語音服務連線。手動位址配對時，提交的配對碼本身不受以該碼為基礎的加密保護，因此請使用 HTTPS 或 SSH、Tailscale 等可信任的加密連線。",
          "在支援的情況下，開啟代理程式帳戶詳情或重新整理額度，會要求 Gateway 查詢電腦上已設定代理帳戶的用量快照。應用程式顯示回報的用量、額度、重設時間、方案或點數資訊；此功能不要求你在應用程式中提供服務商登入憑證。這些資訊是帳戶範圍的快照，Gateway 可能暫時快取，並非完整帳單紀錄。",
        ],
      },
      {
        title: "相機、照片及檔案",
        paragraphs: [
          "掃描配對 QR 碼時，相機影像在裝置上處理，不會儲存或上傳。你也可以手動輸入 Gateway 位址。",
          "拍攝附件照片或選取照片、檔案的處理方式不同：選取後，牧群即開始上傳至所選 Gateway，不必等到傳送訊息。上傳包括檔案內容及名稱、類型等資訊。從草稿移除附件不會撤回已到達 Gateway 的上傳。傳送訊息後，代理程式可使用附件，也可能轉交所設定的服務商。",
          "檢視對話圖片時，可能從 Gateway 取得縮圖、預覽或原圖。開啟圖片或儲存時，可能依 Gateway 支援情況下載原圖；選取上傳的圖片也可能先調整尺寸。顯示或解密的圖片可保存在記憶體、圖片快取或本機暫存檔中，因此傳輸加密不代表本機沒有圖片副本。儲存至照片、檔案或分享目標會產生應用程式快取以外的獨立副本，須在對應位置管理。",
        ],
      },
      {
        title: "選用語音轉寫",
        paragraphs: [
          "只有你在設定中配置轉寫服務，並主動使用已獲麥克風權限的語音輸入時，才會傳送音訊。內建預設指向 OpenAI，你也可以選擇相容的自訂服務。檔案模式在結束錄音後，將暫存錄音直接傳送至該服務；即時模式則在錄音期間直接串流音訊。請求也會依設定攜帶模型、語言及 API 金鑰。此連線不經 Gateway 或 Osuki 中繼。",
          "回傳文字會放入草稿，供你編輯後自行傳送；此時音訊已分享給轉寫服務。取消會停止後續錄音與請求，但無法撤回已傳輸的音訊。工作階段完成或取消時，牧群會嘗試刪除暫存錄音；清理中斷可能留下本機副本。你可以停止使用語音、在設定中清除語音配置，或在系統設定中撤銷麥克風權限。服務商的資料保留與刪除依其條款辦理。",
        ],
      },
      {
        title: "應用程式鎖定",
        paragraphs: [
          "啟用應用程式鎖定後，由作業系統執行生物辨識或密碼驗證。牧群僅取得驗證結果，不會取得生物辨識資料或密碼。",
        ],
      },
      {
        title: "選用通知",
        paragraphs: [
          "啟用通知後，牧群註冊 Expo 推播權杖，並將權杖、裝置名稱、平台及語言傳送至 Gateway。通知由 Expo 及 Apple 或 Google 推播服務投遞，它們會處理權杖、通知內容及投遞中繼資料。內容取決於 Gateway 產生的通知，可能包含工作區或任務資訊。關閉通知會嘗試向 Gateway 取消權杖註冊，並取消應用程式的推播註冊；無法連線的 Gateway 可能仍保留紀錄。你也可以在系統設定中關閉通知。",
        ],
      },
      {
        title: "更新、主題及網站請求",
        paragraphs: [
          "啟用線上更新的應用程式版本會連接 updates.muqun.dev 檢查及下載更新與版本說明。請求包含平台、更新頻道、組建相容性及版本識別碼等技術資訊；版本說明請求也包含所選語言。相容性識別碼描述應用程式組建，並非生物辨識指紋。Cloudflare 託管此基礎設施及網站，可處理提供服務所需的 IP 位址及請求中繼資料。",
          "瀏覽或匯入線上主題及其他遠端資源時，會連接 muqun.dev、GitHub 或你選擇的來源。這些網站會收到請求位址及一般連線中繼資料。下載的主題及資源儲存在本機。網站將外觀偏好儲存在瀏覽器本機儲存空間，可透過清除網站資料刪除。這些服務請求與終端機及代理程式連線相互獨立。",
        ],
      },
      {
        title: "保留、刪除及你的選擇",
        paragraphs: [
          "在應用程式中移除已儲存的 Gateway、SSH 主機，或清除語音配置，可刪除對應的連線紀錄。設定 → 儲存空間可清理支援的圖片快取及暫存副本，但不會清除全部應用程式資料、代理紀錄、憑證或已安裝主題。主題可在主題庫中管理。本機偏好與紀錄會保留至透過相應功能或應用程式資料管理方式修改或刪除。請勿僅依賴解除安裝來刪除 iOS 安全憑證項目。",
          "刪除本機紀錄、清理快取或解除安裝牧群，不會刪除 Gateway、代理程式、AI 服務商、轉寫服務或通知服務商的資料。支援的工作階段刪除請求會傳送至 Gateway，但不保證服務商或備份中的資料也被清除。請透過 Gateway 管理者管理遠端檔案、歷史與裝置權限，並依服務商政策請求刪除資料。權杖或 API 金鑰應向簽發方撤銷，才能失效。牧群不設定或保證這些服務的資料保留期限。",
        ],
      },
      {
        title: "支援、政策變更及聯絡",
        paragraphs: [
          "你聯絡 Osuki 尋求支援時，我們使用你提供的資訊來回覆。請勿傳送存取權杖、私有程式碼或未遮蔽敏感內容的紀錄。功能或服務變更時，我們可能修訂本政策，修訂日期見上方。如有隱私問題，請聯絡：",
        ],
      },
    ],
  },
  ja: {
    intro:
      "本ポリシーは牧群のモバイルアプリとウェブサイトに適用されます。牧群は利用者が管理する Gateway に接続します。牧群アカウント、広告、広告目的の追跡はありません。任意の AI・音声サービスは、以下のとおりデータを処理します。",
    sections: [
      {
        title: "端末内のデータ",
        paragraphs: [
          "牧群は Gateway の名前、アドレス、ペアリング情報と認証情報、設定した SSH 接続情報と認証情報、設定とクイックコマンド、エージェント・プロジェクト情報、セッション一覧とタスク記録、テーマ、フォント、ダウンロードした素材を保存します。使用中は会話とターミナルの内容もメモリに保持します。選択したファイル、画像、録音には一時的なローカルコピーが作られる場合があります。",
          "Gateway と SSH の認証情報は暗号化され、OS の安全な認証情報ストレージに保存されます。API キーを含む音声設定も同じ安全なストレージを使い、iOS では端末専用のアクセス属性を設定します。他の設定、記録、ファイルは通常のアプリ領域に保存され、バックアップ動作は OS によります。すべてが認証情報と同じ方法で保護・削除されるわけではありません。",
        ],
      },
      {
        title: "Gateway、エージェント、AI 提供者",
        paragraphs: [
          "ターミナルとエージェントは、Osuki の中継を経由せず、ペアリングした Gateway に接続します。Gateway は操作に必要な認証情報、ワークスペース・セッション識別子、コマンド、プロンプト、添付ファイルなどを受信し、出力、会話、ツールの結果を返します。SSH を使う場合は、設定した SSH ホストも接続を処理します。",
          "コンピューター上のエージェントは、プロンプト、ファイル、コード、会話の文脈、ツールの結果を、設定された AI モデル提供者や接続先サービスに送信する場合があります。送信先は Gateway とエージェントの設定によって決まり、エージェントソフトウェア自体が最終提供者とは限りません。個人情報や機密情報を共有する前に各サービスのプライバシー・保持条件を確認してください。HTTPS または Tailscale など信頼できる暗号化ネットワークを使ってください。HTTP 単体では通信を暗号化しません。",
          "ペアリングでは端末名と端末内で生成したインストール識別子を Gateway に送信します。Gateway の通信暗号化が有効な場合、端末ごとの鍵で対応するアプリ・Gateway 間の要求と応答を保護しますが、Gateway は内容を読めます。管理者は暗号化を無効にでき、古いペアリングでは未対応の場合もあります。AI・音声サービスへの以後の接続は保護しません。アドレス手入力のペアリングでは、送信するコード自体はそのコードに基づく暗号化では保護されないため、HTTPS、SSH、Tailscale など信頼できる暗号化接続を使ってください。",
          "対応する環境では、エージェントのアカウント詳細を開くか制限情報を更新すると、Gateway に対してコンピューターで設定済みのアカウントの使用状況を要求します。アプリには使用量、上限、リセット時刻、プラン、クレジットなどの報告値を表示し、この機能のために提供者のログイン認証情報を求めません。これはアカウント全体のスナップショットで、Gateway が一時的にキャッシュする場合があり、完全な請求明細ではありません。",
        ],
      },
      {
        title: "カメラ、写真、ファイル",
        paragraphs: [
          "ペアリング用 QR コードのスキャン画像は端末内で処理され、保存・アップロードされません。Gateway アドレスの手入力も可能です。",
          "添付用の写真撮影や写真・ファイルの選択は異なります。選択後、メッセージを送る前に、牧群は選択した Gateway へのアップロードを開始します。ファイル内容、名前、種類などが含まれます。下書きから添付を外しても、届いたアップロードは取り消せません。メッセージ送信後、エージェントは添付を利用し、設定された提供者に渡す場合があります。",
          "会話の画像表示では Gateway からサムネイル、プレビュー、原画像を取得する場合があります。画像を開く・保存する際は Gateway の対応状況に応じて原画像をダウンロードします。アップロード用の選択画像は縮小される場合もあります。表示・復号した画像はメモリ、画像キャッシュ、一時ファイルに残る場合があるため、通信暗号化は端末内コピーがないことを意味しません。写真、ファイル、共有先への保存はアプリのキャッシュ外に別のコピーを作るため、その場所で管理してください。",
        ],
      },
      {
        title: "任意の音声文字起こし",
        paragraphs: [
          "音声が送信されるのは、設定画面で文字起こしサービスを設定し、マイクを許可して音声入力を自ら利用するときだけです。標準プリセットは OpenAI を指定し、互換性のある独自サービスにも変更できます。ファイルモードでは録音終了時に一時録音を直接送信し、リアルタイムモードでは録音中に音声を直接ストリーミングします。設定に応じてモデル、言語、API キーも送信します。この接続は Gateway や Osuki の中継を経由しません。",
          "返された文字は編集用の下書きに入り、送信は利用者が行います。その時点で音声はすでにサービスに共有されています。キャンセルは以後の録音・リクエストを止めますが、送信済み音声は取り消せません。牧群は完了・キャンセル時に一時録音の削除を試みますが、処理中断でコピーが残る場合があります。音声の利用停止、設定の削除、OS 設定でのマイク許可の撤回が可能です。提供者による保持・削除は各社の条件に従います。",
        ],
      },
      {
        title: "アプリロック",
        paragraphs: [
          "アプリロックの生体認証・パスコード認証は OS が行います。牧群が受け取るのは結果のみで、生体情報やパスコードは受け取りません。",
        ],
      },
      {
        title: "任意の通知",
        paragraphs: [
          "通知を有効にすると、牧群は Expo プッシュトークンを登録し、端末名、プラットフォーム、言語とともに Gateway に送信します。配信には Expo と Apple または Google のプッシュサービスが使われ、トークン、通知内容、配信メタデータを処理します。内容は Gateway が生成し、ワークスペースやタスクの情報を含む場合があります。通知を無効にすると、Gateway からのトークン登録解除を試み、アプリのプッシュ登録を解除します。Gateway に接続できない場合は記録が残ることがあります。OS 設定でも通知を無効にできます。",
        ],
      },
      {
        title: "更新、テーマ、ウェブへの接続",
        paragraphs: [
          "オンライン更新が有効なビルドは updates.muqun.dev に接続し、更新とリリースノートを確認・ダウンロードします。リクエストにはプラットフォーム、更新チャネル、ビルド互換性・リリース識別子などが含まれ、リリースノートには選択した言語も含まれます。互換性識別子はアプリビルドを示すもので、生体指紋ではありません。Cloudflare がこの基盤とウェブサイトをホストし、配信に必要な IP アドレスとリクエストメタデータを処理する場合があります。",
          "オンラインテーマや外部素材の閲覧・読み込みでは、muqun.dev、GitHub、または選択した配信元に接続します。配信元は要求されたアドレスと通常の接続メタデータを受け取ります。素材は端末に保存されます。ウェブサイトは表示設定をブラウザのローカルストレージに保存し、サイトデータの消去で削除できます。これらの接続はターミナル・エージェント接続とは別です。",
        ],
      },
      {
        title: "保持、削除、選択肢",
        paragraphs: [
          "保存した Gateway・SSH ホストの削除や音声設定の消去により、該当する接続記録を削除できます。「設定 → ストレージ」は対象の画像キャッシュと一時コピーを消去しますが、すべてのアプリデータ、エージェント記録、認証情報、インストール済みテーマは削除しません。テーマはライブラリで管理できます。設定と記録は対応機能やアプリデータ管理で変更・削除するまで残ります。iOS の安全な認証情報の削除をアンインストールだけに頼らないでください。",
          "ローカル記録やキャッシュの削除、アンインストールでは Gateway、エージェント、AI・文字起こし・通知提供者のデータは削除されません。対応するセッション削除要求は Gateway に送信されますが、提供者やバックアップからの消去は保証しません。遠隔ファイル、履歴、端末権限は Gateway 管理者と管理し、提供者の方針に沿って削除を依頼してください。トークンや API キーは発行元で失効させてください。牧群は各サービスの保持期間を定めたり保証したりしません。",
        ],
      },
      {
        title: "サポート、改定、連絡先",
        paragraphs: [
          "Osuki にサポートを求める際の情報は回答に使用します。トークン、非公開コード、機密情報を除去していないログは送らないでください。機能やサービスの変更に伴い本ポリシーを改定する場合があります。改定日は上部に表示します。プライバシーに関するお問い合わせ：",
        ],
      },
    ],
  },
  ko: {
    intro:
      "이 정책은 목군 모바일 앱과 웹사이트에 적용됩니다. 목군은 사용자가 관리하는 Gateway에 연결됩니다. 목군 계정, 광고, 광고 목적 추적은 없습니다. 선택 사항인 AI 및 음성 서비스는 아래와 같이 데이터를 처리합니다.",
    sections: [
      {
        title: "기기에 저장되는 데이터",
        paragraphs: [
          "목군은 Gateway 이름, 주소, 페어링 정보와 자격 증명, 설정된 SSH 연결 정보와 자격 증명, 환경 설정과 빠른 명령, 에이전트·프로젝트 정보, 세션 목록과 작업 기록, 테마, 글꼴 및 다운로드한 리소스를 저장합니다. 사용 중 대화와 터미널 내용은 메모리에도 보관됩니다. 선택한 파일, 이미지 및 녹음의 임시 로컬 사본이 만들어질 수 있습니다.",
          "Gateway와 SSH 자격 증명은 암호화되어 운영체제의 보안 자격 증명 저장소에 저장됩니다. API 키를 포함한 음성 설정도 보안 저장소를 사용하며, iOS에서는 이 기기 전용 접근 속성을 사용합니다. 다른 설정, 기록 및 파일은 일반 앱 저장소를 사용하며 백업 동작은 운영체제에 따라 다릅니다. 모든 데이터의 보호·삭제 방식이 자격 증명과 같지는 않습니다.",
        ],
      },
      {
        title: "Gateway, 에이전트 및 AI 제공업체",
        paragraphs: [
          "터미널과 에이전트는 Osuki 중계 없이 페어링한 Gateway에 연결됩니다. Gateway는 작업에 필요한 자격 증명, 작업 공간·세션 식별자, 명령, 프롬프트, 첨부 파일 등을 받고 터미널 출력, 대화 및 도구 결과를 반환합니다. SSH를 사용하면 설정한 SSH 호스트도 연결을 처리합니다.",
          "컴퓨터의 에이전트는 프롬프트, 파일, 코드, 대화 맥락 및 도구 결과를 설정된 AI 모델 제공업체나 연결된 서비스에 보낼 수 있습니다. 수신자는 Gateway 및 에이전트 설정에 따라 달라지며, 에이전트 소프트웨어가 최종 제공업체와 같지는 않을 수 있습니다. 개인·기밀 정보를 공유하기 전에 해당 서비스의 개인정보 및 보관 조건을 확인하세요. HTTPS 또는 Tailscale 같은 신뢰할 수 있는 암호화 사설망을 사용하세요. HTTP 자체는 통신을 암호화하지 않습니다.",
          "페어링은 기기 이름과 로컬에서 생성한 설치 식별자를 Gateway에 보냅니다. Gateway 통신 암호화를 켜면 기기별 키로 지원되는 앱·Gateway 요청과 응답을 보호하지만 Gateway는 내용을 읽을 수 있습니다. 관리자가 암호화를 끌 수 있고 이전 페어링에는 없을 수 있습니다. 이후 AI·음성 서비스 연결까지 보호하지는 않습니다. 주소 직접 입력 페어링에서 제출하는 코드 자체는 그 코드 기반 암호화로 보호되지 않으므로 HTTPS 또는 SSH, Tailscale 같은 신뢰할 수 있는 암호화 연결을 사용하세요.",
          "지원되는 환경에서 에이전트 계정 세부 정보를 열거나 계정 한도를 새로 고치면 Gateway에 컴퓨터에 구성된 에이전트 계정의 사용량 조회를 요청합니다. 앱은 사용량, 한도, 초기화 시각, 요금제 또는 크레딧 보고값을 표시하며 이 기능을 위해 제공업체 로그인 자격 증명을 요구하지 않습니다. 계정 전체의 스냅샷으로 Gateway가 잠시 캐시할 수 있으며 완전한 청구 내역은 아닙니다.",
        ],
      },
      {
        title: "카메라, 사진 및 파일",
        paragraphs: [
          "페어링 QR 코드를 스캔하는 카메라 화면은 기기에서 처리되며 저장하거나 업로드하지 않습니다. Gateway 주소를 직접 입력할 수도 있습니다.",
          "첨부 사진 촬영이나 사진·파일 선택은 다릅니다. 선택 후 메시지를 보내기 전에 선택한 Gateway로 업로드가 시작됩니다. 파일 내용과 이름·유형 같은 정보가 포함됩니다. 초안에서 첨부 파일을 제거해도 Gateway에 도착한 업로드는 회수되지 않습니다. 메시지를 보내면 에이전트가 첨부 파일을 사용하며 설정된 제공업체에 전달할 수 있습니다.",
          "대화 이미지를 볼 때 Gateway에서 썸네일, 미리보기 또는 원본을 가져올 수 있습니다. 이미지를 열거나 저장하면 Gateway 지원에 따라 원본을 다운로드할 수 있으며 업로드 이미지도 크기가 조정될 수 있습니다. 표시·복호화한 이미지는 메모리, 이미지 캐시 또는 임시 파일에 저장될 수 있어 통신 암호화가 로컬 사본 부재를 의미하지 않습니다. 사진, 파일 또는 공유 대상으로 저장하면 앱 캐시 밖에 별도 사본이 생기므로 해당 위치에서 관리해야 합니다.",
        ],
      },
      {
        title: "선택 사항인 음성 변환",
        paragraphs: [
          "음성은 설정에서 변환 서비스를 구성하고 마이크 권한을 허용한 뒤 직접 음성 입력을 사용할 때만 전송됩니다. 기본 프리셋은 OpenAI를 가리키며 호환되는 사용자 지정 서비스를 선택할 수 있습니다. 파일 모드에서는 녹음이 끝나면 임시 녹음 파일을 서비스에 직접 전송합니다. 실시간 모드에서는 녹음 중 음성을 직접 스트리밍합니다. 설정에 따라 모델, 언어 및 API 키도 전송합니다. 이 연결은 Gateway나 Osuki 중계를 거치지 않습니다.",
          "반환된 텍스트는 편집할 수 있도록 초안에 들어가며 사용자가 전송합니다. 이때 음성은 이미 서비스에 공유되었습니다. 취소하면 추가 녹음과 요청은 중단되지만 전송된 음성은 회수할 수 없습니다. 목군은 완료·취소 시 임시 녹음 삭제를 시도하며, 정리 중단 시 사본이 남을 수 있습니다. 음성 사용을 중단하거나 설정을 지우거나 시스템 설정에서 마이크 권한을 철회할 수 있습니다. 제공업체의 보관·삭제에는 해당 서비스 약관이 적용됩니다.",
        ],
      },
      {
        title: "앱 잠금",
        paragraphs: [
          "앱 잠금 사용 시 운영체제가 생체 인증이나 암호 인증을 수행합니다. 목군은 인증 결과만 받으며 생체 정보나 암호는 받지 않습니다.",
        ],
      },
      {
        title: "선택 사항인 알림",
        paragraphs: [
          "알림을 켜면 Expo 푸시 토큰을 등록하고 기기 이름, 플랫폼 및 언어와 함께 Gateway에 보냅니다. Expo 및 Apple 또는 Google 푸시 서비스가 토큰, 알림 내용 및 전달 메타데이터를 처리하여 알림을 전달합니다. Gateway가 생성한 알림에는 작업 공간이나 작업 정보가 포함될 수 있습니다. 알림을 끄면 Gateway의 토큰 등록 해제를 시도하고 앱의 푸시 등록을 해제합니다. 연결할 수 없는 Gateway에는 기록이 남을 수 있습니다. 시스템 설정에서도 알림을 끌 수 있습니다.",
        ],
      },
      {
        title: "업데이트, 테마 및 웹 요청",
        paragraphs: [
          "온라인 업데이트를 지원하는 빌드는 updates.muqun.dev에서 업데이트와 릴리스 노트를 확인하고 다운로드합니다. 요청에는 플랫폼, 업데이트 채널, 빌드 호환성 및 릴리스 식별자 같은 기술 정보가 포함되며 릴리스 노트 요청에는 선택한 언어도 포함됩니다. 호환성 식별자는 앱 빌드를 설명하며 생체 지문이 아닙니다. Cloudflare가 이 인프라와 웹사이트를 호스팅하고 서비스 제공에 필요한 IP 주소 및 요청 메타데이터를 처리할 수 있습니다.",
          "온라인 테마나 원격 리소스를 탐색·가져오면 muqun.dev, GitHub 또는 선택한 출처에 연결됩니다. 해당 호스트는 요청한 주소와 일반 연결 메타데이터를 받습니다. 다운로드한 리소스는 로컬에 저장됩니다. 웹사이트는 브라우저 로컬 저장소에 화면 설정을 저장하며 사이트 데이터 삭제로 지울 수 있습니다. 이 요청은 터미널·에이전트 연결과 별개입니다.",
        ],
      },
      {
        title: "보관, 삭제 및 선택",
        paragraphs: [
          "앱에서 저장된 Gateway와 SSH 호스트를 제거하고 음성 설정을 지우면 해당 연결 기록이 삭제됩니다. 설정 → 저장 공간에서는 지원되는 이미지 캐시와 임시 사본을 지울 수 있지만 모든 앱 데이터, 에이전트 기록, 자격 증명 또는 설치된 테마를 삭제하지는 않습니다. 테마는 테마 라이브러리에서 관리할 수 있습니다. 로컬 설정과 기록은 해당 기능이나 앱 데이터 관리로 변경·삭제할 때까지 남습니다. iOS 보안 자격 증명 삭제를 앱 제거에만 의존하지 마세요.",
          "로컬 기록이나 캐시 삭제, 앱 제거는 Gateway, 에이전트, AI·음성 변환·알림 제공업체의 데이터를 삭제하지 않습니다. 지원되는 세션 삭제 요청은 Gateway에 전달되지만 제공업체나 백업의 삭제를 보장하지 않습니다. 원격 파일, 기록 및 기기 접근 권한은 Gateway 운영자와 관리하고 제공업체 정책에 따라 삭제를 요청하세요. 토큰이나 API 키는 발급처에서 취소해야 무효화됩니다. 목군은 해당 서비스의 보관 기간을 정하거나 보장하지 않습니다.",
        ],
      },
      {
        title: "지원, 변경 및 연락처",
        paragraphs: [
          "Osuki에 지원을 요청하면 제공한 정보를 답변에 사용합니다. 접근 토큰, 비공개 코드 또는 민감 정보를 가리지 않은 로그를 보내지 마세요. 기능이나 서비스 변경에 따라 정책을 수정할 수 있으며 수정일은 위에 표시됩니다. 개인정보 관련 문의:",
        ],
      },
    ],
  },
  de: {
    intro:
      "Diese Richtlinie gilt für die mobile Muqun-App und die Website. Muqun verbindet sich mit einem Gateway, das du verwaltest. Es gibt kein Muqun-Konto, keine Werbung und kein Werbetracking. Optionale KI- und Sprachdienste verarbeiten Daten wie unten beschrieben.",
    sections: [
      {
        title: "Daten auf deinem Gerät",
        paragraphs: [
          "Muqun speichert Gateway-Namen, Adressen, Kopplungsdaten und Zugangsdaten; eingerichtete SSH-Verbindungen samt Zugangsdaten; Einstellungen und Kurzbefehle; Agenten- und Projektinformationen, Sitzungslisten und Aufgabeneinträge; Themes, Schriften und heruntergeladene Dateien. Gesprächs- und Terminalinhalte werden während der Nutzung auch im Arbeitsspeicher gehalten. Für ausgewählte Dateien, Bilder und Aufnahmen können temporäre lokale Kopien entstehen.",
          "Gateway- und SSH-Zugangsdaten werden verschlüsselt im sicheren Anmeldedatenspeicher des Betriebssystems abgelegt. Spracheinstellungen einschließlich API-Schlüssel nutzen ebenfalls diesen Speicher. Unter iOS sind diese Einträge als gerätegebunden konfiguriert. Andere Einstellungen, Einträge und Dateien liegen im gewöhnlichen App-Speicher; ihr Sicherungsverhalten hängt vom Betriebssystem ab. Sie werden nicht alle wie Zugangsdaten geschützt oder gelöscht.",
        ],
      },
      {
        title: "Dein Gateway, Agenten und KI-Anbieter",
        paragraphs: [
          "Terminal- und Agentenverbindungen gehen ohne Osuki-Relay an dein gekoppeltes Gateway. Es erhält die für deine Aktionen nötigen Zugangsdaten, Arbeitsbereichs- und Sitzungskennungen, Befehle, Prompts, Anhänge und weitere Inhalte und liefert Terminalausgaben, Gespräche und Werkzeugergebnisse zurück. Bei SSH verarbeitet auch der eingerichtete SSH-Host die Verbindung.",
          "Ein Agent auf deinem Rechner kann Prompts, Dateien, Code, Gesprächskontext und Werkzeugergebnisse an seinen konfigurierten KI-Modellanbieter oder andere verbundene Dienste senden. Die Empfänger hängen von deiner Gateway- und Agentenkonfiguration ab; die Agentensoftware ist nicht unbedingt der endgültige Anbieter. Prüfe Datenschutz- und Aufbewahrungsbedingungen, bevor du persönliche oder vertrauliche Informationen teilst. Nutze HTTPS oder ein vertrauenswürdiges verschlüsseltes Netz wie Tailscale. HTTP allein verschlüsselt den Datenverkehr nicht.",
          "Bei der Kopplung gehen Gerätename und eine lokal erzeugte Installationskennung an das Gateway. Bei aktivierter Gateway-Transportverschlüsselung schützen gerätespezifische Schlüssel unterstützte Anfragen und Antworten zwischen App und Gateway; das Gateway kann die Inhalte weiterhin lesen. Betreiber können die Verschlüsselung abschalten, ältere Kopplungen können sie nicht besitzen. Sie schützt nicht die Weiterverbindungen zu KI- oder Sprachdiensten. Bei manueller Adresskopplung schützt die codebasierte Verschlüsselung den übermittelten Code selbst nicht. Nutze deshalb HTTPS oder eine vertrauenswürdige verschlüsselte Verbindung wie SSH oder Tailscale.",
          "Wo unterstützt, fragt das Öffnen der Agentenkontodetails oder Aktualisieren der Kontolimits beim Gateway einen Nutzungsschnappschuss des auf deinem Rechner eingerichteten Agentenkontos ab. Die App zeigt gemeldete Nutzung, Limits, Rücksetzzeiten, Tarif- oder Guthabenangaben; sie verlangt dafür keine Anmeldedaten des Anbieters. Es sind kontoweite Momentaufnahmen, die das Gateway kurz zwischenspeichern kann, keine vollständige Abrechnung.",
        ],
      },
      {
        title: "Kamera, Fotos und Dateien",
        paragraphs: [
          "Beim Scannen eines Kopplungs-QR-Codes werden Kamerabilder auf dem Gerät verarbeitet und weder gespeichert noch hochgeladen. Du kannst die Gateway-Adresse auch manuell eingeben.",
          "Das Aufnehmen eines Anhangfotos oder Auswählen von Fotos und Dateien funktioniert anders: Nach der Auswahl beginnt Muqun den Upload zum gewählten Gateway, bevor du die Nachricht sendest. Übertragen werden Dateiinhalte und Angaben wie Name und Typ. Entfernen aus dem Entwurf ruft einen bereits angekommenen Upload nicht zurück. Mit dem Senden erhält der Agent Zugriff auf den Anhang und kann ihn an seine konfigurierten Anbieter weitergeben.",
          "Beim Anzeigen von Gesprächsbildern können Vorschaubilder oder Originale vom Gateway geladen werden. Öffnen oder Speichern kann je nach Gateway-Unterstützung das Original herunterladen; ausgewählte Upload-Bilder können vorher verkleinert werden. Angezeigte oder entschlüsselte Bilder können im Arbeitsspeicher, Bildcache oder temporären Dateien liegen. Transportverschlüsselung bedeutet daher nicht, dass es keine lokale Kopie gibt. Speichern in Fotos, Dateien oder einem Freigabeziel erzeugt eine separate Kopie außerhalb des App-Caches, die du dort verwalten musst.",
        ],
      },
      {
        title: "Optionale Sprachtranskription",
        paragraphs: [
          "Audio wird nur gesendet, wenn du einen Transkriptionsdienst in den Einstellungen einrichtest und die Spracheingabe mit Mikrofonberechtigung aktiv nutzt. Die Vorgaben verweisen auf OpenAI; du kannst einen kompatiblen eigenen Dienst wählen. Im Dateimodus wird die temporäre Aufnahme nach Aufnahmeende direkt an diesen Dienst gesendet. Im Echtzeitmodus wird Audio während der Aufnahme direkt gestreamt. Modell, Sprache und API-Schlüssel werden je nach Konfiguration mitgesendet. Diese Verbindung läuft weder über dein Gateway noch über ein Osuki-Relay.",
          "Der zurückgelieferte Text wird vor dem Senden zur Bearbeitung in den Entwurf eingefügt. Das Audio wurde zu diesem Zeitpunkt bereits geteilt. Abbrechen beendet weitere Aufnahmen und Anfragen, ruft aber gesendetes Audio nicht zurück. Muqun versucht, temporäre Aufnahmen nach Abschluss oder Abbruch zu löschen; unterbrochene Bereinigung kann Kopien hinterlassen. Du kannst die Spracheingabe nicht mehr nutzen, ihre Konfiguration löschen oder die Mikrofonberechtigung im System entziehen. Aufbewahrung und Löschung beim Anbieter richten sich nach dessen Bedingungen.",
        ],
      },
      {
        title: "App-Sperre",
        paragraphs: [
          "Bei aktivierter App-Sperre übernimmt das Betriebssystem die biometrische oder Code-Authentifizierung. Muqun erhält das Ergebnis, nicht deine biometrischen Daten oder deinen Code.",
        ],
      },
      {
        title: "Optionale Mitteilungen",
        paragraphs: [
          "Bei aktivierten Mitteilungen registriert Muqun ein Expo-Push-Token und sendet es mit Gerätename, Plattform und Sprache an dein Gateway. Die Zustellung nutzt Expo und die Push-Dienste von Apple oder Google, die Token, Mitteilungsinhalte und Zustellmetadaten verarbeiten. Vom Gateway erzeugte Inhalte können Arbeitsbereichs- oder Aufgabeninformationen enthalten. Beim Ausschalten versucht Muqun, das Token beim Gateway abzumelden, und hebt die Push-Registrierung der App auf. Ein unerreichbares Gateway kann seinen Eintrag behalten. Du kannst Mitteilungen auch im System ausschalten.",
        ],
      },
      {
        title: "Updates, Themes und Website-Anfragen",
        paragraphs: [
          "App-Builds mit aktivierten Online-Updates kontaktieren updates.muqun.dev zum Prüfen und Laden von Updates und Versionshinweisen. Anfragen enthalten technische Angaben wie Plattform, Update-Kanal, Build-Kompatibilität und Release-Kennungen; für Versionshinweise auch die gewählte Sprache. Die Kompatibilitätskennung beschreibt den App-Build und ist kein biometrischer Fingerabdruck. Cloudflare hostet diese Infrastruktur und die Website und kann IP-Adressen sowie erforderliche Anfragemetadaten verarbeiten.",
          "Beim Durchsuchen oder Importieren von Online-Themes und anderen externen Dateien werden muqun.dev, GitHub oder deine gewählte Quelle kontaktiert. Diese Hosts erhalten die angefragte Adresse und übliche Verbindungsmetadaten. Downloads werden lokal gespeichert. Die Website speichert deine Darstellungseinstellung im lokalen Browserspeicher; du kannst sie mit den Website-Daten löschen. Diese Anfragen sind von Terminal- und Agentenverbindungen getrennt.",
        ],
      },
      {
        title: "Aufbewahrung, Löschung und deine Möglichkeiten",
        paragraphs: [
          "Entferne gespeicherte Gateways und SSH-Hosts in der App und lösche die Sprachkonfiguration, um die jeweiligen Verbindungsdatensätze zu entfernen. Einstellungen → Speicher leert unterstützte Bildcaches und temporäre Kopien, aber nicht sämtliche App-Daten, Agenteneinträge, Zugangsdaten oder installierte Themes. Themes verwaltest du in der Bibliothek. Lokale Einstellungen und Einträge bleiben bis zur Änderung oder Löschung über die jeweilige Funktion oder App-Datenverwaltung bestehen. Verlasse dich zum Löschen sicherer iOS-Zugangsdaten nicht allein auf die Deinstallation.",
          "Lokales Löschen, Cache-Leeren und Deinstallieren löschen keine Daten beim Gateway, Agenten, KI-, Transkriptions- oder Mitteilungsanbieter. Unterstützte Anfragen zum Löschen von Sitzungen gehen an das Gateway; dies garantiert keine Löschung bei Anbietern oder in Sicherungen. Verwalte entfernte Dateien, Verläufe und Gerätezugriff mit dem Gateway-Betreiber und beantrage Anbieter-Löschungen nach deren Richtlinien. Widerrufe Tokens und API-Schlüssel beim Aussteller, um sie ungültig zu machen. Muqun bestimmt oder garantiert keine Aufbewahrungsfristen dieser Dienste.",
        ],
      },
      {
        title: "Support, Änderungen und Kontakt",
        paragraphs: [
          "Wenn du Osuki um Unterstützung bittest, nutzen wir deine Angaben zur Antwort. Sende keine Zugangstokens, privaten Code oder unbereinigten Protokolle. Bei Änderungen an Funktionen oder Diensten können wir diese Richtlinie überarbeiten; das Datum steht oben. Fragen zum Datenschutz an:",
        ],
      },
    ],
  },
  fr: {
    intro:
      "Cette politique couvre l’application mobile Muqun et son site web. Muqun se connecte à un Gateway que vous contrôlez. Il n’y a ni compte Muqun, ni publicité, ni suivi publicitaire. Les services facultatifs d’IA et de transcription traitent les données comme indiqué ci-dessous.",
    sections: [
      {
        title: "Données sur votre appareil",
        paragraphs: [
          "Muqun conserve les noms, adresses, informations de jumelage et identifiants des Gateway ; les connexions SSH configurées et leurs identifiants ; les préférences et commandes rapides ; les informations d’agents et de projets, listes de sessions et enregistrements de tâches ; les thèmes, polices et ressources téléchargées. Les conversations et contenus du terminal sont aussi gardés en mémoire pendant leur utilisation. Les fichiers, images et enregistrements peuvent produire des copies locales temporaires.",
          "Les identifiants Gateway et SSH sont chiffrés dans le stockage sécurisé du système. Les paramètres vocaux, dont la clé API, utilisent aussi ce stockage, avec un accès limité à cet appareil sous iOS. Les autres préférences, enregistrements et fichiers utilisent le stockage ordinaire de l’application ; leur sauvegarde dépend du système. Leur protection et leur suppression ne sont pas toutes identiques à celles des identifiants.",
        ],
      },
      {
        title: "Votre Gateway, vos agents et les fournisseurs d’IA",
        paragraphs: [
          "Les connexions au terminal et aux agents passent par votre Gateway jumelé, sans relais Osuki. Le Gateway reçoit les identifiants, références d’espace de travail et de session, commandes, prompts, pièces jointes et autres contenus nécessaires à vos actions, puis renvoie les sorties du terminal, conversations et résultats d’outils. Si vous utilisez SSH, l’hôte SSH configuré traite aussi la connexion.",
          "Un agent sur votre ordinateur peut envoyer les prompts, fichiers, code, contexte des conversations et résultats d’outils à son fournisseur de modèle d’IA ou à d’autres services connectés. Les destinataires dépendent de la configuration du Gateway et de l’agent ; le logiciel agent n’est pas nécessairement le fournisseur final. Consultez leurs conditions de confidentialité et de conservation avant de partager des données personnelles ou confidentielles. Utilisez HTTPS ou un réseau privé chiffré de confiance tel que Tailscale. HTTP seul ne chiffre pas le trafic.",
          "Le jumelage transmet au Gateway le nom de l’appareil et un identifiant d’installation généré localement. Si le chiffrement du transport Gateway est actif, des clés propres à l’appareil protègent les requêtes et réponses prises en charge entre l’application et le Gateway ; celui-ci peut toujours lire le contenu. L’opérateur peut désactiver ce chiffrement, absent de certains anciens jumelages. Il ne protège pas les connexions suivantes aux services d’IA ou de voix. En jumelage par adresse manuelle, le code envoyé n’est pas lui-même protégé par le chiffrement fondé sur ce code ; utilisez HTTPS ou une connexion chiffrée de confiance comme SSH ou Tailscale.",
          "Si la fonction est disponible, ouvrir les détails du compte agent ou actualiser ses limites demande au Gateway un aperçu de l’utilisation du compte configuré sur votre ordinateur. L’application affiche utilisation, limites, réinitialisations, formule ou crédits rapportés, sans demander les identifiants du fournisseur pour cette fonction. Ces aperçus concernent tout le compte et peuvent être brièvement mis en cache par le Gateway ; ce ne sont pas des relevés de facturation complets.",
        ],
      },
      {
        title: "Appareil photo, photos et fichiers",
        paragraphs: [
          "Les images du lecteur de QR de jumelage sont traitées sur l’appareil, sans être enregistrées ni envoyées. Vous pouvez saisir l’adresse du Gateway manuellement.",
          "Prendre une photo en pièce jointe ou choisir des photos ou fichiers fonctionne autrement : dès la sélection, Muqun commence leur envoi au Gateway choisi, avant l’envoi du message. Le contenu, le nom et le type du fichier sont inclus. Retirer une pièce jointe du brouillon ne rappelle pas un envoi déjà reçu. Envoyer le message rend la pièce jointe accessible à l’agent, qui peut la transmettre à ses fournisseurs configurés.",
          "Afficher des images de conversation peut charger miniatures, aperçus ou originaux depuis le Gateway. Ouvrir ou enregistrer une image peut télécharger l’original selon les capacités du Gateway ; les images choisies pour envoi peuvent être redimensionnées. Les images affichées ou déchiffrées peuvent rester en mémoire, dans les caches ou des fichiers temporaires : le chiffrement du transport n’exclut pas les copies locales. Enregistrer dans Photos, Fichiers ou une destination de partage crée une copie hors du cache de l’application, à gérer dans cette destination.",
        ],
      },
      {
        title: "Transcription vocale facultative",
        paragraphs: [
          "L’audio n’est envoyé que si vous configurez un service de transcription dans les réglages et utilisez activement la saisie vocale avec l’autorisation du microphone. Les préréglages utilisent OpenAI ; vous pouvez choisir un service personnalisé compatible. En mode fichier, l’enregistrement temporaire est envoyé directement au service à la fin de l’enregistrement. En temps réel, l’audio est diffusé directement pendant l’enregistrement. Le modèle, la langue et la clé API sont aussi transmis selon la configuration. Cette connexion ne passe ni par votre Gateway ni par un relais Osuki.",
          "La transcription est insérée dans votre brouillon pour modification avant l’envoi. L’audio a déjà été partagé à ce stade. Annuler arrête la suite de l’enregistrement et des requêtes, mais ne rappelle pas l’audio transmis. Muqun tente de supprimer le fichier temporaire à la fin ou à l’annulation ; une interruption du nettoyage peut laisser une copie locale. Vous pouvez cesser d’utiliser la voix, supprimer sa configuration ou retirer l’autorisation du microphone dans le système. La conservation et la suppression chez le fournisseur suivent ses conditions.",
        ],
      },
      {
        title: "Verrouillage de l’application",
        paragraphs: [
          "Le système effectue l’authentification biométrique ou par code lorsque le verrouillage est activé. Muqun reçoit le résultat, pas vos données biométriques ni votre code.",
        ],
      },
      {
        title: "Notifications facultatives",
        paragraphs: [
          "Si les notifications sont activées, Muqun enregistre un jeton push Expo et l’envoie au Gateway avec le nom de l’appareil, la plateforme et la langue. Expo et les services push Apple ou Google traitent le jeton, le contenu et les métadonnées de livraison. Le contenu généré par le Gateway peut inclure des informations d’espace de travail ou de tâche. La désactivation tente de désinscrire le jeton du Gateway et désinscrit l’application du push ; un Gateway inaccessible peut conserver son enregistrement. Vous pouvez aussi désactiver les notifications dans le système.",
        ],
      },
      {
        title: "Mises à jour, thèmes et requêtes web",
        paragraphs: [
          "Les versions avec mises à jour en ligne contactent updates.muqun.dev pour vérifier et télécharger les mises à jour et leurs notes. Les requêtes contiennent notamment la plateforme, le canal, la compatibilité de compilation et les identifiants de version ; les notes incluent aussi la langue choisie. L’identifiant de compatibilité décrit la compilation de l’application, pas une empreinte biométrique. Cloudflare héberge cette infrastructure et le site, et peut traiter les adresses IP et métadonnées nécessaires aux requêtes.",
          "Parcourir ou importer des thèmes et ressources en ligne contacte muqun.dev, GitHub ou la source choisie. Ces hôtes reçoivent l’adresse demandée et les métadonnées habituelles de connexion. Les ressources téléchargées sont stockées localement. Le site conserve votre préférence d’apparence dans le stockage local du navigateur ; vous pouvez l’effacer avec les données du site. Ces requêtes sont distinctes des connexions au terminal et aux agents.",
        ],
      },
      {
        title: "Conservation, suppression et vos choix",
        paragraphs: [
          "Retirez les Gateway et hôtes SSH enregistrés et effacez la configuration vocale pour supprimer leurs fiches de connexion. Réglages → Stockage permet de vider les caches d’images et copies temporaires pris en charge, mais pas toutes les données, fiches d’agents, identifiants ou thèmes installés. Gérez les thèmes dans la bibliothèque. Préférences et enregistrements locaux restent jusqu’à leur modification ou suppression via la fonction concernée ou la gestion des données de l’application. Ne comptez pas uniquement sur la désinstallation pour effacer les identifiants sécurisés iOS.",
          "Effacer un enregistrement local ou un cache, ou désinstaller Muqun, ne supprime pas les données du Gateway, de l’agent ou des fournisseurs d’IA, de transcription ou de notifications. Les demandes de suppression de session prises en charge sont envoyées au Gateway sans garantir l’effacement chez les fournisseurs ou dans les sauvegardes. Gérez fichiers distants, historiques et accès avec l’opérateur du Gateway et demandez la suppression aux fournisseurs selon leurs politiques. Révoquez jetons et clés API à la source pour les invalider. Muqun ne fixe ni ne garantit leurs durées de conservation.",
        ],
      },
      {
        title: "Assistance, modifications et contact",
        paragraphs: [
          "Si vous contactez Osuki, les informations fournies servent à vous répondre. N’envoyez pas de jetons d’accès, de code privé ni de journaux non expurgés. Cette politique peut évoluer avec les fonctions ou services ; sa date figure ci-dessus. Pour toute question de confidentialité, écrivez à :",
        ],
      },
    ],
  },
  es: {
    intro:
      "Esta política cubre la aplicación móvil Muqun y su sitio web. Muqun se conecta a un Gateway que tú controlas. No hay cuenta de Muqun, publicidad ni seguimiento publicitario. Los servicios opcionales de IA y voz procesan los datos como se explica a continuación.",
    sections: [
      {
        title: "Datos en tu dispositivo",
        paragraphs: [
          "Muqun guarda nombres, direcciones, datos de vinculación y credenciales de Gateway; conexiones SSH configuradas y sus credenciales; preferencias y comandos rápidos; información de agentes y proyectos, listas de sesiones y registros de tareas; temas, fuentes y recursos descargados. Las conversaciones y el contenido del terminal también permanecen en memoria durante su uso. Los archivos, imágenes y grabaciones pueden generar copias locales temporales.",
          "Las credenciales de Gateway y SSH se cifran en el almacén seguro del sistema operativo. La configuración de voz, incluida la clave API, también usa ese almacén con acceso limitado al dispositivo en iOS. Las demás preferencias, registros y archivos usan almacenamiento normal de la aplicación; las copias de seguridad dependen del sistema. No todos se protegen ni eliminan del mismo modo que las credenciales.",
        ],
      },
      {
        title: "Tu Gateway, agentes y proveedores de IA",
        paragraphs: [
          "Las conexiones del terminal y los agentes van al Gateway vinculado, sin un intermediario de Osuki. El Gateway recibe credenciales, identificadores de espacio y sesión, comandos, instrucciones, adjuntos y otros contenidos necesarios para tus acciones, y devuelve salidas del terminal, conversaciones y resultados de herramientas. Si usas SSH, el servidor SSH configurado también procesa la conexión.",
          "Un agente en tu ordenador puede enviar instrucciones, archivos, código, contexto de conversación y resultados de herramientas al proveedor de modelos de IA configurado o a otros servicios conectados. Los destinatarios dependen de tu configuración; el software del agente no es necesariamente el proveedor final. Revisa sus condiciones de privacidad y conservación antes de compartir información personal o confidencial. Usa HTTPS o una red privada cifrada de confianza como Tailscale. HTTP por sí solo no cifra el tráfico.",
          "La vinculación envía al Gateway el nombre del dispositivo y un identificador de instalación generado localmente. Con el cifrado de transporte Gateway activado, claves propias del dispositivo protegen las solicitudes y respuestas compatibles entre aplicación y Gateway; este puede leer el contenido. El operador puede desactivarlo y las vinculaciones antiguas pueden carecer de él. No protege las conexiones posteriores a servicios de IA o voz. En la vinculación por dirección manual, el código enviado no está protegido por el cifrado basado en ese mismo código; usa HTTPS o una conexión cifrada de confianza como SSH o Tailscale.",
          "Cuando se admite, abrir detalles de la cuenta del agente o actualizar los límites solicita al Gateway una instantánea de uso de la cuenta configurada en tu ordenador. La aplicación muestra uso, límites, reinicios, plan o créditos comunicados, sin pedir credenciales de acceso del proveedor para esta función. Son instantáneas de toda la cuenta que el Gateway puede guardar temporalmente en caché, no registros completos de facturación.",
        ],
      },
      {
        title: "Cámara, fotos y archivos",
        paragraphs: [
          "Al escanear el QR de vinculación, las imágenes se procesan en el dispositivo y no se guardan ni suben. También puedes introducir manualmente la dirección del Gateway.",
          "Hacer una foto adjunta o elegir fotos y archivos es distinto: tras seleccionarlos, Muqun comienza a subirlos al Gateway elegido antes de enviar el mensaje. Se incluyen el contenido, nombre y tipo del archivo. Quitar un adjunto del borrador no retira una subida ya recibida. Al enviar el mensaje, el agente puede usar el adjunto y pasarlo a sus proveedores configurados.",
          "Ver imágenes de conversaciones puede cargar miniaturas, vistas previas u originales del Gateway. Abrir o guardar una imagen puede descargar el original según las capacidades del Gateway; las imágenes elegidas para subir también pueden redimensionarse. Las imágenes mostradas o descifradas pueden quedar en memoria, cachés o archivos temporales: cifrar el transporte no evita las copias locales. Guardar en Fotos, Archivos o un destino compartido crea una copia fuera de la caché de la aplicación que debes gestionar allí.",
        ],
      },
      {
        title: "Transcripción de voz opcional",
        paragraphs: [
          "La voz solo se envía cuando configuras un servicio de transcripción en Ajustes y usas activamente la entrada de voz con permiso de micrófono. Los ajustes predefinidos apuntan a OpenAI; puedes elegir un servicio compatible propio. El modo archivo envía la grabación temporal directamente al servicio al terminar de grabar. El modo en tiempo real transmite audio directamente durante la grabación. Según la configuración, se incluyen modelo, idioma y clave API. La conexión no pasa por el Gateway ni por un intermediario de Osuki.",
          "La transcripción vuelve al borrador para editarla antes de enviarla. Para entonces el audio ya se ha compartido. Cancelar detiene nuevas grabaciones y solicitudes, pero no recupera el audio transmitido. Muqun intenta eliminar la grabación temporal al finalizar o cancelar; una limpieza interrumpida puede dejar una copia local. Puedes dejar de usar la voz, borrar su configuración o revocar el permiso del micrófono en el sistema. La conservación y eliminación por el proveedor siguen sus condiciones.",
        ],
      },
      {
        title: "Bloqueo de la aplicación",
        paragraphs: [
          "El sistema operativo realiza la autenticación biométrica o por código cuando activas el bloqueo. Muqun recibe el resultado, no tus datos biométricos ni tu código.",
        ],
      },
      {
        title: "Notificaciones opcionales",
        paragraphs: [
          "Al activar notificaciones, Muqun registra un token push de Expo y lo envía al Gateway con el nombre del dispositivo, plataforma e idioma. Expo y los servicios push de Apple o Google procesan el token, contenido y metadatos de entrega. El contenido generado por el Gateway puede incluir información de espacios o tareas. Al desactivarlas, Muqun intenta dar de baja el token en el Gateway y cancela el registro push de la aplicación; un Gateway inaccesible puede conservar su registro. También puedes desactivar notificaciones en el sistema.",
        ],
      },
      {
        title: "Actualizaciones, temas y solicitudes web",
        paragraphs: [
          "Las versiones con actualizaciones en línea contactan con updates.muqun.dev para comprobar y descargar actualizaciones y notas. Las solicitudes incluyen información técnica como plataforma, canal, compatibilidad de compilación e identificadores de versión; las notas también incluyen el idioma elegido. El identificador de compatibilidad describe la compilación, no una huella biométrica. Cloudflare aloja esta infraestructura y el sitio, y puede procesar direcciones IP y metadatos necesarios para atender solicitudes.",
          "Explorar o importar temas y recursos remotos contacta con muqun.dev, GitHub o la fuente elegida. Estos servidores reciben la dirección solicitada y metadatos normales de conexión. Las descargas se guardan localmente. El sitio guarda tu preferencia de apariencia en el almacenamiento local del navegador; puedes borrarla con los datos del sitio. Estas solicitudes son independientes de las conexiones del terminal y los agentes.",
        ],
      },
      {
        title: "Conservación, eliminación y tus opciones",
        paragraphs: [
          "Elimina los Gateway y servidores SSH guardados y borra la configuración de voz para quitar sus registros de conexión. Ajustes → Almacenamiento borra las cachés de imágenes y copias temporales admitidas, pero no todos los datos, registros de agentes, credenciales o temas instalados. Gestiona los temas en la biblioteca. Las preferencias y registros locales permanecen hasta cambiarlos o borrarlos mediante la función correspondiente o los controles de datos de la aplicación. No dependas solo de desinstalar para borrar credenciales seguras de iOS.",
          "Borrar registros o cachés locales o desinstalar Muqun no elimina datos del Gateway, agente o proveedores de IA, transcripción o notificaciones. Las solicitudes admitidas de eliminación de sesiones se envían al Gateway sin garantizar el borrado en proveedores o copias de seguridad. Gestiona archivos remotos, historiales y acceso con el operador del Gateway y solicita borrados según las políticas del proveedor. Revoca tokens y claves API en su origen para invalidarlos. Muqun no establece ni garantiza los plazos de conservación de esos servicios.",
        ],
      },
      {
        title: "Soporte, cambios y contacto",
        paragraphs: [
          "Si contactas con Osuki, usamos la información proporcionada para responder. No envíes tokens, código privado ni registros sin ocultar datos sensibles. Podemos revisar esta política cuando cambien funciones o servicios; la fecha figura arriba. Para consultas de privacidad, escribe a:",
        ],
      },
    ],
  },
  pt: {
    intro:
      "Esta política abrange a aplicação móvel Muqun e o site. O Muqun liga-se a um Gateway que controlas. Não há conta Muqun, publicidade ou rastreio publicitário. Os serviços opcionais de IA e voz tratam dados conforme descrito abaixo.",
    sections: [
      {
        title: "Dados no teu dispositivo",
        paragraphs: [
          "O Muqun guarda nomes, endereços, dados de emparelhamento e credenciais dos Gateway; ligações SSH configuradas e credenciais; preferências e comandos rápidos; informações de agentes e projetos, listas de sessões e registos de tarefas; temas, tipos de letra e recursos descarregados. Durante a utilização, conversas e conteúdo do terminal também ficam em memória. Ficheiros, imagens e gravações podem gerar cópias locais temporárias.",
          "As credenciais de Gateway e SSH são cifradas no armazenamento seguro do sistema operativo. As definições de voz, incluindo a chave API, também usam esse armazenamento, com acesso limitado ao dispositivo no iOS. Outras preferências, registos e ficheiros usam armazenamento normal da aplicação; as cópias de segurança dependem do sistema. Nem todos são protegidos ou eliminados da mesma forma que as credenciais.",
        ],
      },
      {
        title: "O teu Gateway, agentes e fornecedores de IA",
        paragraphs: [
          "As ligações do terminal e dos agentes vão para o Gateway emparelhado, sem retransmissão da Osuki. O Gateway recebe credenciais, identificadores de espaço e sessão, comandos, instruções, anexos e outros conteúdos necessários às tuas ações, e devolve saídas do terminal, conversas e resultados de ferramentas. Se usares SSH, o servidor SSH configurado também trata a ligação.",
          "Um agente no computador pode enviar instruções, ficheiros, código, contexto de conversa e resultados de ferramentas ao fornecedor de modelos de IA configurado ou a outros serviços ligados. Os destinatários dependem da configuração do Gateway e do agente; o software do agente não é necessariamente o fornecedor final. Consulta as condições de privacidade e conservação antes de partilhares informação pessoal ou confidencial. Usa HTTPS ou uma rede privada cifrada de confiança, como Tailscale. HTTP por si só não cifra o tráfego.",
          "O emparelhamento envia ao Gateway o nome do dispositivo e um identificador de instalação gerado localmente. Com a cifra de transporte Gateway ativa, chaves por dispositivo protegem pedidos e respostas suportados entre aplicação e Gateway; este continua a ler o conteúdo. O operador pode desativá-la e emparelhamentos antigos podem não a ter. Não protege as ligações seguintes a serviços de IA ou voz. No emparelhamento por endereço manual, o código enviado não é protegido pela cifra baseada nesse código; usa HTTPS ou uma ligação cifrada de confiança como SSH ou Tailscale.",
          "Quando suportado, abrir os detalhes da conta do agente ou atualizar limites pede ao Gateway uma imagem do uso da conta configurada no computador. A aplicação mostra uso, limites, reposições, plano ou créditos reportados, sem pedir credenciais de início de sessão do fornecedor para esta função. São imagens de toda a conta que o Gateway pode guardar brevemente em cache, não registos completos de faturação.",
        ],
      },
      {
        title: "Câmara, fotografias e ficheiros",
        paragraphs: [
          "Ao ler o QR de emparelhamento, as imagens são processadas no dispositivo e não são guardadas nem enviadas. Também podes introduzir o endereço do Gateway manualmente.",
          "Tirar uma fotografia para anexar ou escolher fotografias e ficheiros funciona de outra forma: após a seleção, o Muqun começa a enviá-los ao Gateway escolhido antes de enviares a mensagem. São incluídos conteúdo, nome e tipo do ficheiro. Remover um anexo do rascunho não recupera um envio já recebido. Ao enviar a mensagem, o agente pode usar o anexo e transmiti-lo aos fornecedores configurados.",
          "Ver imagens de conversas pode carregar miniaturas, pré-visualizações ou originais do Gateway. Abrir ou guardar uma imagem pode descarregar o original conforme o suporte do Gateway; imagens escolhidas para envio também podem ser redimensionadas. Imagens mostradas ou decifradas podem ficar em memória, caches ou ficheiros temporários: cifrar o transporte não exclui cópias locais. Guardar em Fotografias, Ficheiros ou num destino de partilha cria uma cópia fora da cache da aplicação, que deves gerir nesse local.",
        ],
      },
      {
        title: "Transcrição de voz opcional",
        paragraphs: [
          "O áudio só é enviado quando configuras um serviço de transcrição nas Definições e usas ativamente a entrada de voz com permissão de microfone. As predefinições apontam para a OpenAI; podes escolher um serviço próprio compatível. No modo ficheiro, a gravação temporária é enviada diretamente ao serviço quando terminas de gravar. No modo em tempo real, o áudio é transmitido diretamente durante a gravação. Modelo, idioma e chave API são incluídos conforme a configuração. A ligação não passa pelo Gateway nem por retransmissão da Osuki.",
          "A transcrição é colocada no rascunho para edição antes do envio. O áudio já foi partilhado nessa altura. Cancelar interrompe novas gravações e pedidos, mas não recupera áudio transmitido. O Muqun tenta apagar a gravação temporária ao concluir ou cancelar; uma limpeza interrompida pode deixar uma cópia local. Podes deixar de usar a voz, apagar a configuração ou revogar a permissão do microfone no sistema. A conservação e eliminação pelo fornecedor seguem as suas condições.",
        ],
      },
      {
        title: "Bloqueio da aplicação",
        paragraphs: [
          "Quando o bloqueio está ativo, o sistema operativo efetua a autenticação biométrica ou por código. O Muqun recebe o resultado, não os dados biométricos nem o código.",
        ],
      },
      {
        title: "Notificações opcionais",
        paragraphs: [
          "Ao ativar notificações, o Muqun regista um token push Expo e envia-o ao Gateway com o nome do dispositivo, plataforma e idioma. Expo e os serviços push da Apple ou Google tratam o token, conteúdo e metadados de entrega. O conteúdo gerado pelo Gateway pode incluir informação de espaços ou tarefas. Desativar tenta remover o token do Gateway e cancela o registo push da aplicação; um Gateway inacessível pode manter o registo. Também podes desativar notificações no sistema.",
        ],
      },
      {
        title: "Atualizações, temas e pedidos web",
        paragraphs: [
          "As versões com atualizações online contactam updates.muqun.dev para verificar e descarregar atualizações e notas. Os pedidos incluem informação técnica como plataforma, canal, compatibilidade da compilação e identificadores de versão; os pedidos de notas incluem o idioma escolhido. A identificação de compatibilidade descreve a compilação, não uma impressão digital biométrica. A Cloudflare aloja esta infraestrutura e o site e pode tratar endereços IP e metadados necessários aos pedidos.",
          "Explorar ou importar temas e recursos remotos contacta muqun.dev, GitHub ou a fonte escolhida. Esses servidores recebem o endereço pedido e metadados normais de ligação. Os recursos são guardados localmente. O site guarda a preferência de aparência no armazenamento local do navegador; podes apagá-la com os dados do site. Estes pedidos são separados das ligações do terminal e agentes.",
        ],
      },
      {
        title: "Conservação, eliminação e escolhas",
        paragraphs: [
          "Remove os Gateway e servidores SSH guardados e apaga a configuração de voz para eliminar os respetivos registos de ligação. Definições → Armazenamento limpa caches de imagens e cópias temporárias suportadas, mas não todos os dados, registos de agentes, credenciais ou temas instalados. Gere os temas na biblioteca. Preferências e registos locais ficam até serem alterados ou apagados pela função correspondente ou pelos controlos de dados da aplicação. Não dependas apenas da desinstalação para remover credenciais seguras do iOS.",
          "Apagar registos ou caches locais ou desinstalar não elimina dados do Gateway, agente ou fornecedores de IA, transcrição ou notificações. Pedidos suportados de eliminação de sessões são enviados ao Gateway, sem garantir a eliminação nos fornecedores ou cópias de segurança. Gere ficheiros remotos, históricos e acesso com o operador do Gateway e solicita a eliminação conforme as políticas dos fornecedores. Revoga tokens e chaves API na origem para os invalidar. O Muqun não define nem garante os prazos de conservação desses serviços.",
        ],
      },
      {
        title: "Apoio, alterações e contacto",
        paragraphs: [
          "Se contactares a Osuki, usamos as informações fornecidas para responder. Não envies tokens, código privado ou registos sem ocultar dados sensíveis. Podemos rever esta política quando mudam funcionalidades ou serviços; a data está acima. Para questões de privacidade, contacta:",
        ],
      },
    ],
  },
  ru: {
    intro:
      "Эта политика распространяется на мобильное приложение Muqun и сайт. Muqun подключается к Gateway под вашим управлением. В приложении нет аккаунта Muqun, рекламы и рекламного отслеживания. Необязательные сервисы ИИ и распознавания речи обрабатывают данные, как описано ниже.",
    sections: [
      {
        title: "Данные на устройстве",
        paragraphs: [
          "Muqun сохраняет названия и адреса Gateway, сведения о сопряжении и учётные данные; настроенные SSH-подключения и их учётные данные; настройки и быстрые команды; информацию об агентах и проектах, списки сессий и записи задач; темы, шрифты и загруженные ресурсы. Во время использования содержимое диалогов и терминала также находится в оперативной памяти. Для выбранных файлов, изображений и записей могут создаваться временные локальные копии.",
          "Учётные данные Gateway и SSH хранятся в зашифрованном виде в защищённом хранилище ОС. Настройки голоса, включая API-ключ, тоже используют это хранилище с доступностью только на этом устройстве в iOS. Другие настройки, записи и файлы используют обычное хранилище приложения; резервное копирование зависит от ОС. Они не все защищаются и удаляются так же, как учётные данные.",
        ],
      },
      {
        title: "Ваш Gateway, агенты и поставщики ИИ",
        paragraphs: [
          "Соединения терминала и агентов идут к сопряжённому Gateway без ретрансляции Osuki. Gateway получает необходимые для ваших действий учётные данные, идентификаторы рабочих пространств и сессий, команды, запросы, вложения и другой контент и возвращает вывод терминала, диалоги и результаты инструментов. При использовании SSH настроенный SSH-сервер также обрабатывает соединение.",
          "Агент на компьютере может передавать запросы, файлы, код, контекст диалога и результаты инструментов настроенному поставщику модели ИИ или другим подключённым сервисам. Получатели зависят от настроек Gateway и агента; программа агента не обязательно является конечным поставщиком. До передачи личных или конфиденциальных данных изучите условия приватности и хранения этих сервисов. Используйте HTTPS или доверенную зашифрованную сеть, например Tailscale. Сам по себе HTTP не шифрует трафик.",
          "При сопряжении в Gateway передаются имя устройства и локально созданный идентификатор установки. При включённом шифровании транспорта Gateway ключи устройства защищают поддерживаемые запросы и ответы между приложением и Gateway; сам Gateway видит содержимое. Оператор может отключить шифрование, а старые сопряжения могут его не иметь. Оно не защищает последующие соединения с сервисами ИИ или речи. При ручном вводе адреса отправляемый код не защищён шифрованием на основе этого кода; используйте HTTPS или доверенное зашифрованное соединение, например SSH или Tailscale.",
          "Если функция поддерживается, открытие сведений об аккаунте агента или обновление лимитов запрашивает у Gateway снимок использования аккаунта, настроенного на компьютере. Приложение показывает расход, лимиты, время сброса, тариф или кредиты, не запрашивая для этой функции учётные данные поставщика. Это снимки всего аккаунта, которые Gateway может ненадолго кешировать, а не полная история платежей.",
        ],
      },
      {
        title: "Камера, фотографии и файлы",
        paragraphs: [
          "Кадры при сканировании QR-кода сопряжения обрабатываются на устройстве, не сохраняются и не загружаются. Адрес Gateway можно ввести вручную.",
          "Съёмка фото для вложения или выбор фото и файлов работает иначе: после выбора Muqun начинает загрузку в выбранный Gateway ещё до отправки сообщения. Передаются содержимое, имена и типы файлов. Удаление вложения из черновика не отзывает уже полученную загрузку. После отправки сообщения агент может использовать вложение и передать его своим настроенным поставщикам.",
          "Просмотр изображений в диалогах может загружать миниатюры, предпросмотры или оригиналы с Gateway. Открытие или сохранение может загружать оригинал в зависимости от поддержки Gateway; выбранные для отправки изображения также могут уменьшаться. Показанные или расшифрованные изображения могут находиться в памяти, кеше или временных файлах: шифрование транспорта не исключает локальные копии. Сохранение в Фото, Файлы или место общего доступа создаёт отдельную копию вне кеша приложения, управлять которой нужно там.",
        ],
      },
      {
        title: "Необязательное распознавание речи",
        paragraphs: [
          "Аудио передаётся только после настройки сервиса распознавания в настройках и при активном использовании голосового ввода с разрешением микрофона. Встроенные шаблоны указывают на OpenAI; можно выбрать совместимый собственный сервис. В файловом режиме временная запись отправляется напрямую сервису после завершения записи. В режиме реального времени аудио передаётся напрямую во время записи. В зависимости от настроек передаются модель, язык и API-ключ. Соединение не проходит через Gateway или ретранслятор Osuki.",
          "Текст помещается в черновик для редактирования до отправки. К этому моменту аудио уже передано сервису. Отмена останавливает дальнейшую запись и запросы, но не отзывает переданное аудио. Muqun пытается удалить временную запись после завершения или отмены; при прерывании очистки может остаться локальная копия. Можно прекратить голосовой ввод, удалить его настройки или отозвать разрешение микрофона в ОС. Хранение и удаление у поставщика регулируются его условиями.",
        ],
      },
      {
        title: "Блокировка приложения",
        paragraphs: [
          "При включённой блокировке биометрическую проверку или проверку кодом выполняет ОС. Muqun получает результат, а не биометрические данные или код.",
        ],
      },
      {
        title: "Необязательные уведомления",
        paragraphs: [
          "При включении уведомлений Muqun регистрирует push-токен Expo и отправляет его в Gateway вместе с именем устройства, платформой и языком. Expo и push-сервисы Apple или Google обрабатывают токен, содержимое и метаданные доставки. Уведомления Gateway могут включать сведения о рабочих пространствах и задачах. При отключении Muqun пытается отменить регистрацию токена в Gateway и снимает push-регистрацию приложения; недоступный Gateway может сохранить запись. Уведомления можно отключить и в настройках ОС.",
        ],
      },
      {
        title: "Обновления, темы и веб-запросы",
        paragraphs: [
          "Сборки с онлайн-обновлениями обращаются к updates.muqun.dev для проверки и загрузки обновлений и описаний версий. Запросы содержат технические сведения: платформу, канал, совместимость сборки и идентификаторы выпусков; для описаний также передаётся выбранный язык. Идентификатор совместимости описывает сборку приложения, а не биометрический отпечаток. Cloudflare размещает эту инфраструктуру и сайт и может обрабатывать IP-адреса и метаданные, необходимые для запросов.",
          "Просмотр и импорт онлайн-тем и внешних ресурсов обращаются к muqun.dev, GitHub или выбранному источнику. Эти серверы получают запрошенный адрес и обычные метаданные соединения. Загрузки хранятся локально. Сайт сохраняет предпочтение оформления в локальном хранилище браузера; его можно удалить вместе с данными сайта. Эти запросы отделены от соединений терминала и агентов.",
        ],
      },
      {
        title: "Хранение, удаление и ваш выбор",
        paragraphs: [
          "Удалите сохранённые Gateway и SSH-серверы в приложении и очистите настройки голоса, чтобы удалить соответствующие записи соединений. Настройки → Хранилище очищает поддерживаемые кеши изображений и временные копии, но не все данные, записи агентов, учётные данные или установленные темы. Темами можно управлять в библиотеке. Локальные настройки и записи остаются до изменения или удаления соответствующей функцией либо средствами управления данными приложения. Не полагайтесь только на удаление приложения для очистки защищённых учётных данных iOS.",
          "Удаление локальных записей, кеша или приложения не удаляет данные Gateway, агента и поставщиков ИИ, распознавания речи или уведомлений. Поддерживаемые запросы удаления сессий отправляются в Gateway, но не гарантируют удаления у поставщиков или из резервных копий. Управляйте удалёнными файлами, историей и доступом совместно с оператором Gateway и запрашивайте удаление у поставщиков по их политикам. Для аннулирования токенов и API-ключей отзывайте их у источника. Muqun не устанавливает и не гарантирует сроки хранения этих сервисов.",
        ],
      },
      {
        title: "Поддержка, изменения и контакты",
        paragraphs: [
          "Если вы обращаетесь в Osuki, мы используем предоставленные сведения для ответа. Не отправляйте токены, закрытый код и журналы без удаления секретов. Политика может меняться вместе с функциями и сервисами; дата указана выше. Вопросы о приватности направляйте по адресу:",
        ],
      },
    ],
  },
  vi: {
    intro:
      "Chính sách này áp dụng cho ứng dụng di động Muqun và trang web. Muqun kết nối với Gateway do bạn quản lý. Không có tài khoản Muqun, quảng cáo hay theo dõi quảng cáo. Các dịch vụ AI và giọng nói tùy chọn xử lý dữ liệu như mô tả dưới đây.",
    sections: [
      {
        title: "Dữ liệu trên thiết bị",
        paragraphs: [
          "Muqun lưu tên, địa chỉ, thông tin ghép nối và thông tin xác thực Gateway; kết nối SSH đã cấu hình và thông tin xác thực; tùy chọn và lệnh nhanh; thông tin tác nhân và dự án, danh sách phiên và bản ghi tác vụ; giao diện, phông chữ và tài nguyên tải xuống. Nội dung hội thoại và terminal cũng được giữ trong bộ nhớ khi sử dụng. Tệp, ảnh và bản ghi âm có thể tạo bản sao cục bộ tạm thời.",
          "Thông tin xác thực Gateway và SSH được mã hóa trong kho thông tin xác thực an toàn của hệ điều hành. Cấu hình giọng nói, bao gồm khóa API, cũng dùng kho này với quyền truy cập chỉ dành cho thiết bị hiện tại trên iOS. Tùy chọn, bản ghi và tệp khác dùng vùng lưu trữ ứng dụng thông thường; việc sao lưu tùy thuộc hệ điều hành. Không phải tất cả đều được bảo vệ hoặc xóa giống thông tin xác thực.",
        ],
      },
      {
        title: "Gateway, tác nhân và nhà cung cấp AI",
        paragraphs: [
          "Kết nối terminal và tác nhân đi tới Gateway đã ghép nối, không qua máy chủ chuyển tiếp Osuki. Gateway nhận thông tin xác thực, mã không gian làm việc và phiên, lệnh, lời nhắc, tệp đính kèm và nội dung cần cho thao tác, rồi trả về đầu ra terminal, hội thoại và kết quả công cụ. Nếu dùng SSH, máy chủ SSH đã cấu hình cũng xử lý kết nối.",
          "Tác nhân trên máy tính có thể gửi lời nhắc, tệp, mã nguồn, ngữ cảnh hội thoại và kết quả công cụ tới nhà cung cấp mô hình AI hoặc dịch vụ kết nối đã cấu hình. Bên nhận tùy thuộc cấu hình Gateway và tác nhân; phần mềm tác nhân không nhất thiết là nhà cung cấp cuối cùng. Hãy xem điều khoản riêng tư và lưu giữ trước khi chia sẻ dữ liệu cá nhân hoặc bí mật. Dùng HTTPS hoặc mạng riêng mã hóa đáng tin cậy như Tailscale. HTTP tự nó không mã hóa lưu lượng.",
          "Ghép nối gửi tên thiết bị và mã cài đặt tạo cục bộ tới Gateway. Khi bật mã hóa truyền tải Gateway, khóa riêng của thiết bị bảo vệ yêu cầu và phản hồi được hỗ trợ giữa ứng dụng và Gateway; Gateway vẫn đọc được nội dung. Người vận hành có thể tắt mã hóa, và ghép nối cũ có thể không có. Nó không bảo vệ kết nối tiếp theo tới dịch vụ AI hoặc giọng nói. Khi ghép nối bằng địa chỉ nhập tay, mã gửi đi không được bảo vệ bởi mã hóa dựa trên chính mã đó; hãy dùng HTTPS hoặc kết nối mã hóa tin cậy như SSH hay Tailscale.",
          "Nếu được hỗ trợ, mở chi tiết tài khoản tác nhân hoặc làm mới giới hạn sẽ yêu cầu Gateway lấy ảnh chụp mức sử dụng của tài khoản đã cấu hình trên máy tính. Ứng dụng hiển thị mức dùng, giới hạn, thời điểm đặt lại, gói hoặc tín dụng được báo cáo, không yêu cầu thông tin đăng nhập nhà cung cấp cho tính năng này. Đây là ảnh chụp toàn tài khoản có thể được Gateway lưu đệm ngắn hạn, không phải hồ sơ thanh toán đầy đủ.",
        ],
      },
      {
        title: "Camera, ảnh và tệp",
        paragraphs: [
          "Khi quét mã QR ghép nối, hình ảnh được xử lý trên thiết bị, không lưu hoặc tải lên. Bạn cũng có thể nhập địa chỉ Gateway thủ công.",
          "Chụp ảnh đính kèm hoặc chọn ảnh và tệp thì khác: sau khi chọn, Muqun bắt đầu tải lên Gateway đã chọn trước khi bạn gửi tin nhắn. Nội dung, tên và loại tệp được gửi kèm. Bỏ tệp khỏi bản nháp không thu hồi bản tải lên đã tới Gateway. Khi gửi tin nhắn, tác nhân có thể dùng tệp và chuyển tới các nhà cung cấp đã cấu hình.",
          "Xem ảnh hội thoại có thể tải ảnh thu nhỏ, xem trước hoặc ảnh gốc từ Gateway. Mở hoặc lưu ảnh có thể tải bản gốc tùy khả năng Gateway; ảnh chọn để tải lên cũng có thể được đổi kích thước. Ảnh hiển thị hoặc giải mã có thể nằm trong bộ nhớ, bộ đệm hoặc tệp tạm: mã hóa truyền tải không có nghĩa là không có bản sao cục bộ. Lưu vào Ảnh, Tệp hoặc nơi chia sẻ tạo bản sao ngoài bộ đệm ứng dụng mà bạn cần quản lý tại đó.",
        ],
      },
      {
        title: "Chuyển giọng nói thành văn bản tùy chọn",
        paragraphs: [
          "Âm thanh chỉ được gửi khi bạn cấu hình dịch vụ chuyển giọng nói trong Cài đặt và chủ động dùng nhập giọng nói với quyền micro. Cấu hình mẫu trỏ tới OpenAI; bạn có thể chọn dịch vụ tương thích riêng. Chế độ tệp gửi bản ghi tạm trực tiếp tới dịch vụ sau khi kết thúc ghi âm. Chế độ thời gian thực truyền âm thanh trực tiếp trong lúc ghi. Mô hình, ngôn ngữ và khóa API cũng được gửi theo cấu hình. Kết nối không đi qua Gateway hay máy chủ chuyển tiếp Osuki.",
          "Văn bản trả về được đưa vào bản nháp để sửa trước khi gửi. Lúc đó âm thanh đã được chia sẻ với dịch vụ. Hủy sẽ dừng ghi và yêu cầu tiếp theo nhưng không thu hồi âm thanh đã gửi. Muqun cố xóa bản ghi tạm khi hoàn tất hoặc hủy; dọn dẹp bị gián đoạn có thể để lại bản sao cục bộ. Bạn có thể ngừng dùng giọng nói, xóa cấu hình hoặc thu hồi quyền micro trong hệ thống. Việc lưu giữ và xóa của nhà cung cấp tuân theo điều khoản của họ.",
        ],
      },
      {
        title: "Khóa ứng dụng",
        paragraphs: [
          "Khi bật khóa ứng dụng, hệ điều hành thực hiện xác thực sinh trắc học hoặc mật mã. Muqun chỉ nhận kết quả, không nhận dữ liệu sinh trắc học hay mật mã.",
        ],
      },
      {
        title: "Thông báo tùy chọn",
        paragraphs: [
          "Khi bật thông báo, Muqun đăng ký token đẩy Expo rồi gửi tới Gateway cùng tên thiết bị, nền tảng và ngôn ngữ. Expo và dịch vụ đẩy Apple hoặc Google xử lý token, nội dung và siêu dữ liệu phân phối. Nội dung do Gateway tạo có thể chứa thông tin không gian làm việc hoặc tác vụ. Tắt thông báo sẽ thử hủy token tại Gateway và hủy đăng ký đẩy của ứng dụng; Gateway không truy cập được có thể giữ bản ghi. Bạn cũng có thể tắt thông báo trong hệ thống.",
        ],
      },
      {
        title: "Cập nhật, giao diện và yêu cầu web",
        paragraphs: [
          "Bản ứng dụng bật cập nhật trực tuyến kết nối updates.muqun.dev để kiểm tra và tải cập nhật cùng ghi chú phát hành. Yêu cầu chứa thông tin kỹ thuật như nền tảng, kênh cập nhật, tính tương thích bản dựng và mã phát hành; ghi chú còn dùng ngôn ngữ đã chọn. Mã tương thích mô tả bản dựng ứng dụng, không phải dấu vân tay sinh trắc học. Cloudflare lưu trữ hạ tầng và trang web, có thể xử lý địa chỉ IP và siêu dữ liệu cần cho yêu cầu.",
          "Duyệt hoặc nhập giao diện trực tuyến và tài nguyên từ xa sẽ kết nối muqun.dev, GitHub hoặc nguồn bạn chọn. Các máy chủ nhận địa chỉ được yêu cầu và siêu dữ liệu kết nối thông thường. Tài nguyên tải về được lưu cục bộ. Trang web lưu tùy chọn hiển thị trong bộ nhớ cục bộ của trình duyệt; có thể xóa cùng dữ liệu trang web. Những yêu cầu này tách biệt với kết nối terminal và tác nhân.",
        ],
      },
      {
        title: "Lưu giữ, xóa và lựa chọn của bạn",
        paragraphs: [
          "Xóa Gateway và máy chủ SSH đã lưu trong ứng dụng, đồng thời xóa cấu hình giọng nói để bỏ các bản ghi kết nối tương ứng. Cài đặt → Bộ nhớ có thể xóa bộ đệm ảnh và bản sao tạm được hỗ trợ, nhưng không xóa mọi dữ liệu, bản ghi tác nhân, thông tin xác thực hay giao diện đã cài. Quản lý giao diện trong thư viện. Tùy chọn và bản ghi cục bộ còn tới khi được đổi hoặc xóa bằng chức năng tương ứng hoặc công cụ quản lý dữ liệu ứng dụng. Không chỉ dựa vào gỡ cài đặt để xóa thông tin xác thực an toàn trên iOS.",
          "Xóa bản ghi, bộ đệm cục bộ hay gỡ Muqun không xóa dữ liệu trên Gateway, tác nhân hoặc nhà cung cấp AI, giọng nói, thông báo. Yêu cầu xóa phiên được hỗ trợ gửi tới Gateway nhưng không bảo đảm xóa dữ liệu tại nhà cung cấp hoặc bản sao lưu. Quản lý tệp từ xa, lịch sử và quyền thiết bị với người vận hành Gateway, yêu cầu nhà cung cấp xóa theo chính sách của họ. Thu hồi token hoặc khóa API tại nơi cấp để vô hiệu hóa. Muqun không ấn định hay bảo đảm thời hạn lưu giữ của các dịch vụ đó.",
        ],
      },
      {
        title: "Hỗ trợ, thay đổi và liên hệ",
        paragraphs: [
          "Khi bạn liên hệ Osuki, chúng tôi dùng thông tin bạn cung cấp để trả lời. Không gửi token, mã nguồn riêng tư hoặc nhật ký chưa che dữ liệu nhạy cảm. Chính sách có thể đổi khi tính năng hoặc dịch vụ thay đổi; ngày sửa nằm ở trên. Về quyền riêng tư, liên hệ:",
        ],
      },
    ],
  },
  th: {
    intro:
      "นโยบายนี้ครอบคลุมแอปมือถือ Muqun และเว็บไซต์ Muqun เชื่อมต่อกับ Gateway ที่คุณดูแลเอง ไม่มีบัญชี Muqun โฆษณา หรือการติดตามเพื่อโฆษณา บริการ AI และเสียงที่เลือกใช้จะประมวลผลข้อมูลตามที่อธิบายด้านล่าง",
    sections: [
      {
        title: "ข้อมูลบนอุปกรณ์",
        paragraphs: [
          "Muqun เก็บชื่อและที่อยู่ Gateway ข้อมูลการจับคู่และข้อมูลรับรอง การเชื่อมต่อ SSH และข้อมูลรับรองที่ตั้งค่าไว้ การตั้งค่าและคำสั่งลัด ข้อมูลเอเจนต์และโครงการ รายการเซสชันและบันทึกงาน ธีม แบบอักษร และไฟล์ที่ดาวน์โหลด เนื้อหาการสนทนาและเทอร์มินัลยังอยู่ในหน่วยความจำระหว่างใช้งาน ไฟล์ รูปภาพ และเสียงที่เลือกอาจมีสำเนาชั่วคราวในอุปกรณ์",
          "ข้อมูลรับรอง Gateway และ SSH เข้ารหัสในที่เก็บข้อมูลรับรองที่ปลอดภัยของระบบปฏิบัติการ การตั้งค่าเสียงรวมถึงคีย์ API ใช้ที่เก็บนี้เช่นกัน โดยบน iOS ใช้ระดับการเข้าถึงเฉพาะอุปกรณ์นี้ การตั้งค่า บันทึก และไฟล์อื่นใช้พื้นที่แอปทั่วไป การสำรองขึ้นอยู่กับระบบปฏิบัติการ จึงไม่ได้รับการป้องกันหรือลบแบบเดียวกับข้อมูลรับรองทั้งหมด",
        ],
      },
      {
        title: "Gateway เอเจนต์ และผู้ให้บริการ AI ของคุณ",
        paragraphs: [
          "การเชื่อมต่อเทอร์มินัลและเอเจนต์ไปยัง Gateway ที่จับคู่ โดยไม่ผ่านเซิร์ฟเวอร์ตัวกลางของ Osuki Gateway รับข้อมูลรับรอง ตัวระบุพื้นที่ทำงานและเซสชัน คำสั่ง พรอมป์ต์ ไฟล์แนบ และเนื้อหาที่จำเป็นต่อการกระทำของคุณ แล้วส่งผลลัพธ์เทอร์มินัล การสนทนา และผลเครื่องมือกลับมา หากใช้ SSH โฮสต์ SSH ที่ตั้งค่าไว้จะจัดการการเชื่อมต่อด้วย",
          "เอเจนต์บนคอมพิวเตอร์อาจส่งพรอมป์ต์ ไฟล์ โค้ด บริบทการสนทนา และผลเครื่องมือไปยังผู้ให้บริการโมเดล AI หรือบริการอื่นที่ตั้งค่าเชื่อมต่อไว้ ผู้รับขึ้นกับการตั้งค่า Gateway และเอเจนต์ ซอฟต์แวร์เอเจนต์ไม่จำเป็นต้องเป็นผู้ให้บริการปลายทาง โปรดอ่านเงื่อนไขความเป็นส่วนตัวและการเก็บข้อมูลก่อนแบ่งปันข้อมูลส่วนตัวหรือความลับ ใช้ HTTPS หรือเครือข่ายส่วนตัวเข้ารหัสที่เชื่อถือได้ เช่น Tailscale เพราะ HTTP เพียงอย่างเดียวไม่เข้ารหัสการรับส่ง",
          "การจับคู่ส่งชื่ออุปกรณ์และตัวระบุการติดตั้งที่สร้างในเครื่องไปยัง Gateway เมื่อเปิดการเข้ารหัสการรับส่ง Gateway คีย์เฉพาะอุปกรณ์จะป้องกันคำขอและคำตอบที่รองรับระหว่างแอปกับ Gateway แต่ Gateway ยังอ่านเนื้อหาได้ ผู้ดูแลปิดการเข้ารหัสได้ และการจับคู่เก่าอาจไม่มี การเข้ารหัสนี้ไม่ครอบคลุมการเชื่อมต่อถัดไปยังบริการ AI หรือเสียง เมื่อจับคู่ด้วยการพิมพ์ที่อยู่ รหัสที่ส่งไม่ได้รับการป้องกันด้วยการเข้ารหัสที่อาศัยรหัสนั้นเอง จึงควรใช้ HTTPS หรือการเชื่อมต่อเข้ารหัสที่เชื่อถือได้ เช่น SSH หรือ Tailscale",
          "หากรองรับ การเปิดรายละเอียดบัญชีเอเจนต์หรือรีเฟรชขีดจำกัดจะขอให้ Gateway อ่านภาพรวมการใช้งานของบัญชีที่ตั้งค่าในคอมพิวเตอร์ แอปแสดงการใช้งาน ขีดจำกัด เวลารีเซ็ต แผนหรือเครดิตที่รายงาน โดยไม่ขอข้อมูลเข้าสู่ระบบผู้ให้บริการสำหรับฟีเจอร์นี้ ข้อมูลเป็นภาพรวมทั้งบัญชีที่ Gateway อาจแคชช่วงสั้น ๆ ไม่ใช่ประวัติเรียกเก็บเงินทั้งหมด",
        ],
      },
      {
        title: "กล้อง รูปภาพ และไฟล์",
        paragraphs: [
          "เมื่อสแกน QR เพื่อจับคู่ ภาพจากกล้องประมวลผลบนอุปกรณ์ ไม่บันทึกหรืออัปโหลด คุณสามารถป้อนที่อยู่ Gateway เองได้",
          "การถ่ายรูปแนบหรือเลือกรูปภาพและไฟล์แตกต่างกัน หลังเลือก Muqun จะเริ่มอัปโหลดไปยัง Gateway ที่เลือกก่อนส่งข้อความ โดยรวมเนื้อหา ชื่อ และประเภทไฟล์ การนำไฟล์แนบออกจากร่างไม่เรียกคืนการอัปโหลดที่ถึง Gateway แล้ว เมื่อส่งข้อความ เอเจนต์จะใช้ไฟล์แนบได้และอาจส่งต่อไปยังผู้ให้บริการที่ตั้งค่าไว้",
          "การดูภาพในบทสนทนาอาจโหลดภาพย่อ ภาพตัวอย่าง หรือภาพต้นฉบับจาก Gateway การเปิดหรือบันทึกอาจดาวน์โหลดต้นฉบับตามที่ Gateway รองรับ และภาพที่เลือกอัปโหลดอาจถูกย่อขนาด ภาพที่แสดงหรือถอดรหัสอาจอยู่ในหน่วยความจำ แคช หรือไฟล์ชั่วคราว การเข้ารหัสการรับส่งจึงไม่ได้แปลว่าไม่มีสำเนาในเครื่อง การบันทึกไปยังรูปภาพ ไฟล์ หรือปลายทางแบ่งปันสร้างสำเนานอกแคชแอป ซึ่งต้องจัดการในปลายทางนั้น",
        ],
      },
      {
        title: "การถอดเสียงที่เลือกใช้",
        paragraphs: [
          "เสียงจะถูกส่งเมื่อคุณตั้งค่าบริการถอดเสียงในการตั้งค่า และเริ่มใช้การป้อนเสียงพร้อมสิทธิ์ไมโครโฟนเท่านั้น ค่าตัวอย่างที่มีให้ชี้ไปยัง OpenAI คุณเลือกบริการอื่นที่เข้ากันได้ได้ โหมดไฟล์ส่งเสียงชั่วคราวตรงไปยังบริการเมื่อบันทึกเสร็จ โหมดเรียลไทม์ส่งเสียงตรงระหว่างบันทึก คำขอรวมโมเดล ภาษา และคีย์ API ตามการตั้งค่า การเชื่อมต่อนี้ไม่ผ่าน Gateway หรือเซิร์ฟเวอร์ตัวกลางของ Osuki",
          "ข้อความที่ได้จะใส่ในร่างให้แก้ไขก่อนคุณส่ง แต่เสียงถูกแบ่งปันกับบริการแล้ว การยกเลิกหยุดการบันทึกและคำขอต่อไป แต่เรียกคืนเสียงที่ส่งไปไม่ได้ Muqun พยายามลบเสียงชั่วคราวเมื่อเสร็จหรือยกเลิก หากการล้างถูกขัดจังหวะอาจเหลือสำเนาในอุปกรณ์ คุณหยุดใช้เสียง ลบการตั้งค่าเสียง หรือถอนสิทธิ์ไมโครโฟนในระบบได้ การเก็บและลบโดยผู้ให้บริการเป็นไปตามเงื่อนไขของบริการนั้น",
        ],
      },
      {
        title: "การล็อกแอป",
        paragraphs: [
          "เมื่อเปิดการล็อกแอป ระบบปฏิบัติการทำการยืนยันด้วยชีวมิติหรือรหัสผ่าน Muqun รับเพียงผลการยืนยัน ไม่รับข้อมูลชีวมิติหรือรหัสผ่าน",
        ],
      },
      {
        title: "การแจ้งเตือนที่เลือกใช้",
        paragraphs: [
          "เมื่อเปิดการแจ้งเตือน Muqun ลงทะเบียนโทเค็น push ของ Expo และส่งไปยัง Gateway พร้อมชื่ออุปกรณ์ แพลตฟอร์ม และภาษา การส่งใช้ Expo และบริการ push ของ Apple หรือ Google ซึ่งประมวลผลโทเค็น เนื้อหา และข้อมูลกำกับการส่ง เนื้อหาที่ Gateway สร้างอาจมีข้อมูลพื้นที่ทำงานหรืองาน การปิดจะพยายามยกเลิกโทเค็นจาก Gateway และยกเลิกการลงทะเบียน push ของแอป หากเข้า Gateway ไม่ได้อาจยังมีบันทึกอยู่ คุณปิดการแจ้งเตือนในการตั้งค่าระบบได้ด้วย",
        ],
      },
      {
        title: "อัปเดต ธีม และคำขอเว็บไซต์",
        paragraphs: [
          "แอปรุ่นที่เปิดการอัปเดตออนไลน์ติดต่อ updates.muqun.dev เพื่อตรวจสอบและดาวน์โหลดอัปเดตกับบันทึกรุ่น คำขอมีข้อมูลทางเทคนิค เช่น แพลตฟอร์ม ช่องทางอัปเดต ความเข้ากันได้ของบิลด์ และตัวระบุรุ่น คำขอบันทึกรุ่นมีภาษาที่เลือกด้วย ตัวระบุความเข้ากันได้อธิบายบิลด์แอป ไม่ใช่ลายนิ้วมือชีวมิติ Cloudflare ให้บริการโครงสร้างพื้นฐานนี้และเว็บไซต์ และอาจประมวลผลที่อยู่ IP และข้อมูลกำกับคำขอที่จำเป็น",
          "การดูหรือนำเข้าธีมออนไลน์และทรัพยากรภายนอกติดต่อ muqun.dev, GitHub หรือแหล่งที่คุณเลือก โฮสต์เหล่านี้ได้รับที่อยู่ที่ขอและข้อมูลกำกับการเชื่อมต่อทั่วไป ไฟล์ดาวน์โหลดเก็บในอุปกรณ์ เว็บไซต์เก็บการตั้งค่ารูปลักษณ์ในพื้นที่เก็บข้อมูลของเบราว์เซอร์ คุณลบได้ด้วยการล้างข้อมูลเว็บไซต์ คำขอเหล่านี้แยกจากการเชื่อมต่อเทอร์มินัลและเอเจนต์",
        ],
      },
      {
        title: "การเก็บ การลบ และทางเลือก",
        paragraphs: [
          "นำ Gateway และโฮสต์ SSH ที่บันทึกไว้ออกจากแอป และล้างการตั้งค่าเสียงเพื่อลบระเบียนการเชื่อมต่อที่เกี่ยวข้อง การตั้งค่า → พื้นที่เก็บข้อมูล ล้างแคชรูปภาพและสำเนาชั่วคราวที่รองรับ แต่ไม่ลบข้อมูลแอป บันทึกเอเจนต์ ข้อมูลรับรอง หรือธีมที่ติดตั้งทั้งหมด จัดการธีมได้ในคลังธีม การตั้งค่าและบันทึกในอุปกรณ์คงอยู่จนกว่าจะเปลี่ยนหรือลบด้วยฟีเจอร์นั้นหรือเครื่องมือจัดการข้อมูลแอป อย่าพึ่งการถอนการติดตั้งเพียงอย่างเดียวเพื่อลบข้อมูลรับรองที่ปลอดภัยของ iOS",
          "การลบบันทึกหรือแคชในอุปกรณ์ หรือถอน Muqun ไม่ลบข้อมูลจาก Gateway เอเจนต์ ผู้ให้บริการ AI ถอดเสียง หรือแจ้งเตือน คำขอลบเซสชันที่รองรับส่งไปยัง Gateway แต่ไม่รับประกันว่าข้อมูลที่ผู้ให้บริการหรือสำเนาสำรองถูกลบ จัดการไฟล์ระยะไกล ประวัติ และสิทธิ์อุปกรณ์กับผู้ดูแล Gateway และขอลบตามนโยบายผู้ให้บริการ เพิกถอนโทเค็นหรือคีย์ API ที่ผู้ออกเพื่อให้ใช้ไม่ได้ Muqun ไม่กำหนดหรือรับประกันระยะเก็บข้อมูลของบริการเหล่านั้น",
        ],
      },
      {
        title: "การสนับสนุน การเปลี่ยนแปลง และติดต่อ",
        paragraphs: [
          "หากติดต่อ Osuki เราใช้ข้อมูลที่คุณให้เพื่อตอบกลับ อย่าส่งโทเค็น โค้ดส่วนตัว หรือบันทึกที่ยังไม่ปกปิดความลับ เราอาจปรับนโยบายเมื่อฟีเจอร์หรือบริการเปลี่ยน โดยแสดงวันที่แก้ไขด้านบน หากมีคำถามเรื่องความเป็นส่วนตัว ติดต่อ:",
        ],
      },
    ],
  },
};
