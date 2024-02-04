import { app, BrowserWindow, ipcMain } from "electron";
import { fork, ChildProcess } from "child_process";
//import * as path from "path";

let mainWindow: BrowserWindow | null;

let ps: ChildProcess;
let port: string;
ps = fork(`${__dirname}/../server/app.js`, [], {
    cwd: `${__dirname}/../`,
    silent: true,
    detached: true,
});
ps.stdout?.setEncoding("utf-8");

ps.stdout?.on("data", (data) => {
    console.log("Data from child: ", data);
    if (data.includes("Server started")) {
        let msg: string = data;
        port = msg.split(" ").slice(-1)[0];
    }
});

ps.stdout?.on("message", (msg) => {
    console.log("Msg from child: ", msg);
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        autoHideMenuBar: false,
        useContentSize: true,
        fullscreenable: true,
        resizable: true,
        webPreferences: {
            preload: `${__dirname}/../preload/preload.js`,
            webSecurity: false,
        },
    });

    // Vite dev server URL
    mainWindow.loadURL("http://localhost:5173");
    //mainWindow.loadFile("out/renderer/index.html");
    mainWindow.focus();
    mainWindow.on("closed", () => (mainWindow = null));
}

ipcMain.handle("getPort", (_, data) => {
    console.log(`IPC Exec ${data}`);
    console.log(port);
    return port;
});
app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    ps.kill("SIGINT");
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow == null) {
        createWindow();
    }
});
