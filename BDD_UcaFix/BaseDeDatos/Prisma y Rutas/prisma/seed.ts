import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Delfi',
    email: 'delfi@uca.edu.ar',
    password: '123',
    isAdmin: false,
  },
  {
    name: 'Marian',
    email: 'marian@uca.edu.ar',
    password: '123',
    isAdmin: false,
  },
  {
    name: 'Camila',
    email: 'camila@uca.edu.ar',
    password: '1234',
    isAdmin: true,
  },
]
const edificioData: Prisma.EdificioCreateInput[] = [
  {
    nombre: 'Magno',
  },
  {
    nombre: 'Moro',
  },
  {
    nombre: 'Santa Maria',
  },
  {
    nombre: 'San Jose',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  for (const edif of edificioData){
    const edificio= await prisma.edificio.create({
      data: edif,
    })
  }

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
