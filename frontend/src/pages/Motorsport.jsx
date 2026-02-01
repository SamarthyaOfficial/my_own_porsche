import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import api from '../services/api'
import './Motorsport.css'

const experiences = [
  {
    id: 'track-day',
    title: 'Track Day Experience',
    description: 'Get behind the wheel of the latest Porsche models on world-renowned circuits. Professional instruction included.',
    duration: '1 Day',
    price: 'From $1,500',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    features: ['Professional instruction', 'Latest Porsche models', 'Helmet & suit provided', 'Lunch included']
  },
  {
    id: 'racing-school',
    title: 'Racing School',
    description: 'Learn advanced driving techniques from championship-winning instructors over an intensive multi-day program.',
    duration: '3 Days',
    price: 'From $5,500',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
    features: ['Advanced techniques', 'Telemetry analysis', 'Track certification', 'Competition preparation']
  },
  {
    id: 'ice-driving',
    title: 'Ice Driving Experience',
    description: 'Experience the ultimate test of car control on a frozen lake in Finland. Learn advanced techniques.',
    duration: '2 Days',
    price: 'From $8,995',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop',
    features: ['Arctic location', 'AWD 911 Carrera', 'Finnish sauna', 'All-inclusive']
  }
]

const upcomingEvents = [
  { date: 'Mar 15-17', event: 'Laguna Seca Weekend', location: 'California, USA', spotsLeft: 4 },
  { date: 'Apr 5-7', event: 'Nürburgring Experience', location: 'Germany', spotsLeft: 8 },
  { date: 'May 10-12', event: 'Spa-Francorchamps', location: 'Belgium', spotsLeft: 12 },
  { date: 'Jun 20-22', event: 'Circuit of the Americas', location: 'Texas, USA', spotsLeft: 6 }
]

function Motorsport() {
  const [showRegistration, setShowRegistration] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleRegister = (event) => {
    setSelectedEvent(event)
    setShowRegistration(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      await api.post('/api/events/register', {
        ...formData,
        eventName: selectedEvent.event,
        eventDate: selectedEvent.date,
        eventLocation: selectedEvent.location
      })
      setStatus({ type: 'success', message: 'Registration successful! Check your email for confirmation.' })
      setFormData({ name: '', email: '', phone: '' })
      setTimeout(() => setShowRegistration(false), 2000)
    } catch (error) {
      setStatus({ type: 'error', message: 'Registration failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="motorsport-page">
      <Header />

      <main>
        <section className="motorsport-hero">
          <video
            className="motorsport-hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-sports-car-drifting-on-a-track-34606-large.mp4"
              type="video/mp4"
            />
          </video>
          <div className="motorsport-hero-overlay" />
          <motion.div
            className="motorsport-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="motorsport-badge">Porsche Motorsport</span>
            <h1>Born on the Track</h1>
            <p>Experience the pure thrill of racing with professional instruction at the world's most legendary circuits.</p>
            <button className="btn btn-primary">Explore Experiences</button>
          </motion.div>
        </section>

        <section className="experiences-section">
          <div className="container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Motorsport Experiences</h2>
              <p>From first-timers to seasoned drivers, we have the perfect program for you</p>
            </motion.div>

            <div className="experiences-grid">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="experience-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="experience-image">
                    <img src={exp.image} alt={exp.title} loading="lazy" />
                    <div className="experience-price">{exp.price}</div>
                  </div>
                  <div className="experience-content">
                    <div className="experience-header">
                      <h3>{exp.title}</h3>
                      <span className="experience-duration">{exp.duration}</span>
                    </div>
                    <p>{exp.description}</p>
                    <ul className="experience-features">
                      {exp.features.map((feature) => (
                        <li key={feature}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to={`/motorsport/${exp.id}`} className="btn btn-outline experience-btn">Learn More</Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="events-section">
          <div className="container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Upcoming Events</h2>
              <p>Secure your spot at our exclusive motorsport events</p>
            </motion.div>

            <div className="events-list">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.date}
                  className="event-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="event-date">{event.date}</div>
                  <div className="event-details">
                    <h4>{event.event}</h4>
                    <span>{event.location}</span>
                  </div>
                  <div className="event-spots">
                    <span className={event.spotsLeft <= 5 ? 'low' : ''}>
                      {event.spotsLeft} spots left
                    </span>
                  </div>
                  <button className="btn btn-primary event-btn" onClick={() => handleRegister(event)}>Register</button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-section">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              On Track Gallery
            </motion.h2>

            <div className="gallery-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  className="gallery-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <img
                    src={`https://images.unsplash.com/photo-${
                      ['1558618666-fcd25c85cd64', '1544636331-e26879cd4d9b', '1611859266238-4b98091d9d9b',
                       '1503376780353-7e6692767b70', '1614162692292-7ac56d7f7f1e', '1580274455191-1c62238fa333'][i - 1]
                    }?w=600&h=400&fit=crop`}
                    alt={`Racing moment ${i}`}
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="motorsport-cta">
          <div className="container">
            <motion.div
              className="cta-content"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2>Start Your Racing Journey</h2>
              <p>Contact our motorsport team to find the perfect experience for you.</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary">Contact Us</Link>
                <Link to="/motorsport/calendar" className="btn btn-outline cta-outline">View Calendar</Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {showRegistration && selectedEvent && (
        <div className="registration-modal-overlay" onClick={() => setShowRegistration(false)}>
          <motion.div
            className="registration-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setShowRegistration(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h2>Register for Event</h2>
            <p className="modal-event-info">
              <strong>{selectedEvent.event}</strong><br />
              {selectedEvent.date} • {selectedEvent.location}
            </p>

            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="registration-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Processing...' : 'Complete Registration'}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Motorsport
