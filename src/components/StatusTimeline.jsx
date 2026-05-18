const STAGES = ['Posted', 'Confirmed', 'On the way', 'Picked up']

const STAGE_ICONS = {
  'Posted':     '📋',
  'Confirmed':  '✅',
  'On the way': '🚚',
  'Picked up':  '🎉',
}

const STAGE_DESC = {
  'Posted':     'Waiting for confirmation',
  'Confirmed':  'Pickup team confirmed',
  'On the way': 'Team is en route',
  'Picked up':  'Collected successfully',
}

export default function StatusTimeline({ currentStatus }) {
  const currentIndex = STAGES.indexOf(currentStatus)

  const progressPercent = currentIndex === 0
    ? 0
    : (currentIndex / (STAGES.length - 1)) * 100

  return (
    <div className="w-full">
      {/* Desktop: horizontal */}
      <div className="hidden sm:flex items-start justify-between relative px-4">
        {/* Background track */}
        <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200 z-0" />
        {/* Green progress fill */}
        <div
          className="absolute top-5 left-8 h-0.5 bg-green-500 z-0 transition-all duration-700 ease-in-out"
          style={{ width: `calc(${progressPercent}% * (100% - 4rem) / 100)` }}
        />

        {STAGES.map((stage, index) => {
          const isCompleted = index < currentIndex
          const isActive    = index === currentIndex

          const circleClass = isCompleted
            ? 'bg-green-500 border-green-500 text-white'
            : isActive
            ? 'bg-white border-green-500 text-green-600 ring-4 ring-green-100'
            : 'bg-white border-gray-300 text-gray-400'

          const labelClass = isCompleted
            ? 'text-green-700 font-semibold'
            : isActive
            ? 'text-green-700 font-bold'
            : 'text-gray-400'

          return (
            <div key={stage} className="flex flex-col items-center z-10 flex-1">
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg transition-all duration-300 ${circleClass}`}>
                {isCompleted ? '✓' : STAGE_ICONS[stage]}
              </div>
              <span className={`mt-2 text-xs text-center ${labelClass}`}>
                {stage}
              </span>
              {isActive && (
                <span className="mt-1 text-xs text-gray-500 text-center italic">
                  {STAGE_DESC[stage]}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile: vertical */}
      <div className="flex sm:hidden flex-col">
        {STAGES.map((stage, index) => {
          const isCompleted = index < currentIndex
          const isActive    = index === currentIndex
          const isLast      = index === STAGES.length - 1

          const circleClass = isCompleted
            ? 'bg-green-500 border-green-500 text-white'
            : isActive
            ? 'bg-white border-green-500 text-green-600 ring-4 ring-green-100'
            : 'bg-white border-gray-300 text-gray-400'

          const labelClass = isCompleted
            ? 'text-green-700 font-semibold'
            : isActive
            ? 'text-green-700 font-bold'
            : 'text-gray-400'

          return (
            <div key={stage} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-base flex-shrink-0 transition-all duration-300 ${circleClass}`}>
                  {isCompleted ? '✓' : STAGE_ICONS[stage]}
                </div>
                {!isLast && (
                  <div className={`w-0.5 h-8 ${isCompleted ? 'bg-green-400' : 'bg-gray-200'}`} />
                )}
              </div>
              <div className="pt-1.5 pb-2">
                <span className={`block text-sm ${labelClass}`}>{stage}</span>
                {isActive && (
                  <span className="block text-xs text-gray-500 italic mt-0.5">
                    {STAGE_DESC[stage]}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
