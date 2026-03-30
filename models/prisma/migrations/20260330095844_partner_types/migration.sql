/*

*/
-- CreateEnum
CREATE TYPE "PartnerType" AS ENUM ('HEAD', 'MEDIUM', 'SMALL');


-- AlterTable
ALTER TABLE "partners" ADD COLUMN     "partner_type" "PartnerType" NOT NULL DEFAULT 'SMALL';
