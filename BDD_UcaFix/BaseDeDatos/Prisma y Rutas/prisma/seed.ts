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
    nombre: 'San Alberto Magno',
  },
  {
    nombre: 'Santo Tomas Moro',
  },
  {
    nombre: 'Santa Maria',
  },
  {
    nombre: 'San Jose',
  },
]
const pedidoData: Prisma.PedidoCreateInput[] = [
  {
    title: 'silla rota',
    aula: '105',
    piso: '1',
    edificio: { connect: { id: 1 } },
    content: 'nose espero q funke',
    image: 'imagefdsfdsf',
    fixed: false,
    author: { connect: { id: 1 } },
  },
  {
    title: 'Techo roto',
    aula: '252',
    piso: '2',
    edificio: { connect: { id: 1 } },
    content: 'Se rompio el techo',
    image: 'https://firebasestorage.googleapis.com/v0/b/ucafix-b4e1b.appspot.com/o/images%2F1708383864981?alt=media&token=8d11ad33-4999-41ef-9124-f88a4c79231e',
    fixed: false,
    author: { connect: { id: 2 } },
  },
  {
    title: 'Puerta rota',
    aula: '212',
    piso: '2',
    edificio: { connect: { id: 1 } },
    content: 'Se rompio la bisagra',
    image: 'https://firebasestorage.googleapis.com/v0/b/ucafix-b4e1b.appspot.com/o/images%2F1708384194340?alt=media&token=94c4fe60-7ed2-4972-9a02-80dd407198d6',
    fixed: false,
    author: { connect: { id: 2 } },
  },
  {
    title: 'Ventana rota',
    aula: '105',
    piso: '1',
    edificio: { connect: { id: 1 } },
    content: 'Se rompio el vidrio',
    image: 'https://firebasestorage.googleapis.com/v0/b/ucafix-b4e1b.appspot.com/o/images%2F1708384257205?alt=media&token=5a776a4c-3b37-42f4-93e6-88706671c065',
    fixed: false,
    author: { connect: { id: 2 } },
  },
  {
    title: 'Pizarron manchado',
    aula: '345',
    piso: '3',
    edificio: { connect: { id: 2 } },
    content: 'Esta todo lleno de tinta :(',
    image: 'https://firebasestorage.googleapis.com/v0/b/ucafix-b4e1b.appspot.com/o/images%2F1708448545764?alt=media&token=48dbfb00-1704-408d-a3a3-2553330ef16e',
    fixed: false,
    author: { connect: { id: 2 } },
  },
  {
    title: 'Filtracion',
    aula: '118',
    piso: '1',
    edificio: { connect: { id: 2 } },
    content: 'Cae agua del techo',
    image: 'https://firebasestorage.googleapis.com/v0/b/ucafix-b4e1b.appspot.com/o/images%2F1708448630618?alt=media&token=e7b31eff-a761-42f7-82c1-9a7556696100',
    fixed: false,
    author: { connect: { id: 2 } },
  },
  {
    title: 'Enchufe roto',
    aula: 'Biblioteca',
    piso: '2',
    edificio: { connect: { id: 3 } },
    content: 'No anda el enchufe',
    image: 'https://firebasestorage.googleapis.com/v0/b/ucafix-b4e1b.appspot.com/o/images%2F1708448711746?alt=media&token=22161013-4865-49de-8705-08a174c845db',
    fixed: false,
    author: { connect: { id: 2 } },
  },
  {
    title: "Lavabo roto",
    aula: "Baño",
    piso: "2",
    edificio: { connect: { id: 4 } },
    content: "Esta quebrado",
    image: "https://firebasestorage.googleapis.com/v0/b/ucafix-b4e1b.appspot.com/o/images%2F1708448788807?alt=media&token=2db7ff74-e6fd-4575-a63d-1243394ff110",
    fixed: false,
    author: { connect: { id: 1 } },
  }
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
  for (const ped of pedidoData){
    const pedido= await prisma.pedido.create({
      data: ped,
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
