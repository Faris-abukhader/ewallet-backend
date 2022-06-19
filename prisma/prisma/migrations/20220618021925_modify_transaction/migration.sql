/*
  Warnings:

  - A unique constraint covering the columns `[catogery]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Transaction_catogery_key` ON `Transaction`(`catogery`);

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_catogery_fkey` FOREIGN KEY (`catogery`) REFERENCES `TransactionCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
