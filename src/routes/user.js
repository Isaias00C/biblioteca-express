import { Router } from "express";
import prisma  from "../prisma.js";
const router = Router(); 

router.get("/", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({"erro": error});
    }
    
});

router.get("/:userId", async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        console.log(`userId ${userId}`)

        if(!Number.isInteger(userId)){
            return res.status(400).json({erro: "id invalid"})
        }

        const content = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!content) {
            return res.status(404).json({
                erro: "Not Found"
            })
        }

        res.status(200).json( content );
    } catch (error) {
        return res.status(500).json({erro: error.message})
    }
    
});

router.post("/", async (req, res) => {
    try {
        const { name, email, fone} = req.body;

        if(!name || !email || !fone) {
            return res.status(400).json({ 
                erro: "campos nao informados"
            });
        }

        const result = await prisma.user.create({
            data: { name, email, fone }
        });
        
        return res.status(201).json(result);
        
    } catch (error) {
        if (error.code === "P2002") return res.status(409).json({erro: error.message})
        
        res.status(500).json({"erro": error.message});
    }    
});

router.delete("/:userId", async(req, res) => {
    try {
        const userId = Number(req.params.userId);

        if(!Number.isInteger(userId)){
            return res.status(400).json({erro: "id invalid"})
        }

        const deleted = await prisma.user.delete({
            where: {
                id: userId
            }
        });

        return res.status(200).json(deleted)
    } catch (error) {
        if (error.code === "P2025") return res.status(404).json({erro: error.message})
        res.status(500).json({erro: error.message})
    }
})

export default router;