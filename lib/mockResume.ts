import type { Resume } from "@/types/resume";

export const MOCK_RESUME: Resume = {
  fullName: "Алексей Воронов",
  position: "Senior Frontend Engineer (React / TypeScript)",
  contacts: {
    email: "alexey.voronov.dev@gmail.com",
    phone: "+48 512 345 678",
    location: "Warsaw, Poland",
    telegram: "https://t.me/alexey_voronov",
    github: "https://github.com/alexey-voronov",
    linkedin: "https://www.linkedin.com/in/alexey-voronov/",
    website: "https://alexeyvoronov.dev",
  },
  summary:
    "Senior Frontend Engineer (React/TypeScript) с 7+ годами опыта в продуктовых командах (B2B SaaS, финтех). Делаю быстрые и доступные интерфейсы, дизайн-системы и сложные формы/флоу. Улучшал Web Vitals (LCP/INP), снижал регрессии через тесты и CI. Ищу продукт с высокой планкой качества и понятными метриками.",
  experience: [
    {
      id: "exp_1",
      company: "FinEdge (B2B Payments)",
      position: "Senior Frontend Engineer",
      location: "Warsaw (Hybrid)",
      startDate: "2023-02",
      endDate: "",
      isCurrent: true,
      description:
        "— Вёл редизайн кабинета мерчанта (React, TS, Next.js, Ant Design): конверсия активации +12%.\n— Ускорил LCP с 3.2s до 1.9s: code-splitting, оптимизация критического CSS, кеширование запросов.\n— Внедрил feature flags и staged rollout: инциденты после релиза −30%.\n— Построил библиотеку UI-паттернов поверх AntD (токены, типовые формы, валидаторы): время разработки экранов −20%.\n— Настроил e2e smoke (Playwright) и quality gates в CI: регрессии в проде −25%.",
    },
    {
      id: "exp_2",
      company: "CloudDesk (SaaS for Operations)",
      position: "Frontend Engineer → Lead",
      location: "Remote",
      startDate: "2020-06",
      endDate: "2023-01",
      isCurrent: false,
      description:
        "— Спроектировал и внедрил дизайн-систему (tokens, components, docs): консистентность UI, скорость фичей +18%.\n— Перевёл ключевые модули на TypeScript strict: баги на интеграции −15%.\n— Оптимизировал таблицы и виртуализацию списков (react-window): TTI −22% на больших наборах данных.\n— Улучшил DX: генерация типов из OpenAPI, единые хуки для запросов, шаблоны PR/ревью: cycle time 9 → 6 дней.\n— Менторил 4 инженеров, проводил архитектурные ревью, отвечал за качество фронтенда в двух командах.",
    },
    {
      id: "exp_3",
      company: "RetailNow",
      position: "Frontend Developer",
      location: "Minsk",
      startDate: "2018-04",
      endDate: "2020-05",
      isCurrent: false,
      description:
        "— Разработал витрину и личный кабинет (React, Redux, Node BFF): выручка онлайн-канала +8%.\n— Внедрил мониторинг ошибок (Sentry) и трейсинг производительности: MTTR −35%.\n— Настроил SSR для SEO-страниц и улучшил индексируемость: органический трафик +20%.\n— Автоматизировал сборку и деплой (GitHub Actions): время релиза 45 → 15 минут.",
    },
  ],
  projects: [
    {
      id: "prj_1",
      name: "ResumeCraft — Resume Builder",
      role: "Author / Frontend",
      stack:
        "Next.js, React, TypeScript, Ant Design, Zustand, Tailwind, Playwright",
      link: "https://github.com/alexey-voronov/resumecraft",
      description:
        "Конструктор резюме с шаблонами, экспортом в PDF и ATS-friendly режимом. Реализовал токены темы, редактор секций, историю изменений и превью шаблонов.",
    },
    {
      id: "prj_2",
      name: "Design Tokens Playground",
      role: "Frontend",
      stack: "React, TypeScript, Vite, CSS Variables",
      link: "https://alexeyvoronov.dev/tokens",
      description:
        "Песочница для генерации и тестирования дизайн-токенов (цвета, радиусы, тени) с экспортом в JSON/CSS и визуальной проверкой компонентов.",
    },
    {
      id: "prj_3",
      name: "Perf Audit Toolkit",
      role: "Frontend",
      stack: "Node.js, Lighthouse CI, GitHub Actions",
      link: "https://github.com/alexey-voronov/perf-audit-toolkit",
      description:
        "Инструменты для CI-аудита производительности (LCP/INP/CLS), автоматические отчёты и алерты по деградациям.",
    },
  ],
  techSkills: {
    tags: [
      "React",
      "TypeScript",
      "Next.js",
      "Ant Design",
      "Zustand",
      "Redux Toolkit",
      "TanStack Query",
      "Node.js",
      "REST",
      "GraphQL",
      "Web Performance",
      "Accessibility (a11y)",
      "Playwright",
      "Jest",
      "RTL",
      "CI/CD",
      "GitHub Actions",
      "Docker (basic)",
    ],
    note: "Фокус: дизайн-системы, сложные формы, таблицы/виртуализация, Web Vitals (LCP/INP/CLS), типобезопасные интеграции (OpenAPI).",
  },
  softSkills: {
    tags: [
      "Ownership",
      "Mentoring",
      "Communication",
      "Product thinking",
      "Stakeholder management",
      "Code review",
      "System design",
      "Prioritization",
    ],
    note: "Люблю прозрачные метрики, короткие итерации, качественные релизы и аккуратную архитектуру без оверинжиниринга.",
  },
  education: [
    {
      id: "edu_1",
      institution:
        "Belarusian State University of Informatics and Radioelectronics",
      degree: "Bachelor",
      field: "Computer Science",
      startDate: "2014-09",
      endDate: "2018-06",
    },
  ],
  languages: [
    { id: "lang_1", name: "Russian", level: "Native" },
    { id: "lang_2", name: "English", level: "B2 (Upper-Intermediate)" },
    { id: "lang_3", name: "Polish", level: "A2" },
  ],
  employmentPreferences: {
    employmentType: ["full-time", "contract"],
    workFormat: ["remote", "hybrid"],
    relocation: false,
    timezone: "CET (Europe/Warsaw) ±2h",
    workAuthorization: "EU work authorization / B2B available",
  },
  certifications: [
    {
      id: "cert_1",
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2022",
      link: "https://www.credly.com/",
    },
    {
      id: "cert_2",
      name: "Web Accessibility (WCAG) Fundamentals",
      issuer: "Deque University",
      year: "2021",
      link: "https://dequeuniversity.com/",
    },
  ],
  activities: [
    {
      id: "act_1",
      type: "open-source",
      name: "Open-source contributions",
      role: "Contributor",
      description:
        "Контрибьютил в UI-либах и утилитах (фиксы типизации, улучшения документации, мелкие фичи).",
      link: "https://github.com/alexey-voronov",
    },
    {
      id: "act_2",
      type: "speaking",
      name: "Internal Frontend Guild",
      role: "Speaker",
      description:
        "Доклады про Web Vitals, практики тестирования и дизайн-токены; воркшопы по миграции на TS strict.",
      link: "",
    },
    {
      id: "act_3",
      type: "volunteering",
      name: "Mentoring (career / interviews)",
      role: "Mentor",
      description:
        "Помогаю джунам подготовиться к собеседованиям: разбор проектов, CV, мок-интервью.",
      link: "",
    },
  ],
  templateKey: "grid",
  accentColor: "#0A84FF",
  includePhoto: false,
  photo: undefined,
  sectionsVisibility: {
    photo: true,
    summary: true,
    experience: true,
    projects: true,
    techSkills: true,
    softSkills: true,
    education: true,
    languages: true,
    employmentPreferences: true,
    certifications: true,
    activities: true,
  },
};
