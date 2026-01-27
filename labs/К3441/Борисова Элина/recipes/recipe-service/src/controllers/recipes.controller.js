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
exports.deleteRecipe = exports.updateRecipe = exports.getRecipeById = exports.getAllRecipes = exports.createRecipe = void 0;
const dataSource_1 = require("../../../src/config/dataSource");
const Recipe_1 = require("../entities/Recipe");
const RecipeIngredient_1 = require("../entities/RecipeIngredient");
const Ingredient_1 = require("../entities/Ingredient");
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeRepository = dataSource_1.AppDataSource.getRepository(Recipe_1.Recipe);
        const recipe = recipeRepository.create(req.body);
        const results = yield recipeRepository.save(recipe);
        return res.send(results);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createRecipe = createRecipe;
const getAllRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeRepository = dataSource_1.AppDataSource.getRepository(Recipe_1.Recipe);
        const recipes = yield recipeRepository.find({ relations: ["user", "categories", "ingredients", "comments", "likes", "steps"] });
        return res.send(recipes);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getAllRecipes = getAllRecipes;
const getRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeRepository = dataSource_1.AppDataSource.getRepository(Recipe_1.Recipe);
        const recipe = yield recipeRepository.findOne({
            where: { id: req.params.id },
            relations: ["user", "categories", "ingredients", "comments", "likes", "steps"]
        });
        return res.send(recipe);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getRecipeById = getRecipeById;
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeRepository = dataSource_1.AppDataSource.getRepository(Recipe_1.Recipe);
        const recipe = yield recipeRepository.findOne({
            where: { id: req.params.id },
            relations: ["ingredients"],
        });
        if (!recipe)
            return res.status(404).json({ error: "Recipe not found" });
        const { title, description, difficulty, ingredients } = req.body;
        if (title)
            recipe.title = title;
        if (description)
            recipe.description = description;
        if (difficulty)
            recipe.difficulty = difficulty;
        if (ingredients && Array.isArray(ingredients)) {
            const ingredientRepository = dataSource_1.AppDataSource.getRepository(RecipeIngredient_1.RecipeIngredient); // Ссылка на таблицу связи
            for (const ingredientData of ingredients) {
                const ingredient = yield dataSource_1.AppDataSource.getRepository(Ingredient_1.Ingredient).findOne({
                    where: { id: ingredientData.id }
                });
                if (!ingredient) {
                    return res.status(404).json({ error: `Ingredient with id ${ingredientData.id} not found` });
                }
                let recipeIngredient = yield ingredientRepository.findOne({
                    where: { recipe_id: req.params.id, ingredient_id: ingredientData.id },
                });
                if (recipeIngredient) {
                    recipeIngredient.quantity = ingredientData.quantity;
                    yield ingredientRepository.save(recipeIngredient);
                }
                else {
                    recipeIngredient = ingredientRepository.create({
                        recipe_id: req.params.id,
                        ingredient_id: ingredientData.id,
                        quantity: ingredientData.quantity,
                    });
                    yield ingredientRepository.save(recipeIngredient);
                }
            }
        }
        const updatedRecipe = yield recipeRepository.save(recipe);
        recipe.ingredients = yield dataSource_1.AppDataSource.getRepository(RecipeIngredient_1.RecipeIngredient)
            .createQueryBuilder("recipeIngredient")
            .innerJoin("recipe_ingredient", "ri", "ri.ingredient_id = recipeIngredient.ingredient_id")
            .where("ri.recipe_id = :recipeId", { recipeId: req.params.id })
            .getMany();
        return res.json(updatedRecipe);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.updateRecipe = updateRecipe;
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeRepository = dataSource_1.AppDataSource.getRepository(Recipe_1.Recipe);
        const results = yield recipeRepository.delete(req.params.id);
        return res.send(results);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteRecipe = deleteRecipe;
