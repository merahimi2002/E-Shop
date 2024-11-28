/*
  Warnings:

  - Made the column `productId` on table `lovecart` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `lovecart` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `shopcart` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `shopcart` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `lovecart` DROP FOREIGN KEY `LoveCart_productId_fkey`;

-- DropForeignKey
ALTER TABLE `lovecart` DROP FOREIGN KEY `LoveCart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `shopcart` DROP FOREIGN KEY `ShopCart_productId_fkey`;

-- DropForeignKey
ALTER TABLE `shopcart` DROP FOREIGN KEY `ShopCart_userId_fkey`;

-- AlterTable
ALTER TABLE `lovecart` MODIFY `productId` INTEGER NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `shopcart` MODIFY `productId` INTEGER NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `LoveCart` ADD CONSTRAINT `LoveCart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LoveCart` ADD CONSTRAINT `LoveCart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShopCart` ADD CONSTRAINT `ShopCart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShopCart` ADD CONSTRAINT `ShopCart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
