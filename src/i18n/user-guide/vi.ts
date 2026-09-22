import type { UserGuide } from './types';

export const vi: UserGuide = {
  metaTitle: 'Hướng dẫn sử dụng & Tài liệu tham khảo Muqun',
  metaDescription:
    'Hướng dẫn toàn diện về cài đặt Gateway, ghép nối điện thoại, không gian làm việc, điều khiển terminal, agent tự trị OpenCode, chủ đề và khắc phục sự cố.',
  hero: {
    badge: 'HƯỚNG DẪN SỬ DỤNG · TÀI LIỆU THAM KHẢO',
    heading: 'Mọi thứ bạn cần để giữ máy tính luôn trong tầm tay.',
    lead: 'Muqun kết nối điện thoại trực tiếp với máy tính hoặc máy chủ của bạn. Tìm hiểu cách cài đặt và cấu hình Gateway, điều hướng không gian làm việc terminal, điều khiển agent tự trị OpenCode, cài đặt chủ đề và khắc phục sự cố kết nối.',
    startCta: 'Bắt đầu ↓',
    diagnosticsCta: 'Chẩn đoán ↓',
    issueCta: 'Tạo issue',
  },
  contentsLabel: 'Mục lục trang',
  contents: [
    {
      id: 'get-started',
      label: 'Bắt đầu',
      nav: 'Bắt đầu',
      meta: 'quy trình · ~5 phút',
      desc: 'Cài đặt Gateway, chọn chế độ khởi động, ghép nối mã QR và thiết lập tailnet.',
    },
    {
      id: 'terminal',
      label: 'Terminal',
      nav: 'Terminal',
      meta: 'tmux · herdr',
      desc: 'Không gian làm việc, nhóm, bảng điều khiển, hàng phím tùy chỉnh và công cụ phát triển di động.',
    },
    {
      id: 'opencode',
      label: 'Agent OpenCode',
      nav: 'Agent',
      meta: 'agent tự trị',
      desc: 'Dịch vụ agent cục bộ, mô hình, gọi công cụ kèm diff và biểu mẫu cấp quyền.',
    },
    {
      id: 'gateway',
      label: 'Cấu hình Gateway',
      nav: 'Gateway',
      meta: 'tham chiếu config.json',
      desc: 'Khóa cấu hình, cổng mạng, chế độ dịch vụ, tự khởi động và phím tắt quản lý.',
    },
    {
      id: 'themes',
      label: 'Chủ đề',
      nav: 'Chủ đề',
      meta: '24 gói tích hợp sẵn',
      desc: 'Chủ đề giao diện, định dạng gói .muqun-theme, thanh trượt độ mờ và tự tạo chủ đề.',
    },
    {
      id: 'troubleshooting',
      label: 'Khắc phục sự cố',
      nav: 'Sự cố',
      meta: 'chẩn đoán & kiểm tra',
      desc: 'Kiểm tra kết nối nhanh, lỗi ghép nối, mã hết hạn và các biện pháp khắc phục phổ biến.',
    },
    {
      id: 'contact',
      label: 'Liên hệ',
      nav: 'Liên hệ',
      meta: 'github · issues',
      desc: 'Danh sách kiểm tra báo cáo lỗi, hướng dẫn báo cáo an toàn và chính sách quyền riêng tư.',
    },
  ],

  getStarted: {
    eyebrow: 'muqun-gateway',
    heading: 'Cài đặt Gateway, sau đó ghép nối điện thoại.',
    lead: 'Muqun giao tiếp với một chương trình duy nhất trên máy tính của bạn: Gateway. Bạn cài đặt nó tại đó, khởi chạy và ghép nối điện thoại một lần. Không cần tạo tài khoản và không có bất kỳ dữ liệu nào của bạn đi qua máy chủ của chúng tôi.',
    steps: [
      {
        title: 'Chạy trình cài đặt trên máy tính của bạn',
        body: 'Trình cài đặt sẽ đặt một tệp nhị phân duy nhất tại ~/.local/bin/muqun-gateway, cấu hình nó và mở màn hình ghép nối trong lần chạy đầu tiên. Hỗ trợ macOS và Linux; Windows hiện chưa được hỗ trợ.',
        commands: [{ code: 'curl -fsSL https://muqun.dev/gateway.sh | sh', label: 'install' }],
      },
      {
        title: 'Khởi động Gateway theo một trong hai cách',
        body: 'Bạn có thể tự khởi động Gateway thủ công hoặc giao cho hệ thống tự duy trì tiến trình. Cả hai cách đều mang lại một Gateway đang hoạt động; điểm khác biệt là cách thức xử lý khi máy tính khởi động lại.',
        commands: [
          {
            code: 'muqun-gateway start',
            label: 'direct',
            detail:
              'Chạy dưới nền và tiếp tục chạy sau khi bạn đóng terminal — cho đến khi máy tính khởi động lại. Dùng muqun-gateway stop để dừng.',
          },
          {
            code: 'muqun-gateway service install',
            label: 'service',
            detail:
              'Đăng ký dịch vụ với hệ thống init của người dùng — systemd user unit trên Linux hoặc LaunchAgent trên macOS. Tự động khởi động khi đăng nhập và tự phục hồi sau sự cố hoặc khi khởi động lại máy. Dùng muqun-gateway service uninstall để gỡ bỏ đăng ký dịch vụ mà vẫn giữ nguyên các thiết bị đã ghép nối.',
          },
        ],
        note: 'Chỉ chọn một trong hai, không dùng đồng thời: khi đã cài đặt dạng service, lệnh stop sẽ bị trình giám sát dịch vụ tự động khởi động lại.',
      },
      {
        title: 'Mở trình quản lý ghép nối',
        body: 'Dù chọn cách khởi động nào, đây là bước tiếp theo. Trình quản lý là một bảng điều khiển toàn màn hình trong terminal hiển thị mã QR, trạng thái hoạt động và danh sách tất cả các thiết bị hiện có token. Trình cài đặt sẽ tự mở bảng này trong lần chạy đầu; bạn có thể dùng lệnh này để mở lại bất cứ lúc nào.',
        commands: [{ code: 'muqun-gateway manage', label: 'pair' }],
      },
      {
        title: 'Quét mã, sau đó nhập mã xác nhận',
        body: 'Quét mã QR bằng ứng dụng Muqun. Máy tính sau đó sẽ hiển thị một mã ngắn dạng XXXX-XXXX, nhập mã này vào ứng dụng để hoàn tất ghép nối. Chỉ quét mã QR là chưa đủ — mã xác nhận là bước xác minh chính bạn đang cầm thiết bị.',
      },
    ],
    requirements: [
      'macOS hoặc Linux trên máy tính bạn sở hữu. Windows hiện chưa được hỗ trợ.',
      'tmux hoặc Herdr 0.7.5 trở lên đã được cài đặt — Gateway điều khiển một trong hai công cụ này chứ không thay thế chúng.',
      'Cả hai thiết bị phải ở trong cùng một mạng riêng. Tailscale là giải pháp được khuyến nghị; sử dụng Tailscale Serve, không sử dụng Tailscale Funnel.',
      'Không cần tài khoản, không cần đăng ký trả phí và không có máy chủ trung gian nào của chúng tôi.',
    ],
    pairingNote:
      'Không thể quét mã? Nhập thủ công địa chỉ Gateway vào ứng dụng — trình quản lý có in sẵn địa chỉ đang xuất bản — sau đó nhập mã xác nhận ngắn tương ứng.',
    codeNote:
      'Mã xác nhận có hiệu lực trong 5 phút và sẽ bị vô hiệu hóa sau 8 lần nhập sai. Nhấn phím p trong trình quản lý để tạo mã QR và mã xác nhận mới.',
    networkBadge: 'MẠNG RIÊNG ĐƯỢC KHUYẾN NGHỊ',
    networkHeading: 'Sử dụng Tailscale trên cả hai thiết bị.',
    networkBody:
      'Chúng tôi đặc biệt khuyến nghị kết nối điện thoại và máy tính chạy Gateway vào cùng một tailnet Tailscale. Điều này giúp tránh việc mở cổng trên router (port forwarding) và giữ Gateway an toàn khỏi mạng internet công cộng. Tailscale Serve có thể cung cấp thêm địa chỉ HTTPS riêng; tuyệt đối không dùng Tailscale Funnel cho Muqun.',
  },

  gateway: {
    eyebrow: 'config.json',
    heading: 'Cấu hình Gateway.',
    lead: 'Hầu hết người dùng không bao giờ cần mở tệp cấu hình. Tệp này dành cho các trường hợp đặc biệt: đổi cổng mạng, thiết lập Gateway sống sót sau khi khởi động lại máy, hoặc máy tính đặt OpenCode ở đường dẫn không thông dụng.',
    configHeading: 'Tệp cấu hình',
    configBody:
      'Đây là tệp JSON và Gateway sẽ tự động tạo trong quá trình thiết lập. Chỉ chỉnh sửa thủ công khi bạn cần một trong các khóa cấu hình bên dưới và nhớ khởi động lại Gateway sau đó — cấu hình chỉ được đọc khi khởi động và Gateway đang chạy sẽ không nhận biết thay đổi. Trên macOS, tệp này nằm tại ~/Library/Application Support/muqun-gateway/. Bên cạnh là pairing.json; các thiết bị đã ghép nối, push token và nhật ký hoạt động nằm trong thư mục trạng thái ~/.local/share/muqun-gateway/.',
    configPathLabel: 'linux',
    configPath: '~/.config/muqun-gateway/config.json',
    configKeys: [
      { term: 'label', detail: 'Tên hiển thị của máy tính này trong ứng dụng di động.' },
      {
        term: 'listen',
        detail:
          'Socket mạng lắng nghe, bao gồm máy chủ và cổng. Mặc định là 0.0.0.0:23847, hoặc loopback nếu địa chỉ xuất bản là loopback.',
      },
      {
        term: 'public_url',
        detail:
          'Địa chỉ được mã hóa trong mã QR ghép nối — địa chỉ mà điện thoại sẽ thực sự kết nối tới. Nên đổi bằng phím u trong trình quản lý thay vì sửa thủ công.',
      },
      {
        term: 'transport_encryption',
        detail:
          'Mặc định là required, đây là mức an toàn khuyến nghị. Các thiết bị giữ nguyên chế độ lúc ghép nối, do đó việc thay đổi giá trị này chỉ áp dụng cho thiết bị ghép nối tiếp theo.',
      },
      {
        term: 'sessions',
        detail:
          'Backend terminal mà Gateway này gắn vào — tmux, Herdr hoặc cả hai cùng lúc. Quản lý thông qua lệnh muqun-gateway backend.',
      },
      {
        term: 'autostart_backends',
        detail:
          'Backend nào sẽ tự động khởi động cùng Gateway. Mặc định là rỗng: việc khởi chạy máy chủ terminal yêu cầu sự đồng ý rõ ràng.',
      },
      {
        term: 'rich_agent_pushes',
        detail:
          'Mặc định tắt (off). Khi bật, câu hỏi của agent và các lựa chọn trả lời sẽ được đưa trực tiếp vào nội dung thông báo đẩy — đồng nghĩa với việc văn bản terminal xuất hiện trên màn hình khóa và đi qua máy chủ của Apple và Google. Đó là lý do tùy chọn này mặc định tắt.',
      },
      {
        term: 'opencode.autostart',
        detail:
          'Mặc định bật (on): Gateway sẽ tự động khởi chạy OpenCode nếu không tìm thấy tiến trình nào đang hoạt động. Đặt "opencode": { "autostart": false } để bạn tự quản lý.',
      },
      {
        term: 'opencode.binary',
        detail:
          'Đường dẫn tệp nhị phân OpenCode cần khởi động. Nếu bỏ qua, Gateway sẽ sử dụng OpenCode trong ~/.opencode/bin hoặc trong PATH hệ thống. Dùng tùy chọn này để chỉ định tệp nhị phân cụ thể — hữu ích khi dịch vụ hệ thống không nhìn thấy PATH của shell đăng nhập.',
      },
    ],
    portsHeading: 'Cổng mạng (Ports)',
    portsRows: [
      { term: 'Mặc định', detail: 'Một cổng TCP duy nhất: 23847.' },
      { term: 'Thay đổi cổng', detail: 'Chạy muqun-gateway setup --port N, sau đó khởi động lại Gateway.' },
      {
        term: 'Địa chỉ lắng nghe',
        detail:
          '127.0.0.1 nếu địa chỉ xuất bản là loopback, ngược lại là 0.0.0.0.',
      },
      {
        term: 'Khi dùng tailnet',
        detail: 'Không cần cấu hình chuyển tiếp cổng (port forwarding) trên router, đây là lý do chúng tôi khuyến nghị dùng mạng riêng.',
      },
    ],
    modesHeading: 'Hai cách duy trì Gateway',
    modes: [
      {
        title: 'Tự khởi động thủ công',
        label: 'direct',
        code: 'muqun-gateway start',
        rows: [
          { term: 'Bắt đầu', detail: 'Khi bạn chạy lệnh.' },
          { term: 'Kết thúc', detail: 'Chạy muqun-gateway stop hoặc khi khởi động lại máy.' },
          { term: 'Sống sót sau reboot', detail: 'Không.' },
          { term: 'Hủy cài đặt', detail: 'Không có gì cần hoàn tác.' },
        ],
      },
      {
        title: 'Chạy dưới dạng dịch vụ',
        label: 'service',
        code: 'muqun-gateway service install',
        rows: [
          { term: 'Bắt đầu', detail: 'Khi đăng nhập và tự phục hồi sau sự cố.' },
          { term: 'Kết thúc', detail: 'Chỉ khi bạn gỡ bỏ cài đặt dịch vụ.' },
          { term: 'Sống sót sau reboot', detail: 'Có.' },
          { term: 'Hủy cài đặt', detail: 'Chạy service uninstall. Thiết bị đã ghép nối được giữ nguyên.' },
        ],
      },
    ],
    modesNote:
      'Sử dụng systemd user unit trên Linux, LaunchAgent trên macOS. Tuyệt đối không cần quyền root, không nằm ngoài thư mục người dùng của bạn.',
    autostartHeading: 'Cách OpenCode được khởi chạy',
    autostartSteps: [
      'Gateway tìm kiếm dịch vụ OpenCode đang hoạt động ổn định bằng cách đọc địa chỉ OpenCode xuất bản trong ~/.local/state/opencode/service.json.',
      'Nếu tìm thấy, Gateway sẽ gắn kết nối vào dịch vụ đó và tiến trình opencode serve của bạn vẫn duy trì nguyên vẹn các phiên làm việc.',
      'Nếu không tìm thấy, Gateway sẽ tự chạy opencode serve --service và theo dõi tiến trình. Gateway liên tục kiểm tra tệp trạng thái, vì vậy khi OpenCode khởi động lại ở cổng mới, nó sẽ tự động được nhận diện lại.',
    ],
    autostartNote:
      'Máy tính không cài OpenCode? Không có dịch vụ nào được gắn kết nối, và chỉ màn hình agent ghi nhận trạng thái này — terminal vẫn hoạt động bình thường.',
    autostartOffLabel: 'config.json',
    autostartOff: '"opencode": { "autostart": false }',
    managerHeading: 'Trình quản lý ghép nối',
    managerBody:
      'Chạy lệnh muqun-gateway manage để mở. Bảng hiển thị những tiến trình đang chạy và mọi thiết bị đang giữ token xác thực, với các phím tắt điều khiển sau:',
    managerKeys: [
      { term: 'p', detail: 'Hiển thị lại mã QR ghép nối để thêm thiết bị mới.' },
      { term: 'x', detail: 'Thu hồi quyền truy cập của một thiết bị.' },
      { term: 'u', detail: 'Chỉnh sửa địa chỉ mã hóa trong mã QR; nhấn a để tự động dò tìm lại.' },
      { term: 's / t', detail: 'Khởi động hoặc dừng Gateway ngay trong trình quản lý.' },
      { term: 'm / h', detail: 'Thêm backend tmux hoặc Herdr; phím f chọn mặc định, d để xóa.' },
      { term: 'e', detail: 'Thay đổi chế độ mã hóa truyền tải cho các thiết bị ghép nối từ lúc này.' },
      { term: 'q', detail: 'Đóng trình quản lý. Lệnh này không bao giờ dừng các phiên terminal của bạn.' },
    ],
    capabilitiesHeading: 'Gateway phiên bản cũ vẫn hoạt động',
    capabilitiesBody:
      'Ứng dụng tự động hỏi Gateway về các tính năng được hỗ trợ thay vì phán đoán qua số phiên bản, và ẩn đi các tính năng chưa có thay vì báo lỗi. Do đó, Gateway phiên bản cũ vẫn là một terminal hoàn hảo: bạn chỉ không thấy các bề mặt giao diện mới hơn chứ không mất kết nối. Tính năng cộng tác agent là tính năng duy nhất có yêu cầu backend riêng — yêu cầu kết nối Herdr 0.9.0 trở lên trong phiên đó, và phiên tmux không hỗ trợ tính năng này. Khi thiếu tính năng, ứng dụng sẽ thông báo rõ cần nâng cấp thành phần nào thay vì âm thầm ẩn tùy chọn.',
    upgradeHeading: 'Nâng cấp',
    upgradeBody:
      'Chạy lại lệnh cài đặt tương tự. Trình cài đặt sẽ ghi đè tệp nhị phân tại chỗ, giữ nguyên danh tính máy chủ, địa chỉ và cấu hình của bạn, đồng thời các điện thoại đã ghép nối vẫn giữ nguyên kết nối. Nếu bạn đã cài đặt dịch vụ, hãy chạy lại service install một lần nữa sau đó: tệp unit chứa các quy tắc về vòng đời tiến trình con, và việc làm mới này giúp việc khởi động lại Gateway không làm ngắt các phiên terminal của bạn.',
    logsHeading: 'Nhật ký (Logs)',
    logsBody:
      'Khi khởi động bằng start, Gateway ghi log vào ~/.local/share/muqun-gateway/gateway.log, và LaunchAgent trên macOS cũng ghi vào đây. Khi chạy dưới systemd trên Linux, log được gửi vào journal hệ thống. Để xem chi tiết hơn, đặt biến môi trường MUQUN_LOG (hoặc RUST_LOG) thành debug trước khi khởi động; mặc định là info.',
    logsCommandLabel: 'linux · chế độ service',
    logsCommand: 'journalctl --user -u dev.osuki.muqun-gateway',
  },

  terminal: {
    eyebrow: 'workspace · group.panel',
    heading: 'Terminal.',
    lead: 'Đây là terminal thực sự của bạn, không phải bản ghi phát lại. Gateway điều khiển tmux hoặc Herdr trên máy tính của bạn và ứng dụng vẽ lại chính xác những gì đang diễn ra — phiên làm việc bạn để lại trên bàn là phiên bạn cầm trên tay, và việc đóng ứng dụng không làm thay đổi bất kỳ điều gì.',
    shotAlt:
      'Một pane nvim đang mở tệp TypeScript, với các thẻ chip ở cạnh dưới dành cho Claude Code, nvim và zsh terminal trong cùng nhóm cùng hàng phím phía trên trình soạn thảo.',
    entries: [
      {
        term: 'Không gian làm việc, nhóm và terminal',
        detail:
          'Ba cấp độ phân cấp, định danh theo dạng workspace · group.panel. Không gian làm việc (workspace) là nơi bạn làm việc, nhóm (group) là tập hợp các terminal trong đó, và terminal là một shell độc lập. Muqun hiển thị từng terminal một lần và không chia nhỏ màn hình: hai cửa sổ con trên điện thoại chỉ làm bạn khó đọc.',
      },
      {
        term: 'Chuyển đổi giữa các cửa sổ',
        detail:
          'Vuốt thanh tiêu đề ở trên cùng sang hai bên để đổi không gian làm việc. Các thẻ chip phía trên trình soạn thảo chuyển nhanh giữa các terminal trong nhóm hiện tại. Để chuyển sâu hơn — sang nhóm khác hoặc không gian làm việc khác — hãy mở trang danh sách bảng điều khiển (panels) và chọn terminal bạn muốn.',
      },
      {
        term: 'Các tiến trình đang chạy',
        detail:
          'Trang danh sách bảng điều khiển liệt kê toàn bộ không gian làm việc, nhóm và terminal trên máy tính, và là nơi bạn tạo thêm mới. Nhấn giữ vào một hàng để hiển thị các tác vụ, bao gồm cả thao tác đóng — thao tác đóng không bao giờ bị kích hoạt do vô tình chạm nhầm.',
      },
      {
        term: 'Hàng phím terminal chuyên dụng',
        detail:
          'Dải phím phía trên trình soạn thảo cung cấp các phím terminal cần thiết mà bàn phím điện thoại không có: Esc, Tab, ⌃C, các phím mũi tên, cùng một bộ phím tự thay đổi theo tiến trình đang chạy trong pane — phím shell khi ở shell, ⇧TAB và ⌃O khi chạy Claude Code, :w và gg trong nvim. Khi ở chế độ insert trong nvim, phím Esc được đưa lên đầu. Có một bàn phím ảo đầy đủ phía sau nút bàn phím khi bạn cần ký tự đặc biệt. Bạn có thể tắt dải phím này trong Cài đặt → Terminal.',
      },
      {
        term: 'Trình soạn thảo nhập lệnh (Composer)',
        detail:
          'Phông chữ monospace, hỗ trợ nhiều dòng và phím Return xuống dòng mới — thao tác gửi lệnh được tách thành nút riêng, vì chạy nhầm lệnh nguy hiểm hơn nhiều so với việc bấm thêm một nút. Tiêu đề phía trên ô nhập liệu thay đổi linh hoạt theo ngữ cảnh pane: Chạy lệnh terminal, Gửi tin nhắn, hoặc Nhập vào trình soạn thảo này.',
      },
      {
        term: 'Xem lại nội dung cuộn trước đó',
        detail:
          'Kéo từ trên cùng của terminal xuống để tải thêm lịch sử cuộn; biểu tượng mũi tên xuất hiện khi còn nội dung để tải. Khi bạn đã cuộn rời khỏi màn hình trực tiếp, một nút Mới nhất (Latest) sẽ đưa bạn trở lại ngay. Nội dung mới xuất hiện không bao giờ giật màn hình khi bạn đang đọc.',
      },
      {
        term: 'Thay đổi tệp (Changes)',
        detail:
          'Giao diện git cho thư mục mà pane đang mở: danh sách các tệp bị thay đổi kèm số lượng, bộ lọc Tất cả (All), Đã stage (Staged) hoặc Chưa stage (Unstaged), và nội dung diff chi tiết. Nút hiển thị huy hiệu số lượng tệp thay đổi, và chỉ xuất hiện khi pane nằm trong kho lưu trữ git và Gateway hỗ trợ tính năng git_diff.',
      },
      {
        term: 'Tệp tin (Files)',
        detail:
          'Những gì phiên làm việc tạo ra — hình ảnh, mã nguồn và tài liệu, có thể lọc, tìm kiếm và xem trực tiếp ngay trong ứng dụng mà không cần rời màn hình.',
      },
      {
        term: 'Mở trong trình duyệt',
        detail:
          'Nhập cổng mà máy chủ phát triển cục bộ đang chạy và Muqun sẽ mở nó thông qua kết nối hiện có. Không có dữ liệu nào bị công khai ra internet. Nếu không nhận được phản hồi, nguyên nhân phổ biến là máy chủ dịch vụ chỉ lắng nghe trên localhost của máy chủ.',
      },
      {
        term: 'Thao tác nhanh (Quick actions)',
        detail:
          'Các lệnh lưu sẵn, câu nhắc lệnh đã lưu và tổ hợp phím tắt, ưu tiên hiển thị những mục bạn dùng nhiều nhất. Bạn có thể thêm mục tùy chỉnh và chỉnh sửa mục mặc định.',
      },
    ],
    note: 'Muqun hoạt động theo nguyên tắc chỉ quan sát: mở phiên làm việc không thay đổi bố cục cửa sổ của bạn và đóng ứng dụng không làm gián đoạn bất kỳ tiến trình nào.',
  },

  opencode: {
    eyebrow: 'opencode serve --service',
    heading: 'Agent OpenCode.',
    lead: 'Giao diện được thiết kế riêng cho OpenCode thay vì chỉ là một terminal chạy agent thông thường: chuyển đổi linh hoạt giữa các phiên làm việc, hiển thị lệnh gọi công cụ dưới dạng thẻ kèm diff trực quan và nhận câu hỏi của agent dưới dạng biểu mẫu để bạn tương tác nhanh chỉ với một lần chạm.',
    noSignInBadge: 'RUNTIME CỤC BỘ · KHÔNG TÀI KHOẢN',
    noSignInHeading: 'Máy tính của bạn kết nối trực tiếp với nhà cung cấp mô hình.',
    noSignIn:
      'Không cần đăng nhập. Muqun không yêu cầu tài khoản và không hỏi khóa API, bởi vì ứng dụng không phải là bên kết nối với nhà cung cấp mô hình — chính OpenCode trên máy tính của bạn thực hiện điều đó. Bạn cấu hình nhà cung cấp, mô hình, agent và kỹ năng tại máy tính theo cách quen thuộc, và Gateway hoàn toàn không chuyển tiếp bất kỳ thông tin đăng nhập nào.',
    prerequisitesHeading: 'Điều kiện tiên quyết',
    prerequisites: [
      'OpenCode 2.0.1 trở lên được cài đặt trên cùng máy tính chạy Gateway.',
      'Ít nhất một nhà cung cấp mô hình đã được cấu hình trong chính OpenCode. Có hỗ trợ các mô hình miễn phí, và bộ chọn mô hình có bộ lọc Chỉ miễn phí (Free only) để tìm kiếm nhanh.',
      'Dịch vụ OpenCode đang hoạt động. Gateway sẽ mặc định tự khởi động dịch vụ cho bạn và tự gắn vào dịch vụ bạn đã tự chạy trước đó.',
      'Phiên bản Gateway đủ mới để hỗ trợ bề mặt giao diện agent. Nếu Gateway chưa hỗ trợ, nút OpenCode sẽ không hiển thị và terminal vẫn hoạt động bình thường.',
    ],
    entries: [
      {
        term: 'Phiên làm việc và subagent',
        detail:
          'Mỗi phiên làm việc là một cuộc trò chuyện với ngữ cảnh riêng biệt, được liệt kê theo từng dự án hoặc trên toàn bộ hệ thống. Phiên làm việc khởi chạy subagent sẽ hiển thị thụt lề ngay bên dưới, giúp tác vụ phân nhánh vẫn dễ dàng theo dõi liền mạch.',
      },
      {
        term: 'Dự án (Projects)',
        detail:
          'Chuyển đổi thư mục làm việc của agent hoặc nhập đường dẫn để mở thư mục mới. Chọn một dự án sẽ mở lại phiên làm việc gần nhất của nó thay vì tạo mới từ đầu.',
      },
      {
        term: 'Mô hình và agent',
        detail:
          'Mục Chọn mô hình liệt kê những mô hình mà nhà cung cấp thực sự hỗ trợ, nhóm theo nhà cung cấp, hiển thị kích thước cửa sổ ngữ cảnh và gắn thẻ Miễn phí trên các mô hình không mất phí. Mục Chọn agent cho phép chuyển đổi giữa Build, Plan, Explore và các agent tùy chỉnh trên máy chủ.',
      },
      {
        term: 'Lệnh gạch chéo (Slash commands) và kỹ năng',
        detail:
          'Nhập ký tự / trong trình soạn thảo. Một số lệnh được ứng dụng tự xử lý — như /new, /models, /compact, /undo, /export — các lệnh còn lại đến từ máy chủ (ưu tiên máy chủ nếu trùng tên). Kỹ năng trên máy chủ xuất hiện trong cùng danh sách và được đánh dấu rõ ràng trong nhật ký khi thực thi.',
      },
      {
        term: 'Tệp đính kèm và nhắc tệp (@mention)',
        detail:
          'Gửi ảnh chụp, ảnh từ thư viện hoặc bất kỳ tệp tin nào. Hình ảnh được mã hóa lại trước khi gửi để loại bỏ dữ liệu EXIF riêng tư. Nhập @ để chỉ định agent xem tệp trong dự án thay vì phải mô tả dài dòng.',
      },
      {
        term: 'Cấp quyền và trả lời câu hỏi',
        detail:
          'Khi agent muốn chạy lệnh, ghi tệp hoặc đọc ngoài dự án, thẻ thông báo sẽ nêu rõ chi tiết và bạn có thể chọn Cho phép (Allow), Luôn cho phép (Always allow) hoặc Từ chối (Deny) — ba lựa chọn tương tự xuất hiện trên thông báo đẩy để xử lý ngay từ màn hình khóa. Các câu hỏi agent đặt ra xuất hiện dưới dạng biểu mẫu nhỏ gọn để bạn điền câu trả lời. Có tùy chọn tự động duyệt mọi hành động khi bạn đang theo dõi trực tiếp; các lệnh mang tính phá hủy không thể hoàn tác vẫn luôn bị chặn để hỏi lại.',
      },
      {
        term: 'Tác vụ chạy nền và hàng đợi tin nhắn',
        detail:
          'Lệnh gọi công cụ chạy lâu có thể được tách để chạy nền và theo dõi từ khay tác vụ. Trong khi agent đang xử lý lượt trả lời, bạn có thể chọn gửi tin nhắn can thiệp ngay lập tức hoặc xếp vào hàng đợi phía sau, và tin nhắn trong hàng đợi có thể thu hồi trước khi gửi.',
      },
      {
        term: 'Ngữ cảnh và nén ngữ cảnh (Compaction)',
        detail:
          'Bảng thông tin ngữ cảnh hiển thị dung lượng cửa sổ ngữ cảnh đã dùng, số lượng token đã tiêu thụ trong phiên và chi phí ước tính. Quá trình nén ngữ cảnh sẽ tóm tắt lại lịch sử khi cuộc trò chuyện trở nên quá dài, và dòng thời gian sẽ đánh dấu vị trí nén cũng như trạng thái tự động hay thủ công.',
      },
      {
        term: 'Hoàn tác (Undo)',
        detail:
          'Lệnh /undo hoàn tác dự án về trạng thái trước tin nhắn cuối cùng của bạn; /redo hủy bỏ thao tác hoàn tác nếu chưa có thay đổi mới. Đây là một lệnh gõ thay vì nút bấm, nhằm tránh thao tác ngoài ý muốn.',
      },
    ],
    note: 'Các lệnh gọi công cụ hiển thị dưới dạng thẻ: thao tác chỉnh sửa hiển thị diff hợp nhất trực tiếp, tương tự như cách trình xem Thay đổi (Changes) hiển thị.',
  },

  themes: {
    eyebrow: 'muqun.dev/themes',
    heading: 'Chủ đề.',
    lead: 'Chủ đề thay đổi diện mạo của cả ứng dụng và terminal cùng lúc, và mỗi gói chủ đề đều bao gồm giao diện sáng và tối. 24 gói được tích hợp sẵn trong ứng dụng; nhiều chủ đề khác có sẵn trong danh mục cộng đồng.',
    entries: [
      {
        term: 'Các gói đi kèm sẵn',
        detail:
          '24 gói, nằm trong Cài đặt → Giao diện → Chủ đề, bao gồm Catppuccin, Gruvbox, Kanagawa, Rosé Pine, Tokyo Night và Everforest. Chế độ màu — Hệ thống, Sáng hoặc Tối — sẽ quyết định hiển thị nửa sáng hay tối của gói, chứ không đổi sang gói khác.',
      },
      {
        term: 'Duyệt danh mục chủ đề',
        detail:
          'Mục Duyệt chủ đề kết nối đến danh mục công khai trên muqun.dev. Không có dữ liệu nào tải về cho đến khi bạn mở một dòng, và kích thước gói hiển thị rõ ràng trước khi tải.',
      },
      {
        term: 'Định dạng tệp chủ đề',
        detail:
          'Tệp .muqun-theme là tệp zip chứa một tệp theme.json và thư mục assets chứa ảnh PNG, JPEG hoặc WebP — không cho phép định dạng khác. Tệp .muqun-theme.json là tệp kê khai tương tự nhưng không có ảnh, dành cho các chủ đề chỉ chứa bảng màu.',
      },
      {
        term: 'Nội dung tệp kê khai (Manifest)',
        detail:
          '17 màu giao diện cho mỗi chế độ sáng/tối; màu nền, màu chữ, con trỏ, liên kết và vùng chọn của terminal cùng 16 ô màu ANSI; hình ảnh đồ họa cho 11 bề mặt hiển thị từ hình nền shell đến màn hình chính; tối đa 3 biểu tượng tùy chỉnh — quay lại, gửi và đính kèm; cùng độ mờ khởi đầu cho giao diện và terminal. Bắt buộc phải có cả cấu hình sáng và tối. Không hỗ trợ phông chữ, SVG hay hoạt ảnh.',
      },
      {
        term: 'Giới hạn kích thước',
        detail:
          'Tệp kê khai tối đa 256 KiB, tối đa 32 hình ảnh với kích thước mỗi ảnh không quá 8 MiB, và tổng dung lượng gói chủ đề tối đa 25 MiB.',
      },
      {
        term: 'Cài đặt từ tệp cục bộ',
        detail:
          'Mở tệp .muqun-theme từ Tệp (Files), AirDrop hoặc bảng chia sẻ và Muqun sẽ đề xuất cài đặt, hoặc chọn Nhập tệp (Import file) trong trang chủ đề. Tệp không hợp lệ sẽ bị từ chối thay vì áp dụng dở dang.',
      },
      {
        term: 'Cài đặt từ liên kết web',
        detail:
          'Nhập liên kết (Import link) nhận URL chủ đề công khai hoặc kho lưu trữ GitHub — dịch vụ kho mã nguồn duy nhất được hỗ trợ — nơi bạn có thể ghim nhánh hoặc commit cụ thể và chỉ định tên tệp chủ đề nếu không đặt theme.json ở thư mục gốc. Thẻ xem trước nêu rõ nguồn lưu trữ ảnh trước khi tải về.',
      },
      {
        term: 'Cài đặt từ dòng lệnh terminal',
        detail:
          'Chạm vào đường dẫn .muqun-theme trong nội dung xuất ra của terminal và thẻ xem trước sẽ xuất hiện: không có thay đổi nào được áp dụng cho đến khi bạn đồng ý.',
      },
      {
        term: 'Xem trước trước khi áp dụng',
        detail:
          'Mọi cách cài đặt đều dẫn đến cùng một quy trình: chủ đề được tải về, giải nén và chuẩn bị hình ảnh, sau đó toàn bộ ứng dụng sẽ khoác thử diện mạo mới để bạn khám phá. Chủ đề hiện tại của bạn không bị thay đổi cho đến khi bạn nhấn Áp dụng chủ đề (Apply theme).',
      },
      {
        term: 'Độ mờ nền (Background opacity)',
        detail:
          'Chủ đề tùy chỉnh cung cấp hai thanh trượt: Độ mờ nền giao diện (thay đổi màu nền nhưng giữ nguyên độ rõ của chữ, biểu tượng và hình vẽ) và Độ mờ nền terminal (hiển thị hình nền ứng dụng phía sau chữ trong terminal). Cả hai đều có thể tùy chỉnh toàn dải, và dưới mức sàn khuyến nghị, ứng dụng sẽ cảnh báo độ tương phản chữ có thể bị giảm thay vì ngăn cản bạn. Các gói tích hợp sẵn không hỗ trợ thanh trượt này.',
      },
      {
        term: 'Tự tạo chủ đề mới',
        detail:
          'Không có trình chỉnh sửa màu trực tiếp trong ứng dụng: chủ đề được tạo dưới dạng tệp. Muqun tích hợp một kỹ năng (skill) để viết chủ đề, cho phép bạn mô tả diện mạo mong muốn cho agent của mình — thao tác nhanh Tạo chủ đề Muqun sẽ bắt đầu quy trình — và nhận lại tệp kê khai, hình ảnh cùng gói chủ đề hoàn chỉnh để nhập vào ứng dụng.',
      },
      {
        term: 'Phát hành chủ đề cho cộng đồng',
        detail:
          'Danh mục chủ đề là một kho mã nguồn mở tiếp nhận pull request: gửi PR với thư mục src/<id> của bạn, và sau khi được hợp nhất, hệ thống CI sẽ đóng gói và chủ đề sẽ xuất hiện trên muqun.dev trong vòng vài phút. Bộ công cụ có lệnh tạo khung chủ đề mẫu và kiểm tra độ tương phản trước khi bạn gửi.',
      },
      {
        term: 'Xóa chủ đề',
        detail:
          'Xóa chủ đề ngay tại hàng của nó trong danh sách chủ đề và xác nhận; chủ đề sẽ bị xóa khỏi thiết bị này. Mục Cài đặt → Bộ nhớ có nút Xóa chủ đề không dùng để dọn dẹp các chủ đề bạn không còn dùng đến.',
      },
    ],
    galleryLink: 'Duyệt danh mục chủ đề',
  },

  troubleshooting: {
    eyebrow: 'khi không thể kết nối',
    heading: 'Khi gặp sự cố.',
    lead: 'Hầu như mọi vấn đề thường rơi vào một trong bốn nguyên nhân: Gateway chưa chạy, điện thoại không thể kết nối tới địa chỉ của nó, ghép nối đã bị hủy, hoặc OpenCode chưa khởi động trên máy chủ.',
    checksHeading: 'Kiểm tra nhanh',
    checks: [
      {
        term: 'Ghép nối máy tính',
        detail:
          'Cài đặt Gateway trên máy tính của bạn — hoạt động với tmux hoặc Herdr — mở bảng điều khiển quản lý và quét mã QR ghép nối bằng ứng dụng Muqun. Nhập mã xác nhận hiển thị trên máy tính để hoàn tất ghép nối.',
      },
      {
        term: 'Khắc phục lỗi kết nối',
        detail:
          'Kiểm tra tmux hoặc Herdr 0.7.5 trở lên và Gateway phiên bản mới nhất đang chạy. Đảm bảo điện thoại và máy tính có thể kết nối tới cùng một địa chỉ mạng riêng, sau đó mở lại máy chủ trong Muqun.',
      },
      {
        term: 'Xóa thiết bị',
        detail:
          'Xóa máy chủ khỏi màn hình chính của Muqun để hủy quyền truy cập của điện thoại này khỏi Gateway. Bạn cũng có thể thu hồi bất kỳ thiết bị đã ghép nối nào từ bảng quản lý Gateway.',
      },
      {
        term: 'Khôi phục thông báo đẩy',
        detail:
          'Bật thông báo cho Muqun trong cài đặt hệ thống của điện thoại và trong Cài đặt Muqun. Mở lại máy chủ đã ghép nối để Muqun đăng ký lại token thiết bị hiện tại với Gateway.',
      },
    ],
    entries: [
      {
        term: 'Không thể ghép nối',
        detail:
          'Lỗi "Could not reach the gateway" nghĩa là địa chỉ trong mã QR không phản hồi từ vị trí mạng của điện thoại. Kiểm tra lệnh muqun-gateway status trên máy tính, sau đó kiểm tra xem điện thoại có thể truy cập địa chỉ đó không — chung mạng Wi-Fi hoặc tốt nhất là chung tailnet Tailscale. Gateway chỉ lắng nghe loopback sẽ không thể truy cập từ thiết bị khác; hãy xuất bản địa chỉ thật bằng phím u trong trình quản lý, hoặc ghép nối thông qua máy chủ SSH đã lưu.',
      },
      {
        term: 'Mã xác nhận bị từ chối hoặc hết hạn',
        detail:
          'Mã xác nhận gồm 8 ký tự, có hiệu lực trong 5 phút và bị vô hiệu hóa sau 8 lần nhập sai. Nhấn phím p trong trình quản lý để tạo mã QR và mã mới. Bảng ký tự không sử dụng 0, 1, I, L hoặc O, nên ký tự trông giống chúng sẽ là một ký tự khác.',
      },
      {
        term: 'Chấm trạng thái kết nối',
        detail:
          'Chấm tròn đặc có nghĩa ứng dụng đã thăm dò và nhận được phản hồi: ONLINE (Trực tuyến) hoặc OFFLINE (Ngoại tuyến khi không có phản hồi). Vòng tròn rỗng hiển thị NOT CONNECTED có nghĩa là ứng dụng chưa thăm dò — đây không phải lỗi, và việc chạm mở máy chủ sẽ kích hoạt kết nối.',
      },
      {
        term: 'Thông báo yêu cầu ghép nối lại',
        detail:
          'Token của thiết bị này trên Gateway đã không còn — bị thu hồi từ trình quản lý hoặc bị mất khi thư mục trạng thái Gateway được tạo lại. Tiến hành ghép nối lại máy chủ; các thiết lập khác trên điện thoại không bị ảnh hưởng.',
      },
      {
        term: 'Không tìm thấy OpenCode',
        detail:
          'Màn hình agent hiển thị "OpenCode service offline" và yêu cầu bạn chạy opencode serve --service trên máy chủ. Hãy chạy lệnh đó rồi nhấn Kiểm tra lại (Check again). Nếu dịch vụ đã chạy mà vẫn không tìm thấy, nguyên nhân thường do Gateway tìm sai tệp nhị phân: hãy thiết lập opencode.binary trong config.json với đường dẫn đầy đủ và khởi động lại Gateway.',
      },
      {
        term: 'Mô hình bị mờ hoặc không có mô hình miễn phí',
        detail:
          'Trạng thái "Set up on the host" nghĩa là nhà cung cấp đó chưa được cấu hình trong OpenCode — hãy cấu hình trên máy tính và mở lại bộ chọn. Thông báo "No free models on this host" chỉ ra rằng bộ lọc Chỉ miễn phí không tìm thấy kết quả phù hợp chứ không phải lỗi; hãy tắt bộ lọc để xem toàn bộ mô hình được hỗ trợ. Muqun hiển thị chi phí ước tính theo phiên nhưng không thu bất kỳ khoản phí nào và không can thiệp giữa bạn và nhà cung cấp.',
      },
      {
        term: 'Agent yêu cầu thao tác ngoài dự án',
        detail:
          'Yêu cầu Đọc ngoài dự án và Ghi ngoài dự án đúng như tên gọi của chúng và đường dẫn tệp được hiển thị rõ trên thẻ. Cho phép (Allow) áp dụng một lần, Luôn cho phép (Always allow) ghi nhớ lựa chọn, Từ chối (Deny) sẽ ngăn chặn thao tác. Hộp thoại này thực hiện đúng vai trò bảo vệ — hãy đọc kỹ đường dẫn trước khi đưa ra quyết định.',
      },
      {
        term: 'Nút Thay đổi (Changes) không xuất hiện',
        detail:
          'Nút này chỉ xuất hiện khi terminal đang ở trong một kho lưu trữ git và Gateway đủ mới để cung cấp dữ liệu diff. Nâng cấp Gateway bằng cách chạy lại lệnh cài đặt.',
      },
      {
        term: 'Tính năng yêu cầu phiên bản Gateway mới hơn',
        detail:
          'Ứng dụng thăm dò khả năng hỗ trợ của Gateway thay vì đoán, nên Gateway cũ chỉ thiếu tính năng mới mà vẫn duy trì chức năng terminal. Việc phân công công việc cho trợ lý khác ngoài ra còn yêu cầu Herdr 0.9.0 trở lên trong phiên làm việc đó, và ứng dụng sẽ nêu rõ thành phần nào cần cập nhật.',
      },
      {
        term: 'Máy chủ nằm sau proxy',
        detail:
          'Máy tính của bạn là nơi trực tiếp giao tiếp với nhà cung cấp mô hình, do đó nếu máy tính cần proxy để truy cập internet thì OpenCode cần được cấu hình proxy trên chính máy tính đó. Muqun không làm trung gian và không nhìn thấy lưu lượng truy cập đó.',
      },
    ],
  },

  contact: {
    eyebrow: 'github · issues',
    heading: 'Vẫn gặp trở ngại?',
    lead: 'Hãy tạo issue. Đó là cơ sở để phát triển các phiên bản tiếp theo và mọi đóng góp đều được lắng nghe.',
    reportHint:
      'Vui lòng đính kèm phiên bản ứng dụng, phiên bản Gateway và các thao tác bạn đã thực hiện ngay trước khi xảy ra lỗi.',
    issueCta: 'Tạo issue trên GitHub',
    safetyHeading: 'Quyền riêng tư và báo cáo an toàn',
    safetyBody:
      'Đội ngũ hỗ trợ không bao giờ yêu cầu token truy cập, toàn bộ nhật ký terminal, mã nguồn hoặc mã QR ghép nối của bạn. Vui lòng xóa các thông tin nhạy cảm trước khi đính kèm ảnh chụp màn hình hoặc nhật ký.',
    safetyLink: 'Đọc chính sách quyền riêng tư',
  },
};
