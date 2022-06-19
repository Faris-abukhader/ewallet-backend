/*
  Warnings:

  - You are about to drop the column `currency` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `icons` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `icon` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `currency`,
    DROP COLUMN `icons`,
    ADD COLUMN `icon` VARCHAR(191) NOT NULL,
    MODIFY `lastUpdate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
