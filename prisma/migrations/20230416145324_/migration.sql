BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[traffic_controller] (
    [id] NVARCHAR(1000) NOT NULL,
    [path_id] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    [latitide] DECIMAL(32,16) NOT NULL,
    [longitude] DECIMAL(32,16) NOT NULL,
    [direction] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [traffic_controller_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    [deleted_at] DATETIME2,
    CONSTRAINT [traffic_controller_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
