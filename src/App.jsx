import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PostFood from './pages/PostFood'
import Listings from './pages/Listings'
import Tracking from './pages/Tracking'
import initialPosts from './data/foodPosts.json'

export default function App() {
  const [posts, setPosts] = useState(initialPosts)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostFood setPosts={setPosts} />} />
          <Route path="/listings" element={<Listings posts={posts} />} />
          <Route path="/track/:id" element={<Tracking posts={posts} setPosts={setPosts} />} />
        </Routes>
      </main>
      <footer className="bg-green-900 text-green-300 text-center py-4 text-sm">
        Wasteless Connect &mdash; reducing food waste, one pickup at a time.
      </footer>
    </div>
  )
}
