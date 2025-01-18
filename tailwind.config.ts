import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
                    "red-1": "#FF0000",
                    "grey-1": "#210202",
                    "grey-2": "#8A8A8A",
                    "blue-2": "#c7e6eb",
                    "blue-1": "#0a69a1",
      },
      fontSize: {
        "heading1-bold": [
          "50px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "heading2-bold": [
          "30px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "heading3-bold": [
          "24px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "heading4-bold": [
          "20px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "body-bold": [
          "18px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "body-semibold": [
          "18px",
          {
            lineHeight: "100%",
            fontWeight: "600",
          },
        ],
        "body-medium": [
          "18px",
          {
            lineHeight: "100%",
            fontWeight: "500",
          },
        ],
        "base-bold": [
          "16px",
          {
            lineHeight: "100%",
            fontWeight: "600",
          },
        ],
        "base-medium": [
          "16px",
          {
            lineHeight: "100%",
            fontWeight: "500",
          },
        ],
        "small-bold": [
          "14px",
          {
            lineHeight: "140%",
            fontWeight: "700",
          },
        ],
        "small-medium": [
          "14px",
          {
            lineHeight: "140%",
            fontWeight: "500",
          },
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
