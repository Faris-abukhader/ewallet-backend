/*
  Warnings:

  - You are about to drop the column `budget_id` on the `BudgetCategory` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `BudgetCategory` table. All the data in the column will be lost.
  - Added the required column `budgetId` to the `BudgetCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `BudgetCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `BudgetCategory` DROP FOREIGN KEY `BudgetCategory_budget_id_fkey`;

-- AlterTable
ALTER TABLE `BudgetCategory` DROP COLUMN `budget_id`,
    DROP COLUMN `category_id`,
    ADD COLUMN `budgetId` VARCHAR(191) NOT NULL,
    ADD COLUMN `categoryId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `BudgetCategory` ADD CONSTRAINT `BudgetCategory_budgetId_fkey` FOREIGN KEY (`budgetId`) REFERENCES `budget`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
