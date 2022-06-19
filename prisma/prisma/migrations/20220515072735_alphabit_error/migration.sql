/*
  Warnings:

  - You are about to drop the `CustomTransactionCatogery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionCatogery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CustomTransactionCatogery` DROP FOREIGN KEY `CustomTransactionCatogery_userId_fkey`;

-- DropTable
DROP TABLE `CustomTransactionCatogery`;

-- DropTable
DROP TABLE `TransactionCatogery`;

-- CreateTable
CREATE TABLE `TransactionCategory` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,

    INDEX `transaction_category_index`(`id`),
    UNIQUE INDEX `TransactionCategory_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomTransactionCategory` (
    `userId` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,

    INDEX `transaction_category_index`(`id`),
    UNIQUE INDEX `CustomTransactionCategory_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CustomTransactionCategory` ADD CONSTRAINT `CustomTransactionCategory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
