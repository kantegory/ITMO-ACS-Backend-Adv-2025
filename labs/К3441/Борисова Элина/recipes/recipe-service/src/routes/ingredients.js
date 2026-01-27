"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ingredient_controller_1 = require("../controllers/ingredient.controller");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /ingredients:
 *   post:
 *     summary: Создать ингредиент
 *     tags:
 *       - Ingredients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ингредиент создан
 */
router.post("/", ingredient_controller_1.createIngredient);
/**
 * @openapi
 * /ingredients:
 *   get:
 *     summary: Получить список всех ингредиентов
 *     tags:
 *       - Ingredients
 *     responses:
 *       200:
 *         description: Список ингредиентов
 */
router.get("/", ingredient_controller_1.getIngredients);
/**
 * @openapi
 * /ingredients/{id}:
 *   get:
 *     summary: Получить ингредиент по ID
 *     tags:
 *       - Ingredients
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ингредиент найден
 *       404:
 *         description: Ингредиент не найден
 */
router.get("/:id", ingredient_controller_1.getIngredientById);
/**
 * @openapi
 * /ingredients/{id}:
 *   put:
 *     summary: Обновить ингредиент
 *     tags:
 *       - Ingredients
 *     parameters:
 *       - name: id
 *         in: path
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
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ингредиент обновлён
 *       404:
 *         description: Ингредиент не найден
 */
router.put("/:id", ingredient_controller_1.updateIngredient);
/**
 * @openapi
 * /ingredients/{id}:
 *   delete:
 *     summary: Удалить ингредиент
 *     tags:
 *       - Ingredients
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Ингредиент удалён
 *       404:
 *         description: Ингредиент не найден
 */
router.delete("/:id", ingredient_controller_1.deleteIngredient);
exports.default = router;
