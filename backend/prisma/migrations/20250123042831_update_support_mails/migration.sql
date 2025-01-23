/*
  Warnings:

  - You are about to drop the column `parent_id` on the `support_mails` table. All the data in the column will be lost.
  - Made the column `email` on table `support_mails` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "support_mails" DROP CONSTRAINT "support_mails_parent_id_fkey";

-- DropIndex
DROP INDEX "support_mails_email_key";

-- AlterTable
ALTER TABLE "support_mails" DROP COLUMN "parent_id",
ALTER COLUMN "email" SET NOT NULL;
