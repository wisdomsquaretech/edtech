import preset from "./vendor/filament/support/tailwind.config.preset";

// export default {
//     presets: [preset],
//     content: [
//         "./app/Filament/**/*.php",
//         "./resources/views/filament/**/*.blade.php",
//         "./vendor/filament/**/*.blade.php",
//     ],
// };

import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

export default {
    presets: [preset],
    content: [
        "./vendor/filament/**/*.blade.php",
        "./vendor/awcodes/filament-curator/**/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#eff6ff",
                    100: "#dbeafe",
                    200: "#bfdbfe",
                    300: "#93c5fd",
                    400: "#60a5fa",
                    500: "#3b82f6", // This is the important 500 shade
                    600: "#2563eb",
                    700: "#1d4ed8",
                    800: "#1e40af",
                    900: "#1e3a8a",
                },
            },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        forms,
        typography,
        // Add any custom plugins if needed
    ],
};
