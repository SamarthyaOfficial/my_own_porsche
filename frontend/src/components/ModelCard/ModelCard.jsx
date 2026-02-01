import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './ModelCard.css'

function ModelCard({ model }) {
  const videoRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <motion.div
      className={`model-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="model-card-media">
        <img
          src={model.image}
          alt={model.name}
          className={`model-card-image ${isHovered && videoLoaded ? 'hidden' : ''}`}
          loading="lazy"
        />

        {model.video && (
          <video
            ref={videoRef}
            className={`model-card-video ${isHovered && videoLoaded ? 'visible' : ''}`}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setVideoLoaded(true)}
          >
            <source src={model.video} type="video/mp4" />
          </video>
        )}

        <div className="model-card-overlay" />
      </div>

      <div className="model-card-content">
        <div className="model-card-info">
          <h3 className="model-card-name">{model.name}</h3>
          <div className="model-card-specs">
            <span className="model-card-price">{model.price}</span>
            <div className="model-card-features">
              <span>{model.seats} seats</span>
              <span className="separator">|</span>
              <span>{model.fuelType}</span>
            </div>
          </div>
        </div>

        <Link to={`/build?model=${model.name}`} className="model-card-button">
          <span>Build Your Own</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      </div>
    </motion.div>
  )
}

export default ModelCard
