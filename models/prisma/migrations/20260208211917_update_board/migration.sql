/*
  Warnings:

  - You are about to drop the column `board_id` on the `boardmember_position` table. All the data in the column will be lost.
  - You are about to drop the column `boardmember_id` on the `boardmember_position` table. All the data in the column will be lost.
  - You are about to drop the column `image_id` on the `boardmembers` table. All the data in the column will be lost.
  - You are about to drop the column `index` on the `boardmembers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[boardmember_year_id,position_id]` on the table `boardmember_position` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `boardmember_year_id` to the `boardmember_position` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "boardmember_position" DROP CONSTRAINT "boardmember_position_board_id_fkey";

-- DropForeignKey
ALTER TABLE "boardmember_position" DROP CONSTRAINT "boardmember_position_boardmember_id_fkey";

-- DropForeignKey
ALTER TABLE "boardmembers" DROP CONSTRAINT "boardmembers_image_id_fkey";

-- DropIndex
DROP INDEX "boardmember_position_boardmember_id_position_id_board_id_key";

-- AlterTable
ALTER TABLE "boardmember_position" DROP COLUMN "board_id",
DROP COLUMN "boardmember_id",
ADD COLUMN     "boardmember_year_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "boardmembers" DROP COLUMN "image_id",
DROP COLUMN "index";

-- AlterTable
ALTER TABLE "positions" ADD COLUMN     "index" INTEGER NOT NULL DEFAULT 10;

-- CreateTable
CREATE TABLE "boardmember_year" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id" SERIAL NOT NULL,
    "media_id" TEXT,
    "boardmember_id" BIGINT NOT NULL,
    "board_id" BIGINT NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "boardmember_year_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boardmember_year_boardmember_id_board_id_key" ON "boardmember_year"("boardmember_id", "board_id");

-- CreateIndex
CREATE UNIQUE INDEX "boardmember_position_boardmember_year_id_position_id_key" ON "boardmember_position"("boardmember_year_id", "position_id");

-- AddForeignKey
ALTER TABLE "boardmember_year" ADD CONSTRAINT "boardmember_year_boardmember_id_fkey" FOREIGN KEY ("boardmember_id") REFERENCES "boardmembers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardmember_year" ADD CONSTRAINT "boardmember_year_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardmember_year" ADD CONSTRAINT "boardmember_year_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardmember_position" ADD CONSTRAINT "boardmember_position_boardmember_year_id_fkey" FOREIGN KEY ("boardmember_year_id") REFERENCES "boardmember_year"("id") ON DELETE CASCADE ON UPDATE CASCADE;
