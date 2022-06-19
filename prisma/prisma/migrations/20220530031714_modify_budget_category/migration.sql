-- DropForeignKey
ALTER TABLE `BudgetCategory` DROP FOREIGN KEY `BudgetCategory_budgetId_fkey`;

-- AddForeignKey
ALTER TABLE `BudgetCategory` ADD CONSTRAINT `BudgetCategory_budgetId_fkey` FOREIGN KEY (`budgetId`) REFERENCES `budget`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
