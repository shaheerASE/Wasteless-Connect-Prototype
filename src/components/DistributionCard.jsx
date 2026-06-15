import { useState, useEffect } from 'react'

function parseServings(qty) {
  return parseInt(qty, 10) || 0
}

function extractCity(location) {
  const parts = location.split(',')
  return parts[parts.length - 1].trim()
}

export default function DistributionCard({ post }) {
  const servings = parseServings(post.quantity)
  const families  = Math.round(servings * 0.55)
  const shelters  = Math.round(servings * 0.30)
  const community = Math.round(servings * 0.15)
  const city = extractCity(post.location)

  const [barWidth, setBarWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setBarWidth(85), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-5 mb-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">🌱</span>
        <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">
          Food Distribution
        </h3>
        <span className="ml-auto text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-0.5 rounded-full">
          Live
        </span>
      </div>

      {/* Route visualization */}
      <div className="flex items-center gap-3 mb-5">
        {/* Source node */}
        <div className="flex flex-col items-center gap-1 shrink-0 w-16">
          <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-lg shadow-sm">
            📍
          </div>
          <span className="text-xs text-gray-500 text-center leading-tight">{city}</span>
        </div>

        {/* Animated dashed route */}
        <div className="flex-1 flex items-center gap-1 min-w-0">
          <div className="flex-1 border-t-2 border-dashed border-green-300" />
          {/* Pulsing dot — the "in transit" indicator */}
          <div className="relative w-3.5 h-3.5 shrink-0">
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
            <span className="relative block w-3.5 h-3.5 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 border-t-2 border-dashed border-green-300" />
        </div>

        {/* Destination node */}
        <div className="flex flex-col items-center gap-1 shrink-0 w-16">
          <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-lg shadow-sm">
            🏠
          </div>
          <span className="text-xs text-gray-500 text-center leading-tight">Recipients</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-gray-600">
            Serving ~{servings * 3} people
          </span>
          <span className="text-xs font-bold text-green-700">{barWidth}% distributed</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>

      {/* Recipient breakdown */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: '👨‍👩‍👧', label: 'Families',   value: families  },
          { icon: '🏫',      label: 'Shelters',   value: shelters  },
          { icon: '🍽️',     label: 'Community',  value: community },
        ].map(({ icon, label, value }) => (
          <div key={label} className="bg-green-50 border border-green-100 rounded-xl p-3 text-center">
            <div className="text-xl mb-1">{icon}</div>
            <div className="text-lg font-extrabold text-green-700">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
