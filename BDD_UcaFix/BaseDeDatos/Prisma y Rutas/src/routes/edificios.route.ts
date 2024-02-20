import { type PrismaClient, type Prisma } from "@prisma/client";
import { Router, type Express } from "express";

const EdificiosRoute = (prisma: PrismaClient) => {
    const router = Router()

    router.get('/getEdificios', async (req, res) => {
        const edificios = await prisma.edificio.findMany()
        res.json(edificios)
      })

    return router
}

export default EdificiosRoute