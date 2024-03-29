-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "name" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "PedidoResuelto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedidoId" INTEGER DEFAULT 0,
    "adminId" INTEGER DEFAULT 0,
    "comments" TEXT,
    "imageFixed" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PedidoResuelto_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PedidoResuelto_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notificacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedidoId" INTEGER DEFAULT 0,
    "userId" INTEGER DEFAULT 0,
    CONSTRAINT "Notificacion_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Notificacion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "aula" TEXT,
    "piso" TEXT,
    "edificioId" INTEGER DEFAULT 0,
    "content" TEXT,
    "image" TEXT,
    "fixed" BOOLEAN NOT NULL,
    "authorId" INTEGER DEFAULT 0,
    CONSTRAINT "Pedido_edificioId_fkey" FOREIGN KEY ("edificioId") REFERENCES "Edificio" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Pedido_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Aula" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "edificioId" INTEGER DEFAULT 0,
    "numero" INTEGER,
    "piso" INTEGER,
    "qr" TEXT,
    CONSTRAINT "Aula_edificioId_fkey" FOREIGN KEY ("edificioId") REFERENCES "Edificio" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EspacioComun" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isBiblio" BOOLEAN NOT NULL DEFAULT false,
    "edificioId" INTEGER DEFAULT 0,
    "numero" INTEGER,
    "piso" INTEGER,
    "qr" TEXT,
    CONSTRAINT "EspacioComun_edificioId_fkey" FOREIGN KEY ("edificioId") REFERENCES "Edificio" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Edificio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT
);

-- CreateTable
CREATE TABLE "FCMToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "device_token" TEXT NOT NULL,
    CONSTRAINT "FCMToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FCMToken_device_token_key" ON "FCMToken"("device_token");
