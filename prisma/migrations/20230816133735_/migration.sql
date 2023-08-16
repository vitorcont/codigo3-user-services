/*
  Warnings:

  - You are about to drop the column `latitide` on the `traffic_controller` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `traffic_controller` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[traffic_controller] DROP COLUMN [latitide];
ALTER TABLE [dbo].[traffic_controller] ADD [latitude] FLOAT(53) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
