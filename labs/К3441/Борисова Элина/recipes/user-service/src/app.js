"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const dataSource_1 = require("../../src/config/dataSource");
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.json());
app.use("/users", users_1.default);
dataSource_1.AppDataSource.initialize()
    .then(() => {
    console.log("User Service running on port 3001");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
