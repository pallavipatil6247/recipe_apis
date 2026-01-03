const { Sequelize, DataTypes } = require("sequelize");
const sequelize =  require("../config/database");


const RecipeModel = require("./recipe.model");
const IngredientModel = require("./ingredient.model");

// Initialize models
const Recipe = RecipeModel(sequelize, DataTypes);
const Ingredient = IngredientModel(sequelize, DataTypes);

// Store in object for easy reference
const models = { Recipe, Ingredient };

// Setup associations AFTER models exist
Object.values(models).forEach(model => {
  if (model.associate) model.associate(models);
});

module.exports = { sequelize, ...models };

