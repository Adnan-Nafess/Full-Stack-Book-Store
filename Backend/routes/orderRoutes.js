const router = require("express").Router();
const { authenticateToken } = require("../middleware/userAuth");
const orderController = require("../controllers/orderController");

// Place order
router.post("/place-order", authenticateToken, orderController.placeOrder);

// Get order history for a user
router.get(
  "/get-order-history",
  authenticateToken,
  orderController.getOrderHistory
);

// Get all orders (admin)
router.get("/get-all-orders", authenticateToken, orderController.getAllOrders);

// Update order status (admin)
router.put(
  "/update-status/:id",
  authenticateToken,
  orderController.updateOrderStatus
);

module.exports = router;
