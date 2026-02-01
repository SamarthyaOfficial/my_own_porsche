import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './LatestModels.css'

const latestModels = [
  {
    id: 1,
    name: 'The new 911 GT3 RS',
    tagline: 'Born from racing.',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&h=400&fit=crop',
    link: '/model/911'
  },
  {
    id: 2,
    name: 'Taycan Turbo GT',
    tagline: 'The fastest ever Porsche.',
    image: 'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=600&h=400&fit=crop',
    link: '/model/taycan'
  },
  {
    id: 3,
    name: 'Cayenne Turbo E-Hybrid',
    tagline: 'Performance meets efficiency.',
    image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=600&h=400&fit=crop',
    link: '/model/cayenne'
  }
]

function LatestModels() {
  return (
    <section className="latest-models">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Latest Models
        </motion.h2>

        <div className="latest-models-grid">
          {latestModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={model.link} className="latest-model-card">
                <div className="latest-model-image">
                  <img
                    src={model.image}
                    alt={model.name}
                    loading="lazy"
                  />
                </div>
                <div className="latest-model-content">
                  <h3>{model.name}</h3>
                  <p>{model.tagline}</p>
                  <span className="latest-model-link">
                    Discover more
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

export default LatestModels
