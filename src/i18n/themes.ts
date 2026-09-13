/**
 * The themes gallery's copy, one object per locale, in the arrangement
 * `world.ts` and `gateway-help.ts` use: a single file, typed against
 * `SiteLocale`, so a language with no entry here is a build error rather
 * than a page that quietly serves English.
 *
 * Only the frame is translated. Theme names, ids, versions, licenses, token
 * names (`surfaceRaised`, `ansi 12`) and everything drawn inside a device
 * mock-up are the theme's own words or the machine's, and stay untranslated
 * in the mono register -- the same rule the aperture's theme rail follows.
 *
 * Two placeholders: `{count}` in `count`, `{size}` in `card.loadPreview`.
 * Keep the braces and the spelling; put them wherever the sentence needs
 * them in this language.
 */
import type { SiteLocale } from '@/lib/locales';

export interface ThemesCopy {
  metaTitle: string;
  metaDescription: string;
  /** Translated, proportional -- not a mono eyebrow. */
  eyebrow: string;
  heading: string;
  lead: string;
  repoCta: string;
  loading: string;
  empty: string;
  failed: string;
  retry: string;
  /** Takes `{count}`. */
  count: string;
  /** Placeholder of the search field. */
  search: string;
  /** Takes `{query}`. Shown when the search matches nothing. */
  noMatch: string;
  card: {
    preview: string;
    /** Takes `{size}`. For a package too large to fetch unasked. */
    loadPreview: string;
    loadingPreview: string;
    previewFailed: string;
    download: string;
  };
  detail: {
    back: string;
    download: string;
    source: string;
    install: string;
    version: string;
    author: string;
    license: string;
    minApp: string;
    size: string;
    assets: string;
    light: string;
    dark: string;
    surfaces: string;
    text: string;
    accents: string;
    terminal: string;
    ansi: string;
    decorations: string;
    icons: string;
    noArtwork: string;
    surfaceOpacity: string;
    terminalOpacity: string;
  };
  /** The device mock-ups: which device, which screen. Also their accessible names. */
  screens: {
    devices: string;
    tokens: string;
    phone: string;
    tablet: string;
    home: string;
    conversation: string;
    terminal: string;
  };
  /** The standalone preview route, `/themes/preview/?source=…`. */
  preview: {
    metaTitle: string;
    heading: string;
    lead: string;
    source: string;
    noSource: string;
    loading: string;
    failed: string;
    refresh: string;
    updated: string;
  };
  making: {
    heading: string;
    body: string;
    repo: string;
    cli: string;
  };
}

const en: ThemesCopy = {
  metaTitle: 'Themes — Muqun',
  metaDescription:
    'Community themes for Muqun, previewed from the theme files themselves: every colour, both variants, and the artwork each one ships, on a phone and a tablet.',
  eyebrow: 'Muqun · Themes',
  heading: 'Themes',
  lead: 'Every theme in the community repository, drawn here from its own .muqun-theme file — both variants, on a phone and a tablet, with the terminal palette and the artwork. Download one and import it in the app.',
  repoCta: 'Browse the repository',
  loading: 'Loading the theme list…',
  empty: 'No themes have been published yet. The first one could be yours.',
  failed: 'The theme list could not be loaded right now.',
  retry: 'Try again',
  count: '{count} themes',
  search: 'Search themes',
  noMatch: 'No themes match “{query}”.',
  card: {
    preview: 'Preview',
    loadPreview: 'Load preview ({size})',
    loadingPreview: 'Reading the package…',
    previewFailed: 'This package could not be read.',
    download: 'Download',
  },
  detail: {
    back: 'All themes',
    download: 'Download .muqun-theme',
    source: 'Source',
    install: 'Download the file, then open it with Muqun or import it under Settings → Themes.',
    version: 'Version',
    author: 'Author',
    license: 'License',
    minApp: 'Requires Muqun',
    size: 'Size',
    assets: 'Images',
    light: 'Light',
    dark: 'Dark',
    surfaces: 'Surfaces',
    text: 'Text',
    accents: 'Accents',
    terminal: 'Terminal',
    ansi: 'ANSI colours',
    decorations: 'Decoration slots',
    icons: 'Icons',
    noArtwork: 'No artwork in this variant.',
    surfaceOpacity: 'Surface opacity',
    terminalOpacity: 'Terminal opacity',
  },
  screens: {
    devices: 'On a device',
    tokens: 'The tokens',
    phone: 'Phone',
    tablet: 'Tablet',
    home: 'Home',
    conversation: 'Conversation',
    terminal: 'Terminal',
  },
  preview: {
    metaTitle: 'Theme preview — Muqun',
    heading: 'Theme preview',
    lead: 'A theme from anywhere, drawn the way the gallery draws it. Point `source` at a folder holding theme.json and assets/, or at a .muqun-theme file, on a server that allows cross-origin reads.',
    source: 'Source',
    noSource: 'No source given. Add ?source=https://… to the address.',
    loading: 'Loading the theme…',
    failed: 'The theme could not be loaded from this source.',
    refresh: 'Reload when the source changes',
    updated: 'Updated',
  },
  making: {
    heading: 'Make your own',
    body: 'A theme is a small ZIP: one JSON file of colours and an assets folder of images. The toolchain scaffolds one, checks its contrast, and packs it; the repository takes them as pull requests.',
    repo: 'Contribute a theme',
    cli: 'The theme toolchain',
  },
};

