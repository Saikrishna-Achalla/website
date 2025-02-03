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
                100: "#000000",
                200: "#50C878",
                300: "#e1e7f0",
                400: "#66b2b2",
                500: "#66b2b2",
                // 600: "#ffc0a3",
            },
            surface: {
                100: "#000000",
                200: "#808080",
                500: "#d6d5dd",
                600: "#000000",
            },
            "on-background": "#000000",//"#e1e7f0",
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
