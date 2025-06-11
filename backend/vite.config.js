// vite.config.js
import { defineConfig } from "vite";
import laravel, { refreshPaths } from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            // Add Livewire directories here so that Vite will reload when they change:
            refresh: [...refreshPaths, "app/Livewire/**"],
        }),
    ],
});
