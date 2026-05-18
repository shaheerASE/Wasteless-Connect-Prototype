import { useNavigate } from 'react-router-dom'
import StatusBadge from './StatusBadge'

const DONOR_TYPE_COLORS = {
  'University': 'bg-violet-50 text-violet-700',
  'Restaurant': 'bg-orange-50 text-orange-700',
  'Dhaba':      'bg-yellow-50 text-yellow-800',
}

export default function FoodCard({ post }) {
  const navigate = useNavigate()

  const typeClass = DONOR_TYPE_COLORS[post.donorType] ?? 'bg-gray-50 text-gray-700'

  return (
    <div
      onClick={() => navigate(`/track/${post.id}`)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer p-5 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-gray-800 text-base leading-tight">
            {post.donorName}
          </h3>
          <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${typeClass}`}>
            {post.donorType}
          </span>
        </div>
        <StatusBadge status={post.status} />
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <div className="flex items-center gap-1.5">
          <span>🍽️</span>
          <span className="font-medium text-gray-800">{post.foodType}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>📦</span>
          <span>{post.quantity}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>📍</span>
          <span>{post.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>⏰</span>
          <span>Available until {post.availableUntil}</span>
        </div>
      </div>

      {post.eta && (
        <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 text-xs text-green-700 font-medium">
          {post.eta}
        </div>
      )}

      <div className="text-xs text-green-600 font-medium flex items-center gap-1 mt-auto pt-1">
        <span>Track this pickup</span>
        <span>→</span>
      </div>
    </div>
  )
}
