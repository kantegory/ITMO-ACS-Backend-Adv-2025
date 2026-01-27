"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = exports.RecipeDifficulty = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../../../user-service/src/entities/User");
const RecipeCategory_1 = require("./RecipeCategory");
const RecipeIngredient_1 = require("./RecipeIngredient");
const Comment_1 = require("../../../social-service/src/entities/Comment");
const Like_1 = require("../../../social-service/src/entities/Like");
const RecipeStep_1 = require("./RecipeStep");
var RecipeDifficulty;
(function (RecipeDifficulty) {
    RecipeDifficulty[RecipeDifficulty["VERY_EASY"] = 1] = "VERY_EASY";
    RecipeDifficulty[RecipeDifficulty["EASY"] = 2] = "EASY";
    RecipeDifficulty[RecipeDifficulty["MEDIUM"] = 3] = "MEDIUM";
    RecipeDifficulty[RecipeDifficulty["HARD"] = 4] = "HARD";
    RecipeDifficulty[RecipeDifficulty["VERY_HARD"] = 5] = "VERY_HARD";
})(RecipeDifficulty || (exports.RecipeDifficulty = RecipeDifficulty = {}));
let Recipe = class Recipe {
};
exports.Recipe = Recipe;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Recipe.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.recipes),
    __metadata("design:type", User_1.User)
], Recipe.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Recipe.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Recipe.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Recipe.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Recipe.prototype, "video_url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: RecipeDifficulty,
        default: RecipeDifficulty.MEDIUM
    }),
    __metadata("design:type", Number)
], Recipe.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Recipe.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecipeCategory_1.RecipeCategory, (recipeCategory) => recipeCategory.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecipeIngredient_1.RecipeIngredient, (recipeIngredient) => recipeIngredient.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "ingredients", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1.Comment, (comment) => comment.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Like_1.Like, (like) => like.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RecipeStep_1.RecipeStep, (step) => step.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "steps", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1.User, (user) => user.saved_recipes),
    __metadata("design:type", Array)
], Recipe.prototype, "saved_by_users", void 0);
exports.Recipe = Recipe = __decorate([
    (0, typeorm_1.Entity)()
], Recipe);
