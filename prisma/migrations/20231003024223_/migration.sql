/*
  Warnings:

  - You are about to drop the column `path_id` on the `traffic_controller` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `travel` table. All the data in the column will be lost.
  - You are about to drop the column `final_latitude` on the `travel` table. All the data in the column will be lost.
  - You are about to drop the column `final_longitude` on the `travel` table. All the data in the column will be lost.
  - You are about to drop the column `initial_latitude` on the `travel` table. All the data in the column will be lost.
  - You are about to drop the column `initial_longitude` on the `travel` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `travel` table. All the data in the column will be lost.
  - Added the required column `intersection_id` to the `traffic_controller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination_latitude` to the `travel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination_longitude` to the `travel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin_latitude` to the `travel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin_longitude` to the `travel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "travel_email_key";

-- AlterTable
ALTER TABLE "traffic_controller" DROP COLUMN "path_id",
ADD COLUMN     "intersection_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "travel" DROP COLUMN "email",
DROP COLUMN "final_latitude",
DROP COLUMN "final_longitude",
DROP COLUMN "initial_latitude",
DROP COLUMN "initial_longitude",
DROP COLUMN "name",
ADD COLUMN     "destination_latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "destination_longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "origin_latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "origin_longitude" DOUBLE PRECISION NOT NULL;