const zhCN: ThemesCopy = {
  metaTitle: '主题 — 牧群',
  metaDescription: '牧群的社区主题，直接由主题文件本身渲染预览：每一种颜色、明暗两套变体，以及各自附带的图片，在手机和平板上呈现。',
  eyebrow: '牧群 · 主题',
  heading: '主题',
  lead: '社区仓库中的每一个主题，都由它自己的 .muqun-theme 文件在此绘制：明暗两套变体、手机与平板、终端配色和图片。下载后在应用中导入即可。',
  repoCta: '浏览仓库',
  loading: '正在加载主题列表…',
  empty: '目前还没有发布任何主题。第一个可以是你的。',
  failed: '暂时无法加载主题列表。',
  retry: '重试',
  count: '{count} 个主题',
  search: '搜索主题',
  noMatch: '没有与“{query}”匹配的主题。',
  card: {
    preview: '预览',
    loadPreview: '加载预览（{size}）',
    loadingPreview: '正在读取主题包…',
    previewFailed: '无法读取这个主题包。',
    download: '下载',
  },
  detail: {
    back: '全部主题',
    download: '下载 .muqun-theme',
    source: '源码',
    install: '下载文件后，用牧群打开它，或在「设置 → 主题」中导入。',
    version: '版本',
    author: '作者',
    license: '许可证',
    minApp: '需要牧群',
    size: '大小',
    assets: '图片',
    light: '浅色',
    dark: '深色',
    surfaces: '表面',
    text: '文字',
    accents: '强调色',
    terminal: '终端',
    ansi: 'ANSI 颜色',
    decorations: '装饰位',
    icons: '图标',
    noArtwork: '此变体没有图片。',
    surfaceOpacity: '表面不透明度',
    terminalOpacity: '终端不透明度',
  },
  screens: {
    devices: '在设备上',
    tokens: '色彩令牌',
    phone: '手机',
    tablet: '平板',
    home: '首页',
    conversation: '对话',
    terminal: '终端',
  },
  preview: {
    metaTitle: '主题预览 — 牧群',
    heading: '主题预览',
    lead: '从任意位置加载主题，以图库同样的方式绘制。把 `source` 指向一个包含 theme.json 与 assets/ 的目录，或一个 .muqun-theme 文件，服务器需允许跨域读取。',
    source: '来源',
    noSource: '未指定来源。请在地址中加入 ?source=https://…。',
    loading: '正在加载主题…',
    failed: '无法从这个来源加载主题。',
    refresh: '来源变化时自动重新加载',
    updated: '已更新',
  },
  making: {
    heading: '制作你自己的主题',
    body: '主题是一个小小的 ZIP：一个描述颜色的 JSON 文件，加一个存放图片的 assets 文件夹。工具链可以生成模板、检查对比度并打包；仓库通过 Pull Request 接收主题。',
    repo: '贡献主题',
    cli: '主题工具链',
  },
};

const zhTW: ThemesCopy = {
  metaTitle: '主題 — 牧群',
  metaDescription: '牧群的社群主題，直接由主題檔案本身呈現預覽：每一種顏色、明暗兩套變體，以及各自附帶的圖片，在手機與平板上呈現。',
  eyebrow: '牧群 · 主題',
  heading: '主題',
  lead: '社群儲存庫中的每一個主題，都由它自己的 .muqun-theme 檔案在此繪製：明暗兩套變體、手機與平板、終端機配色與圖片。下載後在應用程式中匯入即可。',
  repoCta: '瀏覽儲存庫',
  loading: '正在載入主題清單…',
  empty: '目前還沒有發佈任何主題。第一個可以是你的。',
  failed: '暫時無法載入主題清單。',
  retry: '再試一次',
  count: '{count} 個主題',
  search: '搜尋主題',
  noMatch: '沒有與「{query}」相符的主題。',
  card: {
    preview: '預覽',
    loadPreview: '載入預覽（{size}）',
    loadingPreview: '正在讀取主題套件…',
    previewFailed: '無法讀取這個主題套件。',
    download: '下載',
  },
  detail: {
    back: '全部主題',
    download: '下載 .muqun-theme',
    source: '原始碼',
    install: '下載檔案後，用牧群開啟它，或在「設定 → 主題」中匯入。',
    version: '版本',
    author: '作者',
    license: '授權',
    minApp: '需要牧群',
    size: '大小',
    assets: '圖片',
    light: '淺色',
    dark: '深色',
    surfaces: '表面',
    text: '文字',
    accents: '強調色',
    terminal: '終端機',
    ansi: 'ANSI 顏色',
    decorations: '裝飾位',
    icons: '圖示',
    noArtwork: '此變體沒有圖片。',
    surfaceOpacity: '表面不透明度',
    terminalOpacity: '終端機不透明度',
  },
  screens: {
    devices: '在裝置上',
    tokens: '色彩權杖',
    phone: '手機',
    tablet: '平板',
    home: '首頁',
    conversation: '對話',
    terminal: '終端機',
  },
  preview: {
    metaTitle: '主題預覽 — 牧群',
    heading: '主題預覽',
    lead: '從任意位置載入主題，以圖庫同樣的方式繪製。把 `source` 指向一個包含 theme.json 與 assets/ 的目錄，或一個 .muqun-theme 檔案，伺服器需允許跨來源讀取。',
    source: '來源',
    noSource: '未指定來源。請在網址中加入 ?source=https://…。',
    loading: '正在載入主題…',
    failed: '無法從這個來源載入主題。',
    refresh: '來源變更時自動重新載入',
    updated: '已更新',
  },
  making: {
    heading: '製作你自己的主題',
    body: '主題是一個小小的 ZIP：一個描述顏色的 JSON 檔案，加上一個存放圖片的 assets 資料夾。工具鏈可以產生範本、檢查對比度並打包；儲存庫透過 Pull Request 接收主題。',
    repo: '貢獻主題',
    cli: '主題工具鏈',
  },
};

