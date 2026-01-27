"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const recipes_1 = __importDefault(require("./routes/recipes"));
const ingredients_1 = __importDefault(require("./routes/ingredients"));
const recipeCategories_1 = __importDefault(require("./routes/recipeCategories"));
const recipeIngredients_1 = __importDefault(require("./routes/recipeIngredients"));
const recipeSteps_1 = __importDefault(require("./routes/recipeSteps"));
const dataSource_1 = require("../../src/config/dataSource");
const app = (0, express_1.default)();
const PORT = 3002;
app.use(express_1.default.json());
app.use("/recipes", recipes_1.default);
app.use("/ingredients", ingredients_1.default);
app.use("/recipe-categories", recipeCategories_1.default);
app.use("/recipe-ingredients", recipeIngredients_1.default);
app.use("/recipe-steps", recipeSteps_1.default);
dataSource_1.AppDataSource.initialize()
    .then(() => {
    console.log("Recipe Service running on port 3002");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
