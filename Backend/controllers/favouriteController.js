const User = require("../models/user");

// Add book to favourites
exports.addBookToFavourite = async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) {
      return res.status(200).json({ message: "Book is already in favourites" });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Book added to favourites" });
  } catch (err) {
    console.log("Error adding book to favourites:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Remove book from favourites
exports.removeBookFromFavourite = async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) {
      await User.findByIdAndUpdate(id, {
        $pull: { favourites: bookid },
      });
    }
    return res.status(200).json({ message: "Book removed from favourites" });
  } catch (err) {
    console.log("Error removing book from favourites:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all favourite books of a user
exports.getFavouriteBooks = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favouriteBooks = userData.favourites;

    return res.json({
      status: "Success",
      data: favouriteBooks,
    });
  } catch (err) {
    console.log("Error fetching favourite books:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
