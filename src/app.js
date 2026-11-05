import express from "express";
import userRoutes from "./routes/user.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(port, () => {
    console.log(`Example app listen port ${port}`);
})

app.post("/post", (req, res) => {
    res.send("requisicao post");
})

app.all("/secret", (req, res) => {
    console.log("searching secrets...");
})

app.get("/books/:bookId", (req, res) => {
    const params = req.params; // sermpre declarar const, ler ou var para usar variavel
    res.send(params);
})

app.use("/users", userRoutes);