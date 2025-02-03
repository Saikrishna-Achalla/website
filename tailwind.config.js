/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            primary: {
                100: "#ffffff", //First line color
                200: "#50C878", //hyperlinks color for menu and paper link
                300: "#e1e7f0", //
                400: "#66b2b2",
                500: "#50C878", //Socials hovering color
                // 600: "#ffc0a3",
            },
            surface: {
                100: "#ffffff",
                200: "#454B1B",
                500: "#d6d5dd",
                600: "#ffffff",
            },
            "on-background": "#ffffff",//"#e1e7f0",
        },
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
        fontFamily: {
            body: ['"Inter"', "Helvetica", "sans-serif"],
        },
    },
    plugins: [],
};
