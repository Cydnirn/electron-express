import { app, BrowserWindow, Tray } from "electron";
import { fork, ChildProcess } from "child_process";
import icon from "./icon.png";
//import * as path from "path";

let mainWindow: BrowserWindow | null;
let tray: Tray | null;
let ps: ChildProcess;
ps = fork(`${__dirname}/../server/app.js`, [], { cwd: `${__dirname}/../` });

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        autoHideMenuBar: false,
        useContentSize: true,
        fullscreenable: true,
        resizable: true,
    });

    // Vite dev server URL
    //mainWindow.loadURL("http://localhost:5173");
    mainWindow.loadFile("out/renderer/index.html");
    mainWindow.focus();
    mainWindow.on("closed", () => (mainWindow = null));
}

app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    ps.kill();
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow == null) {
        createWindow();
    }
});
