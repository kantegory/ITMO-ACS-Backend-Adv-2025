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
exports.deleteSubscription = exports.getSubscriptions = exports.createSubscription = void 0;
const dataSource_1 = require("../../../src/config/dataSource");
const Subscription_1 = require("../entities/Subscription");
const createSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriptionRepository = dataSource_1.AppDataSource.getRepository(Subscription_1.Subscription);
        const subscription = subscriptionRepository.create(req.body);
        const results = yield subscriptionRepository.save(subscription);
        return res.send(results);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createSubscription = createSubscription;
const getSubscriptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriptionRepository = dataSource_1.AppDataSource.getRepository(Subscription_1.Subscription);
        const subscriptions = yield subscriptionRepository.find({
            relations: ["follower", "following"]
        });
        return res.send(subscriptions);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getSubscriptions = getSubscriptions;
const deleteSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { follower_id, following_id } = req.body;
        const subscriptionRepository = dataSource_1.AppDataSource.getRepository(Subscription_1.Subscription);
        const results = yield subscriptionRepository.delete({ follower_id, following_id });
        return res.send(results);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteSubscription = deleteSubscription;
