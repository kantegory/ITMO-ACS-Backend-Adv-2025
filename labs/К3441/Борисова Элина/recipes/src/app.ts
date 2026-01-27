import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/dataSource";
import recipeRoutes from "../recipe-service/src/routes/recipes";
import ingredientRoutes from "../recipe-service/src/routes/ingredients";
import commentRoutes from "../social-service/src/routes/comments";
import likeRoutes from "../social-service/src/routes/likes";
import subscriptionRoutes from "../social-service/src/routes/subscriptions";
import recipeCategoryRoutes from "../recipe-service/src/routes/recipeCategories";
import recipeIngredientRoutes from "../recipe-service/src/routes/recipeIngredients";
import recipeStepRoutes from "../recipe-service/src/routes/recipeSteps";
import userRoutes from "../user-service/src/routes/users";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";


const app = express();
const PORT = 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});
app.use(express.json());
app.use("/users", userRoutes);
app.use("/recipes", recipeRoutes);
app.use("/ingredients", ingredientRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/subscriptions", subscriptionRoutes);
app.use("/recipe-categories", recipeCategoryRoutes);
app.use("/recipe-ingredients", recipeIngredientRoutes);
app.use("/recipe-steps", recipeStepRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });