/*
  Warnings:

  - You are about to drop the column `slugId` on the `article` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Article_slugId_key` ON `article`;

-- AlterTable
ALTER TABLE `article` DROP COLUMN `slugId`;
