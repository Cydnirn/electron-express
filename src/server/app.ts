import { IpcMain, ipcMain } from "electron";
import express from "express";
//import getPort from "get-port-electron";

const app = express();
let port: number;

async function StartServer() {
    const server = app.listen(0, () => {
        console.log(`Server started on port 0`);
        ipcMain.emit("server-started", 0);
    });
}

const start = async () => {
    await StartServer();
};

start();
