export interface SteamResponse {
  applist: {
    apps: SteamApp[]
  }
}

export interface SteamApp {
  appid: number
  name: string
}
