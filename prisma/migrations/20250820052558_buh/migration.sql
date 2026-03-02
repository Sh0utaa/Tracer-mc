/*
  Warnings:

  - Changed the type of `city` on the `MasterclassSession` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "MasterclassSession" DROP COLUMN "city",
ADD COLUMN     "city" TEXT NOT NULL;

-- DropEnum
DROP TYPE "City";
