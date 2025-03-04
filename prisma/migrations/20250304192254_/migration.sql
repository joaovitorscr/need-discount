/*
  Warnings:

  - A unique constraint covering the columns `[steam_id]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Game_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Game_steam_id_key" ON "Game"("steam_id");