const ja: ThemesCopy = {
  metaTitle: 'テーマ — 牧群',
  metaDescription: '牧群のコミュニティテーマを、テーマファイルそのものから描画してプレビュー。すべての色、ライトとダークの両バリアント、同梱のアートワークを、スマートフォンとタブレットで。',
  eyebrow: '牧群 · テーマ',
  heading: 'テーマ',
  lead: 'コミュニティリポジトリにあるすべてのテーマを、それぞれの .muqun-theme ファイルからここに描画しています。ライトとダークの両バリアント、スマートフォンとタブレット、ターミナルの配色、アートワーク。ダウンロードしてアプリで読み込んでください。',
  repoCta: 'リポジトリを見る',
  loading: 'テーマ一覧を読み込んでいます…',
  empty: 'まだテーマは公開されていません。最初の一つはあなたのものかもしれません。',
  failed: '現在テーマ一覧を読み込めません。',
  retry: 'もう一度試す',
  count: '{count} 件のテーマ',
  search: 'テーマを検索',
  noMatch: '「{query}」に一致するテーマはありません。',
  card: {
    preview: 'プレビュー',
    loadPreview: 'プレビューを読み込む（{size}）',
    loadingPreview: 'パッケージを読み取っています…',
    previewFailed: 'このパッケージを読み取れませんでした。',
    download: 'ダウンロード',
  },
  detail: {
    back: 'すべてのテーマ',
    download: '.muqun-theme をダウンロード',
    source: 'ソース',
    install: 'ファイルをダウンロードし、牧群で開くか、「設定 → テーマ」から読み込んでください。',
    version: 'バージョン',
    author: '作者',
    license: 'ライセンス',
    minApp: '必要な牧群のバージョン',
    size: 'サイズ',
    assets: '画像',
    light: 'ライト',
    dark: 'ダーク',
    surfaces: 'サーフェス',
    text: 'テキスト',
    accents: 'アクセント',
    terminal: 'ターミナル',
    ansi: 'ANSI カラー',
    decorations: '装飾スロット',
    icons: 'アイコン',
    noArtwork: 'このバリアントにアートワークはありません。',
    surfaceOpacity: 'サーフェスの不透明度',
    terminalOpacity: 'ターミナルの不透明度',
  },
  screens: {
    devices: 'デバイスで見る',
    tokens: 'トークン',
    phone: 'スマートフォン',
    tablet: 'タブレット',
    home: 'ホーム',
    conversation: '会話',
    terminal: 'ターミナル',
  },
  preview: {
    metaTitle: 'テーマプレビュー — 牧群',
    heading: 'テーマプレビュー',
    lead: '任意の場所にあるテーマを、ギャラリーと同じ方法で描画します。`source` に theme.json と assets/ を含むフォルダ、または .muqun-theme ファイルを指定してください。サーバーはクロスオリジンの読み取りを許可している必要があります。',
    source: 'ソース',
    noSource: 'ソースが指定されていません。アドレスに ?source=https://… を追加してください。',
    loading: 'テーマを読み込んでいます…',
    failed: 'このソースからテーマを読み込めませんでした。',
    refresh: 'ソースが変わったら再読み込み',
    updated: '更新',
  },
  making: {
    heading: '自分のテーマを作る',
    body: 'テーマは小さな ZIP です。色を記した JSON ファイルが一つと、画像を入れる assets フォルダ。ツールチェーンが雛形を作り、コントラストを検査し、パッケージ化します。リポジトリはプルリクエストで受け付けています。',
    repo: 'テーマを投稿する',
    cli: 'テーマのツールチェーン',
  },
};

