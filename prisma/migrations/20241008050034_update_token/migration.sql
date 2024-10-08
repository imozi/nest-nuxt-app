/*
  Warnings:

  - You are about to drop the column `browser` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `device` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `device_type` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `os` on the `tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "browser",
DROP COLUMN "device",
DROP COLUMN "device_type",
DROP COLUMN "expires_at",
DROP COLUMN "location",
DROP COLUMN "os";
