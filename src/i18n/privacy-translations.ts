import type { SiteLocale } from "@/lib/locales";
interface Policy {
  intro: string;
  sections: { title: string; paragraphs: string[] }[];
}
export const privacyTranslations: Partial<Record<SiteLocale, Policy>> = {
  th: {
  "intro": "Muqun เป็นแอปมือถือสำหรับเชื่อมต่อกับ Gateway ที่คุณดูแลเอง โดยใช้ tmux หรือ Herdr ไม่มีบัญชี Muqun โฆษณา การวิเคราะห์ หรือ SDK ติดตาม",
  "sections": [
    {
      "title": "ข้อมูลที่เก็บบนอุปกรณ์",
      "paragraphs": [
        "Muqun เก็บข้อมูลที่จำเป็นต่อการทำงาน ได้แก่ ชื่อและที่อยู่ Gateway เวลาจับคู่ โทเค็นการเข้าถึง การตั้งค่าแอป คำสั่งลัดที่คุณกำหนด และ Gateway ที่เลือกอยู่",
        "ข้อมูล Gateway เข้ารหัสและเก็บในพื้นที่จัดเก็บข้อมูลรับรองที่ปลอดภัยของระบบปฏิบัติการ โดยกำหนดให้ใช้เฉพาะอุปกรณ์นี้ จึงไม่ซิงค์ไปยังเครื่องอื่นหรือกู้คืนจากข้อมูลสำรอง"
      ]
    },
    {
      "title": "การเชื่อมต่อ Gateway",
      "paragraphs": [
        "เซสชันเทอร์มินัลส่งตรงระหว่าง Muqun กับที่อยู่ Gateway ที่คุณจับคู่ Osuki ไม่เป็นตัวกลาง ไม่รับหรือเก็บผลลัพธ์เทอร์มินัล คำสั่ง ซอร์สโค้ด บทสนทนา ที่อยู่ Gateway หรือโทเค็นการเข้าถึง",
        "คำขอไปยัง Gateway อาจมีโทเค็นการเข้าถึง ตัวระบุพื้นที่ทำงานและแผง อินพุตเทอร์มินัล คำสั่ง และผลลัพธ์จากผู้ช่วยตามที่ฟีเจอร์นั้นต้องใช้ หากเปิดการแจ้งเตือน Muqun จะส่งโทเค็นการแจ้งเตือน ชื่ออุปกรณ์ และแพลตฟอร์มไปยัง Gateway ด้วย",
        "คุณเป็นผู้ดูแล Gateway และเครือข่าย เราแนะนำให้ Muqun และ Gateway อยู่ในเครือข่าย Tailscale เดียวกัน และใช้ Tailscale Serve สำหรับที่อยู่ HTTPS ส่วนตัว HTTP ไม่เข้ารหัสการรับส่งข้อมูล จึงควรใช้เฉพาะภายในเครือข่ายเข้ารหัสที่เชื่อถือได้ เช่น Tailscale"
      ]
    },
    {
      "title": "กล้องและการล็อกแอป",
      "paragraphs": [
        "แอปขอสิทธิ์กล้องเฉพาะเมื่อคุณเปิดเครื่องสแกน QR ภาพประมวลผลบนอุปกรณ์เพื่ออ่านรหัสจับคู่ โดยไม่บันทึกหรืออัปโหลด คุณสามารถกรอกที่อยู่ Gateway เองแทนได้",
        "เมื่อเปิดการล็อกแอป ระบบปฏิบัติการจะยืนยันด้วย Face ID, Touch ID, ลายนิ้วมือ ใบหน้า หรือรหัสผ่าน Muqun ได้รับเพียงผลว่ายืนยันสำเร็จหรือไม่ และไม่รับหรือเก็บข้อมูลชีวมิติหรือรหัสผ่าน"
      ]
    },
    {
      "title": "การแจ้งเตือน",
      "paragraphs": [
        "การแจ้งเตือน Gateway เป็นตัวเลือก เมื่อเปิดใช้ บริการแจ้งเตือนจะประมวลผลโทเค็นอุปกรณ์ แพลตฟอร์ม เนื้อหาขั้นต่ำ และข้อมูลกำกับการจัดส่งที่จำเป็น ข้อมูลนี้ใช้เพื่อการทำงานของแอปเท่านั้น ไม่ใช้เพื่อโฆษณาหรือติดตาม เมื่อปิดการแจ้งเตือน อุปกรณ์จะถูกยกเลิกการลงทะเบียนจาก Gateway ที่จับคู่"
      ]
    },
    {
      "title": "การเก็บรักษาและการลบ",
      "paragraphs": [
        "ข้อมูล Gateway บนอุปกรณ์จะอยู่จนกว่าคุณจะนำ Gateway นั้นออกหรือถอนการติดตั้ง Muqun การตั้งค่าและคำสั่งลัดจะอยู่จนกว่าจะเปลี่ยนหรือลบแอป ข้อมูลฝั่ง Gateway อยู่ภายใต้การควบคุมของผู้ดูแล การเพิกถอนอุปกรณ์จาก Gateway จะทำให้โทเค็นใช้ไม่ได้",
        "หากคุณติดต่อ Osuki เพื่อขอความช่วยเหลือ เราจะใช้ข้อมูลที่คุณให้มาเพื่อตอบคำขอนั้นเท่านั้น"
      ]
    },
    {
      "title": "การเปลี่ยนแปลงและการติดต่อ",
      "paragraphs": [
        "เราอาจปรับปรุงนโยบายนี้เมื่อฟีเจอร์หรือผู้ให้บริการเปลี่ยนไป ฉบับปัจจุบันและวันที่แก้ไขจะยังอยู่ที่ URL นี้",
        "หากมีคำถามเกี่ยวกับนโยบาย กรุณาติดต่อ hello@muqun.dev"
      ]
    }
  ]
},
  "zh-TW": {
    intro:
      "牧群是連接自主管理 Gateway 的行動應用程式，Gateway 可搭配 tmux 或 Herdr 使用。牧群不設帳號，也沒有廣告、分析或追蹤 SDK。",
    sections: [
      {
        title: "儲存在裝置上的資料",
        paragraphs: [
          "牧群會儲存提供功能所需的資料：Gateway 名稱、位址、配對時間與存取權杖、應用程式偏好設定、自訂快速指令，以及目前選取的 Gateway。",
          "Gateway 記錄會加密後儲存在作業系統的安全憑證儲存空間，並標記為僅限本機使用，不會同步至其他裝置，也不會從備份還原。",
        ],
      },
      {
        title: "Gateway 連線",
        paragraphs: [
          "終端機工作階段直接在牧群與你配對的 Gateway 位址之間傳輸。Osuki 不會中繼、接收或儲存終端機輸出、指令、原始碼、對話、Gateway 位址或存取權杖。",
          "傳送至 Gateway 的要求可能包含目前功能所需的存取權杖、工作區與窗格識別碼、終端機輸入、指令及代理程式輸出。啟用通知後，牧群也會將裝置通知權杖、裝置名稱及平台傳送至 Gateway。",
          "Gateway 及其網路由你管理。我們建議透過 Tailscale 私有網路連線，並使用 Tailscale Serve 提供私有 HTTPS 位址。HTTP 本身不會加密流量，僅應在可信任的加密私有網路中使用。",
        ],
      },
      {
        title: "相機與應用程式鎖定",
        paragraphs: [
          "只有開啟 QR 碼掃描器時，牧群才會要求相機權限。影像會在裝置上處理，用來讀取配對碼，不會儲存或上傳。你也可以手動輸入 Gateway 位址進行配對。",
          "啟用應用程式鎖定後，由作業系統執行 Face ID、Touch ID、指紋、臉部辨識或密碼驗證。牧群只會得知驗證是否成功，不會接收或儲存生物辨識資料或密碼。",
        ],
      },
      {
        title: "通知",
        paragraphs: [
          "Gateway 通知是選用功能。啟用後，通知服務會處理傳送提醒所需的裝置通知權杖、平台、最少量的通知內容及傳送中繼資料。這些資料僅用於應用程式功能，不用於廣告或追蹤。關閉通知後，裝置會從已配對的 Gateway 取消通知註冊。",
        ],
      },
      {
        title: "資料保留與刪除",
        paragraphs: [
          "本機 Gateway 資料會保留至你移除該 Gateway 或解除安裝牧群為止。偏好設定與快速指令會保留至修改或解除安裝應用程式為止。Gateway 端的資料由管理者控制；從 Gateway 撤銷裝置授權即可讓權杖失效。",
          "若你聯絡 Osuki，我們只會使用你提供的資訊回覆該次詢問。",
        ],
      },
      {
        title: "政策變更與聯絡方式",
        paragraphs: [
          "牧群的功能或服務供應商變更時，我們可能更新本政策。最新版本與修訂日期會持續在此頁面提供。",
          "如對本政策有疑問，請來信 hello@muqun.dev。",
        ],
      },
    ],
  },
  "zh-CN": {
    intro:
      "牧群是连接用户自行管理的 Gateway（基于 tmux 或 Herdr）的移动客户端。没有牧群账号、广告、分析或追踪 SDK。",
    sections: [
      {
        title: "设备上保存的数据",
        paragraphs: [
          "牧群保存提供功能所需的信息：Gateway 名称、地址、配对时间和访问令牌，应用偏好、自定义快捷命令，以及当前选中的 Gateway。",
          "Gateway 记录经加密后保存在操作系统的安全凭据存储中，标记为仅限本设备，不会同步到其他设备或从备份恢复。",
        ],
      },
      {
        title: "Gateway 连接",
        paragraphs: [
          "终端会话在牧群和你配对的 Gateway 地址之间直接传输。Osuki 不中继、接收或存储终端输出、命令、源代码、对话、Gateway 地址或访问令牌。",
          "发往 Gateway 的请求可能包含所用功能必需的访问令牌、工作区与窗格标识、终端输入、命令和 AI 助手输出。开启通知后，牧群还会向 Gateway 发送设备通知令牌、设备名称和平台。",
          "你负责管理 Gateway 及其网络。请使用安全连接。HTTP 本身不加密流量，只应在可信的加密私有网络内使用。",
        ],
      },
      {
        title: "相机与应用锁",
        paragraphs: [
          "只有打开二维码扫描器时才会请求相机权限。画面在设备上处理，用于读取配对码，不会保存或上传。你也可以手动输入 Gateway 地址配对。",
          "启用应用锁后，由操作系统完成 Face ID、Touch ID、指纹、人脸或密码验证。牧群只接收验证是否成功的结果，不接收或保存生物识别数据及密码。",
        ],
      },
      {
        title: "通知",
        paragraphs: [
          "Gateway 通知为可选功能。启用后，通知服务处理发送提醒所需的设备通知令牌、平台、最少量通知内容和投递元数据。这些信息仅用于应用功能，不用于广告或追踪。关闭通知会从已配对 Gateway 注销设备。",
        ],
      },
      {
        title: "保留与删除",
        paragraphs: [
          "本地 Gateway 数据保留至你移除该 Gateway 或卸载牧群。偏好设置和快捷命令保留至修改或卸载应用。Gateway 端的数据由其管理者控制；从 Gateway 撤销设备可使令牌失效。",
          "如果你联系 Osuki，我们仅使用你提供的信息回复该请求。",
        ],
      },
      {
        title: "变更与联系",
        paragraphs: [
          "当牧群的功能或服务提供商变化时，我们可能更新本政策。当前版本和修订日期将一直在此页面提供。",
          "如对本政策有疑问，请联系 hello@muqun.dev。",
        ],
      },
    ],
  },
  ru: {
    intro:
      "Muqun — мобильный клиент для управляемых вами экземпляров Gateway на базе tmux или Herdr. В приложении нет аккаунтов Muqun, рекламы, аналитики или SDK отслеживания.",
    sections: [
      {
        title: "Данные на вашем устройстве",
        paragraphs: [
          "Muqun сохраняет сведения, необходимые для работы: имена и адреса Gateway, время сопряжения, токены доступа, настройки приложения, собственные быстрые команды и выбранный Gateway.",
          "Записи Gateway зашифрованы и хранятся в защищённом хранилище учётных данных ОС. Они привязаны к устройству, не синхронизируются с другими устройствами и не восстанавливаются из резервной копии.",
        ],
      },
      {
        title: "Подключения к Gateway",
        paragraphs: [
          "Сеансы терминала передаются напрямую между Muqun и сопряжённым адресом Gateway. Osuki не пересылает, не получает и не хранит вывод терминала, команды, исходный код, разговоры, адреса Gateway или токены доступа.",
          "Запросы к Gateway могут содержать токен доступа, идентификаторы рабочих пространств и панелей, ввод терминала, команды и вывод агента, необходимые для выбранной функции. При включённых уведомлениях Muqun также отправляет Gateway токен уведомлений устройства, его имя и платформу.",
          "Вы управляете Gateway и его сетью. Мы рекомендуем общую сеть Tailscale с частным HTTPS-адресом через Tailscale Serve. HTTP сам по себе не шифрует трафик; используйте его только в доверенной зашифрованной частной сети.",
        ],
      },
      {
        title: "Камера и блокировка приложения",
        paragraphs: [
          "Доступ к камере запрашивается только при открытии сканера QR-кодов. Кадры обрабатываются на устройстве для чтения кода сопряжения, не сохраняются и не загружаются. Адрес Gateway можно ввести вручную.",
          "При включённой блокировке приложения ОС выполняет проверку Face ID, Touch ID, отпечатка пальца, лица или кода доступа. Muqun получает только результат проверки и не получает и не хранит биометрические данные или код доступа.",
        ],
      },
      {
        title: "Уведомления",
        paragraphs: [
          "Уведомления Gateway необязательны. При их включении служба уведомлений обрабатывает токен устройства, платформу, минимальное содержимое уведомления и метаданные доставки. Эти данные нужны только для работы приложения, а не для рекламы или отслеживания. Отключение уведомлений отменяет регистрацию устройства на сопряжённом Gateway.",
        ],
      },
      {
        title: "Хранение и удаление",
        paragraphs: [
          "Локальные данные Gateway хранятся до удаления Gateway или приложения. Настройки и быстрые команды сохраняются до их изменения или удаления приложения. Данные на стороне Gateway контролирует его оператор; отзовите доступ устройства на Gateway, чтобы аннулировать токен.",
          "Если вы связываетесь с Osuki, предоставленная информация используется только для ответа на ваш запрос.",
        ],
      },
      {
        title: "Изменения и связь",
        paragraphs: [
          "Мы можем обновлять политику при изменении функций Muqun или поставщиков услуг. Актуальная версия и дата изменения будут доступны по этому адресу.",
          "Вопросы о политике можно направить на hello@muqun.dev.",
        ],
      },
    ],
  },
  vi: {
    intro:
      "Muqun là ứng dụng di động kết nối đến Gateway do bạn quản lý, chạy trên tmux hoặc Herdr. Ứng dụng không có tài khoản Muqun, quảng cáo, phân tích hay SDK theo dõi.",
    sections: [
      {
        title: "Dữ liệu lưu trên thiết bị",
        paragraphs: [
          "Muqun lưu thông tin cần thiết cho các tính năng: tên và địa chỉ Gateway, thời gian ghép đôi, token truy cập, tùy chọn ứng dụng, lệnh nhanh tùy chỉnh và Gateway đang chọn.",
          "Bản ghi Gateway được mã hóa và lưu trong kho thông tin xác thực an toàn của hệ điều hành. Dữ liệu chỉ dành cho thiết bị hiện tại, không đồng bộ sang thiết bị khác hoặc khôi phục từ bản sao lưu.",
        ],
      },
      {
        title: "Kết nối Gateway",
        paragraphs: [
          "Phiên terminal truyền trực tiếp giữa Muqun và địa chỉ Gateway bạn ghép đôi. Osuki không chuyển tiếp, nhận hoặc lưu đầu ra terminal, lệnh, mã nguồn, hội thoại, địa chỉ Gateway hay token truy cập.",
          "Yêu cầu gửi tới Gateway có thể chứa token truy cập, mã định danh không gian làm việc và khung terminal, nội dung nhập, lệnh và đầu ra trợ lý cần cho tính năng đang dùng. Khi bật thông báo, Muqun còn gửi token thông báo, tên và nền tảng của thiết bị tới Gateway.",
          "Bạn quản lý Gateway và mạng của mình. Chúng tôi khuyến nghị dùng chung mạng Tailscale với địa chỉ HTTPS riêng qua Tailscale Serve. HTTP không tự mã hóa lưu lượng; chỉ dùng trong mạng riêng đáng tin cậy có mã hóa.",
        ],
      },
      {
        title: "Camera và khóa ứng dụng",
        paragraphs: [
          "Quyền camera chỉ được yêu cầu khi bạn mở trình quét QR. Khung hình được xử lý trên thiết bị để đọc mã ghép đôi, không được lưu hoặc tải lên. Bạn cũng có thể nhập địa chỉ Gateway thủ công.",
          "Khi bật khóa ứng dụng, hệ điều hành thực hiện xác thực Face ID, Touch ID, vân tay, khuôn mặt hoặc mật mã. Muqun chỉ nhận kết quả thành công hay thất bại, không nhận hay lưu dữ liệu sinh trắc học hoặc mật mã.",
        ],
      },
      {
        title: "Thông báo",
        paragraphs: [
          "Thông báo Gateway là tùy chọn. Khi bật, dịch vụ thông báo xử lý token thiết bị, nền tảng, nội dung thông báo tối thiểu và siêu dữ liệu cần để gửi cảnh báo. Thông tin chỉ dùng cho chức năng ứng dụng, không cho quảng cáo hoặc theo dõi. Tắt thông báo sẽ hủy đăng ký thiết bị khỏi Gateway đã ghép đôi.",
        ],
      },
      {
        title: "Lưu giữ và xóa",
        paragraphs: [
          "Dữ liệu Gateway cục bộ được giữ đến khi bạn xóa Gateway hoặc gỡ Muqun. Tùy chọn và lệnh nhanh được giữ đến khi thay đổi hoặc gỡ ứng dụng. Dữ liệu phía Gateway do người vận hành quản lý; thu hồi thiết bị trên Gateway để vô hiệu hóa token.",
          "Nếu bạn liên hệ Osuki, thông tin bạn cung cấp chỉ được dùng để trả lời yêu cầu đó.",
        ],
      },
      {
        title: "Thay đổi và liên hệ",
        paragraphs: [
          "Chính sách có thể được cập nhật khi tính năng Muqun hoặc nhà cung cấp dịch vụ thay đổi. Phiên bản hiện tại và ngày sửa đổi luôn có tại địa chỉ này.",
          "Vui lòng gửi câu hỏi về chính sách đến hello@muqun.dev.",
        ],
      },
    ],
  },
};
