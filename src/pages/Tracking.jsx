import { useParams, useNavigate, Link } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'
import StatusTimeline from '../components/StatusTimeline'

const STAGES = ['Posted', 'Confirmed', 'On the way', 'Picked up']

const ETA_SAMPLES = [
  'Arriving by 4:45 PM',
  'Arriving by 5:30 PM',
  'Arriving by 6:15 PM',
  'Arriving by 3:00 PM',
  'Arriving by 7:00 PM',
]

function pickEta() {
  return ETA_SAMPLES[Math.floor(Math.random() * ETA_SAMPLES.length)]
}

export default function Tracking({ posts, setPosts }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const post = posts.find(p => p.id === id)

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-5xl">🔍</div>
        <h2 className="text-2xl font-bold text-gray-700">Post not found</h2>
        <p className="text-gray-400 text-sm">The post ID "{id}" does not exist.</p>
        <Link to="/listings" className="text-green-600 underline text-sm">
          Back to Listings
        </Link>
      </div>
    )
  }

  const currentIndex = STAGES.indexOf(post.status)
  const isComplete   = post.status === 'Picked up'
  const nextStatus   = isComplete ? null : STAGES[currentIndex + 1]

  function handleAdvance() {
    if (isComplete) return
    const newStatus = STAGES[currentIndex + 1]

    let newEta = post.eta
    if (newStatus === 'Confirmed') {
      newEta = pickEta()
    } else if (newStatus === 'Picked up') {
      newEta = post.eta.replace('Arriving by', 'Arrived at')
    }

    setPosts(prev =>
      prev.map(p => p.id === id ? { ...p, status: newStatus, eta: newEta } : p)
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-green-700 font-medium hover:text-green-900 hover:bg-green-50 active:bg-green-100 mb-6 transition-colors"
      >
        <span>←</span>
        Back to Listings
      </button>

      {/* Info card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-5">
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800 leading-tight">
              {post.donorName}
            </h1>
            <span className="text-xs text-gray-400 font-mono mt-0.5 block">ID: {post.id}</span>
          </div>
          <StatusBadge status={post.status} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
          {[
            { label: 'Food Type',       value: post.foodType },
            { label: 'Quantity',        value: post.quantity },
            { label: 'Location',        value: post.location },
            { label: 'Available Until', value: post.availableUntil },
            { label: 'Donor Type',      value: post.donorType },
          ].map(({ label, value }) => (
            <div key={label}>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-0.5">{label}</span>
              <span className="font-medium text-gray-800">{value}</span>
            </div>
          ))}
          {post.eta && (
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-0.5">ETA</span>
              <span className="font-semibold text-green-700">{post.eta}</span>
            </div>
          )}
        </div>
      </div>

      {/* Timeline card — core demo feature */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-6">Pickup Progress</h2>
        <StatusTimeline currentStatus={post.status} />
      </div>

      {/* ETA banner */}
      {post.eta && (
        <div className={`rounded-2xl px-5 py-4 mb-5 flex items-center gap-3 ${
          isComplete
            ? 'bg-green-100 border border-green-200'
            : 'bg-amber-50 border border-amber-200'
        }`}>
          <span className="text-2xl">{isComplete ? '🎉' : '🚚'}</span>
          <div>
            <p className={`font-semibold text-sm ${isComplete ? 'text-green-800' : 'text-amber-800'}`}>
              {post.eta}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {isComplete ? 'This food has been collected.' : 'Estimated pickup time'}
            </p>
          </div>
        </div>
      )}

      {/* Advance status */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleAdvance}
          disabled={isComplete}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-150 ${
            isComplete
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              : 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white shadow-sm hover:shadow'
          }`}
        >
          {isComplete ? 'Food Picked Up ✓' : `Advance to "${nextStatus}"`}
        </button>
        {!isComplete && (
          <p className="text-xs text-center text-gray-400">
            Current: <span className="font-medium">{post.status}</span>
            {' '}&rarr;{' '}
            Next: <span className="font-medium">{nextStatus}</span>
          </p>
        )}
      </div>
    </div>
  )
}
