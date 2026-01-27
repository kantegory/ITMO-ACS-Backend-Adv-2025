"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RecipeStepController = __importStar(require("../controllers/recipeSteps.controller"));
const router = (0, express_1.Router)();
/**
 * @openapi
 * /recipe-steps:
 *   post:
 *     summary: Создать шаг рецепта
 *     tags:
 *       - RecipeSteps
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipe_id:
 *                 type: string
 *               step_number:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Шаг успешно создан
 */
router.post("/", RecipeStepController.createRecipeStep);
/**
 * @openapi
 * /recipe-steps/recipe/{recipeId}:
 *   get:
 *     summary: Получить шаги рецепта по ID рецепта
 *     tags:
 *       - RecipeSteps
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Список шагов рецепта
 *       404:
 *         description: Рецепт не найден
 */
router.get("/recipe/:recipeId", RecipeStepController.getStepsByRecipe);
/**
 * @openapi
 * /recipe-steps/{id}:
 *   put:
 *     summary: Обновить шаг рецепта по ID
 *     tags:
 *       - RecipeSteps
 *     parameters:
 *       - in: path
 *         name: id
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
 *               step_number:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Шаг обновлён
 *       404:
 *         description: Шаг не найден
 */
router.put("/:id", RecipeStepController.updateRecipeStep);
/**
 * @openapi
 * /recipe-steps/{id}:
 *   delete:
 *     summary: Удалить шаг рецепта по ID
 *     tags:
 *       - RecipeSteps
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Шаг удалён
 *       404:
 *         description: Шаг не найден
 */
router.delete("/:id", RecipeStepController.deleteRecipeStep);
exports.default = router;
