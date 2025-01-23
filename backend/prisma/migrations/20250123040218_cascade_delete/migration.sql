-- DropForeignKey
ALTER TABLE "support_mails" DROP CONSTRAINT "support_mails_parent_id_fkey";

-- AddForeignKey
ALTER TABLE "support_mails" ADD CONSTRAINT "support_mails_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "support_mails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
