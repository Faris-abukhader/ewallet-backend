/*
  Warnings:

  - You are about to drop the column `budgetId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_budgetId_fkey`;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `budgetId`;
