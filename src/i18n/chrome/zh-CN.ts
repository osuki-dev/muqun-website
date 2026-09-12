import { chrome as en } from "./en";
import type { ChromeCopy } from "./types";
export const chrome: ChromeCopy = { ...en, ...{"site": {"name": "牧群"}, "nav": {"home": "首页", "support": "支持", "privacy": "隐私"}, "header": {"aria": {"language": "语言", "theme": "主题", "menu": "菜单"}}, "footer": {"copyright": "© {year} muqun.dev. 版权所有。", "github": "GitHub"}, "error": {"notFound": {"title": "页面不存在", "body": "这个页面可能已移动，或链接有误。"}, "home": "返回首页"}, "privacy": {"title": "隐私政策", "lastUpdatedLabel": "最后更新", "sourceNote": "译文供参考，英文原文为准。"}} };
