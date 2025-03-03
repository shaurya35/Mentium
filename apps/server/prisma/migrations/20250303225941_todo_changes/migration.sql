/*
  Warnings:

  - Added the required column `deadline` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "allDay" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "labels" TEXT[],
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 1;
