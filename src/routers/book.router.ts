import { Router } from "express";
import { createBook, getBooks, addReview, getBookWithReviews } from "../controllers/book.controller.js";

const router = Router();

router.post("/", createBook); // Create book
router.get("/", getBooks); // List books (filter optional)
router.post("/:bookId/reviews", addReview); // Add review
router.get("/:id", getBookWithReviews); // Get book with reviews

export default router;
