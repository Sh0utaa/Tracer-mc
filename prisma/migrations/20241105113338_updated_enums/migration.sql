-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "City" ADD VALUE 'Krakow';
ALTER TYPE "City" ADD VALUE 'Valencia';
ALTER TYPE "City" ADD VALUE 'Yerevan';
ALTER TYPE "City" ADD VALUE 'Brookhaven';
ALTER TYPE "City" ADD VALUE 'Beja';
ALTER TYPE "City" ADD VALUE 'Porto';
ALTER TYPE "City" ADD VALUE 'Bucharest';
ALTER TYPE "City" ADD VALUE 'ClujNapoca';
ALTER TYPE "City" ADD VALUE 'Praia';
ALTER TYPE "City" ADD VALUE 'Beira';
ALTER TYPE "City" ADD VALUE 'Annecy';
ALTER TYPE "City" ADD VALUE 'Rome';
ALTER TYPE "City" ADD VALUE 'Dresden';
ALTER TYPE "City" ADD VALUE 'Bonn';
ALTER TYPE "City" ADD VALUE 'London';
ALTER TYPE "City" ADD VALUE 'Parma';
ALTER TYPE "City" ADD VALUE 'Bern';
ALTER TYPE "City" ADD VALUE 'Mainz';
ALTER TYPE "City" ADD VALUE 'Orsay';
