import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import admin from "firebase-admin";

const NotificacionesRoute = (prisma: PrismaClient, firebaseAdmin: admin.app.App) => {
  const router = Router();

  router.get('/getNotifsByUser', async (req, res) => {
    const userId = req.query.userId as string | undefined;
    if (userId === undefined) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    try {
      const notificaciones = await prisma.notificacion.findMany({
        where: {
          userId: parseInt(userId),
        }
      });

      if (!notificaciones || notificaciones.length === 0) {
        return res.status(404).send("No notifications found for this user");
      }

      const authorFCMToken = await prisma.fCMToken.findFirst({
        where: {
          userId: parseInt(userId),
        },
      });

      if (authorFCMToken) {
        await firebaseAdmin.messaging().send({
          token: authorFCMToken.device_token,
          notification: {
            title: 'Pedido Resuelto',
            body: 'Tu pedido ha sido resuelto.',
          },
        });

        // Delete notifications after sending them
        await prisma.notificacion.deleteMany({
          where: {
            userId: parseInt(userId),
          },
        });
      }

      return res.json(notificaciones);
    } catch (error) {
      console.error("Error fetching or sending notifications:", error);
      return res.status(500).send("Internal server error");
    }
  });

  return router;
};

export default NotificacionesRoute;
