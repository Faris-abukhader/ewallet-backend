/*
  Warnings:

  - You are about to drop the column `recurrence` on the `budget` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `budget` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `budget` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `budget` DROP FOREIGN KEY `budget_user_id_fkey`;

-- AlterTable
ALTER TABLE `budget` DROP COLUMN `recurrence`,
    DROP COLUMN `user_id`,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `budget` ADD CONSTRAINT `budget_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
