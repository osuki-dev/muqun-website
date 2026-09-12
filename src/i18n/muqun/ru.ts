import { copy as en } from "./en";
import type { MuqunCopy } from "./types";
// Legacy fields remain available to archived components; every rendered field is localized.
export const copy: MuqunCopy = {
  ...en,
  meta: {
    ...en.meta,
    ...{
      title: "Muqun — удалённая работа с телефона",
      description:
        "Подключайтесь к своим компьютерам и серверам с телефона. SSH, терминал, разрешения, файлы и симуляторы.",
    },
  },
  hero: {
    ...en.hero,
    ...{
      installLabel: "На своём компьютере или сервере:",
      copiedLabel: "Скопировано",
    },
  },
  pillars: { ...en.pillars, ...{ paneLabel: "инструменты" } },
  setup: {
    ...en.setup,
    ...{
      paneLabel: "подключение",
      heading: "Установите. Сопрягите. Работайте.",
      steps: [
        { title: "Установите Gateway на компьютер", body: "" },
        { title: "Отсканируйте QR-код в Muqun", body: "" },
        { title: "Подтвердите сопряжение", body: "" },
      ],
      requirements: [
        "Gateway: macOS или Linux, tmux или Herdr.",
        "Приложение: iOS или Android.",
      ],
      openSourceLink: "Инструкция и исходный код",
    },
  },
  promise: {
    ...en.promise,
    ...{
      paneLabel: "конфиденциальность",
      lines: [
        "Телефон подключается к вашему устройству.",
        "Без аккаунта Muqun и нашего сервера-посредника.",
        "Без рекламы, аналитики и сторонних SDK отслеживания.",
        "Одна покупка. Все последующие обновления бесплатны.",
      ],
      link: "Политика конфиденциальности",
    },
  },
  footer: {
    ...en.footer,
    ...{
      heading: "Ваши агенты всегда рядом.",
      appStore: "App Store",
      googlePlay: "Google Play",
      installLabel: "Установить Gateway",
      support: "Помощь",
    },
  },
  support: {
    ...en.support,
    ...{
      metaTitle: "Помощь Muqun",
      metaDescription:
        "Установка, сопряжение, подключение и уведомления Muqun. Сообщайте о проблемах через GitHub Issues.",
      eyebrow: "Muqun · Помощь",
      heading: "Возникла проблема? Начните здесь.",
      lead: "Проверьте пункты ниже. Если проблема остаётся, укажите в GitHub Issues модель устройства, версии ОС и Gateway, а также шаги воспроизведения. Не отправляйте токены и QR-коды сопряжения.",
      issueCta: "Открыть GitHub Issues",
      checksHeading: "Быстрые проверки",
      topics: [
        {
          title: "Сопряжение компьютера",
          body: "Установите Gateway на свой компьютер или сервер. Откройте панель управления, отсканируйте QR-код в Muqun и подтвердите код сопряжения.",
        },
        {
          title: "Проверка соединения",
          body: "Убедитесь, что Gateway и tmux или Herdr запущены, а адрес сервера доступен с телефона. Затем откройте соединение заново.",
        },
        {
          title: "Удаление устройства",
          body: "Удалите сервер с главного экрана Muqun или отзовите доступ устройства в панели Gateway.",
        },
        {
          title: "Восстановление уведомлений",
          body: "Разрешите уведомления в настройках телефона и Muqun. Откройте сервер заново, чтобы обновить регистрацию уведомлений.",
        },
      ],
      safetyHeading: "Безопасное сообщение об ошибке",
      safetyBody:
        "Перед отправкой скриншотов и журналов удалите токены доступа, QR-коды сопряжения, закрытый код и другие секреты.",
      safetyLink: "Политика конфиденциальности",
    },
  },
};
