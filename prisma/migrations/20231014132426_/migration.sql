/*
  Warnings:

  - The primary key for the `travel` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "travel" DROP CONSTRAINT "travel_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "travel_pkey" PRIMARY KEY ("id");
