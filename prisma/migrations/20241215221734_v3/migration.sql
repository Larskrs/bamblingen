/*
  Warnings:

  - You are about to drop the column `articleId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_articleId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `articleId`;

-- CreateTable
CREATE TABLE `_ArticleToUser` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ArticleToUser_AB_unique`(`A`, `B`),
    INDEX `_ArticleToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ArticleToUser` ADD CONSTRAINT `_ArticleToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArticleToUser` ADD CONSTRAINT `_ArticleToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
