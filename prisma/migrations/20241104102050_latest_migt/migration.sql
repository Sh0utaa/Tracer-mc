/*
  Warnings:

  - The primary key for the `MasterclassSession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `MasterclassSession` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MasterclassSession" DROP CONSTRAINT "MasterclassSession_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "MasterclassSession_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "MasterclassSession_id_key" ON "MasterclassSession"("id");
