/*
  Warnings:

  - A unique constraint covering the columns `[slugId]` on the table `Article` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `slugId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Article_slugId_key` ON `Article`(`slugId`);
