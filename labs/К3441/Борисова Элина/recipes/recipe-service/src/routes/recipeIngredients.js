"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipeIngredient_controller_1 = require("../controllers/recipeIngredient.controller");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /recipe-ingredients:
 *   get:
 *     summary: Получить все связи рецептов с ингредиентами
 *     tags:
 *       - RecipeIngredients
 *     responses:
 *       200:
 *         description: Список всех связей рецепт-ингредиент
 */
router.get("/", recipeIngredient_controller_1.getAllRecipeIngredients);
/**
 * @openapi
 * /recipe-ingredients:
 *   post:
 *     summary: Добавить ингредиент к рецепту
 *     tags:
 *       - RecipeIngredients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeId:
 *                 type: string
 *               ingredientId:
 *                 type: string
 *               quantity:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ингредиент успешно добавлен к рецепту
 */
router.post("/", recipeIngredient_controller_1.createRecipeIngredient);
/**
 * @openapi
 * /recipe-ingredients/{recipe_id}/{ingredient_id}:
 *   put:
 *     summary: Обновить количество ингредиента в рецепте
 *     tags:
 *       - RecipeIngredients
 *     parameters:
 *       - in: path
 *         name: recipe_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: ingredient_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: string
 *     responses:
 *       200:
 *         description: Количество ингредиента обновлено
 *       404:
 *         description: Связь не найдена
 */
router.put("/:recipe_id/:ingredient_id", recipeIngredient_controller_1.updateRecipeIngredient);
/**
 * @openapi
 * /recipe-ingredients/{recipe_id}/{ingredient_id}:
 *   delete:
 *     summary: Удалить ингредиент из рецепта
 *     tags:
 *       - RecipeIngredients
 *     parameters:
 *       - in: path
 *         name: recipe_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: ingredient_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Ингредиент удалён из рецепта
 *       404:
 *         description: Связь не найдена
 */
router.delete("/:recipe_id/:ingredient_id", recipeIngredient_controller_1.deleteRecipeIngredient);
exports.default = router;
