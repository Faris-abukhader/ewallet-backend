-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `budgetId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_budgetId_fkey` FOREIGN KEY (`budgetId`) REFERENCES `budget`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