const ko: ThemesCopy = {
  metaTitle: '테마 — Muqun',
  metaDescription: 'Muqun 커뮤니티 테마를 테마 파일 자체에서 그려 미리 봅니다. 모든 색상, 라이트와 다크 두 변형, 함께 담긴 아트워크까지, 휴대폰과 태블릿에서.',
  eyebrow: 'Muqun · 테마',
  heading: '테마',
  lead: '커뮤니티 저장소의 모든 테마를 각자의 .muqun-theme 파일에서 직접 그려 보여 줍니다. 라이트와 다크 두 변형, 휴대폰과 태블릿, 터미널 팔레트, 아트워크. 내려받아 앱에서 가져오세요.',
  repoCta: '저장소 둘러보기',
  loading: '테마 목록을 불러오는 중…',
  empty: '아직 게시된 테마가 없습니다. 첫 번째 테마는 당신의 것일 수 있습니다.',
  failed: '지금은 테마 목록을 불러올 수 없습니다.',
  retry: '다시 시도',
  count: '테마 {count}개',
  search: '테마 검색',
  noMatch: '“{query}”와 일치하는 테마가 없습니다.',
  card: {
    preview: '미리보기',
    loadPreview: '미리보기 불러오기 ({size})',
    loadingPreview: '패키지를 읽는 중…',
    previewFailed: '이 패키지를 읽을 수 없습니다.',
    download: '다운로드',
  },
  detail: {
    back: '모든 테마',
    download: '.muqun-theme 다운로드',
    source: '소스',
    install: '파일을 내려받은 뒤 Muqun으로 열거나, 설정 → 테마에서 가져오세요.',
    version: '버전',
    author: '만든이',
    license: '라이선스',
    minApp: '필요한 Muqun 버전',
    size: '크기',
    assets: '이미지',
    light: '라이트',
    dark: '다크',
    surfaces: '표면',
    text: '텍스트',
    accents: '강조색',
    terminal: '터미널',
    ansi: 'ANSI 색상',
    decorations: '장식 슬롯',
    icons: '아이콘',
    noArtwork: '이 변형에는 아트워크가 없습니다.',
    surfaceOpacity: '표면 불투명도',
    terminalOpacity: '터미널 불투명도',
  },
  screens: {
    devices: '기기에서 보기',
    tokens: '토큰',
    phone: '휴대폰',
    tablet: '태블릿',
    home: '홈',
    conversation: '대화',
    terminal: '터미널',
  },
  preview: {
    metaTitle: '테마 미리보기 — Muqun',
    heading: '테마 미리보기',
    lead: '어디에 있는 테마든 갤러리와 같은 방식으로 그립니다. `source`에 theme.json과 assets/가 있는 폴더 또는 .muqun-theme 파일을 지정하세요. 서버가 교차 출처 읽기를 허용해야 합니다.',
    source: '소스',
    noSource: '소스가 지정되지 않았습니다. 주소에 ?source=https://… 를 추가하세요.',
    loading: '테마를 불러오는 중…',
    failed: '이 소스에서 테마를 불러올 수 없습니다.',
    refresh: '소스가 바뀌면 다시 불러오기',
    updated: '업데이트됨',
  },
  making: {
    heading: '직접 만들기',
    body: '테마는 작은 ZIP 파일입니다. 색상을 담은 JSON 파일 하나와 이미지를 담은 assets 폴더. 도구 모음이 뼈대를 만들고 대비를 검사하고 패키징합니다. 저장소는 풀 리퀘스트로 테마를 받습니다.',
    repo: '테마 기여하기',
    cli: '테마 도구 모음',
  },
};

