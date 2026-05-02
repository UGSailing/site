/*

*/
-- CreateEnum
CREATE TYPE "PartnerType" AS ENUM ('HEAD', 'STRATEGIC', 'COLLABORATIVE');


-- AlterTable
ALTER TABLE "partners" ADD COLUMN     "partner_type" "PartnerType" NOT NULL DEFAULT 'COLLABORATIVE';