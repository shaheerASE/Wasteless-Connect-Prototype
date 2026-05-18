import { useState } from 'react'
import { Link } from 'react-router-dom'
import FoodCard from '../components/FoodCard'

const ALL_STATUSES = ['All', 'Posted', 'Confirmed', 'On the way', 'Picked up']
const ALL_TYPES = ['All', 'University', 'Restaurant', 'Dhaba']

export default function Listings({ posts, onReset }) {
  const [filter, setFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [query, setQuery] = useState('')

  function handleReset() {
    if (window.confirm('Reset all posts back to the original demo data?')) {
      onReset()
      setFilter('All')
      setTypeFilter('All')
      setQuery('')
    }
  }

  const q = query.trim().toLowerCase()
  const filtered = posts.filter(p => {
    const matchesStatus = filter === 'All' || p.status === filter
    const matchesType = typeFilter === 'All' || p.donorType === typeFilter
    const matchesQuery =
      !q ||
      p.donorName.toLowerCase().includes(q) ||
      p.foodType.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q)
    return matchesStatus && matchesType && matchesQuery
  })

  const filterBtnClass = (label) =>
    filter === label
      ? 'bg-green-600 text-white font-semibold shadow-sm'
      : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Food Listings</h1>
          <p className="text-gray-500 text-sm mt-1">
            {posts.length} total post{posts.length !== 1 ? 's' : ''} — click any card to track.
            {' '}
            <button
              onClick={handleReset}
              className="text-green-600 underline hover:text-green-800 font-medium"
            >
              Reset demo data
            </button>
          </p>
        </div>

        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search donor, food, or location…"
          className="w-full sm:w-72 px-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
        />
      </div>

      <div className="mb-8 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {ALL_STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors duration-150 ${filterBtnClass(s)}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide mr-1">
            Type
          </span>
          {ALL_TYPES.map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors duration-150 ${
                typeFilter === t
                  ? 'bg-green-600 text-white font-semibold shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
              }`}
            >
              {t === 'University' ? '🎓 ' : t === 'Restaurant' ? '🍴 ' : t === 'Dhaba' ? '🛺 ' : ''}{t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-lg font-medium">No posts match your filters</p>
          <button
            onClick={() => {
              setFilter('All')
              setTypeFilter('All')
              setQuery('')
            }}
            className="mt-4 text-green-600 underline text-sm"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(post => (
            <FoodCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          to="/post"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors duration-150"
        >
          + Post New Food
        </Link>
      </div>
    </div>
  )
}
