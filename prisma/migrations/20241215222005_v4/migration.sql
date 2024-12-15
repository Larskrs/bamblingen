/*
  Warnings:

  - The primary key for the `article` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_articletoarticleversion` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ArticleId]` on the table `ArticleVersion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ArticleId` to the `ArticleVersion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_articletoarticleversion` DROP FOREIGN KEY `_ArticleToArticleVersion_A_fkey`;

-- DropForeignKey
ALTER TABLE `_articletoarticleversion` DROP FOREIGN KEY `_ArticleToArticleVersion_B_fkey`;

-- DropForeignKey
ALTER TABLE `_articletouser` DROP FOREIGN KEY `_ArticleToUser_A_fkey`;

-- AlterTable
ALTER TABLE `_articletouser` MODIFY `A` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `article` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `articleversion` ADD COLUMN `ArticleId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_articletoarticleversion`;

-- CreateIndex
CREATE UNIQUE INDEX `ArticleVersion_ArticleId_key` ON `ArticleVersion`(`ArticleId`);

-- AddForeignKey
ALTER TABLE `ArticleVersion` ADD CONSTRAINT `ArticleVersion_ArticleId_fkey` FOREIGN KEY (`ArticleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArticleToUser` ADD CONSTRAINT `_ArticleToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
