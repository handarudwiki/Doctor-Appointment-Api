/*
  Warnings:

  - You are about to drop the column `doctor_id` on the `ratings` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `ratings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appointment_id]` on the table `ratings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appointment_id` to the `ratings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_doctor_id_fkey`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_user_id_fkey`;

-- AlterTable
ALTER TABLE `ratings` DROP COLUMN `doctor_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `appointment_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ratings_appointment_id_key` ON `ratings`(`appointment_id`);

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
