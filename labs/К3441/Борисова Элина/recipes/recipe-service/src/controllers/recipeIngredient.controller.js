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
exports.deleteRecipeIngredient = exports.updateRecipeIngredient = exports.createRecipeIngredient = exports.getAllRecipeIngredients = void 0;
const dataSource_1 = require("../../../src/config/dataSource");
const RecipeIngredient_1 = require("../entities/RecipeIngredient");
const getAllRecipeIngredients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repo = dataSource_1.AppDataSource.getRepository(RecipeIngredient_1.RecipeIngredient);
        const ingredients = yield repo.find();
        return res.json(ingredients);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getAllRecipeIngredients = getAllRecipeIngredients;
const createRecipeIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repo = dataSource_1.AppDataSource.getRepository(RecipeIngredient_1.RecipeIngredient);
        const ingredient = repo.create(req.body);
        const result = yield repo.save(ingredient);
        return res.status(201).json(result);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createRecipeIngredient = createRecipeIngredient;
const updateRecipeIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recipe_id, ingredient_id } = req.params;
        const repo = dataSource_1.AppDataSource.getRepository(RecipeIngredient_1.RecipeIngredient);
        const existing = yield repo.findOne({
            where: { recipe_id, ingredient_id }
        });
        if (!existing)
            return res.status(404).json({ error: "Not found" });
        repo.merge(existing, req.body);
        const result = yield repo.save(existing);
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.updateRecipeIngredient = updateRecipeIngredient;
const deleteRecipeIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recipe_id, ingredient_id } = req.params;
        const repo = dataSource_1.AppDataSource.getRepository(RecipeIngredient_1.RecipeIngredient);
        const result = yield repo.delete({ recipe_id, ingredient_id });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteRecipeIngredient = deleteRecipeIngredient;
