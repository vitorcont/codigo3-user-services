/*
  Warnings:

  - You are about to alter the column `latitide` on the `traffic_controller` table. The data in that column could be lost. The data in that column will be cast from `Decimal(32,16)` to `Float(53)`.
  - You are about to alter the column `longitude` on the `traffic_controller` table. The data in that column could be lost. The data in that column will be cast from `Decimal(32,16)` to `Float(53)`.
  - You are about to alter the column `initial_latitude` on the `travel` table. The data in that column could be lost. The data in that column will be cast from `Decimal(32,16)` to `Float(53)`.
  - You are about to alter the column `initial_longitude` on the `travel` table. The data in that column could be lost. The data in that column will be cast from `Decimal(32,16)` to `Float(53)`.
  - You are about to alter the column `final_latitude` on the `travel` table. The data in that column could be lost. The data in that column will be cast from `Decimal(32,16)` to `Float(53)`.
  - You are about to alter the column `final_longitude` on the `travel` table. The data in that column could be lost. The data in that column will be cast from `Decimal(32,16)` to `Float(53)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[traffic_controller] ALTER COLUMN [latitide] FLOAT(53) NOT NULL;
ALTER TABLE [dbo].[traffic_controller] ALTER COLUMN [longitude] FLOAT(53) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[travel] ALTER COLUMN [initial_latitude] FLOAT(53) NOT NULL;
ALTER TABLE [dbo].[travel] ALTER COLUMN [initial_longitude] FLOAT(53) NOT NULL;
ALTER TABLE [dbo].[travel] ALTER COLUMN [final_latitude] FLOAT(53) NOT NULL;
ALTER TABLE [dbo].[travel] ALTER COLUMN [final_longitude] FLOAT(53) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
