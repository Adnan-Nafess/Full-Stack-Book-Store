const Order = require("../models/orders");
const User = require("../models/user");

// Place order
exports.placeOrder = async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      // Saving Order in the user model
      // const userUpdate = await User.findByIdAndUpdate(id, {
      //   $push: { orders: orderDataFromDb._id }, // Update the 'orders' array
      // });

      // Clearing cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }

    return res.json({
      status: "Success",
      message: "Order Placed Successfully",
    });
  } catch (err) {
    console.log("Error placing order:", err);
    return res.status(500).json({ message: "An error occurred" });
  }
};


// Get order history of a user
exports.getOrderHistory = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    const ordersData = userData.orders.reverse();
    return res.json({
      status: "Success",
      order: ordersData,
    });
  } catch (err) {
    console.log("Error fetching order history:", err);
    return res.status(500).json({ message: "An error occurred" });
  }
};

// Get all orders -- admin
exports.getAllOrders = async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });

    return res.json({
      status: "Success",
      data: userData,
    });
  } catch (err) {
    console.log("Error fetching all orders:", err);
    return res.status(500).json({ message: "An error occurred" });
  }
};

// Update order status -- admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.headers;
    const orderId = req.params.id;
    await Order.findByIdAndUpdate(orderId, { status: req.body.status });

    return res.json({
      status: "Success",
      message: "Status Updated Successfully",
    });
  } catch (err) {
    console.log("Error updating order status:", err);
    return res.status(500).json({ message: "An error occurred" });
  }
};
