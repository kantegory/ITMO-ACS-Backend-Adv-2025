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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLike = exports.getLikes = exports.createLike = void 0;
const dataSource_1 = require("../../../src/config/dataSource");
const Like_1 = require("../entities/Like");
const createLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likeRepository = dataSource_1.AppDataSource.getRepository(Like_1.Like);
        const like = likeRepository.create(req.body);
        const results = yield likeRepository.save(like);
        return res.send(results);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createLike = createLike;
const getLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likeRepository = dataSource_1.AppDataSource.getRepository(Like_1.Like);
        const likes = yield likeRepository.find({ relations: ["user", "recipe"] });
        return res.send(likes);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getLikes = getLikes;
const deleteLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, recipe_id } = req.body;
        const likeRepository = dataSource_1.AppDataSource.getRepository(Like_1.Like);
        const results = yield likeRepository.delete({ user_id, recipe_id });
        return res.send(results);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteLike = deleteLike;
