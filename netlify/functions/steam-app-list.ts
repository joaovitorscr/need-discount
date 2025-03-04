/* eslint-disable import/no-anonymous-default-export */

import { type Config } from "@netlify/functions"
import { type Game } from "@prisma/client"
import { randomUUID } from "crypto"
import { db } from "~/server/db"
import { type SteamResponse } from "~/types/steam-apps"

export default async () => {
  const steamApiKey = process.env.NEXT_PUBLIC_STEAM_API
  const apiUrl = `https://api.steampowered.com/ISteamApps/GetAppList/v2/?key=${steamApiKey}`

  try {
    const response = await fetch(apiUrl)

    if (!response.ok) {
      console.error("Steam API error:", response.status, response.statusText)
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Failed to fetch Steam app list" }),
      }
    }

    const data = (await response.json()) as SteamResponse
    const appList = data.applist.apps

    try {
      for (const app of appList) {
        const existingGame = await db.game.findUnique({
          where: { steam_id: app.appid },
        })

        const gameData: Omit<Game, "id"> = {
          steam_id: app.appid,
          steam_url: `https://store.steampowered.com/app/${app.appid}`,
          title: app.name,
          image: `https://cdn.akamai.steamstatic.com/steam/apps/${app.appid}/header.jpg`,
          price: 0,
          game_type: "game",
        }

        if (existingGame) {
          await db.game.update({
            where: {
              steam_id: app.appid,
            },
            data: gameData,
          })
          console.log(`Updated game with steam_id: ${app.appid}`)
        } else {
          const newGameData: Game = {
            id: randomUUID(),
            ...gameData,
          }
          await db.game.create({
            data: newGameData,
          })
          console.log(`Created game with steam_id: ${app.appid}`)
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Steam app list fetched and saved successfully",
        }),
      }
    } catch (dbError) {
      console.error("Database error:", dbError)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to save data to database" }),
      }
    } finally {
      await db.$disconnect()
    }
  } catch (error) {
    console.error("Error:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    }
  }
}

export const config: Config = {
  schedule: "@hourly",
}
