import type { UserGuide } from './types';

export const vi: UserGuide = {
  metaTitle: 'Hướng dẫn sử dụng & Tài liệu tham khảo Muqun',
  metaDescription:
    'Hướng dẫn toàn diện về cài đặt Gateway, ghép nối điện thoại, không gian làm việc, điều khiển terminal, các trợ lý lập trình (OpenCode, DeepSeek Harness, T3 Code), chủ đề và khắc phục sự cố.',
  hero: {
    badge: 'HƯỚNG DẪN SỬ DỤNG · TÀI LIỆU THAM KHẢO',
    heading: 'Mọi thứ bạn cần để giữ máy tính luôn trong tầm tay.',
    lead: 'Muqun kết nối điện thoại trực tiếp với máy tính hoặc máy chủ của bạn. Tìm hiểu cách cài đặt và cấu hình Gateway, điều hướng không gian làm việc terminal, thiết lập và điều khiển các trợ lý lập trình (OpenCode, DeepSeek Harness và T3 Code), cài đặt chủ đề và khắc phục sự cố kết nối.',
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
      id: 'agents',
      label: "Trợ lý",
      nav: "Trợ lý",
      meta: "opencode · deepseek · t3",
      desc: "Phiên trợ lý so với terminal, ba trợ lý mà 3.1 hỗ trợ, và cách thiết lập từng trợ lý trên máy chủ.",
    },
    {
      id: 'opencode',
      label: 'Agent OpenCode',
      nav: 'opencode',
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

  agents: {
    eyebrow: "muqun-gateway agent",
    heading: "Trợ lý.",
    lead: "Terminal là shell để bạn gõ lệnh. Phiên trợ lý là cuộc trò chuyện với một trợ lý lập trình chạy trên máy tính của bạn — OpenCode, DeepSeek Harness hoặc T3 Code — được ứng dụng vẽ thành tin nhắn, thẻ công cụ và câu hỏi thay vì một màn hình chữ. Cả hai đi qua cùng một Gateway và cùng một lần ghép nối; khác nhau ở chỗ Gateway thay bạn nói chuyện với ai.",
    versus: [
      { term: "Terminal", detail: "tmux hoặc Herdr trên máy chủ. Ứng dụng hiển thị đúng những gì ô đang hiện, và phím bạn gửi chính là phím chương trình nhận được — nên chương trình nào cũng chạy được, kể cả các trợ lý sống trong terminal như Claude Code và Codex." },
      { term: "Phiên trợ lý", detail: "Một trợ lý mà Gateway trò chuyện qua API riêng của nó. Mỗi phiên thuộc về một trợ lý và luôn quay về trợ lý đó. Bàn làm việc — chế độ, mô hình, lệnh gạch chéo, kỹ năng, tệp đính kèm, hoàn tác, nén ngữ cảnh, tác vụ nền — chỉ hiện những gì trợ lý đó hỗ trợ." },
    ],
    supportedHeading: "Các trợ lý 3.1 hỗ trợ",
    supported: [
      { name: "OpenCode", id: "opencode", detail: "OpenCode không cần thiết lập. Gateway tiếp quản dịch vụ OpenCode đang chạy, hoặc tự khởi động một dịch vụ; cần OpenCode 2. Có đủ mọi phần của bàn làm việc." },
      { name: "DeepSeek Harness", id: "deepseek", detail: "DeepSeek Harness tắt cho đến khi bạn bật. Khởi động Harness trên máy chủ, rồi chỉ cho Gateway biết nó ở đâu. Chế độ là các preset riêng của Harness, chọn khi tạo phiên; tệp đính kèm đến tay nó dưới dạng tệp trên máy chủ." },
      { name: "T3 Code", id: "t3", detail: "T3 Code tắt cho đến khi Gateway có thông tin xác thực cho nó. Gateway ghép nối với T3 một lần và giữ thông tin đó. Hỗ trợ tệp đính kèm, phê duyệt và hoàn tác — hoàn tác trên T3 quay lui cả lượt, nên ứng dụng hỏi trước khi áp dụng." },
    ],
    cliHeading: "Thiết lập bằng dòng lệnh",
    cliBody: "Trên máy tính đang chạy Gateway. muqun-gateway agent kiểm tra từng trợ lý từ shell của bạn và in trạng thái, phiên bản, địa chỉ, kèm bước tiếp theo cho trợ lý chưa sẵn sàng. Lệnh thoát với mã khác 0 khi còn trợ lý đã bật mà không dùng được, nên script cũng kiểm tra được.",
    commands: [
      { code: "muqun-gateway agent", label: "status", detail: "Trạng thái của từng trợ lý, kèm bước tiếp theo." },
      { code: "muqun-gateway agent setup t3", label: "t3", detail: "Ghép nối T3 Code. Trên cùng máy, nó cấp thông tin xác thực bằng t3 auth session issue — thêm --base-dir nếu T3 lưu dữ liệu ở nơi khác. Với T3 trên máy khác, chạy t3 pair ở đó rồi truyền mã bằng --token CODE." },
      { code: "muqun-gateway agent setup deepseek", label: "deepseek", detail: "Tìm DeepSeek Harness đang chạy và bật nó. Tìm ở cổng 3080 và 19387; dùng --endpoint URL nếu Harness ở chỗ khác." },
      { code: "muqun-gateway agent setup opencode", label: "opencode", detail: "Không thay đổi gì. Chỉ hiện Gateway sẽ dùng tệp chạy OpenCode nào và phiên bản của nó — cần bản 2.x." },
    ],
    restartNote: "setup ghi config.json và cho biết Gateway đang chạy có cần khởi động lại để nhận thay đổi hay không. Gateway cài dưới dạng dịch vụ sẽ được khởi động lại giúp bạn sau khi xác nhận (--yes bỏ qua câu hỏi); nếu không, hãy tự khởi động lại.",
    manualHeading: "Viết tay trong config.json",
    manualBody: "Cùng các thiết lập đó, nếu bạn muốn tự viết. Thêm các khối cần thiết rồi khởi động lại Gateway. Mã từ t3 pair đặt vào pairing_token; lần khởi động sau, Gateway đổi nó một lần và không cần nữa. opencode.binary chỉ dùng khi muốn cố định một OpenCode cụ thể.",
    credentialNote: "Thông tin xác thực T3 nằm trong t3-credential.json ở thư mục trạng thái của Gateway — ~/.local/share/muqun-gateway/ trên Linux — và chỉ bạn đọc được. Nếu T3 thu hồi hoặc nó hết hạn, chạy lại agent setup t3.",
    phoneHeading: "Trên điện thoại",
    entries: [
      { term: "Mỗi trợ lý một ô", detail: "Màn hình chính có một ô cho mỗi trợ lý Gateway báo về, trợ lý bạn dùng gần nhất đứng đầu. Quá ba thì phần còn lại nằm trong Thêm trợ lý. Khi có hơn một trợ lý sẵn sàng, Phiên mới sẽ hỏi bạn chọn cái nào." },
      { term: "Câu hỏi đến dưới dạng thông báo", detail: "Khi một phiên — kể cả phiên của trợ lý con — cần bạn điền biểu mẫu, mọi điện thoại đã ghép nối nhận một thông báo rằng trợ lý đang chờ bạn. Yêu cầu cấp quyền vẫn được thông báo như trước." },
      { term: "Cần thiết lập", detail: "Gateway thấy trợ lý nhưng chưa có thông tin xác thực cho nó. Ô sẽ mở hướng dẫn với đúng lệnh cần chạy trên máy chủ — với T3 Code là t3 pair." },
      { term: "Cần cập nhật", detail: "Trợ lý dùng giao thức mới hơn những gì Gateway này biết. Cập nhật Gateway trên máy đó bằng cách chạy lại lệnh cài đặt." },
      { term: "Chưa cài, Ngoại tuyến", detail: "Trợ lý không có trên máy chủ, hoặc chưa chạy. Ô cho biết trường hợp nào và mở hướng dẫn khởi động viết riêng cho trợ lý đó." },
      { term: "Gateway cũ hơn", detail: "Gateway trước 0.13 không có multi_agent, nên ứng dụng ở chế độ một trợ lý với OpenCode và báo cho bạn khi một tính năng cần Gateway mới hơn." },
    ],
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
      { term: "deepseek", detail: "DeepSeek Harness. Chỉ được gắn khi enabled là true hoặc có endpoint; token và secret nếu Harness của bạn cần. Gateway không bao giờ quét cổng để tìm nó." },
      { term: "t3", detail: "T3 Code. enabled, url (mặc định http://127.0.0.1:3773), và hoặc pairing_token từ t3 pair, hoặc token bạn đã có. runtime_mode đặt chính sách quyền; mặc định là full-access." },
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
        detail: "Chế độ xem git cho thư mục của ô, cùng bảng mà phiên trợ lý dùng — xem Bảng Thay đổi bên dưới. Nút có số tệp thay đổi và chỉ xuất hiện khi ô nằm trong một kho git và Gateway cung cấp được diff.",
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
    changes: {
      heading: "Bảng Thay đổi",
      lead: "Ô terminal và phiên trợ lý dùng chung một bảng Thay đổi. Nó chạy git trên máy chủ, trong thư mục của ô hoặc của phiên.",
      entries: [
        { term: "Cây thư mục", detail: "Các tệp đã thay đổi dưới dạng cây thư mục, kèm số tệp và tổng số dòng. Tên dài được rút gọn ở giữa để vẫn thấy phần mở rộng, và thư mục sâu thôi thụt lề sau ba cấp." },
        { term: "Phạm vi", detail: "Menu ở trên chuyển giữa các thay đổi chưa commit và so sánh với gốc của nhánh — merge-base với origin/HEAD, nếu không có thì main hoặc master." },
        { term: "Bản vá tải khi mở tệp", detail: "Danh sách không kèm diff nên thay đổi lớn vẫn mở nhanh. Hiện thêm ngữ cảnh sẽ mở rộng bản vá bạn đang đọc." },
        { term: "Hủy thay đổi", detail: "Trong menu … của tệp, sau khi xác nhận: tệp đang theo dõi được khôi phục, tệp chưa theo dõi bị xóa. Gateway từ chối khi kho chính là thư mục home của bạn, và với mọi đường dẫn đi ra ngoài kho — kể cả liên kết tượng trưng trỏ ra ngoài." },
        { term: "Với Gateway cũ hơn", detail: "So sánh với gốc và Hủy thay đổi trong terminal cần Gateway có pane_vcs_files. Không có nó, bảng của terminal chỉ hiện cùng cây thay đổi chưa commit." },
      ],
    },
    keyboard: {
      heading: "Bàn phím máy tính bảng và phím mở rộng",
      lead: "Trên máy tính bảng, bàn phím ảo là một bàn phím đầy đủ: dải phím chức năng có thể ẩn, hàng số, ctrl, alt và shift dính (chạm hai lần để khóa), và Home, End, Page Up, Page Down phía trên các phím mũi tên. Các tổ hợp ngoài bộ cổ điển — Ctrl+Enter, Shift+Enter, Ctrl+mũi tên, Alt+chữ, phím F — chỉ được gửi khi Gateway cho biết có thể chuyển đi.",
      entries: [
        { term: "Phím không gửi được", detail: "Phím mà Gateway không chuyển được sẽ hiện mờ và báo lý do khi bấm. Khi giữ một phím bổ trợ, các phím mà tổ hợp đó không tới được sẽ tối đi, và tổ hợp bị từ chối vẫn dùng hết phím bổ trợ một lần." },
        { term: "Herdr", detail: "Chuyển được mọi tổ hợp. Không cần thiết lập." },
        { term: "tmux", detail: "tmux 3.2 trở lên với extended-keys on, và chương trình trong ô phải yêu cầu phím mở rộng. Ctrl+Enter và Shift+Enter còn cần extended-keys-format csi-u." },
        { term: "Codex và Claude Code", detail: "Codex trong tmux không nhận Shift+Enter: dùng ⌃J để xuống dòng. Claude Code xuống dòng bằng \\ rồi Enter." },
      ],
      persistNote: "Hai lệnh này có hiệu lực ngay và kéo dài đến khi máy chủ tmux thoát. Để giữ lâu dài, đặt hai dòng đó, bỏ chữ tmux ở đầu, vào ~/.tmux.conf.",
    },
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
      'OpenCode 2.x được cài đặt trên cùng máy tính chạy Gateway.',
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
        detail: "Nút chỉ xuất hiện khi terminal nằm trong một kho git và Gateway đủ mới để cung cấp diff. So sánh với gốc và Hủy thay đổi cần Gateway 0.13 trở lên. Nâng cấp bằng cách chạy lại lệnh cài đặt.",
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
      { term: "Terminal không khả dụng", detail: "Gateway đang chạy nhưng không có backend terminal nào — đã cài tmux mà không có máy chủ tmux, hoặc Herdr chưa khởi động. Màn hình liệt kê các backend của Gateway và trạng thái; khởi động một cái và terminal tự xuất hiện. Trong lúc đó phiên trợ lý vẫn hoạt động." },
      { term: "“Terminal này không gửi được ⌃↵”", detail: "Gateway đã từ chối một tổ hợp. Với tmux, chạy tmux set -s extended-keys on, và với Ctrl+Enter thì chạy thêm tmux set -s extended-keys-format csi-u. Gợi ý bên dưới thông báo nhắc lại lời giải thích của chính Gateway." },
      { term: "Ô trợ lý ghi Cần thiết lập hoặc Cần cập nhật", detail: "Chạy muqun-gateway agent trên máy chủ: nó nêu bước tiếp theo cho từng trợ lý. Cần cập nhật nghĩa là Gateway này cũ hơn giao thức của trợ lý — chạy lại lệnh cài đặt." },
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
