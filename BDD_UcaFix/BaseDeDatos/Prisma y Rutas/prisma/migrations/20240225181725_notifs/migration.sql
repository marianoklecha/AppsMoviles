-- CreateTable
CREATE TABLE "FCMToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "device_token" TEXT NOT NULL,
    CONSTRAINT "FCMToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "FCMToken_device_token_key" ON "FCMToken"("device_token");
