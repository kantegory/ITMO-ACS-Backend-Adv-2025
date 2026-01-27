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
exports.deleteUser = exports.updateUser = exports.getUsers = exports.loginUser = exports.registerUser = void 0;
const dataSource_1 = require("../../../src/config/dataSource");
const User_1 = require("../entities/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = __importDefault(require("../../../src/config/settings"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, email, and password are required" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const userRepository = dataSource_1.AppDataSource.getRepository(User_1.User);
        const user = userRepository.create({
            username,
            email,
            password_hash: hashedPassword
        });
        yield userRepository.save(user);
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, settings_1.default.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: token
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Error creating user", details: error.message });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const userRepository = dataSource_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepository.findOneBy({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, settings_1.default.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            error: "Error logging in",
            details: error.message
        });
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = dataSource_1.AppDataSource.getRepository(User_1.User);
        const users = yield userRepository.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
});
exports.getUsers = getUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = dataSource_1.AppDataSource.getRepository(User_1.User);
    const user = yield userRepo.findOneBy({ id: req.params.id });
    if (!user)
        return res.status(404).json({ error: "User not found" });
    userRepo.merge(user, req.body);
    const result = yield userRepo.save(user);
    res.json(result);
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = dataSource_1.AppDataSource.getRepository(User_1.User);
    const result = yield userRepo.delete(req.params.id);
    res.json(result);
});
exports.deleteUser = deleteUser;
