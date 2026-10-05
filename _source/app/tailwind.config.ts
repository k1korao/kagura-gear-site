import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050507",
        coal: "#0b0c10",
        smoke: "#101217",
        steel: "#8e98a8",
        bone: "#f7f3ed",
        shrine: "#9f1d2f",
        ember: "#d7334d",
        sakura: "#f6a5bd",
        brass: "#d6b56d",
        mint: "#62c7ba",
      },
      boxShadow: {
        glow: "0 0 55px rgba(215, 51, 77, 0.28)",
        card: "0 24px 80px rgba(0, 0, 0, 0.42)",
      },
      backgroundImage: {
        "woven-grid":
          "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "edge-light":
          "linear-gradient(135deg, rgba(247,165,189,0.18), rgba(159,29,47,0.12) 36%, rgba(98,199,186,0.08))",
      },
    },
  },
  plugins: [],
};

export default config;
