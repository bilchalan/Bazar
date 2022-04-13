const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
    createCategory, getAllCategories, getCategoryDetails, updateCategory, deleteCategory
  } = require("../controllers/categoryController");
router.route("/categories").get(getAllCategories);

router.route("/admin/category/new").post(isAuthenticatedUser,authorizeRoles("admin"), createCategory);
router
  .route("/admin/category/:id")
  .get(isAuthenticatedUser,authorizeRoles("admin"), getCategoryDetails)
  .put(isAuthenticatedUser,authorizeRoles("admin"), updateCategory)
  .delete(isAuthenticatedUser,authorizeRoles("admin"), deleteCategory);

  module.exports = router;