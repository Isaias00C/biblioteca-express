import { Router } from "express";
import prisma from "../prisma.js";
const router = Router();

router.get("/", async (req, res) => {
    try {
        const books = await prisma.book.findMany()

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post("/", async (req, res) => {
    try {
        const { title, description, stock } = req.body;

        if (!title){
            console.log("ERRO: title must be informed")
            return res.status(400).json({
                erro: "title must be informed"
            })
        }

        if (stock < 0){
            console.log("ERRO: stock value invalid")
            return res.status(400).json({
                erro: "stock must be a valide valude"
            })
        }

        const book = await prisma.book.create({
            data: { title, description, stock }
        })

        res.status(201).json( book )
    } catch (error) {
        res.status(500).json({
            erro: error.message
        })
    }
})

router.delete("/:bookId", async (req, res) => {
    try {
        const bookId = Number(req.params.bookId);
        
        if(!Number.isInteger(bookId)) {
            console.log("ERRO: bookId must be a valid id")
            return res.status(400).json({
                erro: "bookId must be a valide id"
            })
        }

        const deleted = await prisma.book.delete({
            where:{
                id: bookId
            }
        })

        console.log(`SUCCESS: book in ${bookId} was succesfully deleted`)
        return res.status(200).json(deleted)
    } catch (error) {
        if (error.code === "P2025") return res.status(404).json({erro: error.message})
        res.status(500).json({
            erro: error.message
        })
    }
})


export default router;