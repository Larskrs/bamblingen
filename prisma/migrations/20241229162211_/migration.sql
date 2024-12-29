-- DropForeignKey
ALTER TABLE `batch` DROP FOREIGN KEY `Batch_userId_fkey`;

-- DropForeignKey
ALTER TABLE `file` DROP FOREIGN KEY `File_batchId_fkey`;

-- DropForeignKey
ALTER TABLE `file` DROP FOREIGN KEY `File_userId_fkey`;

-- DropIndex
DROP INDEX `Batch_userId_key` ON `batch`;

-- DropIndex
DROP INDEX `File_batchId_key` ON `file`;

-- DropIndex
DROP INDEX `File_userId_key` ON `file`;

-- AddForeignKey
ALTER TABLE `_ArticleToUser` ADD CONSTRAINT `_ArticleToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArticleToCategory` ADD CONSTRAINT `_ArticleToCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BatchToCategory` ADD CONSTRAINT `_BatchToCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `Batch`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
