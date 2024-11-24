'use client'

import { useState, useEffect } from 'react'
import { Copy } from 'lucide-react'

export default function Home() {
  const [playersOnline, setPlayersOnline] = useState<number | null>(null)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const updateServerStats = () => {
      const simulatedPlayerCount = Math.floor(Math.random() * 50) + 20
      setPlayersOnline(simulatedPlayerCount)
    }

    updateServerStats()
    const interval = setInterval(updateServerStats, 30000)

    return () => clearInterval(interval)
  }, [])

  const copyIp = () => {
    const serverIP = '216.146.25.247:7777'
    navigator.clipboard.writeText(serverIP).then(() => {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    })
  }

  return (
    <div className="min-h-screen bg-primary text-light">
      <div className={`fixed top-5 right-5 bg-secondary text-light py-2 px-4 rounded transition-opacity duration-300 z-50 ${showToast ? 'opacity-100' : 'opacity-0'}`}>
        IP copiada al portapapeles
      </div>

      <div className="min-h-screen bg-black bg-opacity-70 bg-[url('/hero-background.jpg')] bg-center bg-cover bg-blend-overlay flex items-center justify-center text-center">
        <div className="max-w-3xl p-8">
          <h1 className="text-6xl mb-4 text-secondary uppercase animate-glow">
            Marbella Roleplay
          </h1>
          <p className="mb-6">
            Sumérgete en una experiencia única de roleplay en nuestro SV compatible con Android y PC
          </p>
          <button
            onClick={copyIp}
            className="inline-block px-8 py-4 bg-secondary text-light rounded-md m-4 transition-transform duration-300 hover:scale-110"
          >
            <Copy className="inline-block mr-2" />
            Conectar al Servidor
          </button>
          <a
            href="https://discord.gg/UgftW72Y"
            className="inline-block px-8 py-4 bg-secondary text-light rounded-md m-4 transition-transform duration-300 hover:scale-110"
          >
            Unirse al Discord
          </a>
        </div>
      </div>

      <section className="py-16 px-8 text-center">
        <h2 className="text-3xl mb-8">Características de Marbella RP</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            title="Sistema de Empleos"
            description="Múltiples trabajos legales e ilegales para elegir"
          />
          <FeatureCard
            title="Economía Realista"
            description="Sistema económico dinámico con inflación y mercado de jugadores"
          />
          <FeatureCard
            title="Sistemas de Casas"
            description="Compra y personaliza tu propia casa en el servidor"
          />
          <FeatureCard
            title="Facciones"
            description="Unete a la policía de los Santos, USMC, Mecanicos, Médicos o crea tu propia banda ilegal."
          />
        </div>
      </section>

      <div className="bg-secondary py-8 px-4 text-center">
        <h2 className="text-3xl mb-8">Estadísticas de Marbella</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard title="Jugadores Online" value={playersOnline !== null ? playersOnline.toString() : 'Loading...'} />
          <StatCard title="Récord de Jugadores" value="100+" />
          <StatCard title="Usuarios Registrados" value="1000+" />
        </div>
      </div>

      <footer className="bg-[#1a252f] py-8 px-4 text-center">
        <p className="mb-2">© 2024 Marbella Roleplay. Todos los derechos reservados.</p>
        <p>GTA: San Andreas y SA-MP son marcas registradas de sus respectivos propietarios.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white bg-opacity-10 p-8 rounded-lg transition-transform duration-300 hover:-translate-y-2">
      <h3 className="text-xl mb-4">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <h3 className="text-xl mb-2">{title}</h3>
      <p>{value}</p>
    </div>
  )
}

