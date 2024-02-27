import { type PrismaClient, type Prisma } from "@prisma/client";
import { Router, type Express } from "express";
import admin from "firebase-admin";

const NotificacionesRoute = (prisma: PrismaClient,firebaseAdmin: admin.app.App) => {
    const router = Router();

    router.get('/getNotifsByUser', async (req, res) => {
        const userId = req.query.userId as string | undefined;
            if (userId === undefined) {
                return res.status(400).json({ error: 'Author ID is required' });
            }

        const notificaciones = await prisma.notificacion.findMany({
            where: {
                userId: parseInt(userId),
            }
        });
        if(!notificaciones){
            res.status(400).send("No hay notificaciones para este usuario")
            return
        } else {
            const authorFCMToken = await prisma.fCMToken.findFirst({
                where: {
                    userId: parseInt(userId),
                },
            });
            if (authorFCMToken) {
                await firebaseAdmin.messaging().send({
                    token: authorFCMToken.device_token,
                    notification: {
                        title: 'Pedido Resolved',
                        body: 'Your pedido has been resolved.',
                    },
                });
            }
        }
        res.json(notificaciones)
        })
    
    
    return router
}

export default NotificacionesRoute
