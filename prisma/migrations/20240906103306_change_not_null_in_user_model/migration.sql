-- AlterTable
ALTER TABLE `users` MODIFY `firstName` VARCHAR(100) NULL,
    MODIFY `lastName` VARCHAR(100) NULL,
    MODIFY `role` ENUM('USER', 'ADMIN') NULL DEFAULT 'USER';
