import { PrismaClient } from '@prisma/client'
import express, { NextFunction, Request, Response } from 'express'
import addRoutes from './routes'
import "express-async-errors";
import admin from 'firebase-admin';

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

var serviceAccount = require("../ucafix-b4e1b-firebase-adminsdk-u42h5-1a7a2035b5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

addRoutes(app, prisma)

function logErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  next(err);
}

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};

app.use(logErrors)
app.use(errorHandler)

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
`))
