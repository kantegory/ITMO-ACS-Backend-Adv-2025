"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const settings_1 = __importDefault(require("../config/settings"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: settings_1.default.DB_HOST,
    port: settings_1.default.DB_PORT,
    username: settings_1.default.DB_USER,
    password: settings_1.default.DB_PASSWORD,
    database: settings_1.default.DB_NAME,
    synchronize: true,
    logging: true,
    entities: ["src/entities/*.ts"],
    migrations: [],
    subscribers: [],
});
