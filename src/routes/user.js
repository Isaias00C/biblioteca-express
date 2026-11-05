import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("all users");
});

router.get("/:userId", (req, res) => {
    res.send(req.params);
});

router.post("/", (req, res) => {
    res.status(200).json({"nome": "user1"})
});

export default router;