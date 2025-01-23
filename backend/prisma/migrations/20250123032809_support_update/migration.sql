/*
  Warnings:

  - A unique constraint covering the columns `[parent_id]` on the table `support_mails` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "support_mails" ADD COLUMN     "parent_id" UUID,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "support_mails_parent_id_key" ON "support_mails"("parent_id");

-- AddForeignKey
ALTER TABLE "support_mails" ADD CONSTRAINT "support_mails_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "support_mails"("id") ON DELETE SET NULL ON UPDATE CASCADE;
