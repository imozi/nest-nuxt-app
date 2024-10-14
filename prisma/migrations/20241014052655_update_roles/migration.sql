-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_role_id_fkey";

-- CreateTable
CREATE TABLE "_account_to_role" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_account_to_role_AB_unique" ON "_account_to_role"("A", "B");

-- CreateIndex
CREATE INDEX "_account_to_role_B_index" ON "_account_to_role"("B");

-- AddForeignKey
ALTER TABLE "_account_to_role" ADD CONSTRAINT "_account_to_role_A_fkey" FOREIGN KEY ("A") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_account_to_role" ADD CONSTRAINT "_account_to_role_B_fkey" FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
