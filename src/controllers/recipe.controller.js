const { Recipe, Ingredient } = require("../models");
const calculateIngredients = require("../utils/calculateIngredients");

// CREATE
exports.createRecipe = async (req, res) => {
  try {
    const {
      heading,
      shortDescription,
      longDescription,
      prepTime,
      cookTime,
      servings,
      ingredients
    } = req.body;

    const recipe = await Recipe.create(
      {
        heading,
        shortDescription,
        longDescription,
        prepTime,
        cookTime,
        totalTime: Number(prepTime) + Number(cookTime),
        servings,
        image: req.file?.path,
        ingredients: JSON.parse(ingredients)
      },
      { include: ["ingredients"] }
    );

    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LIST
exports.listRecipes = async (req, res) => {
  const recipes = await Recipe.findAll({ include: "ingredients" });
  res.json(recipes);
};

// VIEW 
exports.getRecipe = async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id, {
    include: "ingredients"
  });

  if (!recipe) return res.status(404).json({ message: "Not found" });

  if (req.query.servings) {
    recipe.ingredients = calculateIngredients(
      recipe.ingredients,
      recipe.servings,
      Number(req.query.servings)
    );
  }

  res.json(recipe);
};

// UPDATE
exports.updateRecipe = async (req, res) => {
  const data = req.body;

  if (data.prepTime && data.cookTime) {
    data.totalTime = Number(data.prepTime) + Number(data.cookTime);
  }

  await Recipe.update(data, { where: { id: req.params.id } });
  res.json({ message: "Updated successfully" });
};

// UPDATE STATUS
exports.updateStatus = async (req, res) => {
  await Recipe.update(
    { status: req.body.status },
    { where: { id: req.params.id } }
  );
  res.json({ message: "Status updated" });
};
