import type { ChromeCopy } from './types';
export const chrome: ChromeCopy = {
  site: { name: 'Muqun' },
  nav: { home: 'หน้าแรก', themes: 'ธีม', support: 'ช่วยเหลือ', privacy: 'ความเป็นส่วนตัว' },
  theme: { light: 'สว่าง', dark: 'มืด', system: 'ตามระบบ' },
  header: { aria: { language: 'ภาษา', theme: 'ธีม', menu: 'เมนู' } },
  footer: { copyright: '© {year} muqun.dev. สงวนลิขสิทธิ์', github: 'GitHub' },
  error: { notFound: { title: 'ไม่พบหน้านี้', body: 'หน้านี้อาจถูกย้ายไปแล้ว หรือลิงก์อาจไม่ถูกต้อง' }, home: 'กลับหน้าแรก' },
  privacy: { title: 'นโยบายความเป็นส่วนตัว', lastUpdatedLabel: 'อัปเดตล่าสุด' },
};
