import "reflect-metadata";
import express from "express";
import userRoutes from "./routes/users";
import { AppDataSource } from "../../src/config/dataSource";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use("/users", userRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("User Service running on port 3001");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
