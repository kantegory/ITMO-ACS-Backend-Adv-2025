"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const like_controller_1 = require("../controllers/like.controller");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /likes:
 *   post:
 *     summary: Поставить лайк рецепту
 *     tags:
 *       - Likes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               recipeId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Лайк успешно создан
 */
router.post("/", like_controller_1.createLike);
/**
 * @openapi
 * /likes:
 *   get:
 *     summary: Получить список всех лайков
 *     tags:
 *       - Likes
 *     responses:
 *       200:
 *         description: Список лайков
 */
router.get("/", like_controller_1.getLikes);
/**
 * @openapi
 * /likes:
 *   delete:
 *     summary: Удалить лайк рецепта
 *     tags:
 *       - Likes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               recipeId:
 *                 type: string
 *     responses:
 *       204:
 *         description: Лайк успешно удалён
 *       404:
 *         description: Лайк не найден
 */
router.delete("/", like_controller_1.deleteLike);
exports.default = router;
