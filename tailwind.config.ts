import type { Config } from "tailwindcss";

export default {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        medical: {
          50: "#eef7ff",
          500: "#1d7eea",
          700: "#155db0"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
