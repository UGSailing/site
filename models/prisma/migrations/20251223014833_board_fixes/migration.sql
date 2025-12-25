/*
  Warnings:

  - You are about to drop the column `board_id` on the `boardmembers` table. All the data in the column will be lost.
  - Added the required column `board_id` to the `boardmember_position` table without a default value. This is not possible if the table is not empty.
  - The primary key for the `positions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updated_at` to the `boardmember_position` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `position_id` on the `boardmember_position` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "boardmembers" DROP CONSTRAINT "boardmembers_board_id_fkey";

-- AlterTable
ALTER TABLE "boardmember_position" ADD COLUMN     "board_id" BIGINT;

-- DataMigration
UPDATE "boardmember_position" SET "board_id" = (SELECT "board_id" FROM "boardmembers" WHERE "boardmembers"."id" = "boardmember_position"."boardmember_id");
ALTER TABLE "boardmember_position" ALTER COLUMN "board_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "boardmembers" DROP COLUMN "board_id";

-- AddForeignKey
ALTER TABLE "boardmember_position" ADD CONSTRAINT "boardmember_position_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropForeignKeyp
ALTER TABLE "boardmember_position" DROP CONSTRAINT "boardmember_position_position_id_fkey";

-- AlterTable - Add new id column to positions
ALTER TABLE "positions" ADD COLUMN "id" SERIAL NOT NULL;

-- DataMigration - Set positions.id as primary key and create mapping
ALTER TABLE "positions" DROP CONSTRAINT "positions_pkey",
ADD CONSTRAINT "positions_pkey" PRIMARY KEY ("id");

-- DataMigration - Update boardmember_position to reference the new position id
ALTER TABLE "boardmember_position" ADD COLUMN "position_id_new" INTEGER;

UPDATE "boardmember_position" bmp SET "position_id_new" = p."id" 
FROM "positions" p WHERE p."name" = bmp."position_id"::text;

-- Now drop the old column and rename the new one
ALTER TABLE "boardmember_position" DROP COLUMN "position_id";
ALTER TABLE "boardmember_position" RENAME COLUMN "position_id_new" TO "position_id";
ALTER TABLE "boardmember_position" ALTER COLUMN "position_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "boardmember_position" ADD CONSTRAINT "boardmember_position_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable - Add timestamps
ALTER TABLE "boardmember_position" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Remove the default from updated_at after migration is complete
ALTER TABLE "boardmember_position" ALTER COLUMN "updated_at" DROP DEFAULT;

-- Remove the htmlid column from boards
ALTER TABLE "boards" DROP COLUMN "htmlid";

-- CreateIndex
CREATE UNIQUE INDEX "boardmember_position_boardmember_id_position_id_board_id_key" ON "boardmember_position"("boardmember_id", "position_id", "board_id");
