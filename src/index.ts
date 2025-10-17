import express from "express";
import bookRoutes from "./routers/book.router.js";

const app = express();
app.use(express.json());

app.use("/books", bookRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));

