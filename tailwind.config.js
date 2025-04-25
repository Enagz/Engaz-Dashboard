// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,scss}", // Include all relevant file types in your src folder
  ],
  theme: {
    extend: {
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        "card-foreground": "rgb(var(--color-card-foreground) / <alpha-value>)",
        popover: "rgb(var(--color-popover) / <alpha-value>)",
        "popover-foreground":
          "rgb(var(--color-popover-foreground) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-foreground":
          "rgb(var(--color-primary-foreground) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        "secondary-foreground":
          "rgb(var(--color-secondary-foreground) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        "muted-foreground":
          "rgb(var(--color-muted-foreground) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-foreground":
          "rgb(var(--color-accent-foreground) / <alpha-value>)",
        destructive: "rgb(var(--color-destructive) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        input: "rgb(var(--color-input) / <alpha-value>)",
        ring: "rgb(var(--color-ring) / <alpha-value>)",
        "chart-1": "rgb(var(--color-chart-1) / <alpha-value>)",
        "chart-2": "rgb(var(--color-chart-2) / <alpha-value>)",
        "chart-3": "rgb(var(--color-chart-3) / <alpha-value>)",
        "chart-4": "rgb(var(--color-chart-4) / <alpha-value>)",
        "chart-5": "rgb(var(--color-chart-5) / <alpha-value>)",
        sidebar: "rgb(var(--color-sidebar) / <alpha-value>)",
        "sidebar-foreground":
          "rgb(var(--color-sidebar-foreground) / <alpha-value>)",
        "sidebar-primary": "rgb(var(--color-sidebar-primary) / <alpha-value>)",
        "sidebar-primary-foreground":
          "rgb(var(--color-sidebar-primary-foreground) / <alpha-value>)",
        "sidebar-accent": "rgb(var(--color-sidebar-accent) / <alpha-value>)",
        "sidebar-accent-foreground":
          "rgb(var(--color-sidebar-accent-foreground) / <alpha-value>)",
        "sidebar-border": "rgb(var(--color-sidebar-border) / <alpha-value>)",
        "sidebar-ring": "rgb(var(--color-sidebar-ring) / <alpha-value>)",
        // Fixed Hex colors
        "primary-color": "#3e97d1",
        "global-bg": "#f8f8f8",
        "containers-bg": "#ffffff",
        "text-header": "#fe2525",
        "text-normal": "#676767",
        "line-break": "#b3b3b3",
        "sidebar-shadow": "rgba(62, 151, 209, 0.15)",
        button: "#409edcf0",
        "button-hover": "#f2f2f2",
        "table-shadow": "rgba(0, 0, 0, 0.25)",
        "table-border": "#e5e7eb",
        "yellow-color": "#ffb300",
        "yellow-hover": "#ffb3001f",
        "green-color": "#166534",
        "green-hover": "#f0fdf4",
        "red-color": "#991b1b",
        "red-hover": "#fef2f2",
        "error-color": "#e31d1c",
      },
    },
  },
  plugins: [],
  // Potential v4 specific options might go here - check v4 docs!
};
