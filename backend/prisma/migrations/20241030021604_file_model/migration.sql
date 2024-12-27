-- CreateEnum
CREATE TYPE "FileTypes" AS ENUM ('images', 'docs', 'video');

-- CreateTable
CREATE TABLE "files" (
    "id" UUID NOT NULL,
    "type" "FileTypes" NOT NULL,
    "name" TEXT NOT NULL,
    "originalName" VARCHAR(300) NOT NULL,
    "url" TEXT NOT NULL,
    "extention" VARCHAR(50) NOT NULL,
    "size" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "files_originalName_key" ON "files"("originalName");
