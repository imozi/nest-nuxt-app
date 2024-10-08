/*
  Warnings:

  - You are about to drop the column `deviceId` on the `tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[device_id]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `device_id` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "tokens_deviceId_idx";

-- DropIndex
DROP INDEX "tokens_deviceId_key";

-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "deviceId",
ADD COLUMN     "device_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tokens_device_id_key" ON "tokens"("device_id");

-- CreateIndex
CREATE INDEX "tokens_device_id_idx" ON "tokens"("device_id");
