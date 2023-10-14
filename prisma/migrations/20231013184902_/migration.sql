-- AlterTable
ALTER TABLE "traffic_controller" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "travel" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "updated_at" DROP NOT NULL;

-- CreateTable
CREATE TABLE "traffic_directions" (
    "id" TEXT NOT NULL,
    "controllerId" TEXT NOT NULL,
    "bearing" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "traffic_directions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "traffic_directions" ADD CONSTRAINT "traffic_directions_controllerId_fkey" FOREIGN KEY ("controllerId") REFERENCES "traffic_controller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
