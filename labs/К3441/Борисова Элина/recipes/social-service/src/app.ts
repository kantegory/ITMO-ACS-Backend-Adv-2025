import "reflect-metadata";
import express from "express";
import commentRoutes from "./routes/comments";
import likeRoutes from "./routes/likes";
import subscriptionRoutes from "./routes/subscriptions";
import { AppDataSource } from "../../src/config/dataSource";

const app = express();
const PORT = 3003;

app.use(express.json());
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/subscriptions", subscriptionRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Social Service running on port 3003");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
