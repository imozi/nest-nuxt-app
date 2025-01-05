/*
  Warnings:

  - Added the required column `status` to the `support_mails` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "support_mails_email_created_at_idx";

-- AlterTable
ALTER TABLE "_account_to_role" ADD CONSTRAINT "_account_to_role_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_account_to_role_AB_unique";

-- AlterTable
ALTER TABLE "support_mails" ADD COLUMN     "status" "SupportStatus" NOT NULL;

-- CreateTable
CREATE TABLE "materials" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(300),
    "name" VARCHAR(300) NOT NULL,
    "description" TEXT,
    "text" TEXT,
    "date" TIMESTAMPTZ NOT NULL,
    "resources" JSONB NOT NULL,
    "is_published" BOOLEAN NOT NULL,
    "menu_item_id" UUID,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" UUID NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_items" (
    "id" UUID NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "slug" VARCHAR(300) NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "parent_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(300) NOT NULL,
    "title" VARCHAR(300) NOT NULL,
    "description" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "date" TIMESTAMPTZ NOT NULL,
    "image" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL,
    "menu_item_id" UUID,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_materials_to_tags" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_materials_to_tags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_menu_to_menu_item" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_menu_to_menu_item_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_news_to_tags" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_news_to_tags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "materials_slug_key" ON "materials"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "menu_name_key" ON "menu"("name");

-- CreateIndex
CREATE UNIQUE INDEX "menu_items_name_key" ON "menu_items"("name");

-- CreateIndex
CREATE UNIQUE INDEX "menu_items_order_key" ON "menu_items"("order");

-- CreateIndex
CREATE UNIQUE INDEX "menu_items_parent_id_key" ON "menu_items"("parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "news_slug_key" ON "news"("slug");

-- CreateIndex
CREATE INDEX "_materials_to_tags_B_index" ON "_materials_to_tags"("B");

-- CreateIndex
CREATE INDEX "_menu_to_menu_item_B_index" ON "_menu_to_menu_item"("B");

-- CreateIndex
CREATE INDEX "_news_to_tags_B_index" ON "_news_to_tags"("B");

-- CreateIndex
CREATE INDEX "support_mails_email_name_organization_created_at_idx" ON "support_mails"("email", "name", "organization", "created_at");

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "menu_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_materials_to_tags" ADD CONSTRAINT "_materials_to_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_materials_to_tags" ADD CONSTRAINT "_materials_to_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_menu_to_menu_item" ADD CONSTRAINT "_menu_to_menu_item_A_fkey" FOREIGN KEY ("A") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_menu_to_menu_item" ADD CONSTRAINT "_menu_to_menu_item_B_fkey" FOREIGN KEY ("B") REFERENCES "menu_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_news_to_tags" ADD CONSTRAINT "_news_to_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_news_to_tags" ADD CONSTRAINT "_news_to_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
