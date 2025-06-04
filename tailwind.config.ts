import type { Config } from "tailwindcss"

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "table-header": "#E9EFF6",
      },
    },
  },
} satisfies Config

export default config
