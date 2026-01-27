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
exports.deleteIngredient = exports.updateIngredient = exports.getIngredientById = exports.getIngredients = exports.createIngredient = void 0;
const dataSource_1 = require("../../../src/config/dataSource");
const Ingredient_1 = require("../entities/Ingredient");
const createIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredientRepository = dataSource_1.AppDataSource.getRepository(Ingredient_1.Ingredient);
        const ingredient = ingredientRepository.create(req.body);
        const results = yield ingredientRepository.save(ingredient);
        return res.send(results);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createIngredient = createIngredient;
const getIngredients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredientRepository = dataSource_1.AppDataSource.getRepository(Ingredient_1.Ingredient);
        const ingredients = yield ingredientRepository.find();
        return res.send(ingredients);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getIngredients = getIngredients;
const getIngredientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredientRepository = dataSource_1.AppDataSource.getRepository(Ingredient_1.Ingredient);
        const ingredient = yield ingredientRepository.findOneBy({ id: req.params.id });
        return res.send(ingredient);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getIngredientById = getIngredientById;
const updateIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredientRepository = dataSource_1.AppDataSource.getRepository(Ingredient_1.Ingredient);
        const ingredient = yield ingredientRepository.findOneBy({ id: req.params.id });
        if (!ingredient)
            return res.status(404).json({ error: "Ingredient not found" });
        ingredientRepository.merge(ingredient, req.body);
        const results = yield ingredientRepository.save(ingredient);
        return res.send(results);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.updateIngredient = updateIngredient;
const deleteIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredientRepository = dataSource_1.AppDataSource.getRepository(Ingredient_1.Ingredient);
        const results = yield ingredientRepository.delete(req.params.id);
        return res.send(results);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteIngredient = deleteIngredient;
