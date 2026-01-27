"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const comments_1 = __importDefault(require("./routes/comments"));
const likes_1 = __importDefault(require("./routes/likes"));
const subscriptions_1 = __importDefault(require("./routes/subscriptions"));
const dataSource_1 = require("../../src/config/dataSource");
const app = (0, express_1.default)();
const PORT = 3003;
app.use(express_1.default.json());
app.use("/comments", comments_1.default);
app.use("/likes", likes_1.default);
app.use("/subscriptions", subscriptions_1.default);
dataSource_1.AppDataSource.initialize()
    .then(() => {
    console.log("Social Service running on port 3003");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
