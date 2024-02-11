import { type PrismaClient } from "@prisma/client"
import UserRoute from "./user.route"
import PedidosRoute from "./pedidos.route"
import { type Express } from "express"

const addRoutes = (app: Express, prisma: PrismaClient) => {
    app.get('/', (req, res) => {
        res.send({
            message: "Hello world!"
        })
    })
    // Acá van tus custom routers
    app.use('/pedidos/', PedidosRoute(prisma))
    app.use('/users/', UserRoute(prisma))
    
}

export default addRoutes