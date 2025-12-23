module.exports = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        surface2: "rgb(var(--surface-2) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",

        text: "rgb(var(--text) / <alpha-value>)",
        text2: "rgb(var(--text-2) / <alpha-value>)",
        text3: "rgb(var(--text-3) / <alpha-value>)",

        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-contrast": "rgb(var(--primary-contrast) / <alpha-value>)",

        ring: "rgb(var(--ring) / <alpha-value>)",

        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
      },
      boxShadow: {
        soft: "0 12px 32px rgb(var(--shadow) / 0.06)",
        glow: "0 16px 40px rgb(var(--shadow) / 0.15)",
      },
    },
  },
  plugins: [],
};
