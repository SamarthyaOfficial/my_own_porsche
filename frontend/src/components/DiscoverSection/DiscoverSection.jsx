import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './DiscoverSection.css'

const discoverItems = [
  {
    id: 1,
    title: 'Travel & Experience',
    description: 'Discover breathtaking routes and unforgettable journeys with Porsche Travel Experience.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
    link: '/travel',
    tag: '2026 Season'
  },
  {
    id: 2,
    title: 'Motorsport Experience',
    description: 'Feel the thrill of racing at legendary circuits with professional instruction.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    link: '/motorsport',
    tag: 'Track Days'
  }
]

function DiscoverSection() {
  return (
    <section className="discover-section">
      <div className="container">
        <motion.div
          className="discover-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Discover Porsche</h2>
          <p>Beyond the drive, an experience awaits</p>
        </motion.div>

        <div className="discover-grid">
          {discoverItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link to={item.link} className="discover-card">
                <div className="discover-card-image">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <span className="discover-card-tag">{item.tag}</span>
                </div>
                <div className="discover-card-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="discover-card-link">
                    Explore
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DiscoverSection