const de: ThemesCopy = {
  metaTitle: 'Themes — Muqun',
  metaDescription: 'Community-Themes für Muqun, als Vorschau direkt aus den Theme-Dateien gezeichnet: jede Farbe, beide Varianten und die mitgelieferten Bilder, auf Telefon und Tablet.',
  eyebrow: 'Muqun · Themes',
  heading: 'Themes',
  lead: 'Jedes Theme aus dem Community-Repository, hier aus seiner eigenen .muqun-theme-Datei gezeichnet — beide Varianten, auf Telefon und Tablet, mit Terminal-Palette und Bildern. Herunterladen und in der App importieren.',
  repoCta: 'Repository ansehen',
  loading: 'Theme-Liste wird geladen …',
  empty: 'Noch wurde kein Theme veröffentlicht. Das erste könnte deins sein.',
  failed: 'Die Theme-Liste konnte gerade nicht geladen werden.',
  retry: 'Erneut versuchen',
  count: '{count} Themes',
  search: 'Themes durchsuchen',
  noMatch: 'Keine Themes passen zu „{query}“.',
  card: {
    preview: 'Vorschau',
    loadPreview: 'Vorschau laden ({size})',
    loadingPreview: 'Paket wird gelesen …',
    previewFailed: 'Dieses Paket konnte nicht gelesen werden.',
    download: 'Herunterladen',
  },
  detail: {
    back: 'Alle Themes',
    download: '.muqun-theme herunterladen',
    source: 'Quelle',
    install: 'Datei herunterladen, dann mit Muqun öffnen oder unter Einstellungen → Themes importieren.',
    version: 'Version',
    author: 'Autor',
    license: 'Lizenz',
    minApp: 'Benötigt Muqun',
    size: 'Größe',
    assets: 'Bilder',
    light: 'Hell',
    dark: 'Dunkel',
    surfaces: 'Flächen',
    text: 'Text',
    accents: 'Akzente',
    terminal: 'Terminal',
    ansi: 'ANSI-Farben',
    decorations: 'Dekorations-Slots',
    icons: 'Symbole',
    noArtwork: 'Keine Bilder in dieser Variante.',
    surfaceOpacity: 'Deckkraft der Flächen',
    terminalOpacity: 'Deckkraft des Terminals',
  },
  screens: {
    devices: 'Auf dem Gerät',
    tokens: 'Die Tokens',
    phone: 'Telefon',
    tablet: 'Tablet',
    home: 'Start',
    conversation: 'Unterhaltung',
    terminal: 'Terminal',
  },
  preview: {
    metaTitle: 'Theme-Vorschau — Muqun',
    heading: 'Theme-Vorschau',
    lead: 'Ein Theme von irgendwo, gezeichnet wie in der Galerie. `source` zeigt auf einen Ordner mit theme.json und assets/ oder auf eine .muqun-theme-Datei, auf einem Server, der Cross-Origin-Lesen erlaubt.',
    source: 'Quelle',
    noSource: 'Keine Quelle angegeben. Hänge ?source=https://… an die Adresse an.',
    loading: 'Theme wird geladen …',
    failed: 'Das Theme konnte von dieser Quelle nicht geladen werden.',
    refresh: 'Neu laden, wenn sich die Quelle ändert',
    updated: 'Aktualisiert',
  },
  making: {
    heading: 'Eigenes Theme bauen',
    body: 'Ein Theme ist ein kleines ZIP: eine JSON-Datei mit Farben und ein assets-Ordner mit Bildern. Die Werkzeuge legen eines an, prüfen den Kontrast und packen es; das Repository nimmt Themes als Pull Requests an.',
    repo: 'Theme beisteuern',
    cli: 'Die Theme-Werkzeuge',
  },
};

const fr: ThemesCopy = {
  metaTitle: 'Thèmes — Muqun',
  metaDescription: 'Les thèmes communautaires de Muqun, prévisualisés à partir des fichiers de thème eux-mêmes : chaque couleur, les deux variantes et les images fournies, sur téléphone et tablette.',
  eyebrow: 'Muqun · Thèmes',
  heading: 'Thèmes',
  lead: 'Chaque thème du dépôt communautaire, dessiné ici à partir de son propre fichier .muqun-theme — les deux variantes, sur téléphone et tablette, avec la palette du terminal et les images. Téléchargez-en un et importez-le dans l’application.',
  repoCta: 'Parcourir le dépôt',
  loading: 'Chargement de la liste des thèmes…',
  empty: 'Aucun thème n’a encore été publié. Le premier pourrait être le vôtre.',
  failed: 'La liste des thèmes n’a pas pu être chargée pour le moment.',
  retry: 'Réessayer',
  count: '{count} thèmes',
  search: 'Rechercher un thème',
  noMatch: 'Aucun thème ne correspond à « {query} ».',
  card: {
    preview: 'Aperçu',
    loadPreview: 'Charger l’aperçu ({size})',
    loadingPreview: 'Lecture du paquet…',
    previewFailed: 'Ce paquet n’a pas pu être lu.',
    download: 'Télécharger',
  },
  detail: {
    back: 'Tous les thèmes',
    download: 'Télécharger le .muqun-theme',
    source: 'Source',
    install: 'Téléchargez le fichier, puis ouvrez-le avec Muqun ou importez-le dans Réglages → Thèmes.',
    version: 'Version',
    author: 'Auteur',
    license: 'Licence',
    minApp: 'Nécessite Muqun',
    size: 'Taille',
    assets: 'Images',
    light: 'Clair',
    dark: 'Sombre',
    surfaces: 'Surfaces',
    text: 'Texte',
    accents: 'Accents',
    terminal: 'Terminal',
    ansi: 'Couleurs ANSI',
    decorations: 'Emplacements décoratifs',
    icons: 'Icônes',
    noArtwork: 'Aucune image dans cette variante.',
    surfaceOpacity: 'Opacité des surfaces',
    terminalOpacity: 'Opacité du terminal',
  },
  screens: {
    devices: 'Sur un appareil',
    tokens: 'Les jetons',
    phone: 'Téléphone',
    tablet: 'Tablette',
    home: 'Accueil',
    conversation: 'Conversation',
    terminal: 'Terminal',
  },
  preview: {
    metaTitle: 'Aperçu de thème — Muqun',
    heading: 'Aperçu de thème',
    lead: 'Un thème venu de n’importe où, dessiné comme dans la galerie. Faites pointer `source` vers un dossier contenant theme.json et assets/, ou vers un fichier .muqun-theme, sur un serveur qui autorise les lectures cross-origin.',
    source: 'Source',
    noSource: 'Aucune source indiquée. Ajoutez ?source=https://… à l’adresse.',
    loading: 'Chargement du thème…',
    failed: 'Le thème n’a pas pu être chargé depuis cette source.',
    refresh: 'Recharger quand la source change',
    updated: 'Mis à jour',
  },
  making: {
    heading: 'Créez le vôtre',
    body: 'Un thème est un petit ZIP : un fichier JSON de couleurs et un dossier assets d’images. L’outillage en génère un, vérifie son contraste et l’empaquette ; le dépôt les accepte par pull request.',
    repo: 'Proposer un thème',
    cli: 'L’outillage des thèmes',
  },
};

