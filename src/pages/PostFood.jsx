import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DONOR_TYPES = ['Restaurant', 'Dhaba', 'University']

function generateId() {
  return 'fp-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

export default function PostFood({ setPosts }) {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    donorName: '',
    donorType: '',
    foodType: '',
    quantity: '',
    location: '',
    availableUntil: '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function validate(data) {
    const e = {}
    if (!data.donorName.trim())      e.donorName      = 'Donor name is required'
    if (!data.donorType)             e.donorType      = 'Please select a donor type'
    if (!data.foodType.trim())       e.foodType       = 'Food type is required'
    if (!data.quantity.trim())       e.quantity       = 'Quantity is required'
    if (!data.location.trim())       e.location       = 'Location is required'
    if (!data.availableUntil.trim()) e.availableUntil = 'Available-until time is required'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const newPost = {
      id: generateId(),
      donorName: form.donorName.trim(),
      donorType: form.donorType,
      foodType: form.foodType.trim(),
      quantity: form.quantity.trim(),
      location: form.location.trim(),
      availableUntil: form.availableUntil.trim(),
      status: 'Posted',
      eta: '',
    }

    setPosts(prev => [newPost, ...prev])
    setSubmitted(true)
    setTimeout(() => navigate('/listings'), 1200)
  }

  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition ${
      errors[field]
        ? 'border-red-400 bg-red-50'
        : 'border-gray-200 bg-white focus:border-green-400'
    }`

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-5xl">✅</div>
          <h2 className="text-2xl font-bold text-green-700">Post submitted!</h2>
          <p className="text-gray-500 text-sm">Redirecting to listings…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Post Surplus Food</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Fill in the details below and the pickup team will be notified.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5" noValidate>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Donor Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="donorName"
            value={form.donorName}
            onChange={handleChange}
            placeholder="e.g. The Spice Garden"
            className={inputClass('donorName')}
          />
          {errors.donorName && <p className="text-xs text-red-500 mt-1">{errors.donorName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Donor Type <span className="text-red-500">*</span>
          </label>
          <select
            name="donorType"
            value={form.donorType}
            onChange={handleChange}
            className={inputClass('donorType')}
          >
            <option value="">Select type…</option>
            {DONOR_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.donorType && <p className="text-xs text-red-500 mt-1">{errors.donorType}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Food Type <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="foodType"
            value={form.foodType}
            onChange={handleChange}
            placeholder="e.g. Veg Biryani, Dal Makhani + Rice"
            className={inputClass('foodType')}
          />
          {errors.foodType && <p className="text-xs text-red-500 mt-1">{errors.foodType}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="e.g. 30 servings"
            className={inputClass('quantity')}
          />
          {errors.quantity && <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Koramangala, Bengaluru"
            className={inputClass('location')}
          />
          {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Available Until <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="availableUntil"
            value={form.availableUntil}
            onChange={handleChange}
            placeholder="e.g. 5:30 PM"
            className={inputClass('availableUntil')}
          />
          {errors.availableUntil && <p className="text-xs text-red-500 mt-1">{errors.availableUntil}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3 rounded-xl transition-colors duration-150 text-sm mt-2"
        >
          Submit Food Post
        </button>
      </form>
    </div>
  )
}
