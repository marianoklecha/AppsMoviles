import { type PrismaClient } from "@prisma/client"
import UserRoute from "./user.route"
import PostRoute from "./post.route"
import { type Express } from "express"

const addRoutes = (app: Express, prisma: PrismaClient) => {
    app.get('/', (req, res) => {
        res.send({
            message: "Hello world!"
        })
    })
    // Acá van tus custom routers
    app.use('/users/', UserRoute(prisma))
    app.use('/posts/', PostRoute(prisma))
}

export default addRoutes