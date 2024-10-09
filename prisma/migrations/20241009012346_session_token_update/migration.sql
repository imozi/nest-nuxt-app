/*
  Warnings:

  - Added the required column `expires_at` to the `session_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meta` to the `session_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session_tokens" ADD COLUMN     "expires_at" TIMESTAMP NOT NULL,
ADD COLUMN     "meta" JSONB NOT NULL;
