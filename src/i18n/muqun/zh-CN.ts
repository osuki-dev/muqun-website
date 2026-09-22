import { copy as en } from "./en";
import type { MuqunCopy } from "./types";
// Legacy fields remain available to archived components; every rendered field is localized.
export const copy: MuqunCopy = {
  ...en,
  meta: {
    ...en.meta,
    ...{
      title: "牧群 — 手机里的远程工作台",
      description:
        "从手机连接自己的电脑或服务器。使用 SSH、终端、审批、文件和模拟器预览。",
    },
  },
  hero: {
    ...en.hero,
    ...{ installLabel: "在你的电脑或服务器上运行：", copiedLabel: "已复制" },
  },
  pillars: { ...en.pillars, ...{ paneLabel: "随身工作台" } },
  setup: {
    ...en.setup,
    ...{
      paneLabel: "开始连接",
      heading: "安装。配对。连接。",
      steps: [
        { title: "在电脑上安装 Gateway", body: "" },
        { title: "打开牧群，扫描配对二维码", body: "" },
        { title: "确认配对，进入工作区", body: "" },
      ],
      requirements: [
        "Gateway：macOS 或 Linux，安装 tmux 或 Herdr。",
        "手机端：iOS 或 Android。",
      ],
      openSourceLink: "安装指南与源码",
    },
  },
  promise: {
    ...en.promise,
    ...{
      paneLabel: "你的隐私",
      lines: [
        "手机直接连接你的设备。",
        "无需牧群账号，也不经过我们的中继。",
        "没有广告、分析或第三方追踪 SDK。",
        "一次购买，后续更新免费。",
      ],
      link: "阅读隐私政策",
    },
  },
  footer: {
    ...en.footer,
    ...{
      heading: "AI 助手随身同行。",
      appStore: "App Store",
      googlePlay: "Google Play",
      installLabel: "安装 Gateway",
      support: "支持",
    },
  },
  support: {
    ...en.support,
    ...{
      metaTitle: "牧群支持",
      metaDescription:
        "牧群安装、配对、连接与通知问题的排查指南。通过 GitHub Issues 反馈问题。",
      eyebrow: "牧群 · 支持",
      heading: "遇到问题？从这里开始。",
      lead: "先检查以下项目。问题仍未解决，请在 GitHub Issues 提供设备型号、系统版本、Gateway 版本和复现步骤。请勿提交令牌或配对二维码。",
      issueCta: "前往 GitHub Issues",
      networkEyebrow: "",
      networkHeading: "",
      networkBadge: "",
      networkBody: "",
      networkLink: "",
      checksHeading: "常见问题",
      topics: [
        {
          title: "配对电脑",
          body: "在自己的电脑或服务器上安装 Gateway，打开管理面板，在牧群中扫描二维码，再确认配对码。",
        },
        {
          title: "检查连接",
          body: "确认 Gateway 与 tmux 或 Herdr 正在运行，手机可以访问已配对的服务器地址，然后重新打开连接。",
        },
        {
          title: "移除设备",
          body: "在牧群首页删除服务器，或在 Gateway 管理面板撤销设备授权。",
        },
        {
          title: "恢复通知",
          body: "在手机系统设置及牧群设置中开启通知，重新打开服务器连接以更新通知注册。",
        },
      ],
      safetyHeading: "安全反馈",
      safetyBody:
        "提交截图和日志前，请移除访问令牌、配对二维码、私密代码及其他敏感信息。",
      safetyLink: "阅读隐私政策",
    },
  },
};
