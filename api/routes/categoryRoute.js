const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { updateCategoryController, createCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require('../controllers/categoryController');

const router = express.Router();

//routes
//1. Create category
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

//2. Update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);

//3. Get all categories
router.get("/get-category", categoryController);

//4. Single category
router.get("/single-category/:slug", singleCategoryController);

//5. Delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController)


module.exports = router;