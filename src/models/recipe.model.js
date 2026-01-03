module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("Recipe", {
    heading: { type: DataTypes.STRING, allowNull: false },
    shortDescription: { type: DataTypes.STRING, allowNull: false },
    longDescription: DataTypes.TEXT,
    image: DataTypes.STRING,
    prepTime: { type: DataTypes.FLOAT, allowNull: false },
    cookTime: { type: DataTypes.FLOAT, allowNull: false },
    totalTime: DataTypes.FLOAT,
    servings: { type: DataTypes.INTEGER, defaultValue: 1 },
    status: { type: DataTypes.ENUM("ACTIVE", "INACTIVE"), defaultValue: "ACTIVE" },
  });

  Recipe.associate = (models) => {
    Recipe.hasMany(models.Ingredient, { foreignKey: "recipeId", as: "ingredients" });
  };

  return Recipe;
};
