import type { UserGuide } from './types';

export const zhCN: UserGuide = {
  metaTitle: '牧群 用户指南与参考手册',
  metaDescription:
    '安装 Gateway、手机配对、工作区管理、终端按键行、OpenCode 自主AI助手、主题定制及连接排错的完整指南。',
  hero: {
    badge: '用户指南 · 参考手册',
    heading: '触手可及，掌控你的每一台机器。',
    lead: '牧群将手机与你自己的电脑或服务器直接相连。了解如何安装与配置 Gateway、管理终端工作区、驱动 OpenCode 自主AI助手、安装主题并排查连接故障。',
    startCta: '开始使用 ↓',
    diagnosticsCta: '故障排查 ↓',
    issueCta: '反馈问题',
  },
  contentsLabel: '本页目录',
  contents: [
    {
      id: 'get-started',
      label: '开始使用',
      nav: '开始',
      meta: '操作步骤 · 约 5 分钟',
      desc: '安装 Gateway、选择启动模式、二维码配对及本地局域网连接。',
    },
    {
      id: 'terminal',
      label: '终端使用',
      nav: '终端',
      meta: 'tmux · herdr',
      desc: '工作区、分组、面板、专为移动端设计的按键行与开发工具。',
    },
    {
      id: 'opencode',
      label: 'OpenCode AI助手',
      nav: 'AI助手',
      meta: '自主AI助手',
      desc: '本地服务、模型选择、带内联 Diff 的工具调用与权限确认表单。',
    },
    {
      id: 'gateway',
      label: '配置 Gateway',
      nav: '网关',
      meta: 'config.json 参考',
      desc: '配置参数字典、端口绑定、守护进程服务模式与管理器快捷键。',
    },
    {
      id: 'themes',
      label: '主题系统',
      nav: '主题',
      meta: '内置 24 款主题包',
      desc: '视觉主题、.muqun-theme 包格式、背景透明度调节与主题制作。',
    },
    {
      id: 'troubleshooting',
      label: '故障排查',
      nav: '排查',
      meta: '连接诊断与速查',
      desc: '快速检查清单、配对失败排查、验证码过期及常见故障解决方法。',
    },
    {
      id: 'contact',
      label: '联系与支持',
      nav: '反馈',
      meta: 'github · issues',
      desc: 'Issue 提交清单、脱敏安全规范与隐私保障承诺。',
    },
  ],

  getStarted: {
    eyebrow: 'muqun-gateway',
    heading: '安装 Gateway，配对你的手机。',
    lead: '牧群仅与你自己电脑上的一个程序通信：Gateway。在电脑上安装并启动它，然后用手机完成一次配对。无需注册任何账号，你的任何数据都不会途经我们的服务器。',
    steps: [
      {
        title: '在电脑上运行安装脚本',
        body: '脚本会将单一二进制文件安装至 ~/.local/bin/muqun-gateway，完成初始配置，并在首次运行时自动打开配对界面。支持 macOS 与 Linux；暂不支持 Windows。',
        commands: [{ code: 'curl -fsSL https://muqun.dev/gateway.sh | sh', label: 'install' }],
      },
      {
        title: '选择两种运行模式之一启动',
        body: '你可以手动启动它，也可以将其交由系统托管保活。两种方式都能启动 Gateway，区别在于系统重启后的行为。',
        commands: [
          {
            code: 'muqun-gateway start',
            label: 'direct',
            detail:
              '在后台运行，关闭终端后依然保持运行，直到电脑重启。运行 muqun-gateway stop 即可停止。',
          },
          {
            code: 'muqun-gateway service install',
            label: 'service',
            detail:
              '注册到当前用户的初始化系统（Linux 下为 systemd 用户单元，macOS 下为 LaunchAgent）。开机登录后自动启动，崩溃或重启后自动恢复。运行 muqun-gateway service uninstall 可注销服务并保留已配对设备。',
          },
        ],
        note: '二选一，切勿同时使用：安装系统服务后，手动执行 stop 会被服务守护进程立即拉起。',
      },
      {
        title: '打开配对管理器',
        body: '无论采用哪种启动方式，这都是下一步。管理器是终端里的全屏面板，显示配对二维码、运行状态以及当前持有访问凭证的所有设备。安装脚本首次会自动打开；后续你可以随时用此命令重新打开。',
        commands: [{ code: 'muqun-gateway manage', label: 'pair' }],
      },
      {
        title: '扫码并输入确认短码',
        body: '在手机上的牧群中扫描二维码。电脑屏幕上会显示一组形如 XXXX-XXXX 的短码，在 App 中输入即可完成配对。单凭扫码无法完成配对——输入短码才能证明拿着手机的人就是电脑前的你。',
      },
    ],
    requirements: [
      'macOS 或 Linux，必须是你拥有控制权的电脑。目前暂不支持 Windows。',
      '已预先安装 tmux 或 Herdr（0.7.5 或更新版本）——Gateway 负责驱动它们，而非取代它们。',
      '两台设备处于同一个私有网络（例如连接同一个 Wi-Fi 或局域网）。',
      '无账号系统、无订阅收费，中间没有任何我们的中继节点。',
    ],
    pairingNote:
      '无法扫码？可以在 App 中手动输入 Gateway 地址（管理器会打印当前发布的连接地址），然后再输入相同的短码。',
    codeNote:
      '短码有效期为 5 分钟，输错 8 次后将作废。在管理器中按 p 键可立即刷新生成全新的二维码和确认码。',
    networkBadge: '',
    networkHeading: '',
    networkBody: '',
  },

  gateway: {
    eyebrow: 'config.json',
    heading: '配置 Gateway。',
    lead: '大多数人无需手动修改配置。仅在特定需求下需要调整：更换端口、随系统开机自启、或 OpenCode 安装在非标准路径等。',
    configHeading: '配置文件结构',
    configBody:
      '配置采用 JSON 格式，Gateway 在安装配置时会自动生成。只有在需要调整下列键值时才需手动编辑，编辑后必须重启 Gateway——配置仅在启动时读取，运行中的 Gateway 不会自动检测文件变动。在 macOS 上该文件位于 ~/Library/Application Support/muqun-gateway/；同级目录下存放 pairing.json；已配对设备、推送凭证及运行日志存放在状态目录 ~/.local/share/muqun-gateway/。',
    configPathLabel: 'linux',
    configPath: '~/.config/muqun-gateway/config.json',
    configKeys: [
      { term: 'label', detail: 'App 中为这台电脑显示的自定义名称。' },
      {
        term: 'listen',
        detail:
          '监听的 Socket 地址（主机与端口）。默认为 0.0.0.0:23847；如果对外发布的地址是回环地址，则绑定到 127.0.0.1。',
      },
      {
        term: 'public_url',
        detail:
          '编码到配对二维码中的连接地址——即手机实际拨号访问的地址。建议在管理器中按 u 修改，而非手动编辑。',
      },
      {
        term: 'transport_encryption',
        detail:
          '传输加密配置，默认必选（required）。已配对设备会保持配对时的加密模式，修改此项仅影响后续新配对的设备。',
      },
      {
        term: 'sessions',
        detail:
          '此 Gateway 挂载的终端后端（tmux、Herdr，或两者同时）。可通过 muqun-gateway backend 进行管理。',
      },
      {
        term: 'autostart_backends',
        detail:
          '随 Gateway 启动自动拉起的终端后端。默认为空：启动终端服务必须由用户显式开启。',
      },
      {
        term: 'rich_agent_pushes',
        detail:
          '默认关闭。开启后，AI助手的问题及选项会直接嵌入到通知消息体中——这意味着终端文本会显示在锁屏并经过系统推送服务器，因此默认关闭。',
      },
      {
        term: 'opencode.autostart',
        detail:
          '默认开启：当 Gateway 检测到没有运行中的 OpenCode 服务时，会自动拉起。设置 "opencode": { "autostart": false } 可关闭自动拉起。',
      },
      {
        term: 'opencode.binary',
        detail:
          '指定启动的 OpenCode 二进制路径。未指定时，Gateway 会使用 ~/.opencode/bin 中的路径或系统 PATH。当后台服务无法继承登录 Shell 的 PATH 时，可用此项固定路径。',
      },
    ],
    portsHeading: '端口与绑定',
    portsRows: [
      { term: '默认端口', detail: '单个 TCP 端口，23847。' },
      { term: '修改端口', detail: '运行 muqun-gateway setup --port N，然后重启 Gateway。' },
      {
        term: '监听地址',
        detail:
          '当发布的地址为回环地址时监听 127.0.0.1，否则监听 0.0.0.0。',
      },
      {
        term: '私有网络',
        detail: '在同一个局域网或私有内网中通信，无需在路由器上做任何端口转发。',
      },
    ],
    modesHeading: '两种后台保活方式',
    modes: [
      {
        title: '手动后台启动',
        label: 'direct',
        code: 'muqun-gateway start',
        rows: [
          { term: '何时启动', detail: '手动执行命令时。' },
          { term: '何时停止', detail: '执行 muqun-gateway stop，或电脑重启后。' },
          { term: '重启后自启', detail: '否。' },
          { term: '如何卸载', detail: '无需卸载，直接 stop。' },
        ],
      },
      {
        title: '作为系统服务',
        label: 'service',
        code: 'muqun-gateway service install',
        rows: [
          { term: '何时启动', detail: '用户登录时自动启动，崩溃后自动拉起。' },
          { term: '何时停止', detail: '仅在执行 service uninstall 时停止。' },
          { term: '重启后自启', detail: '是。' },
          { term: '如何卸载', detail: '运行 service uninstall，已配对设备不受影响。' },
        ],
      },
    ],
    modesNote:
      'Linux 下为 systemd 用户单元，macOS 下为 LaunchAgent。绝不使用 root 权限，绝不超出用户主目录。',
    autostartHeading: 'OpenCode AI助手拉起机制',
    autostartSteps: [
      'Gateway 首先检查是否存在已健康运行的 OpenCode 服务，读取其发布在 ~/.local/state/opencode/service.json 中的地址。',
      '若已存在，则直接挂载附加，你原本运行的 opencode serve 会话得以完整保留。',
      '若未发现，Gateway 会自动执行 opencode serve --service 并加以监控。在运行过程中会持续监测状态文件，当 OpenCode 在新端口重启时能自动重新识别。',
    ],
    autostartNote:
      '电脑上未安装 OpenCode？Gateway 不会附加任何内容，仅手机端的 AI助手 面板会提示离线，终端功能完全不受任何影响。',
    autostartOffLabel: 'config.json',
    autostartOff: '"opencode": { "autostart": false }',
    managerHeading: '配对管理面板',
    managerBody:
      '运行 muqun-gateway manage 即可打开。面板内列出当前运行状态及所有已授权设备，支持以下快捷键：',
    managerKeys: [
      { term: 'p', detail: '重新显示配对二维码，以便添加新设备。' },
      { term: 'x', detail: '撤销选定设备的访问授权。' },
      { term: 'u', detail: '修改二维码中编码的连接地址；输入 a 可自动重新检测。' },
      { term: 's / t', detail: '无需退出管理器，直接启动或停止 Gateway。' },
      { term: 'm / h', detail: '添加 tmux 或 Herdr 后端；f 设为默认，d 移除后端。' },
      { term: 'e', detail: '切换传输加密模式（影响后续新配对的设备）。' },
      { term: 'q', detail: '退出管理器。退出绝不会关闭你的终端会话。' },
    ],
    capabilitiesHeading: '旧版 Gateway 向上兼容',
    capabilitiesBody:
      '牧群 App 会主动向 Gateway 询问其支持的能力特性，而非仅凭版本号猜测；缺少的能力会自动隐去而非抛出异常。因此旧版 Gateway 依然可以作为完美的终端使用：你只是暂时无法使用较新的特性面板，但连接绝不会中断。多AI助手协同（Subagent）是唯一有额外后端要求的特性——该会话需要连接 Herdr 0.9.0 或更新版本，tmux 会话暂不支持。缺少对应能力时，App 会明确提示需要升级哪个组件。',
    upgradeHeading: '版本升级',
    upgradeBody:
      '再次运行安装命令即可完成更新。它会直接原地替换二进制文件，并完整保留你的服务器身份密钥、连接地址、配置文件以及手机配对关系。若之前安装了系统服务，升级后请再执行一次 service install：服务单元包含子进程生命周期规则，重新刷新才能避免 Gateway 重启时意外连带终止终端会话。',
    logsHeading: '查看运行日志',
    logsBody:
      '直接启动模式下，Gateway 的日志写入 ~/.local/share/muqun-gateway/gateway.log，macOS LaunchAgent 亦同。Linux systemd 模式下日志写入系统日志中。若需更详尽信息，启动前可设置环境变量 MUQUN_LOG=debug（或 RUST_LOG=debug）；默认日志级别为 info。',
    logsCommandLabel: 'linux · 服务模式',
    logsCommand: 'journalctl --user -u dev.osuki.muqun-gateway',
  },

  terminal: {
    eyebrow: 'workspace · group.panel',
    heading: '真实终端体验。',
    lead: '这是你机器上的真实终端，而不是截屏或日志重放。Gateway 在你的电脑上驱动 tmux 或 Herdr，手机端直接渲染其内容——桌前留下的工作，在手机上原封不动接续，关闭 App 也不会对终端会话产生任何干扰。',
    shotAlt:
      '一个打开 TypeScript 文件的 nvim 窗格，底部包含同组内 Claude Code、nvim 与 zsh 标签，输入框上方带有专用按键行。',
    entries: [
      {
        term: '工作区、分组与终端',
        detail:
          '三个层级，定位格式为 工作区 · 分组.面板。工作区是你的项目工作目录，分组是其中的一组终端，终端就是单个 Shell。牧群在手机上一屏只显示一个终端而不切分小屏：在手机上分出多个窗格根本无法看清。',
      },
      {
        term: '层级间快速切换',
        detail:
          '左右滑动顶部标题胶囊可切换工作区。输入框上方的标签芯片可切换当前分组内的各个终端。如需跨分组或跨工作区跳转，展开面板抽屉即可点击直达。',
      },
      {
        term: '运行进程与面板抽屉',
        detail:
          '面板抽屉列出电脑上的所有工作区、分组与终端，也是新建终端的入口。长按某一行可弹出操作菜单，包括关闭窗格——关闭操作绝不会因误触而发生。',
      },
      {
        term: '终端专属按键行',
        detail:
          '输入框上方的一排按键提供了终端必需但手机键盘缺失的关键按键：Esc、Tab、⌃C、方向键，并能根据窗格当前运行的程序智能动态变换——Shell 下显示常用指令，Claude Code 下显示 ⇧TAB 与 ⌃O，nvim 下显示 :w 与 gg。nvim 插入模式下自动以 Esc 居首。点击键盘按钮可唤出完整虚拟按键面板。如果不需要，可在“设置 → 终端”中随时关闭该按键行。',
      },
      {
        term: '独立输入框（Composer）',
        detail:
          '等宽字体、支持多行输入，回车键直接换行——只有点击发送按钮才会执行命令，避免误触直接执行危险指令。输入框上方的提示文本会跟随当前窗格状态切换：执行终端命令、发送消息或在编辑器中输入。',
      },
      {
        term: '历史输出与平滑滚动',
        detail:
          '从终端顶部下拉可加载更多历史回滚输出，加载时会显示指示图标。一旦离开屏幕底部的实时流，点击出现的“最新”胶囊即可瞬时回底。正在阅读上方内容时，新输出绝不会强行把屏幕拽走。',
      },
      {
        term: '代码变更（Changes）',
        detail:
          '查看窗格所在目录的 Git 状态：已修改文件总数计数，支持“全部”、“暂存”与“未暂存”筛选，并能直接查看代码 Diff。按钮带有变更计数角标，仅在窗格处于 Git 仓库且 Gateway 支持 git_diff 能力时才会出现。',
      },
      {
        term: '文件浏览器（Files）',
        detail:
          '查看会话生成的所有内容——图片、代码与各类文档，支持搜索与筛选，无需离开 App 即可直接预览阅读。',
      },
      {
        term: '在浏览器中打开服务',
        detail:
          '输入本地开发服务监听的端口号，牧群会直接复用已有的连接通道打开它。完全不暴露至公网。若无法访问，通常是因为电脑上的服务仅绑定在了 127.0.0.1。',
      },
      {
        term: '快捷指令（Quick actions）',
        detail:
          '保存常用命令、常用 Prompt 与快捷键组合，最常用的操作排在最前。支持自由添加与编辑默认指令。',
      },
    ],
    note: '牧群始终只作为观察者：打开会话绝不会打乱你的窗口布局，关闭手机 App 也绝不会终止任何后台任务。',
  },

  opencode: {
    eyebrow: 'opencode serve --service',
    heading: 'OpenCode 自主AI助手。',
    lead: '专为 OpenCode 打造的专属界面，而非局促在终端里的简单字符交互：自由切换会话、以可视化卡片展示内联 Diff 的工具调用，AI助手的问题以交互式表单呈现，轻轻一点即可确认。',
    noSignInBadge: '本地运行时 · 零账号依赖',
    noSignInHeading: '你的电脑直连模型服务商。',
    noSignIn:
      '全程无需注册登录。牧群不提供账号体系，也不要求你填写 API 密钥，因为与大模型通信的不是手机 App，而是你自己电脑上的 OpenCode。你在电脑上配置好 Provider、模型、AI助手与技能，Gateway 绝不会中转传递任何凭据数据。',
    prerequisitesHeading: '使用前提',
    prerequisites: [
      '在运行 Gateway 的电脑上安装 OpenCode 2.0.1 或更高版本。',
      '在 OpenCode 中至少配置好一个模型服务商。支持配置各类免费模型，模型选择器内置“仅免费”过滤筛选项。',
      'OpenCode 服务正常运行。Gateway 默认会自动为你拉起该服务，也会自动挂载你手动启动的现有服务。',
      'Gateway 版本足够新并支持 AI助手 界面。如果版本过旧，OpenCode 按钮会自动隐藏，终端功能完全不受影响。',
    ],
    entries: [
      {
        term: '会话与子AI助手',
        detail:
          '每个会话都是拥有独立上下文的对话，支持按工作区或全局汇总展示。当一个任务衍生出子AI助手（Subagent）时，会以缩进卡片形式挂载在父会话下，复杂分工脉络依然一目了然。',
      },
      {
        term: '工作区切换',
        detail:
          '随时切换AI助手的工作目录，或手动输入路径开辟新工作区。选定工作区会直接恢复其最近一次的会话，无需每次从头开新对话。',
      },
      {
        term: '模型与AI助手身份',
        detail:
          '“选择模型”面板列出已配置服务商实际提供的可用模型列表，标明各模型上下文窗口大小，并在免费模型上标注 Free 角标。“选择AI助手”可在 Build、Plan、Explore 及电脑上配置的自定义 AI 助手间快速切换。',
      },
      {
        term: '斜杠命令与技能（Skills）',
        detail:
          '在输入框中输入 / 即可呼出指令菜单。部分指令由手机端直接响应（/new、/models、/compact、/undo、/export），其余指令透传至电脑端执行。电脑端配置的技能也会一并显示在列表中，执行时会在会话记录中清晰标出。',
      },
      {
        term: '附件发送与文件引用',
        detail:
          '支持发送照片、相册图片或任意文件。图片在发送时会自动重新编码，抹除 EXIF 等隐私元数据。在输入框输入 @ 可直接模糊搜索并引用工作区中的文件，省去手工描述的繁琐。',
      },
      {
        term: '权限确认与问题回答',
        detail:
          '当AI助手需要执行命令、修改文件或读取工作区外的文件时，会弹出确认卡片展示路径与细节，提供“允许”、“始终允许”与“拒绝”三个选项——与系统通知按钮文字完全一致，在锁屏界面即可直接审批。AI助手提问时会呈现为小表单供你填写。也支持开启“自动批准所有操作”以供近距观察，但极具破坏性的危险命令即便在此模式下依然会被强行拦截。',
      },
      {
        term: '后台任务与排队执行',
        detail:
          '耗时较长的工具调用可以一键脱离至后台运行，在顶部托盘中实时观察进度。当当前回合正在运行时，你新输入的内容可选择立即插入引导，或是在本轮结束后排队执行；排队中的消息在发送前支持随时撤回。',
      },
      {
        term: '上下文占用与自动压缩',
        detail:
          '上下文抽屉实时展示当前模型上下文窗口使用百分比、本次会话消耗的 Token 数量以及预估费用。当对话过长时会自动执行历史压缩，并在时间线中明确标记压缩发生的节点与是否为自动触发。',
      },
      {
        term: '版本回滚（Undo）',
        detail:
          '输入 /undo 可将工作区文件状态瞬时回滚到你上一条消息发出之前；输入 /redo 可取消尚未定稿的回滚。故意设计为显式命令而非单触按钮，杜绝意外误操作。',
      },
    ],
    note: '所有工具调用均以卡片呈现：文件修改卡片内嵌标准 Unified Diff 代码差异对比，与 Changes 审查视图保持完全一致。',
  },

  themes: {
    eyebrow: 'muqun.dev/themes',
    heading: '主题系统。',
    lead: '主题能够同时重绘 App 界面与终端配色，每一款主题包都包含明亮与暗色两套独立方案。App 内置 24 款经典主题，社区目录中更有丰富扩展。',
    entries: [
      {
        term: '内置 24 款精选主题',
        detail:
          '在“设置 → 外观 → 主题”中可直接选用，包括 Catppuccin、Gruvbox、Kanagawa、Rosé Pine、Tokyo Night 与 Everforest 等知名配色。颜色模式（跟随系统、明亮或暗色）决定显示该主题的哪个明暗分支，而不是替换主题本身。',
      },
      {
        term: '在线浏览主题目录',
        detail:
          '点击“浏览主题”可直接访问 muqun.dev 上的主题目录。只有当你点开某一款主题时才会发起下载，行内会预先标注包体积大小。',
      },
      {
        term: '主题包的文件构成',
        detail:
          '一个 .muqun-theme 文件本质上是一个 Zip 压缩包，内部包含一个 theme.json 配置文件及存放 PNG、JPEG 或 WebP 图片的 assets 资源文件夹——不允许包含其他任何文件。.muqun-theme.json 则是纯色主题的独立清单文件，不附带图片资源。',
      },
      {
        term: '主题清单涵盖的范围',
        detail:
          '每种模式下的 17 种界面颜色；终端的背景色、前景色、光标颜色、超链接与文字选中高亮，以及全部 16 个标准 ANSI 颜色槽位；覆盖 11 个核心界面的背景插画（从 Shell 背景到主页看板）；最多 3 个自定义图标（返回、发送、附件）；以及界面和终端的初始透明度设定。必须同时提供明亮与暗色两套方案。不允许使用外部字体、SVG 或动画文件。',
      },
      {
        term: '包体积与规格限制',
        detail:
          '清单文件体积上限为 256 KiB，最多包含 32 张图片且单张不超过 8 MiB，打包后的主题总大小上限为 25 MiB。',
      },
      {
        term: '从本地文件安装',
        detail:
          '通过文件管理器、AirDrop 或系统分享面板打开 .muqun-theme 文件，牧群会自动弹出导入提示，也可在主题抽屉中点击“导入文件”。若文件校验不通过会被整体拒绝，绝不会发生半生不熟的错误加载。',
      },
      {
        term: '从网络链接安装',
        detail:
          '“导入链接”支持输入公开主题 URL 或 GitHub 仓库地址（目前唯一支持的仓库托管源）。你可以指定分支、Commit 哈希，若清单不在根目录还可指定文件路径。在下载任何资源之前，审查卡片会明确告知图片资源的托管域名。',
      },
      {
        term: '在终端中一键安装',
        detail:
          '点击终端输出中出现的 .muqun-theme 文件路径，App 会弹出预览卡片：在你主动确认应用前，不会对现有环境产生任何影响。',
      },
      {
        term: '应用前全屏实时预览',
        detail:
          '无论通过哪种途径安装，流程均一致：主题下载、解压并处理好资源后，整个 App 会临时换装供你四处巡览体验。在你点击“应用主题”之前，现行主题完全不受影响。',
      },
      {
        term: '背景透明度微调',
        detail:
          '自定义主题提供两个独立滑块：“界面背景透明度”（仅调节彩色底色，不影响文字、图标与插画）与“终端背景透明度”（让 App 底图透射到终端文字后方）。两个滑块均支持全量程滑动，低于建议阈值时 App 会发出文字可读性警告，但绝不会强行阻止你。内置主题不提供透明度调节。',
      },
      {
        term: '亲手制作一款主题',
        detail:
          'App 内不设繁杂的调色器：主题是以工程化文件形式编写的。牧群提供专门的主题制作技能，你只需向AI助手描述你想要的视觉风格（点击“创建牧群主题”快捷指令即可唤起），AI助手便会自动产出配置文件、绘制素材并打包成可导入的主题。',
      },
      {
        term: '发布到社区目录',
        detail:
          '主题目录是一个公开的 GitHub 仓库并接收 Pull Request：将你的 src/<id> 目录提交 PR，合并后 CI 会自动打包，几分钟内便会收录在 muqun.dev 官网上。工具链会自动构建脚手架并在提交前严格校验色彩对比度。',
      },
      {
        term: '删除与空间清理',
        detail:
          '在主题列表中轻扫某一行并确认，即可从本机彻底移除该主题。“设置 → 存储空间”中还提供“清理未使用主题”功能，一键清除所有当前未穿戴的历史主题资源。',
      },
    ],
    galleryLink: '浏览主题目录',
  },

  troubleshooting: {
    eyebrow: '连接异常排查',
    heading: '故障排查与速查。',
    lead: '绝大多数连接问题都可以归结为四种原因之一：Gateway 未启动、手机无法访问其地址、设备配对凭证丢失，或电脑端的 OpenCode 服务未正常运行。',
    checksHeading: '快速检查清单',
    checks: [
      {
        term: '配对电脑',
        detail:
          '在自己的电脑上安装 Gateway（支持 tmux 或 Herdr），打开管理面板，在手机端牧群中扫描二维码，并在 App 中输入电脑上显示的确认码即可完成配对。',
      },
      {
        term: '排查连接',
        detail:
          '检查 tmux 或 Herdr（0.7.5+）以及最新版 Gateway 是否正在运行。确认手机与电脑处于同一个局域网络，然后在牧群中重新打开该服务器连接。',
      },
      {
        term: '移除设备',
        detail:
          '在牧群首页向左滑动删除服务器，即可撤销这台手机对该 Gateway 的授权。你也可以在电脑端 Gateway 管理面板中随时撤销任意已配对设备。',
      },
      {
        term: '恢复通知',
        detail:
          '在手机系统设置与牧群 App 设置中同时开启通知权限。重新打开已配对的服务器，以便牧群将最新的设备推送 Token 重新注册到 Gateway。',
      },
    ],
    entries: [
      {
        term: '无法完成配对',
        detail:
          '提示“无法连接到网关（Could not reach the gateway）”意味着二维码中编码的地址在当前手机网络环境下无法连通。在电脑上运行 muqun-gateway status 查看状态，确认手机能够访问该 IP 地址——例如处于同一个 Wi-Fi 或局域网络中。若 Gateway 仅绑定在本地回环地址（127.0.0.1），除本机外任何外部设备均无法直接访问；可在管理面板中按 u 绑定发布真实局域网 IP，或通过保存的 SSH 主机进行隧道连接配对。',
      },
      {
        term: '确认码被拒绝或已过期',
        detail:
          '短码由 8 位字符组成，有效期为 5 分钟，输错 8 次后将被强制废弃。在管理面板中按 p 键可重新生成一组全新的二维码与短码。短码字母表中已剔除了容易混淆的 0、1、I、L 和 O，若看到长相相似的字符请仔细甄别。',
      },
      {
        term: '状态指示圆点的含义',
        detail:
          '实心圆点表示 App 已经完成探测并拿到了明确响应：显示为绿色代表 ONLINE 在线，显示为灰色代表 OFFLINE 离线。空心圆环并标注 NOT CONNECTED 表示尚未发起探测——这并不是故障报错，点击打开服务器即可立即建立连接。',
      },
      {
        term: '提示需要重新配对',
        detail:
          '说明此手机对应的设备令牌在 Gateway 端已不存在——可能是在管理面板中手动撤销了授权，或是 Gateway 状态目录重建导致凭据丢失。重新完成一次扫码配对即可，手机上的其他配置与数据完全不受影响。',
      },
      {
        term: '未能找到 OpenCode 服务',
        detail:
          'AI助手界面提示 OpenCode service offline，并提示你在电脑上运行 opencode serve --service。在电脑上执行该命令，然后点击手机上的“重新检查”。如果电脑上已经在运行但依然提示找不到，通常是因为 Gateway 探测到的二进制路径与你手动运行的不同：在 config.json 中显式指定 opencode.binary 为完整绝对路径后重启 Gateway。',
      },
      {
        term: '模型显示为灰色，或没有免费模型',
        detail:
          '提示“需要在电脑端配置”意味着该服务商尚未在 OpenCode 中完成配置——在电脑端完成配置后重新打开选择器即可。“此主机无可用免费模型”说明“仅免费”过滤筛选项过滤掉了所有模型，并非系统故障；关闭该筛选项即可查看服务商提供的全部模型。牧群会在界面上展示每次会话的预估花销，但自身绝不收取任何模型费用，也不插手你与服务商之间的通信。',
      },
      {
        term: 'AI助手请求访问工作区之外的路径',
        detail:
          '提示“读取工作区外内容”或“写入工作区外内容”正如其字面意思，弹出的卡片上会清晰标出涉及的具体绝对路径。点击“允许”授权本次，“始终允许”记住该路径，“拒绝”则拦截本次操作。安全防护机制正在尽职尽责——审批前请务必仔细核对目标路径。',
      },
      {
        term: '找不到“代码变更（Changes）”按钮',
        detail:
          '该按钮仅在当前终端窗格处于 Git 仓库目录内、且 Gateway 版本足够新并支持 Diff 功能时才会显现。重新运行安装脚本升级 Gateway 即可。',
      },
      {
        term: '部分特性提示需要更新 Gateway',
        detail:
          '牧群会主动探测 Gateway 的功能支持集，旧版 Gateway 只是无法使用新特性，终端核心连接完全不受影响。将任务指派给子AI助手这一特性额外需要会话后端为 Herdr 0.9.0 或更高版本（tmux 会话暂不支持），当缺少时 App 会明确指出需要升级哪个组件。',
      },
    ],
  },

  contact: {
    eyebrow: 'github · issues',
    heading: '仍未解决？',
    lead: '前往 GitHub 提交 Issue。每一次功能迭代与缺陷修复都来源于此，每一条反馈都会被认真审阅。',
    reportHint:
      '请附上 App 版本号、Gateway 版本号，以及问题发生前的具体操作步骤。',
    issueCta: '在 GitHub 上提交 Issue',
    safetyHeading: '隐私保障与脱敏提交规范',
    safetyBody:
      '技术支持绝不需要你的访问令牌、完整的终端输出、源代码或配对二维码。在上传截图或日志前，请务必移除所有敏感凭据与密钥信息。',
    safetyLink: '阅读隐私政策',
  },
};