const es: ThemesCopy = {
  metaTitle: 'Temas — Muqun',
  metaDescription: 'Temas de la comunidad para Muqun, previsualizados a partir de los propios archivos de tema: cada color, ambas variantes y las imágenes que incluyen, en teléfono y tableta.',
  eyebrow: 'Muqun · Temas',
  heading: 'Temas',
  lead: 'Cada tema del repositorio de la comunidad, dibujado aquí a partir de su propio archivo .muqun-theme: ambas variantes, en teléfono y tableta, con la paleta del terminal y las imágenes. Descarga uno e impórtalo en la app.',
  repoCta: 'Explorar el repositorio',
  loading: 'Cargando la lista de temas…',
  empty: 'Todavía no se ha publicado ningún tema. El primero podría ser el tuyo.',
  failed: 'No se pudo cargar la lista de temas en este momento.',
  retry: 'Reintentar',
  count: '{count} temas',
  search: 'Buscar temas',
  noMatch: 'Ningún tema coincide con «{query}».',
  card: {
    preview: 'Vista previa',
    loadPreview: 'Cargar vista previa ({size})',
    loadingPreview: 'Leyendo el paquete…',
    previewFailed: 'No se pudo leer este paquete.',
    download: 'Descargar',
  },
  detail: {
    back: 'Todos los temas',
    download: 'Descargar el .muqun-theme',
    source: 'Fuente',
    install: 'Descarga el archivo y ábrelo con Muqun, o impórtalo en Ajustes → Temas.',
    version: 'Versión',
    author: 'Autor',
    license: 'Licencia',
    minApp: 'Requiere Muqun',
    size: 'Tamaño',
    assets: 'Imágenes',
    light: 'Claro',
    dark: 'Oscuro',
    surfaces: 'Superficies',
    text: 'Texto',
    accents: 'Acentos',
    terminal: 'Terminal',
    ansi: 'Colores ANSI',
    decorations: 'Ranuras de decoración',
    icons: 'Iconos',
    noArtwork: 'Esta variante no tiene imágenes.',
    surfaceOpacity: 'Opacidad de las superficies',
    terminalOpacity: 'Opacidad del terminal',
  },
  screens: {
    devices: 'En un dispositivo',
    tokens: 'Los tokens',
    phone: 'Teléfono',
    tablet: 'Tableta',
    home: 'Inicio',
    conversation: 'Conversación',
    terminal: 'Terminal',
  },
  preview: {
    metaTitle: 'Vista previa de tema — Muqun',
    heading: 'Vista previa de tema',
    lead: 'Un tema desde cualquier lugar, dibujado como lo dibuja la galería. Apunta `source` a una carpeta con theme.json y assets/, o a un archivo .muqun-theme, en un servidor que permita lecturas cross-origin.',
    source: 'Fuente',
    noSource: 'No se indicó ninguna fuente. Añade ?source=https://… a la dirección.',
    loading: 'Cargando el tema…',
    failed: 'No se pudo cargar el tema desde esta fuente.',
    refresh: 'Recargar cuando la fuente cambie',
    updated: 'Actualizado',
  },
  making: {
    heading: 'Crea el tuyo',
    body: 'Un tema es un ZIP pequeño: un archivo JSON con los colores y una carpeta assets con imágenes. Las herramientas generan uno, comprueban su contraste y lo empaquetan; el repositorio los acepta como pull requests.',
    repo: 'Contribuir un tema',
    cli: 'Las herramientas de temas',
  },
};

