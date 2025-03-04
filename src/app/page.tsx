export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="flex flex-col gap-2 text-center">
        <div>
          <h1 className="text-6xl font-bold tracking-tight">Need Discount</h1>
          <p className="text-lg text-neutral-100">
            Compre o seu jogo por um preço menor
          </p>
        </div>
        <div className="mt-8 space-y-2">
          <input
            className="w-full rounded-xl border border-red-500 bg-gray-800 px-4 py-1 text-white ring-purple-500 focus:ring-2"
            placeholder="Cyberpunk 2077"
          />
          <small>
            Apenas jogos que estão disponíveis na{" "}
            <a
              className="text-blue-300"
              href="https://store.steampowered.com"
              target="_blank"
            >
              &copy; Steam
            </a>
          </small>
        </div>
      </div>
    </main>
  )
}
