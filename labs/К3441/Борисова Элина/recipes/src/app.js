"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dataSource_1 = require("./config/dataSource");
const recipes_1 = __importDefault(require("../recipe-service/src/routes/recipes"));
const ingredients_1 = __importDefault(require("../recipe-service/src/routes/ingredients"));
const comments_1 = __importDefault(require("../social-service/src/routes/comments"));
const likes_1 = __importDefault(require("../social-service/src/routes/likes"));
const subscriptions_1 = __importDefault(require("../social-service/src/routes/subscriptions"));
const recipeCategories_1 = __importDefault(require("../recipe-service/src/routes/recipeCategories"));
const recipeIngredients_1 = __importDefault(require("../recipe-service/src/routes/recipeIngredients"));
const recipeSteps_1 = __importDefault(require("../recipe-service/src/routes/recipeSteps"));
const users_1 = __importDefault(require("../user-service/src/routes/users"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const app = (0, express_1.default)();
const PORT = 3000;
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swagger_1.swaggerSpec);
});
app.use(express_1.default.json());
app.use("/users", users_1.default);
app.use("/recipes", recipes_1.default);
app.use("/ingredients", ingredients_1.default);
app.use("/comments", comments_1.default);
app.use("/likes", likes_1.default);
app.use("/subscriptions", subscriptions_1.default);
app.use("/recipe-categories", recipeCategories_1.default);
app.use("/recipe-ingredients", recipeIngredients_1.default);
app.use("/recipe-steps", recipeSteps_1.default);
dataSource_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
