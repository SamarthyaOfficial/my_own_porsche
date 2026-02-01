import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './FindStore.css'

function FindStore() {
  const [location, setLocation] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (location.trim()) {
      navigate(`/dealers?zip=${encodeURIComponent(location)}`)
    }
  }

  return (
    <section className="find-store">
      <div className="container">
        <motion.div
          className="find-store-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="find-store-text">
            <h2>Find Your Nearest Porsche Center</h2>
            <p>Experience Porsche excellence in person. Visit one of our authorized dealers for a test drive.</p>
          </div>

          <form className="find-store-form" onSubmit={handleSubmit}>
            <div className="find-store-input-wrapper">
              <svg className="location-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <input
                type="text"
                placeholder="Enter your city or zip code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="find-store-input"
              />
            </div>
            <button type="submit" className="btn btn-primary find-store-btn">
              Find Dealers
            </button>
          </form>

          <div className="find-store-features">
            <div className="store-feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>Book a test drive</span>
            </div>
            <div className="store-feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              <span>Get a quote</span>
            </div>
            <div className="store-feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>24/7 support</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="find-store-map"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&h=500&fit=crop"
            alt="Porsche dealership"
            className="store-image"
          />
          <div className="store-overlay">
            <span>Over 180 Porsche Centers Worldwide</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FindStore