const pt: ThemesCopy = {
  metaTitle: 'Temas — Muqun',
  metaDescription: 'Temas da comunidade para o Muqun, pré-visualizados a partir dos próprios arquivos de tema: cada cor, ambas as variantes e as imagens que acompanham, no celular e no tablet.',
  eyebrow: 'Muqun · Temas',
  heading: 'Temas',
  lead: 'Cada tema do repositório da comunidade, desenhado aqui a partir do seu próprio arquivo .muqun-theme — ambas as variantes, no celular e no tablet, com a paleta do terminal e as imagens. Baixe um e importe no app.',
  repoCta: 'Explorar o repositório',
  loading: 'Carregando a lista de temas…',
  empty: 'Nenhum tema foi publicado ainda. O primeiro pode ser o seu.',
  failed: 'Não foi possível carregar a lista de temas agora.',
  retry: 'Tentar de novo',
  count: '{count} temas',
  search: 'Pesquisar temas',
  noMatch: 'Nenhum tema corresponde a “{query}”.',
  card: {
    preview: 'Pré-visualizar',
    loadPreview: 'Carregar pré-visualização ({size})',
    loadingPreview: 'Lendo o pacote…',
    previewFailed: 'Não foi possível ler este pacote.',
    download: 'Baixar',
  },
  detail: {
    back: 'Todos os temas',
    download: 'Baixar o .muqun-theme',
    source: 'Fonte',
    install: 'Baixe o arquivo e abra com o Muqun, ou importe em Ajustes → Temas.',
    version: 'Versão',
    author: 'Autor',
    license: 'Licença',
    minApp: 'Requer Muqun',
    size: 'Tamanho',
    assets: 'Imagens',
    light: 'Claro',
    dark: 'Escuro',
    surfaces: 'Superfícies',
    text: 'Texto',
    accents: 'Destaques',
    terminal: 'Terminal',
    ansi: 'Cores ANSI',
    decorations: 'Espaços de decoração',
    icons: 'Ícones',
    noArtwork: 'Esta variante não tem imagens.',
    surfaceOpacity: 'Opacidade das superfícies',
    terminalOpacity: 'Opacidade do terminal',
  },
  screens: {
    devices: 'Em um aparelho',
    tokens: 'Os tokens',
    phone: 'Celular',
    tablet: 'Tablet',
    home: 'Início',
    conversation: 'Conversa',
    terminal: 'Terminal',
  },
  preview: {
    metaTitle: 'Pré-visualização de tema — Muqun',
    heading: 'Pré-visualização de tema',
    lead: 'Um tema de qualquer lugar, desenhado como a galeria desenha. Aponte `source` para uma pasta com theme.json e assets/, ou para um arquivo .muqun-theme, em um servidor que permita leituras cross-origin.',
    source: 'Fonte',
    noSource: 'Nenhuma fonte informada. Adicione ?source=https://… ao endereço.',
    loading: 'Carregando o tema…',
    failed: 'Não foi possível carregar o tema desta fonte.',
    refresh: 'Recarregar quando a fonte mudar',
    updated: 'Atualizado',
  },
  making: {
    heading: 'Crie o seu',
    body: 'Um tema é um ZIP pequeno: um arquivo JSON com as cores e uma pasta assets com imagens. As ferramentas geram um, verificam o contraste e empacotam; o repositório os recebe como pull requests.',
    repo: 'Contribuir com um tema',
    cli: 'As ferramentas de tema',
  },
};

const ru: ThemesCopy = {
  metaTitle: 'Темы — Muqun',
  metaDescription: 'Темы сообщества для Muqun с предпросмотром прямо из файлов тем: каждый цвет, оба варианта и входящие в комплект изображения — на телефоне и планшете.',
  eyebrow: 'Muqun · Темы',
  heading: 'Темы',
  lead: 'Каждая тема из репозитория сообщества, нарисованная здесь из её собственного файла .muqun-theme: оба варианта, на телефоне и планшете, с палитрой терминала и изображениями. Скачайте и импортируйте в приложение.',
  repoCta: 'Открыть репозиторий',
  loading: 'Загружаем список тем…',
  empty: 'Пока не опубликовано ни одной темы. Первой может стать ваша.',
  failed: 'Сейчас не удалось загрузить список тем.',
  retry: 'Повторить',
  count: 'Тем: {count}',
  search: 'Поиск тем',
  noMatch: 'Нет тем по запросу «{query}».',
  card: {
    preview: 'Предпросмотр',
    loadPreview: 'Загрузить предпросмотр ({size})',
    loadingPreview: 'Читаем пакет…',
    previewFailed: 'Не удалось прочитать этот пакет.',
    download: 'Скачать',
  },
  detail: {
    back: 'Все темы',
    download: 'Скачать .muqun-theme',
    source: 'Исходник',
    install: 'Скачайте файл и откройте его в Muqun или импортируйте в разделе Настройки → Темы.',
    version: 'Версия',
    author: 'Автор',
    license: 'Лицензия',
    minApp: 'Требуется Muqun',
    size: 'Размер',
    assets: 'Изображения',
    light: 'Светлая',
    dark: 'Тёмная',
    surfaces: 'Поверхности',
    text: 'Текст',
    accents: 'Акценты',
    terminal: 'Терминал',
    ansi: 'Цвета ANSI',
    decorations: 'Слоты оформления',
    icons: 'Значки',
    noArtwork: 'В этом варианте нет изображений.',
    surfaceOpacity: 'Непрозрачность поверхностей',
    terminalOpacity: 'Непрозрачность терминала',
  },
  screens: {
    devices: 'На устройстве',
    tokens: 'Токены',
    phone: 'Телефон',
    tablet: 'Планшет',
    home: 'Главная',
    conversation: 'Диалог',
    terminal: 'Терминал',
  },
  preview: {
    metaTitle: 'Предпросмотр темы — Muqun',
    heading: 'Предпросмотр темы',
    lead: 'Тема из любого места, нарисованная так же, как в галерее. Укажите в `source` папку с theme.json и assets/ или файл .muqun-theme на сервере, разрешающем кросс-доменное чтение.',
    source: 'Источник',
    noSource: 'Источник не указан. Добавьте к адресу ?source=https://….',
    loading: 'Загружаем тему…',
    failed: 'Не удалось загрузить тему из этого источника.',
    refresh: 'Перезагружать при изменении источника',
    updated: 'Обновлено',
  },
  making: {
    heading: 'Сделайте свою',
    body: 'Тема — это небольшой ZIP: один JSON-файл с цветами и папка assets с изображениями. Инструменты создают заготовку, проверяют контраст и упаковывают её; репозиторий принимает темы через pull request.',
    repo: 'Предложить тему',
    cli: 'Инструменты для тем',
  },
};

