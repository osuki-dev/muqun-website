import { copy as en } from "./en";
import type { MuqunCopy } from "./types";
// Legacy fields remain available to archived components; every rendered field is localized.
export const copy: MuqunCopy = {
  ...en,
  meta: {
    ...en.meta,
    ...{
      title: "Muqun — làm việc từ xa trên điện thoại",
      description:
        "Kết nối đến máy tính và máy chủ của bạn từ điện thoại. SSH, terminal, phê duyệt, tệp và trình mô phỏng.",
    },
  },
  hero: {
    ...en.hero,
    ...{
      installLabel: "Chạy trên máy tính hoặc máy chủ của bạn:",
      copiedLabel: "Đã sao chép",
    },
  },
  pillars: { ...en.pillars, ...{ paneLabel: "công cụ" } },
  setup: {
    ...en.setup,
    ...{
      paneLabel: "kết nối",
      heading: "Cài đặt. Ghép đôi. Kết nối.",
      steps: [
        { title: "Cài Gateway trên máy tính", body: "" },
        { title: "Quét mã QR bằng Muqun", body: "" },
        { title: "Xác nhận ghép đôi", body: "" },
      ],
      requirements: [
        "Gateway: macOS hoặc Linux, với tmux hoặc Herdr.",
        "Ứng dụng: iOS hoặc Android.",
      ],
      openSourceLink: "Hướng dẫn cài đặt và mã nguồn",
    },
  },
  promise: {
    ...en.promise,
    ...{
      paneLabel: "quyền riêng tư",
      lines: [
        "Điện thoại kết nối đến thiết bị của bạn.",
        "Không cần tài khoản Muqun hay máy chủ chuyển tiếp của chúng tôi.",
        "Không quảng cáo, phân tích hay SDK theo dõi bên thứ ba.",
        "Mua một lần, các bản cập nhật sau đều miễn phí.",
      ],
      link: "Đọc chính sách quyền riêng tư",
    },
  },
  footer: {
    ...en.footer,
    ...{
      heading: "Trợ lý luôn bên bạn.",
      appStore: "App Store",
      googlePlay: "Google Play",
      installLabel: "Cài Gateway",
      support: "Hỗ trợ",
    },
  },
  support: {
    ...en.support,
    ...{
      metaTitle: "Hỗ trợ Muqun",
      metaDescription:
        "Hướng dẫn cài đặt, ghép đôi, kết nối và thông báo Muqun. Báo lỗi qua GitHub Issues.",
      eyebrow: "Muqun · Hỗ trợ",
      heading: "Gặp vấn đề? Bắt đầu tại đây.",
      lead: "Kiểm tra các mục dưới đây. Nếu vẫn gặp lỗi, hãy cung cấp mẫu thiết bị, phiên bản hệ điều hành, phiên bản Gateway và các bước tái hiện qua GitHub Issues. Không gửi token hay mã QR ghép đôi.",
      issueCta: "Mở GitHub Issues",
      checksHeading: "Kiểm tra nhanh",
      topics: [
        {
          title: "Ghép đôi máy tính",
          body: "Cài Gateway trên máy tính hoặc máy chủ của bạn. Mở bảng quản lý, quét mã QR bằng Muqun rồi xác nhận mã ghép đôi.",
        },
        {
          title: "Kiểm tra kết nối",
          body: "Đảm bảo Gateway và tmux hoặc Herdr đang chạy, điện thoại truy cập được địa chỉ máy chủ đã ghép đôi, rồi mở lại kết nối.",
        },
        {
          title: "Xóa thiết bị",
          body: "Xóa máy chủ khỏi màn hình chính Muqun hoặc thu hồi quyền thiết bị trong bảng quản lý Gateway.",
        },
        {
          title: "Khôi phục thông báo",
          body: "Bật thông báo trong cài đặt hệ thống và Muqun. Mở lại máy chủ để cập nhật đăng ký thông báo.",
        },
      ],
      safetyHeading: "Báo lỗi an toàn",
      safetyBody:
        "Xóa token truy cập, mã QR ghép đôi, mã nguồn riêng tư và thông tin nhạy cảm trước khi gửi ảnh chụp hoặc nhật ký.",
      safetyLink: "Đọc chính sách quyền riêng tư",
    },
  },
};
