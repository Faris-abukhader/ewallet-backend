/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX `transaction_index` ON `Transaction`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Transaction_id_key` ON `Transaction`(`id`);
