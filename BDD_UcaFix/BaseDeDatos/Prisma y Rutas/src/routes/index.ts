import { type PrismaClient } from "@prisma/client"
import UserRoute from "./user.route"
import PedidosRoute from "./pedidos.route"
import EdificiosRoute from "./edificios.route"
import { type Express } from "express"
import PedidoResueltoRoute from "./pedidoResuelto.route"

const addRoutes = (app: Express, prisma: PrismaClient) => {
    app.get('/', (req, res) => {
        res.send({
            message: "Hello world!"
        })
    })
    // Acá van tus custom routers
    app.use('/pedidos/', PedidosRoute(prisma))
    app.use('/users/', UserRoute(prisma))
    app.use('/edificios/',EdificiosRoute(prisma))
    app.use('/pedidoResuelto/',PedidoResueltoRoute(prisma))
    
}

export default addRoutes