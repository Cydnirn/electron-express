import { IpcRenderer } from "electron";

export{}

declare global {
    interface Window {
        electronAPI: {
            getPort: () => string;
            onPort: () => {ev: any, data: any};
        };
    }
}
