/*
  Warnings:

  - Added the required column `index` to the `boardmembers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "boardmembers" ADD COLUMN     "image" TEXT,
ADD COLUMN     "index" INTEGER NOT NULL;
