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
const dataSource_1 = require("./config/dataSource");
const User_1 = require("../user-service/src/entities/User");
const Recipe_1 = require("../recipe-service/src/entities/Recipe");
const Ingredient_1 = require("../recipe-service/src/entities/Ingredient");
const RecipeIngredient_1 = require("../recipe-service/src/entities/RecipeIngredient");
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield dataSource_1.AppDataSource.initialize();
        const user1 = new User_1.User();
        user1.username = "chef_john";
        user1.email = "john@example.com";
        user1.password_hash = "hashed_password_123";
        const user2 = new User_1.User();
        user2.username = "baker_mary";
        user2.email = "mary@example.com";
        user2.password_hash = "hashed_password_456";
        yield dataSource_1.AppDataSource.manager.save([user1, user2]);
        const flour = new Ingredient_1.Ingredient();
        flour.name = "Мука";
        const sugar = new Ingredient_1.Ingredient();
        sugar.name = "Сахар";
        yield dataSource_1.AppDataSource.manager.save([flour, sugar]);
        const cake = new Recipe_1.Recipe();
        cake.title = "Шоколадный торт";
        cake.description = "Простейший рецепт торта";
        cake.difficulty = 3;
        cake.user = user1;
        yield dataSource_1.AppDataSource.manager.save(cake);
        const ri1 = new RecipeIngredient_1.RecipeIngredient();
        ri1.recipe = cake;
        ri1.ingredient = flour;
        ri1.quantity = "300 г";
        const ri2 = new RecipeIngredient_1.RecipeIngredient();
        ri2.recipe = cake;
        ri2.ingredient = sugar;
        ri2.quantity = "200 г";
        yield dataSource_1.AppDataSource.manager.save([ri1, ri2]);
        console.log("База данных успешно заполнена!");
        process.exit(0);
    });
}
seedDatabase().catch(error => {
    console.error("Ошибка при заполнении базы:", error);
    process.exit(1);
});
