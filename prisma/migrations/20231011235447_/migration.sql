/*
  Warnings:

  - You are about to drop the column `direction` on the `traffic_controller` table. All the data in the column will be lost.
  - You are about to drop the column `intersection_id` on the `traffic_controller` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "traffic_controller" DROP COLUMN "direction",
DROP COLUMN "intersection_id";
