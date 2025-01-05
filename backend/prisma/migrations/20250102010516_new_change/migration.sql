/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `menu_items` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "menu_items_name_key";

-- AlterTable
ALTER TABLE "support_mails" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'new';

-- CreateIndex
CREATE UNIQUE INDEX "menu_items_slug_key" ON "menu_items"("slug");

-- CreateIndex
CREATE INDEX "news_slug_title_date_is_published_idx" ON "news"("slug", "title", "date", "is_published");
