import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#E0E0E0",
        ferrari: "#DC0000",
        mercedes: "#00D2BE",
        redbull: "#3671C6",
        mclaren: "#FF8700",
        aston: "#006F62",
        alpine: "#ff87bc",
        williams: "#005AFF",
        vcarb: "#6692FF",
        sauber: "#52e252",
        haas: "#B6BABD",
        silver: "#E0E0E0",
      },
      fontFamily: {
        heading: ["var(--font-titillium-web)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
