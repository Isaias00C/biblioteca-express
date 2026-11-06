import express from "express";
import userRoutes from "./routes/user.js";
import "dotenv/config"

const app = express();
const port = process.env.PORT || 3000;

app.get("/healthy", (req, res) => {
    res.send("Healthy");
});

app.use(express.json())
app.use("/users", userRoutes);

app.listen(port, () => {
    console.log(`Example app listen port ${port}`);
})

export default app;