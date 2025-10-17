import type{ Request, Response } from "express";
import prisma from "../prisma.js"; 

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, slug } = req.body;

    const book = await prisma.book.create({
      data: { title, author, slug },
    });

    res.status(201).json({
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create book" });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const { author, title } = req.query;

    const books = await prisma.book.findMany({
      where: {
        AND: [
          author ? { author: { contains: author as string, mode: "insensitive" } } : {},
          title ? { title: { contains: title as string, mode: "insensitive" } } : {},
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ data: books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch books" });
  }
};

export const addReview = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { content, rating } = req.body;

    const review = await prisma.review.create({
      data: {
        content,
        rating: Number(rating),
        bookId: Number(bookId),
      },
    });

    res.status(201).json({
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add review" });
  }
};

export const getBookWithReviews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
      include: { reviews: true },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ data: book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch book with reviews" });
  }
};
