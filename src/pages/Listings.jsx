import { useState } from 'react'
import { Link } from 'react-router-dom'
import FoodCard from '../components/FoodCard'

const ALL_STATUSES = ['All', 'Posted', 'Confirmed', 'On the way', 'Picked up']

export default function Listings({ posts }) {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All'
    ? posts
    : posts.filter(p => p.status === filter)

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
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {ALL_STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 ${filterBtnClass(s)}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-lg font-medium">No posts with status "{filter}"</p>
          <button
            onClick={() => setFilter('All')}
            className="mt-4 text-green-600 underline text-sm"
          >
            Clear filter
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
