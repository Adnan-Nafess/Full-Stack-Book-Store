const User = require("../models/user");

// Add book to cart
exports.addToCart = async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    // Basic validation to check if 'bookid' and 'id' are provided
    if (!bookid || !id) {
      return res
        .status(400)
        .json({ message: "Book ID and User ID are required" });
    }

    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const isBookInCart = userData.cart.includes(bookid);
    if (isBookInCart) {
      return res.json({
        status: "Success",
        message: "Book is already in cart",
      });
    }

    await User.findByIdAndUpdate(id, {
      $push: { cart: bookid },
    });

    return res.json({
      status: "Success",
      message: "Book added to cart",
    });
  } catch (err) {
    console.log("Error adding to cart:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Remove book from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;

    if (!bookid || !id) {
      return res
        .status(400)
        .json({ message: "Book ID and User ID are required" });
    }

    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const isBookInCart = userData.cart.includes(bookid);
    if (!isBookInCart) {
      return res.status(400).json({ message: "Book is not in your cart" });
    }

    await User.findByIdAndUpdate(id, {
      $pull: { cart: bookid },
    });

    return res.json({
      status: "Success",
      message: "Book removed from cart",
    });
  } catch (err) {
    console.log("Error removing from cart:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get user's cart
exports.getUserCart = async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userData = await User.findById(id).populate("cart");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = userData.cart.reverse(); // Optional: reverse to show most recent added first

    return res.json({
      status: "Success",
      data: cart,
    });
  } catch (err) {
    console.log("Error fetching user cart:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