const vi: ThemesCopy = {
  metaTitle: 'Chủ đề — Muqun',
  metaDescription: 'Các chủ đề cộng đồng cho Muqun, xem trước trực tiếp từ chính tệp chủ đề: mọi màu sắc, cả hai biến thể và hình ảnh đi kèm, trên điện thoại và máy tính bảng.',
  eyebrow: 'Muqun · Chủ đề',
  heading: 'Chủ đề',
  lead: 'Mọi chủ đề trong kho cộng đồng, được vẽ tại đây từ chính tệp .muqun-theme của nó — cả hai biến thể, trên điện thoại và máy tính bảng, với bảng màu terminal và hình ảnh. Tải về và nhập vào ứng dụng.',
  repoCta: 'Xem kho lưu trữ',
  loading: 'Đang tải danh sách chủ đề…',
  empty: 'Chưa có chủ đề nào được công bố. Chủ đề đầu tiên có thể là của bạn.',
  failed: 'Hiện không tải được danh sách chủ đề.',
  retry: 'Thử lại',
  count: '{count} chủ đề',
  search: 'Tìm chủ đề',
  noMatch: 'Không có chủ đề nào khớp với “{query}”.',
  card: {
    preview: 'Xem trước',
    loadPreview: 'Tải bản xem trước ({size})',
    loadingPreview: 'Đang đọc gói…',
    previewFailed: 'Không đọc được gói này.',
    download: 'Tải về',
  },
  detail: {
    back: 'Tất cả chủ đề',
    download: 'Tải .muqun-theme',
    source: 'Mã nguồn',
    install: 'Tải tệp về, rồi mở bằng Muqun hoặc nhập trong Cài đặt → Chủ đề.',
    version: 'Phiên bản',
    author: 'Tác giả',
    license: 'Giấy phép',
    minApp: 'Yêu cầu Muqun',
    size: 'Kích thước',
    assets: 'Hình ảnh',
    light: 'Sáng',
    dark: 'Tối',
    surfaces: 'Bề mặt',
    text: 'Chữ',
    accents: 'Màu nhấn',
    terminal: 'Terminal',
    ansi: 'Màu ANSI',
    decorations: 'Vị trí trang trí',
    icons: 'Biểu tượng',
    noArtwork: 'Biến thể này không có hình ảnh.',
    surfaceOpacity: 'Độ mờ bề mặt',
    terminalOpacity: 'Độ mờ terminal',
  },
  screens: {
    devices: 'Trên thiết bị',
    tokens: 'Các token',
    phone: 'Điện thoại',
    tablet: 'Máy tính bảng',
    home: 'Trang chủ',
    conversation: 'Hội thoại',
    terminal: 'Terminal',
  },
  preview: {
    metaTitle: 'Xem trước chủ đề — Muqun',
    heading: 'Xem trước chủ đề',
    lead: 'Một chủ đề từ bất kỳ đâu, được vẽ theo cách của thư viện. Trỏ `source` tới một thư mục chứa theme.json và assets/, hoặc một tệp .muqun-theme, trên máy chủ cho phép đọc cross-origin.',
    source: 'Nguồn',
    noSource: 'Chưa có nguồn. Thêm ?source=https://… vào địa chỉ.',
    loading: 'Đang tải chủ đề…',
    failed: 'Không tải được chủ đề từ nguồn này.',
    refresh: 'Tải lại khi nguồn thay đổi',
    updated: 'Đã cập nhật',
  },
  making: {
    heading: 'Tự tạo chủ đề',
    body: 'Một chủ đề là một tệp ZIP nhỏ: một tệp JSON chứa màu sắc và một thư mục assets chứa hình ảnh. Bộ công cụ tạo khung, kiểm tra độ tương phản và đóng gói; kho lưu trữ nhận chủ đề qua pull request.',
    repo: 'Đóng góp chủ đề',
    cli: 'Bộ công cụ chủ đề',
  },
};

export const themesCopy: Record<SiteLocale, ThemesCopy> = {
  en,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  ja,
  ko,
  de,
  fr,
  es,
  pt,
  ru,
  vi,
};
