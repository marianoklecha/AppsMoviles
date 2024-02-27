import { type PrismaClient } from "@prisma/client"
import UserRoute from "./user.route"
import PedidosRoute from "./pedidos.route"
import EdificiosRoute from "./edificios.route"
import { type Express } from "express"
import PedidoResueltoRoute from "./pedidoResuelto.route"
import NotificacionesRoute from "./notificaciones.route"
import admin from "firebase-admin";

const addRoutes = (app: Express, prisma: PrismaClient) => {
    app.get('/', (req, res) => {
        res.send({
            message: "Hello world!"
        })
    })
    const admin= require("firebase-admin")
    // Acá van tus custom routers
    app.use('/pedidos/', PedidosRoute(prisma))
    app.use('/users/', UserRoute(prisma))
    app.use('/edificios/',EdificiosRoute(prisma))
    app.use('/pedidoResuelto/',PedidoResueltoRoute(prisma,admin))
    app.use('/notificaciones/',NotificacionesRoute(prisma,admin))
}

export default addRoutes