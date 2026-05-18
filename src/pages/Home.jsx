import { Link } from 'react-router-dom'

const HOW_IT_WORKS = [
  {
    step: 1,
    icon: '📝',
    title: 'Food is Posted',
    description: 'A restaurant, dhaba, or university posts their surplus food with details and an available-until time.',
    statusLabel: 'Posted',
    statusColor: 'text-gray-500 bg-gray-100',
  },
  {
    step: 2,
    icon: '✅',
    title: 'Pickup Confirmed',
    description: 'The pickup team reviews the post and confirms collection, setting an estimated arrival time.',
    statusLabel: 'Confirmed',
    statusColor: 'text-blue-700 bg-blue-100',
  },
  {
    step: 3,
    icon: '🚚',
    title: 'Team On the Way',
    description: 'The team is en route. Track real-time progress via the status timeline.',
    statusLabel: 'On the way',
    statusColor: 'text-amber-700 bg-amber-100',
  },
  {
    step: 4,
    icon: '🎉',
    title: 'Food Picked Up',
    description: 'Collection complete. The surplus food has been successfully picked up.',
    statusLabel: 'Picked up',
    statusColor: 'text-green-700 bg-green-100',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="text-5xl mb-2">🥗</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            Surplus food,<br />
            <span className="text-green-200">zero waste.</span>
          </h1>
          <p className="text-lg text-green-100 max-w-xl mx-auto leading-relaxed">
            Wasteless Connect helps restaurants, dhabas, and universities coordinate
            surplus food pickups — fast, simple, and fully trackable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/post"
              className="bg-white text-green-800 font-bold px-8 py-3 rounded-full shadow hover:bg-green-50 transition-colors duration-150 w-full sm:w-auto text-center"
            >
              Post Surplus Food
            </Link>
            <Link
              to="/listings"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-green-800 transition-colors duration-150 w-full sm:w-auto text-center"
            >
              View Listings
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            How it works
          </h2>
          <p className="text-center text-gray-500 mb-12 text-sm">
            Four simple steps from post to pickup.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div
                key={item.step}
                className="relative bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-colors duration-200"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-600 text-white text-sm font-bold rounded-full flex items-center justify-center shadow">
                  {item.step}
                </div>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{item.description}</p>
                <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${item.statusColor}`}>
                  {item.statusLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-800 text-white py-10 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: '7', label: 'Active Listings' },
            { value: '3', label: 'Donor Types' },
            { value: '100%', label: 'Free to Use' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-extrabold text-green-300">{value}</div>
              <div className="text-sm text-green-200 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
