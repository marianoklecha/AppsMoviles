import { type PrismaClient, type Prisma } from "@prisma/client";
import { Router, type Express } from "express";
import admin from "firebase-admin";

const PedidoResueltoRoute = (prisma: PrismaClient,firebaseAdmin: admin.app.App) => {
    const router = Router();

    router.post('/pedido-resuelto', async (req, res) => {
        try {
            const { pedidoId, adminId, comments, imageFixed } = req.body;
    
            const createdPedidoResuelto = await prisma.pedidoResuelto.create({
                data: {
                    pedidoId,
                    adminId,
                    comments,
                    imageFixed,
                },
            });
    
            if (createdPedidoResuelto) {
                const updatedPedido = await prisma.pedido.update({
                    where: { id: pedidoId },
                    data: { fixed: true },
                    include: { author: true },
                });

                const createdNotificacion = await prisma.notificacion.create({
                    data: {
                        pedidoId,
                        userId: updatedPedido.authorId
                     },
                });

                res.status(201).json(updatedPedido);
            } else {
                res.status(404).json({ error: 'No se encontro el pedido' });
            }
        } catch (error) {
            console.error('Error al crear Pedido Resuelto:', error);
            res.status(500).json({ error: 'Error del servidor' });
        }
    });

     // Get Pedidos Resueltos with related PedidoResuelto
     router.get('/getPedidosResueltos', async (req, res) => {
        try {
            const pedidos = await prisma.pedido.findMany({
                where: {
                    fixed: true,
                },
                include: {
                    pedidosResueltos: true, // This includes the related pedidoResuelto entries
                },
            });

            res.json(pedidos);
        } catch (error) {
            console.error('Error retrieving Pedidos Resueltos:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    router.get('/getPedResueltosByUser', async (req, res) => {
        const adminId = req.query.adminId as string | undefined;
        
        if (adminId === undefined) {
            return res.status(400).json({ error: 'Author ID is required' });
        }
    
        const pedidoResuelto = await prisma.pedidoResuelto.findMany({
            where: {
                adminId: parseInt(adminId),
            },
            include: {
                pedido: true 
            }
        });
    
        if(!pedidoResuelto || pedidoResuelto.length === 0){
            res.status(400).send("No se encuentra usuario o pedidos resueltos")
            return;
        }
    
        res.json(pedidoResuelto);
    });
    
    
    return router
}

export default PedidoResueltoRoute
