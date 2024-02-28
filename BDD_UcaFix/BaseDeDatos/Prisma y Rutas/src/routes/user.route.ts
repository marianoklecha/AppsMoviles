import { type PrismaClient, type Prisma } from "@prisma/client"
import { Router, type Express } from "express"

const UserRoute = (prisma: PrismaClient) => {
  const router = Router()

  router.get('/', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
  })

  router.get('/login', async (req, res) => {
    const {email, password, fcmToken} = req.query
    if(!email || !password || !fcmToken) {
      res.status(400).send({error : "Bad request"})
      return
    }
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
    try {
      await prisma.fCMToken.create(
        {
          data: {
              device_token: fcmToken as string,
              user: {
                connect: {
                  id: user.id
                }
              }
          }
      })
    } catch (error) {
      console.log(error)
    }

    
    res.json(user)
  })

  router.get('/getNombreOfAdmins', async (req, res) => {
    try {
      const admins = await prisma.user.findMany({
          where: {
              isAdmin: true,
          },
      });

      if (admins.length === 0) {
          return res.status(404).send("No admins found");
      }

      const adminDetails = admins.map(admin => {
          return { userId: admin.id, name: admin.name };
      });

      res.json(adminDetails);
  } catch (error) {
      console.error("Error fetching admins:", error);
      res.status(500).send("Internal server error");
  }
});

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

