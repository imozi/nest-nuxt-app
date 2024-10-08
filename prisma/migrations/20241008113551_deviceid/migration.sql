/*
  Warnings:

  - A unique constraint covering the columns `[deviceId]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deviceId` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "tokens_sessionId_idx";

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "deviceId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tokens_deviceId_key" ON "tokens"("deviceId");

-- CreateIndex
CREATE INDEX "tokens_deviceId_idx" ON "tokens"("deviceId");
