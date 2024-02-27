-- CreateTable
CREATE TABLE "Notificacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedidoId" INTEGER DEFAULT 0,
    "userId" INTEGER DEFAULT 0,
    CONSTRAINT "Notificacion_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Notificacion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PedidoResuelto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedidoId" INTEGER DEFAULT 0,
    "adminId" INTEGER DEFAULT 0,
    "comments" TEXT,
    "imageFixed" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PedidoResuelto_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PedidoResuelto_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PedidoResuelto" ("adminId", "comments", "id", "imageFixed", "pedidoId") SELECT "adminId", "comments", "id", "imageFixed", "pedidoId" FROM "PedidoResuelto";
DROP TABLE "PedidoResuelto";
ALTER TABLE "new_PedidoResuelto" RENAME TO "PedidoResuelto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
