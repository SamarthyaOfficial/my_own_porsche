import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './Travel.css'

const destinations = [
  {
    id: 'new-england',
    region: 'New England',
    country: 'United States',
    description: 'Experience the breathtaking fall foliage as you navigate through winding mountain roads, historic covered bridges, and charming coastal routes. The New England tour offers over 500 miles of the most scenic driving in North America.',
    highlights: ['Acadia National Park', 'White Mountains', 'Vermont Covered Bridges', 'Cape Cod Coastline'],
    duration: '7 Days',
    distance: '500+ miles',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop'
  },
  {
    id: 'texas',
    region: 'Texas Hill Country',
    country: 'United States',
    description: 'Discover the open roads of the Texas Hill Country, where endless horizons meet twisting canyon roads. This tour takes you through historic German towns, vast ranches, and some of the best driving roads in the Southwest.',
    highlights: ['Twisted Sisters Route', 'Fredericksburg Wine Country', 'Hamilton Pool', 'Devils Backbone'],
    duration: '5 Days',
    distance: '400+ miles',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop'
  },
  {
    id: 'pacific-coast',
    region: 'Pacific Coast Highway',
    country: 'United States',
    description: 'The ultimate California road trip along one of the world\'s most scenic highways. From Big Sur to Malibu, experience the Pacific Coast like never before.',
    highlights: ['Big Sur Coast', 'Hearst Castle', 'Paso Robles Wine Country', 'Malibu Canyon'],
    duration: '5 Days',
    distance: '600+ miles',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop'
  },
]

function Travel() {
  return (
    <div className="travel-page">
      <Header />

      <main>
        <section className="travel-hero">
          <div className="travel-hero-bg">
            <img
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop"
              alt="Porsche Travel Experience"
            />
            <div className="travel-hero-overlay" />
          </div>
          <motion.div
            className="travel-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="travel-season">2026 Travel Season</span>
            <h1>Porsche Travel Experience</h1>
            <p>Discover extraordinary routes around the world, where every journey becomes an unforgettable adventure.</p>
          </motion.div>
        </section>

        <section className="travel-intro">
          <div className="container">
            <motion.div
              className="intro-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>The Road Awaits</h2>
              <p>
                Porsche Travel Experience combines the thrill of driving with the joy of discovery.
                Each tour is meticulously crafted to showcase the world's most spectacular driving roads,
                paired with luxury accommodations and authentic local experiences.
              </p>
            </motion.div>

            <div className="travel-stats">
              <motion.div
                className="stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <span className="stat-number">15+</span>
                <span className="stat-label">Destinations</span>
              </motion.div>
              <motion.div
                className="stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="stat-number">5000+</span>
                <span className="stat-label">Miles of Routes</span>
              </motion.div>
              <motion.div
                className="stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <span className="stat-number">25+</span>
                <span className="stat-label">Years of Excellence</span>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="destinations-section">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Featured Destinations
            </motion.h2>

            <div className="destinations-list">
              {destinations.map((dest, index) => (
                <motion.article
                  key={dest.id}
                  className="destination-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="destination-image">
                    <img src={dest.image} alt={dest.region} loading="lazy" />
                    <div className="destination-overlay">
                      <span className="destination-country">{dest.country}</span>
                    </div>
                  </div>
                  <div className="destination-content">
                    <div className="destination-header">
                      <h3>{dest.region}</h3>
                      <div className="destination-meta">
                        <span>{dest.duration}</span>
                        <span className="dot">•</span>
                        <span>{dest.distance}</span>
                      </div>
                    </div>
                    <p className="destination-description">{dest.description}</p>
                    <div className="destination-highlights">
                      <h4>Highlights</h4>
                      <ul>
                        {dest.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                    <Link to={`/travel/${dest.id}`} className="btn btn-primary">Learn More</Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="travel-cta">
          <div className="container">
            <motion.div
              className="cta-content"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Ready for Your Next Adventure?</h2>
              <p>Contact our travel specialists to plan your perfect Porsche journey.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary">Book a Consultation</Link>
                <a
                  href="#"
                  className="btn btn-outline cta-outline"
                  onClick={(e) => {
                    e.preventDefault()
                    const content = `PORSCHE TRAVEL EXPERIENCE 2026\n\nDiscover extraordinary routes around the world.\n\nFeatured Destinations:\n- New England Fall Colors\n- Texas Hill Country\n- Pacific Coast Highway\n\nContact: travel@porsche.com\nwww.porsche.com/travel`
                    const blob = new Blob([content], { type: 'text/plain' })
                    const url = URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.href = url
                    link.download = 'porsche-travel-brochure.txt'
                    link.click()
                    URL.revokeObjectURL(url)
                  }}
                >
                  Download Brochure
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Travel
