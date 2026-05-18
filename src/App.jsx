import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PostFood from './pages/PostFood'
import Listings from './pages/Listings'
import Tracking from './pages/Tracking'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import initialPosts from './data/foodPosts.json'

const STORAGE_KEY = 'wasteless-connect-posts'

function loadInitialPosts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {
    // Corrupt or unavailable storage — fall back to seed data.
  }
  return initialPosts
}

export default function App() {
  const [posts, setPosts] = useState(loadInitialPosts)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    } catch {
      // Storage quota/availability errors are non-fatal for a demo.
    }
  }, [posts])

  function resetPosts() {
    setPosts(initialPosts)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostFood setPosts={setPosts} />} />
          <Route path="/listings" element={<Listings posts={posts} onReset={resetPosts} />} />
          <Route path="/track/:id" element={<Tracking posts={posts} setPosts={setPosts} />} />
          <Route path="/dashboard" element={<Dashboard posts={posts} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <footer className="bg-green-900 text-green-300 text-center py-4 text-sm">
        Wasteless Connect &mdash; reducing food waste, one pickup at a time.
      </footer>
    </div>
  )
}
