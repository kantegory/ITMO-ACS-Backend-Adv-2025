"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subscription_controller_1 = require("../controllers/subscription.controller");
const router = (0, express_1.Router)();
/**
 * @openapi
 * /subscriptions:
 *   post:
 *     summary: Подписаться на пользователя
 *     tags:
 *       - Subscriptions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               follower_id:
 *                 type: string
 *               following_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Подписка создана
 *       400:
 *         description: Ошибка в данных запроса
 */
router.post("/", subscription_controller_1.createSubscription);
/**
 * @openapi
 * /subscriptions:
 *   get:
 *     summary: Получить все подписки
 *     tags:
 *       - Subscriptions
 *     responses:
 *       200:
 *         description: Список подписок
 */
router.get("/", subscription_controller_1.getSubscriptions);
/**
 * @openapi
 * /subscriptions:
 *   delete:
 *     summary: Отписаться от пользователя
 *     tags:
 *       - Subscriptions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               follower_id:
 *                 type: string
 *               following_id:
 *                 type: string
 *     responses:
 *       204:
 *         description: Подписка удалена
 *       404:
 *         description: Подписка не найдена
 */
router.delete("/", subscription_controller_1.deleteSubscription);
exports.default = router;
