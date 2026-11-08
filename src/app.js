import express from "express";
import userRoutes from "./routes/user.js";
import boookRoutes from "./routes/book.js";
import "dotenv/config"

const app = express();

app.get("/healthy", (req, res) => {
    res.send("Healthy");
});

app.use(express.json())
app.use("/users", userRoutes);
app.use("/books", boookRoutes);

export default app;