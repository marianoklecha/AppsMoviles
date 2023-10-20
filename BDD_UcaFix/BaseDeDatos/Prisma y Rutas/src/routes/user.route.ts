import { type PrismaClient, type Prisma } from "@prisma/client"
import { Router, type Express } from "express"

const UserRoute = (prisma: PrismaClient) => {
  const router = Router()

  router.get('/', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
  })
  router.get('/login', async (req, res) => {
    const {email, password, isAdmin} = req.query
    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
        password: password as string
      }
    })
    if(!user){
      res.status(400).send("No se encuentra usuario")
      return
    }
    res.json(user)
  })


  router.post(`/signup`, async (req, res) => {
    const { name, email } = req.body
    const result = await prisma.user.create({
      data: {
        name,
        email
      },
    })
    res.json(result)
  })
  router.put(`/`, async (req, res) => {
    const { name, email } = req.body
    const result = await prisma.user.create({
      data: {
        name,
        email
      },
    })
    res.json(result)
  })
  return router
}

export default UserRoute

