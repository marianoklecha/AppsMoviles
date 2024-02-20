import { type PrismaClient, type Prisma } from "@prisma/client";
import { Router, type Express } from "express";

const PedidosRoute = (prisma: PrismaClient) => {
    const router = Router()

    router.post('/create', async (req, res) => {
        const {title,aula,piso,edificioId, content, image, fixed, authorID} = req.body
        const result = await prisma.pedido.create({
            data: {
                title: title,
                aula: aula,
                piso: piso,
                edificio: {
                    connect:{
                        id: edificioId
                    }
                },
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

    router.get('/getPedidosByUser', async (req, res) => {
        const authorId = req.query.authorId as string | undefined;
            if (authorId === undefined) {
                return res.status(400).json({ error: 'Author ID is required' });
            }

        const pedido = await prisma.pedido.findMany({
            where: {
                authorId: parseInt(authorId),
            }
        });
        if(!pedido){
            res.status(400).send("No se encuentra usuario")
            return
        }
        res.json(pedido)
        })
    router.get('/getPedidosPendientes', async (req, res) => {
        const pedidos = await prisma.pedido.findMany({
            where: {
                fixed: false,
            }
        });
        res.json(pedidos)
    })
        
        

    return router
    
}

export default PedidosRoute