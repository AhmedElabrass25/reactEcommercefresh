/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "main": "#0aad0a",
                'light': "#f0f3f2",
                'rating': "#ffc908"
            },
            boxShadow: {
                'myShadow': "rgba(145, 158, 171, .2) 0px 2px 4px -1px, rgba(145, 158, 171, .14) 0px 4px 5px 0px, rgba(145, 158, 171, .12) 0px 1px 10px 0px",
            }
        },
    },
    plugins: [],
}