/*
  Warnings:

  - You are about to drop the column `order` on the `pages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pages" DROP COLUMN "order",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "text" TEXT;
