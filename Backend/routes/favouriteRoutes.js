const router = require("express").Router();
const { authenticateToken } = require("../middleware/userAuth");
const favouriteController = require("../controllers/favouriteController");

// Add book to favourites
router.put(
  "/add-book-to-favourite",
  authenticateToken,
  favouriteController.addBookToFavourite
);

// Remove book from favourites
router.put(
  "/delete-book-to-favourite",
  authenticateToken,
  favouriteController.removeBookFromFavourite
);

// Get user's favourite books
router.get(
  "/get-favourite-books",
  authenticateToken,
  favouriteController.getFavouriteBooks
);

module.exports = router;
