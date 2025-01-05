-- AlterTable
ALTER TABLE "materials" ADD COLUMN     "page_id" UUID;

-- CreateTable
CREATE TABLE "pages" (
    "id" UUID NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "slug" VARCHAR(300) NOT NULL,
    "order" INTEGER NOT NULL,
    "menu_item_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pages_slug_key" ON "pages"("slug");

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
