-- DropForeignKey
ALTER TABLE `articleversion` DROP FOREIGN KEY `ArticleVersion_articleId_fkey`;

-- DropIndex
DROP INDEX `ArticleVersion_articleId_fkey` ON `articleversion`;

-- AddForeignKey
ALTER TABLE `ArticleVersion` ADD CONSTRAINT `ArticleVersion_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
