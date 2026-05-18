import { Link } from 'react-router-dom'

const FAQS = [
  {
    q: 'Who can post food?',
    a: 'Any restaurant, dhaba, or university cafeteria with good-condition surplus food can create a post in seconds.',
  },
  {
    q: 'Is there any cost to use the platform?',
    a: 'No. Wasteless Connect is completely free for donors. There are no fees, subscriptions, or hidden charges.',
  },
  {
    q: 'How do I know my food was collected?',
    a: 'Every post has a live tracking page with a 4-stage timeline and an estimated pickup time, just like an order tracker.',
  },
  {
    q: 'How fresh should the food be?',
    a: 'Only post leftover food that is still in good, edible condition and well within its safe-to-consume window.',
  },
]

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="text-4xl mb-3">🥗</div>
        <h1 className="text-3xl font-extrabold text-gray-800">About Wasteless Connect</h1>
        <p className="text-gray-500 mt-3 leading-relaxed">
          Every day, restaurants, dhabas, and university cafeterias across Pakistan
          end up with good-quality surplus food. Wasteless Connect makes it
          effortless to hand that food over to a dedicated pickup team — quickly,
          reliably, and with full visibility from post to pickup.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-5 mb-12">
        {[
          { icon: '⚡', title: 'Fast', text: 'Post surplus food in under a minute.' },
          { icon: '📍', title: 'Trackable', text: 'Follow every pickup in real time.' },
          { icon: '💚', title: 'Free', text: 'No cost for any donor, ever.' },
        ].map(({ icon, title, text }) => (
          <div
            key={title}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center"
          >
            <div className="text-3xl mb-2">{icon}</div>
            <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{text}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-5">Frequently Asked Questions</h2>
      <div className="space-y-4 mb-12">
        {FAQS.map(({ q, a }) => (
          <div
            key={q}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <h3 className="font-semibold text-gray-800 mb-1">{q}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          to="/post"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors duration-150"
        >
          Post Surplus Food
        </Link>
      </div>
    </div>
  )
}
