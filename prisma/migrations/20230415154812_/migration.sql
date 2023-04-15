/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[travel] DROP CONSTRAINT [travel_user_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[travel] ALTER COLUMN [user_id] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[user] DROP CONSTRAINT [user_pkey];
ALTER TABLE [dbo].[user] ALTER COLUMN [id] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[user] ADD CONSTRAINT user_pkey PRIMARY KEY CLUSTERED ([id]);

-- AddForeignKey
ALTER TABLE [dbo].[travel] ADD CONSTRAINT [travel_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
