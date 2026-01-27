import "reflect-metadata";
import express from "express";
import recipeRoutes from "./routes/recipes";
import ingredientRoutes from "./routes/ingredients";
import recipeCategoryRoutes from "./routes/recipeCategories";
import recipeIngredientRoutes from "./routes/recipeIngredients";
import recipeStepRoutes from "./routes/recipeSteps";
import { AppDataSource } from "../../src/config/dataSource";

const app = express();
const PORT = 3002;

app.use(express.json());
app.use("/recipes", recipeRoutes);
app.use("/ingredients", ingredientRoutes);
app.use("/recipe-categories", recipeCategoryRoutes);
app.use("/recipe-ingredients", recipeIngredientRoutes);
app.use("/recipe-steps", recipeStepRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Recipe Service running on port 3002");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
