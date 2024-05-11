/*
  Warnings:

  - Added the required column `age` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `age` INTEGER NOT NULL,
    ADD COLUMN `gender` ENUM('pria', 'wanita') NOT NULL;
