import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ModelCard from '../ModelCard/ModelCard'
import './ModelShowcase.css'

const models = [
  {
    id: 1,
    name: '911',
    price: 'From $106,100',
    seats: 2,
    fuelType: 'Gasoline',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=600&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-sports-car-speeding-on-a-highway-34563-large.mp4'
  },
  {
    id: 2,
    name: '718',
    price: 'From $63,400',
    seats: 2,
    fuelType: 'Gasoline',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-driving-on-a-mountain-road-4126-large.mp4'
  },
  {
    id: 3,
    name: 'Taycan',
    price: 'From $86,700',
    seats: 4,
    fuelType: 'Electric',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259b6e09?w=800&h=600&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-drifting-on-a-track-34606-large.mp4'
  },
  {
    id: 4,
    name: 'Panamera',
    price: 'From $92,400',
    seats: 4,
    fuelType: 'Hybrid',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-car-traveling-on-a-highway-at-sunset-34563-large.mp4'
  },
  {
    id: 5,
    name: 'Macan',
    price: 'From $60,900',
    seats: 5,
    fuelType: 'Gasoline',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-driving-in-the-countryside-4125-large.mp4'
  },
  {
    id: 6,
    name: 'Cayenne',
    price: 'From $76,550',
    seats: 5,
    fuelType: 'Hybrid',
    image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=800&h=600&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-suv-car-driving-fast-34564-large.mp4'
  }
]

function ModelShowcase({ onDarkModeChange }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            document.body.classList.add('dark-mode')
            onDarkModeChange?.(true)
          } else if (!entry.isIntersecting || entry.intersectionRatio < 0.1) {
            document.body.classList.remove('dark-mode')
            onDarkModeChange?.(false)
          }
        })
      },
      {
        threshold: [0, 0.1, 0.3, 0.5],
        rootMargin: '-10% 0px -10% 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      document.body.classList.remove('dark-mode')
    }
  }, [onDarkModeChange])

  return (
    <section id="models" className="model-showcase" ref={sectionRef}>
      <div className="model-showcase-bg" />

      <div className="container">
        <motion.div
          className="model-showcase-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Models</h2>
          <p>Experience the perfect blend of performance and luxury</p>
        </motion.div>

        <div className="model-showcase-grid">
          {models.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ModelCard model={model} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ModelShowcase
