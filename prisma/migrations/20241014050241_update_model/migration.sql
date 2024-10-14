/*
  Warnings:

  - You are about to drop the column `created_at` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `settings` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "session_tokens_device_id_idx";

-- AlterTable
ALTER TABLE "settings" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "avatar" SET DEFAULT '/public/default-avatar.svg',
ALTER COLUMN "avatar" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "session_tokens_sessionId_device_id_idx" ON "session_tokens"("sessionId", "device_id");