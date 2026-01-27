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
exports.deleteRecipeCategory = exports.createRecipeCategory = exports.getAllRecipeCategories = void 0;
const dataSource_1 = require("../../../src/config/dataSource");
const RecipeCategory_1 = require("../entities/RecipeCategory");
const getAllRecipeCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repo = dataSource_1.AppDataSource.getRepository(RecipeCategory_1.RecipeCategory);
        const categories = yield repo.find();
        return res.json(categories);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getAllRecipeCategories = getAllRecipeCategories;
const createRecipeCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repo = dataSource_1.AppDataSource.getRepository(RecipeCategory_1.RecipeCategory);
        const category = repo.create(req.body);
        const result = yield repo.save(category);
        return res.status(201).json(result);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createRecipeCategory = createRecipeCategory;
const deleteRecipeCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recipe_id, category_id } = req.params;
        const repo = dataSource_1.AppDataSource.getRepository(RecipeCategory_1.RecipeCategory);
        const result = yield repo.delete({ recipe_id, category_id });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteRecipeCategory = deleteRecipeCategory;
