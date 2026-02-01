import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './HeroBanner.css'

function HeroBanner() {
  const videoRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {
        // Autoplay was prevented, that's okay
      })
    }
  }, [])

  return (
    <section className="hero-banner">
      <div className="hero-video-container">
        {/* Placeholder poster image for instant display */}
        <img
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&h=1080&fit=crop"
          alt="Porsche Racing"
          className={`hero-poster ${isLoaded ? 'hidden' : ''}`}
        />

        <video
          ref={videoRef}
          className={`hero-video ${isLoaded ? 'loaded' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&h=1080&fit=crop"
          onLoadedData={() => setIsLoaded(true)}
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-sports-car-racing-on-a-speedway-at-sunset-34600-large.mp4"
            type="video/mp4"
          />
        </video>

        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hero-text"
        >
          <h1>Soul, electrified.</h1>
          <p>The new Porsche Taycan. Experience the thrill of tomorrow.</p>
          <div className="hero-buttons">
            <a href="/build" className="btn btn-primary">Build Your Porsche</a>
            <a href="#models" className="btn btn-outline hero-btn-outline">Discover Models</a>
          </div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span>Scroll to explore</span>
          <div className="scroll-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroBanner
