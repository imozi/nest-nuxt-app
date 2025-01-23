/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `support_mails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "support_mails_history" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "position" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "status" "SupportStatus" DEFAULT 'new',
    "remote_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "parent_id" UUID,

    CONSTRAINT "support_mails_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "support_mails_history_parent_id_key" ON "support_mails_history"("parent_id");

-- CreateIndex
CREATE INDEX "support_mails_history_email_name_organization_created_at_idx" ON "support_mails_history"("email", "name", "organization", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "support_mails_email_key" ON "support_mails"("email");

-- AddForeignKey
ALTER TABLE "support_mails_history" ADD CONSTRAINT "support_mails_history_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "support_mails"("id") ON DELETE SET NULL ON UPDATE CASCADE;
