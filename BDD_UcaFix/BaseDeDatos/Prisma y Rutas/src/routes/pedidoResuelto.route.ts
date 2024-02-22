import { type PrismaClient, type Prisma } from "@prisma/client";
import { Router, type Express } from "express";

const PedidoResueltoRoute = (prisma: PrismaClient) => {
    const router = Router();

    // Create PedidoResuelto
    router.post('/pedido-resuelto', async (req, res) => {
        try {
            const { pedidoId, adminId, comments, imageFixed } = req.body;
    
            // Create PedidoResuelto
            const createdPedidoResuelto = await prisma.pedidoResuelto.create({
                data: {
                    pedidoId,
                    adminId,
                    comments,
                    imageFixed,
                },
            });
    
            // Check if the created PedidoResuelto exists
            if (createdPedidoResuelto) {
                // Update Pedido fixed status
                const updatedPedido = await prisma.pedido.update({
                    where: { id: pedidoId },
                    data: { fixed: true },
                });

                res.status(201).json(updatedPedido);
            }
    
            res.status(201).json(createdPedidoResuelto);
        } catch (error) {
            console.error('Error creating Pedido Resuelto:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    
    
    return router
}

export default PedidoResueltoRoute
