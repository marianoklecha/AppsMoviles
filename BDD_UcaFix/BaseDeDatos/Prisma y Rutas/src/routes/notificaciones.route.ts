import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import admin from "firebase-admin";

const NotificacionesRoute = (prisma: PrismaClient, firebaseAdmin: admin.app.App) => {
  const router = Router();

  router.get('/getNotifsByUser', async (req, res) => {
    const userId = req.query.userId as string | undefined;
    if (userId === undefined) {
      return res.status(400).json({ error: 'Se necesita el ID de usuario' });
    }

    try {
      const notificaciones = await prisma.notificacion.findFirst({
        where: {
          userId: parseInt(userId),
        }
      });

      if (!notificaciones) {
        return res.status(404).send("No se encontraron notificaciones");
      } else {
        try {
          const authorFCMToken = await prisma.fCMToken.findFirst({
            where: {
              userId: parseInt(userId),
            },
          });

          const pedido = await prisma.pedido.findFirst({
            where: {
              id: parseInt((notificaciones.pedidoId as unknown) as string),
            },
          });
    
          if (authorFCMToken) {
            await firebaseAdmin.messaging().send({
              token: authorFCMToken.device_token,
              notification: {
                title: '¡Pedido resuelto!',
                body: 'Tu pedido "' + pedido?.title + '" fue resuelto, gracias por tu ayuda.',
              },
            });
    
            await prisma.notificacion.deleteMany({
              where: {
                userId: parseInt(userId),
              },
            });
          }
        } catch (error) {
          console.log(error)
        }
      }

      return res.json(notificaciones);
    } catch (error) {
      console.error("Error al hacer fetch o enviar notificaciones:", error);
      return res.status(500).send("Error del servidor");
    }
  });

  return router;
};

export default NotificacionesRoute;
