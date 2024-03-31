import { AppDataSource } from "./data-source"
import * as dotenv from "dotenv";
import { app } from "./app";
import "reflect-metadata";

dotenv.config();

const {PORT = 8080} = process.env;

AppDataSource.initialize().then(async () => {
    app.listen(PORT, () => {
        console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
}).catch(error => console.log(error))
