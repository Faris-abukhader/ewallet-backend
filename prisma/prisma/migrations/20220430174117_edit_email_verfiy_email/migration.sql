/*
  Warnings:

  - Made the column `emailVerified` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `emailVerified` BOOLEAN NOT NULL DEFAULT false;
