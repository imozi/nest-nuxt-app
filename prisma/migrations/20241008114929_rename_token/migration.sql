/*
  Warnings:

  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_sessionId_fkey";

-- DropTable
DROP TABLE "tokens";

-- CreateTable
CREATE TABLE "session_tokens" (
    "id" UUID NOT NULL,
    "sessionId" UUID,
    "device_id" UUID NOT NULL,
    "hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "session_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "session_tokens_device_id_key" ON "session_tokens"("device_id");

-- CreateIndex
CREATE INDEX "session_tokens_device_id_idx" ON "session_tokens"("device_id");

-- AddForeignKey
ALTER TABLE "session_tokens" ADD CONSTRAINT "session_tokens_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
