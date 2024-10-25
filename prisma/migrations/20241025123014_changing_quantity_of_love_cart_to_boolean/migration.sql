/*
  Warnings:

  - You are about to alter the column `quantity` on the `lovecart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `lovecart` MODIFY `quantity` BOOLEAN NOT NULL;
