import {
    defineConfig,
    bytecodePlugin,
    externalizeDepsPlugin,
} from "electron-vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()],
    },
    preload: {
        plugins: [bytecodePlugin(), externalizeDepsPlugin()],
    },
    renderer: {
        plugins: [react()],
    },
});
