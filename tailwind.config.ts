import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // put all of our products in a grid and auto fit them into an index grid
        // and it's gonna make sure that when the actual product gets smaller than 15rem,
        // it's gonna jump into another row, and it's gonna stretch out to 1fr 
        fluid: "repeat(auto-fit, minmax(15rem, 1fr))", 
      }
    },
  },
  plugins: [],
};
export default config;
