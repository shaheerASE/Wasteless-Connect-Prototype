import { Link } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'

const STATUSES = ['Posted', 'Confirmed', 'On the way', 'Picked up']
const DONOR_TYPES = ['University', 'Restaurant', 'Dhaba']

const DONOR_ICONS = {
  'University': '🎓',
  'Restaurant': '🍴',
  'Dhaba': '🛺',
}

function servingsOf(quantity) {
  const n = parseInt(quantity, 10)
  return Number.isNaN(n) ? 0 : n
}

export default function Dashboard({ posts }) {
  const totalPosts = posts.length
  const totalServings = posts.reduce((sum, p) => sum + servingsOf(p.quantity), 0)
  const completed = posts.filter(p => p.status === 'Picked up').length
  const inProgress = totalPosts - completed

  const byStatus = STATUSES.map(s => ({
    status: s,
    count: posts.filter(p => p.status === s).length,
  }))

  const byType = DONOR_TYPES.map(t => ({
    type: t,
    count: posts.filter(p => p.donorType === t).length,
  }))

  const summaryCards = [
    { label: 'Total Posts', value: totalPosts, icon: '📦' },
    { label: 'Total Servings', value: totalServings, icon: '🍽️' },
    { label: 'In Progress', value: inProgress, icon: '🚚' },
    { label: 'Completed', value: completed, icon: '🎉' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          A live overview of all surplus food activity.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {summaryCards.map(({ label, value, icon }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-3xl font-extrabold text-green-700">{value}</div>
            <div className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wide">
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* By status */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-5">
            Posts by Status
          </h2>
          <div className="space-y-3">
            {byStatus.map(({ status, count }) => (
              <div key={status} className="flex items-center justify-between">
                <StatusBadge status={status} />
                <span className="font-bold text-gray-800">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* By donor type */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-5">
            Posts by Donor Type
          </h2>
          <div className="space-y-3">
            {byType.map(({ type, count }) => (
              <div key={type} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <span>{DONOR_ICONS[type]}</span>
                  {type}
                </span>
                <span className="font-bold text-gray-800">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/listings"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors duration-150"
        >
          View All Listings
        </Link>
      </div>
    </div>
  )
}
