/*
  Warnings:

  - You are about to drop the column `image` on the `boardmembers` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `partners` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "boardmembers" DROP COLUMN "image",
ADD COLUMN     "image_id" TEXT;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "image_id" TEXT;

-- AlterTable
ALTER TABLE "partners" DROP COLUMN "logo",
ADD COLUMN     "logo_id" TEXT;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardmembers" ADD CONSTRAINT "boardmembers_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_fkey" FOREIGN KEY ("logo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
