/*
  Warnings:

  - The primary key for the `boardmembers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `boardmembers` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `boards` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `boards` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/

-- CreateTable
CREATE TABLE "jobs" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "request_payload" TEXT NOT NULL,
    "response_payload" TEXT,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);
