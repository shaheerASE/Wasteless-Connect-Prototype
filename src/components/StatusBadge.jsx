const STATUS_STYLES = {
  'Posted':     'bg-gray-100 text-gray-700 border border-gray-300',
  'Confirmed':  'bg-blue-100 text-blue-700 border border-blue-300',
  'On the way': 'bg-amber-100 text-amber-700 border border-amber-300',
  'Picked up':  'bg-green-100 text-green-700 border border-green-300',
}

const STATUS_DOTS = {
  'Posted':     'bg-gray-400',
  'Confirmed':  'bg-blue-500',
  'On the way': 'bg-amber-500',
  'Picked up':  'bg-green-500',
}

export default function StatusBadge({ status }) {
  const containerClass = STATUS_STYLES[status] ?? STATUS_STYLES['Posted']
  const dotClass = STATUS_DOTS[status] ?? STATUS_DOTS['Posted']

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${containerClass}`}>
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotClass}`} />
      {status}
    </span>
  )
}
