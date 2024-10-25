-- CreateTable
CREATE TABLE `LoveCart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `productId` INTEGER NULL,
    `userId` VARCHAR(191) NULL,

    UNIQUE INDEX `LoveCart_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LoveCart` ADD CONSTRAINT `LoveCart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LoveCart` ADD CONSTRAINT `LoveCart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
