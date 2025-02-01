const router = require("express").Router();
const { authenticateToken } = require("../middleware/userAuth");
const cartController = require("../controllers/cartController");

// Add to cart
router.put("/add-to-cart", authenticateToken, cartController.addToCart);

// Remove from cart
router.put(
  "/remove-from-cart/:bookid",
  authenticateToken,
  cartController.removeFromCart
);

// Get user's cart
router.get("/get-user-cart", authenticateToken, cartController.getUserCart);

module.exports = router;
