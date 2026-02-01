import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import api from '../services/api'
import './ExperienceDetail.css'

const experiences = {
  'track-day': {
    id: 'track-day',
    name: 'Track Day Experience',
    tagline: 'Feel the rush of the racetrack',
    duration: 'Full Day',
    price: '$1,495',
    description: 'Experience the thrill of driving a Porsche on a world-class racetrack. Professional instruction, multiple track sessions, and the chance to push the limits of performance.',
    heroVideo: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop',
    included: [
      'Professional driving instruction',
      '4 track sessions (20 mins each)',
      'Vehicle: 911 Carrera S or Cayman GT4',
      'Helmet and safety equipment',
      'In-car telemetry and data review',
      'Lunch and refreshments',
      'Certificate of completion'
    ],
    schedule: [
      { time: '8:00 AM', activity: 'Registration & Welcome' },
      { time: '8:30 AM', activity: 'Safety Briefing & Track Walk' },
      { time: '9:30 AM', activity: 'Session 1 - Track Familiarization' },
      { time: '10:30 AM', activity: 'Classroom: Racing Lines & Braking' },
      { time: '11:30 AM', activity: 'Session 2 - Technique Focus' },
      { time: '12:30 PM', activity: 'Lunch Break' },
      { time: '1:30 PM', activity: 'Session 3 - Hot Laps with Instructor' },
      { time: '2:30 PM', activity: 'Data Review & Coaching' },
      { time: '3:30 PM', activity: 'Session 4 - Solo Driving' },
      { time: '4:30 PM', activity: 'Awards & Closing' }
    ],
    locations: ['Atlanta Motorsports Park', 'Circuit of the Americas', 'Barber Motorsports Park']
  },
  'racing-school': {
    id: 'racing-school',
    name: 'Porsche Racing School',
    tagline: 'From enthusiast to racer',
    duration: '3 Days',
    price: '$5,995',
    description: 'The most comprehensive performance driving program. Three days of intensive instruction to transform your driving skills and prepare you for competitive racing.',
    heroVideo: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d',
    heroImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1920&h=1080&fit=crop',
    included: [
      'One-on-one instruction sessions',
      'GT3 Cup car experience (Day 3)',
      'Advanced telemetry analysis',
      'Wet track handling session',
      'Racecraft and wheel-to-wheel basics',
      'Luxury hotel accommodation (2 nights)',
      'All meals included',
      'Racing license preparation',
      'Exclusive Porsche Motorsport gear'
    ],
    schedule: [
      { time: 'Day 1', activity: 'Foundation - Vehicle dynamics, braking zones, cornering techniques' },
      { time: 'Day 2', activity: 'Advancement - Trail braking, heel-toe, racing lines optimization' },
      { time: 'Day 3', activity: 'Mastery - GT3 Cup experience, race simulation, wheel-to-wheel' }
    ],
    locations: ['Porsche Experience Center Atlanta', 'Porsche Experience Center Los Angeles']
  },
  'ice-driving': {
    id: 'ice-driving',
    name: 'Ice Driving Experience',
    tagline: 'Master control in extreme conditions',
    duration: '2 Days',
    price: '$8,995',
    description: 'Experience the ultimate test of car control on a frozen lake in Finland. Learn advanced techniques that will make you a better driver in any condition.',
    heroVideo: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d',
    heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop',
    included: [
      'All-wheel drive 911 Carrera 4S',
      'Professional ice driving instruction',
      'Multiple driving exercises',
      'Slalom, drift, and precision courses',
      'Arctic accommodation',
      'Traditional Finnish sauna',
      'All meals and transfers',
      'Winter driving gear provided',
      'Exclusive photography package'
    ],
    schedule: [
      { time: 'Day 1', activity: 'Ice familiarization, weight transfer, basic slides, slalom course' },
      { time: 'Day 2', activity: 'Drift techniques, precision driving, timed competition, final drive' }
    ],
    locations: ['Rovaniemi, Finland']
  }
}

function ExperienceDetail() {
  const { experienceId } = useParams()
  const experience = experiences[experienceId]

  const [showRegistration, setShowRegistration] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    location: '',
    experience: 'intermediate'
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  if (!experience) {
    return (
      <div className="experience-detail-page">
        <Header />
        <main className="not-found">
          <div className="container">
            <h1>Experience Not Found</h1>
            <p>The motorsport experience you're looking for doesn't exist.</p>
            <Link to="/motorsport" className="btn btn-primary">View All Experiences</Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      await api.post('/api/events/register', {
        ...formData,
        eventId: experience.id,
        eventName: experience.name,
        eventPrice: experience.price
      })
      setStatus({ type: 'success', message: 'Registration successful! Check your email for confirmation.' })
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        location: '',
        experience: 'intermediate'
      })
    } catch (error) {
      setStatus({ type: 'error', message: 'Registration failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="experience-detail-page">
      <Header />

      <main>
        <section className="experience-hero">
          <div className="experience-hero-bg">
            <video autoPlay muted loop playsInline poster={experience.heroImage}>
              <source src={experience.heroVideo} type="video/mp4" />
            </video>
            <div className="experience-hero-overlay" />
          </div>
          <motion.div
            className="experience-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="experience-tagline">{experience.tagline}</span>
            <h1>{experience.name}</h1>
            <div className="experience-meta">
              <span>{experience.duration}</span>
              <span className="divider">|</span>
              <span className="experience-price">{experience.price}</span>
            </div>
          </motion.div>
        </section>

        <section className="experience-overview">
          <div className="container">
            <div className="overview-grid">
              <motion.div
                className="overview-content"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2>About This Experience</h2>
                <p>{experience.description}</p>

                <h3>What's Included</h3>
                <ul className="included-list">
                  {experience.included.map((item, index) => (
                    <li key={index}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <button className="btn btn-primary btn-lg" onClick={() => setShowRegistration(true)}>
                  Register Now
                </button>
              </motion.div>

              <motion.div
                className="schedule-card"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3>Program Schedule</h3>
                <div className="schedule-list">
                  {experience.schedule.map((item, index) => (
                    <div key={index} className="schedule-item">
                      <span className="schedule-time">{item.time}</span>
                      <span className="schedule-activity">{item.activity}</span>
                    </div>
                  ))}
                </div>

                <div className="locations-info">
                  <h4>Available Locations</h4>
                  <ul>
                    {experience.locations.map((location, index) => (
                      <li key={index}>{location}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="experience-cta">
          <div className="container">
            <motion.div
              className="cta-content"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2>Ready to Experience the Track?</h2>
              <p>Limited spots available. Secure your place today.</p>
              <button className="btn btn-primary btn-lg" onClick={() => setShowRegistration(true)}>
                Register for {experience.price}
              </button>
            </motion.div>
          </div>
        </section>

        {showRegistration && (
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

              <h2>Register for {experience.name}</h2>
              <p className="modal-subtitle">{experience.duration} • {experience.price}</p>

              {status.message && (
                <div className={`form-status ${status.type}`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="experience">Driving Experience</label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="preferredDate">Preferred Date</label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Preferred Location</label>
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select location</option>
                      {experience.locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                  {loading ? 'Processing...' : `Complete Registration - ${experience.price}`}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default ExperienceDetail
