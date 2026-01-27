"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
class Settings {
    constructor() {
        // Application
        this.APP_HOST = process_1.env.APP_HOST || 'localhost';
        this.APP_PORT = parseInt(process_1.env.APP_PORT || '3000');
        this.APP_PROTOCOL = process_1.env.APP_PROTOCOL || 'http';
        // Database
        this.DB_HOST = process_1.env.DB_HOST || 'localhost';
        this.DB_PORT = parseInt(process_1.env.DB_PORT || '5432');
        this.DB_NAME = process_1.env.DB_NAME || 'recipe_service';
        this.DB_USER = process_1.env.DB_USER || 'elinaborisova';
        this.DB_PASSWORD = process_1.env.DB_PASSWORD || '';
        // JWT
        this.JWT_SECRET_KEY = process_1.env.JWT_SECRET_KEY || 'your_strong_secret_key';
        this.JWT_TOKEN_TYPE = process_1.env.JWT_TOKEN_TYPE || 'Bearer';
        this.JWT_ACCESS_TOKEN_LIFETIME = process_1.env.JWT_ACCESS_TOKEN_LIFETIME || '24h';
        // Password hashing
        this.BCRYPT_SALT_ROUNDS = parseInt(process_1.env.BCRYPT_SALT_ROUNDS || '10');
    }
}
const SETTINGS = new Settings();
exports.default = SETTINGS;
