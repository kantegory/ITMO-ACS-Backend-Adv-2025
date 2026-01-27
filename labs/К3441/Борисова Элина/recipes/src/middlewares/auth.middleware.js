"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../user-service/src/entities/User");
const dataSource_1 = require("../config/dataSource");
const settings_1 = __importDefault(require("../config/settings"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }
    const [tokenType, token] = authHeader.split(' ');
    if (tokenType !== settings_1.default.JWT_TOKEN_TYPE || !token) {
        return res.status(401).json({
            error: `Invalid token format. Expected: ${settings_1.default.JWT_TOKEN_TYPE} <token>`
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, settings_1.default.JWT_SECRET_KEY);
        const userRepository = dataSource_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepository.findOne({
            where: { id: decoded.userId },
            select: ['id', 'username', 'email']
        });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expired' });
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        return res.status(500).json({ error: 'Authentication failed' });
    }
});
exports.authMiddleware = authMiddleware;
