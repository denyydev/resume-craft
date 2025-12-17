import type { Resume } from "@/types/resume";

export const mockResume: Resume = {
  fullName: "Иван Петров",
  position: "Senior Frontend Developer",

  photo: undefined,

  contacts: {
    email: "ivan.petrov.dev@gmail.com",
    phone: "+7 999 123-45-67",
    location: "Москва / Remote",
    telegram: "@ivanpetrov",
    github: "github.com/ivanpetrov",
    linkedin: "linkedin.com/in/ivanpetrov",
    website: "ivanpetrov.dev",
  },

  summary:
    "Frontend-разработчик с 6+ годами опыта в создании сложных SPA и внутренних продуктов.\n" +
    "Специализируюсь на React, архитектуре интерфейсов и DX.\n" +
    "Работал с высоконагруженными системами и дизайн-системами.",

  techSkills: {
    tags: [
      "React",
      "TypeScript",
      "Next.js",
      "JavaScript",
      "Redux",
      "Zustand",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "Git",
      "Jest",
      "Playwright",
    ],
    note:
      "Опыт проектирования архитектуры frontend-приложений, работы с SSR/SSG, " +
      "оптимизации производительности и написания тестов.",
  },

  softSkills: {
    tags: [
      "Коммуникация",
      "Работа в команде",
      "Лидерство",
      "Менторство",
      "Ответственность",
      "Критическое мышление",
    ],
    note:
      "Регулярно выступал ментором для junior-разработчиков, участвовал в код-ревью, " +
      "планировании спринтов и обсуждении продуктовых решений.",
  },

  experience: [
    {
      id: "exp-1",
      company: "FinTech Corp",
      position: "Senior Frontend Developer",
      location: "Москва",
      startDate: "2021-03",
      endDate: "",
      isCurrent: true,
      description:
        "— Разработка и поддержка SPA для финансовых сервисов\n" +
        "— Архитектура модульного frontend\n" +
        "— Внедрение Zustand и React Query\n" +
        "— Оптимизация времени загрузки на 30%",
    },
    {
      id: "exp-2",
      company: "Digital Agency",
      position: "Frontend Developer",
      location: "Санкт-Петербург",
      startDate: "2018-06",
      endDate: "2021-02",
      isCurrent: false,
      description:
        "— Разработка клиентских интерфейсов\n" +
        "— Интеграция REST API\n" +
        "— Поддержка дизайн-системы\n" +
        "— Участие в пресейлах",
    },
  ],

  projects: [
    {
      id: "proj-1",
      name: "Resume Builder",
      role: "Author / Frontend",
      stack: "Next.js, React, Zustand, Ant Design, PDF",
      link: "https://resume-builder.dev",
      description:
        "Онлайн-конструктор резюме с live-preview и экспортом в PDF.\n" +
        "Фокус на UX, архитектуру состояния и шаблонный рендеринг.",
    },
    {
      id: "proj-2",
      name: "Internal Admin Panel",
      role: "Frontend Lead",
      stack: "React, TypeScript, Redux Toolkit",
      link: "",
      description:
        "Админ-панель для управления пользователями и контентом.\n" +
        "Проектирование архитектуры и код-ревью.",
    },
  ],

  education: [
    {
      id: "edu-1",
      institution: "МГТУ им. Баумана",
      degree: "Бакалавр",
      field: "Информатика и вычислительная техника",
      startDate: "2014",
      endDate: "2018",
    },
  ],

  languages: [
    {
      id: "lang-1",
      name: "Русский",
      level: "Родной",
    },
    {
      id: "lang-2",
      name: "Английский",
      level: "B2",
    },
  ],

  templateKey: "neo",
};
