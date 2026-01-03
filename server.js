require("dotenv").config();
const { sequelize } = require("../recipe_apis/src/models");

const express = require("express");
const app = express();

app.use(express.json());
app.use("/uploads", express.static("/recipe_apis/src/uploads"));

app.use("/api/recipes", require("../recipe_apis/src/routes/recipe.routes"));

sequelize.sync({ alter: true }).then(() => {
  console.log("DB Synced");
  app.listen(3000, () => console.log("Server started on port 3000"));
});
