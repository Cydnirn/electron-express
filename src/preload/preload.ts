import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    getPort: () => ipcRenderer.invoke("getPort", "Electron"),
    onPort: () => {
        let val;
        ipcRenderer.on("onPort", (_, data) => {
            console.log(data);
            val = data;
            return data;
        });
        console.log(val);
        return val;
    },
});
