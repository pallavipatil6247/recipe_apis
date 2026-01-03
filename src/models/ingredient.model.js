module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define("Ingredient", {
    name: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.STRING, allowNull: false },
    recipeId: { type: DataTypes.INTEGER },
  });

  Ingredient.associate = (models) => {
    Ingredient.belongsTo(models.Recipe, { foreignKey: "recipeId", as: "recipe" });
  };

  return Ingredient;
};
