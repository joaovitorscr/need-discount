-- CreateEnum
CREATE TYPE "EGameType" AS ENUM ('game', 'dlc');

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "steam_id" INTEGER NOT NULL,
    "steam_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "game_type" "EGameType" NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
