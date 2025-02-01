const Book = require("../models/book");

exports.addBook = async (req, res) => {
  try {
    const { user } = req;
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { url, title, author, price, desc, language } = req.body;
    if (!url || !title || !author || !price || !desc || !language) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newBook = new Book({ url, title, author, price, desc, language });
    await newBook.save();
    res.status(200).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndUpdate(bookid, req.body);
    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json({ status: "Success", data: books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getRecentBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    res.json({ status: "Success", data: books });
  } catch (error) {
    console.error("Error fetching recent books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json({ status: "Success", data: book });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
