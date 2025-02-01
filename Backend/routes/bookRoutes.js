const express = require("express");
const router = express.Router();
const {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getRecentBooks,
  getBookById,
} = require("../controllers/bookController");
const { authenticateToken } = require("../middleware/userAuth");

// Routes
router.post("/add-book", authenticateToken, addBook);
router.put("/update-book", authenticateToken, updateBook);
router.delete("/delete-book", authenticateToken, deleteBook);
router.get("/get-all-books", getAllBooks);
router.get("/get-recent-books", getRecentBooks);
router.get("/get-book-by-id/:id", getBookById);

module.exports = router;
