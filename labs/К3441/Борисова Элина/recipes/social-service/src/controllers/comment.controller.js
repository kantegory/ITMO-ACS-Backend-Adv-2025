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
exports.deleteComment = exports.getCommentById = exports.getComments = exports.createComment = void 0;
const dataSource_1 = require("../../../src/config/dataSource");
const Comment_1 = require("../entities/Comment");
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentRepository = dataSource_1.AppDataSource.getRepository(Comment_1.Comment);
        const comment = commentRepository.create(req.body);
        const results = yield commentRepository.save(comment);
        return res.send(results);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createComment = createComment;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentRepository = dataSource_1.AppDataSource.getRepository(Comment_1.Comment);
        const comments = yield commentRepository.find({ relations: ["user", "recipe"] });
        return res.send(comments);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getComments = getComments;
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentRepository = dataSource_1.AppDataSource.getRepository(Comment_1.Comment);
        const comment = yield commentRepository.findOne({
            where: { id: req.params.id },
            relations: ["user", "recipe"]
        });
        return res.send(comment);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getCommentById = getCommentById;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentRepository = dataSource_1.AppDataSource.getRepository(Comment_1.Comment);
        const results = yield commentRepository.delete(req.params.id);
        return res.send(results);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteComment = deleteComment;
