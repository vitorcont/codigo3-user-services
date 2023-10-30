/*
  Warnings:

  - You are about to drop the `traffic_directions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "traffic_directions" DROP CONSTRAINT "traffic_directions_controllerId_fkey";

-- DropTable
DROP TABLE "traffic_directions";
