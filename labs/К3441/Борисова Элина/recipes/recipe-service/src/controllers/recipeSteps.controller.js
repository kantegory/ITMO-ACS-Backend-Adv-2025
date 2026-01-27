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
exports.deleteRecipeStep = exports.updateRecipeStep = exports.getStepsByRecipe = exports.createRecipeStep = void 0;
const dataSource_1 = require("../../../src/config/dataSource");
const RecipeStep_1 = require("../entities/RecipeStep");
const createRecipeStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeStepRepository = dataSource_1.AppDataSource.getRepository(RecipeStep_1.RecipeStep);
        const recipeStep = recipeStepRepository.create(req.body);
        const results = yield recipeStepRepository.save(recipeStep);
        return res.send(results);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createRecipeStep = createRecipeStep;
const getStepsByRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeStepRepository = dataSource_1.AppDataSource.getRepository(RecipeStep_1.RecipeStep);
        const steps = yield recipeStepRepository.find({
            where: { recipe: { id: req.params.recipeId } },
            order: { step_number: "ASC" }
        });
        return res.send(steps);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getStepsByRecipe = getStepsByRecipe;
const updateRecipeStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeStepRepository = dataSource_1.AppDataSource.getRepository(RecipeStep_1.RecipeStep);
        const step = yield recipeStepRepository.findOneBy({ id: req.params.id });
        if (!step)
            return res.status(404).json({ error: "Step not found" });
        recipeStepRepository.merge(step, req.body);
        const results = yield recipeStepRepository.save(step);
        return res.send(results);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.updateRecipeStep = updateRecipeStep;
const deleteRecipeStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeStepRepository = dataSource_1.AppDataSource.getRepository(RecipeStep_1.RecipeStep);
        const results = yield recipeStepRepository.delete(req.params.id);
        return res.send(results);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteRecipeStep = deleteRecipeStep;
