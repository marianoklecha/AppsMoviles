import { type PrismaClient, type Prisma } from "@prisma/client";
import { Router, type Express } from "express";

const PedidosRoute = (prisma: PrismaClient) => {
    const router = Router()

    router.post('/create', async (req, res) => {
        const {title, content, image, fixed, authorID} = req.body
        const result = await prisma.pedido.create({
            data: {
                title: title,
                content: content,
                image: image,
                fixed: false,
                author: {
                    connect: {
                        id: authorID
                    }
                },
            }
            
        })
        res.send(result)
    })

    router.get('/getPedidos', async (req, res) => {
        const pedidos = await prisma.pedido.findMany()
        res.json(pedidos)
      })

    return router
}

export default PedidosRoute