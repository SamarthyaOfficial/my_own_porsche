import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './Museum.css'

const museumModels = [
  { year: '1948', name: '356', description: 'The first Porsche. Where the legend began.', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop' },
  { year: '1963', name: '911', description: 'The icon that defined a generation of sports cars.', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&h=400&fit=crop' },
  { year: '1969', name: '914', description: 'Mid-engine innovation for the masses.', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop' },
  { year: '1976', name: '924', description: 'Front-engine, rear-wheel drive perfection.', image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&h=400&fit=crop' },
  { year: '1996', name: 'Boxster', description: 'The rebirth of the mid-engine roadster.', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop' },
  { year: '2002', name: 'Cayenne', description: 'Porsche enters the SUV market with authority.', image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=600&h=400&fit=crop' },
  { year: '2009', name: 'Panamera', description: 'The sports car for four arrives.', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop' },
  { year: '2019', name: 'Taycan', description: 'Soul, electrified. The electric era begins.', image: 'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=600&h=400&fit=crop' }
]

function Museum() {
  return (
    <div className="museum-page">
      <Header />

      <main>
        <section className="museum-hero">
          <div className="museum-hero-bg">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop" alt="Porsche Museum" />
            <div className="museum-hero-overlay" />
          </div>
          <motion.div
            className="museum-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Porsche Museum</h1>
            <p>Over 75 years of automotive excellence. Experience the legacy.</p>
          </motion.div>
        </section>

        <section className="museum-intro">
          <div className="container">
            <motion.div
              className="intro-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>A Journey Through Time</h2>
              <p>
                From the first 356 to the revolutionary Taycan, every Porsche tells a story of
                innovation, passion, and the relentless pursuit of performance. Explore the
                milestones that have shaped automotive history.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="museum-timeline">
          <div className="container">
            <h2>Historic Models</h2>
            <div className="timeline-grid">
              {museumModels.map((model, index) => (
                <motion.div
                  key={model.name}
                  className="timeline-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="timeline-image">
                    <img src={model.image} alt={model.name} loading="lazy" />
                    <span className="timeline-year">{model.year}</span>
                  </div>
                  <div className="timeline-content">
                    <h3>Porsche {model.name}</h3>
                    <p>{model.description}</p>
                    <Link to={`/model/${model.name.toLowerCase()}`} className="timeline-link">
                      Learn more
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="museum-cta">
          <div className="container">
            <motion.div
              className="cta-content"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2>Visit the Porsche Museum</h2>
              <p>Stuttgart, Germany. Open daily from 9 AM to 6 PM.</p>
              <a href="https://www.porsche.com/museum" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Plan Your Visit
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Museum
