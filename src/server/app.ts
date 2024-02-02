const express = require("express");
//import getPort from "get-port-electron";

const app = express();

export default async function StartServer(listener: any) {
    app.listen(8000, () => {
        console.log(`Server started on port 8000`);
    });
}
