const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.middleware");
const controller = require("../controllers/recipe.controller");

router.post("/", upload.single("image"), controller.createRecipe);
router.get("/", controller.listRecipes);
router.get("/:id", controller.getRecipe);
router.put("/:id", controller.updateRecipe);
router.patch("/:id/status", controller.updateStatus);

module.exports = router;
