-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('OWNER', 'ADMIN', 'ADDPRODUCT', 'USER') NOT NULL DEFAULT 'USER';
