/*
  Warnings:

  - Added the required column `doctor_id` to the `ratings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ratings` ADD COLUMN `doctor_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_doctor_id_fkey` FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
