-- CreateEnum
CREATE TYPE "SupportStatus" AS ENUM ('new', 'progress', 'technical', 'closed', 'deferred', 'viewed');

-- DropIndex
DROP INDEX "accounts_id_email_shortcut_idx";

-- CreateTable
CREATE TABLE "support_mails" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "position" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "remote_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "support_mails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "support_mails_email_key" ON "support_mails"("email");

-- CreateIndex
CREATE INDEX "support_mails_email_created_at_idx" ON "support_mails"("email", "created_at");

-- CreateIndex
CREATE INDEX "accounts_email_shortcut_idx" ON "accounts"("email", "shortcut");

-- CreateIndex
CREATE INDEX "files_name_originalName_idx" ON "files"("name", "originalName");

-- CreateIndex
CREATE INDEX "settings_account_id_idx" ON "settings"("account_id");
