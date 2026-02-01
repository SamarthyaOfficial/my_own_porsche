import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import api from '../services/api'
import './DrivingSchool.css'

const programs = [
  {
    id: 'precision',
    name: 'Precision Course',
    level: 'Beginner',
    duration: '1 Day',
    price: '$1,995',
    description: 'Master the fundamentals of performance driving with professional instruction.',
    includes: [
      'Morning classroom session',
      'Hands-on vehicle dynamics exercises',
      'Slalom and braking techniques',
      'Lead-follow driving sessions',
      'Lunch included'
    ],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop'
  },
  {
    id: 'performance',
    name: 'Performance Course',
    level: 'Intermediate',
    duration: '2 Days',
    price: '$3,995',
    description: 'Elevate your skills with advanced techniques and track time.',
    includes: [
      'Advanced vehicle dynamics',
      'Trail braking and weight transfer',
      'Racing line optimization',
      'Extended track sessions',
      'Data analysis review',
      'Meals and accommodation'
    ],
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=500&fit=crop'
  },
  {
    id: 'masters',
    name: 'Masters Course',
    level: 'Advanced',
    duration: '3 Days',
    price: '$6,995',
    description: 'The ultimate driving experience for those who demand perfection.',
    includes: [
      'One-on-one coaching sessions',
      'GT3 RS track experience',
      'Wet handling course',
      'Night driving session',
      'Professional telemetry analysis',
      'VIP accommodation and dining',
      'Exclusive Porsche merchandise'
    ],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop'
  }
]

const locations = [
  { name: 'Porsche Experience Center Atlanta', city: 'Atlanta, GA', tracks: 'Road Course, Handling Circuit, Kick Plate' },
  { name: 'Porsche Experience Center Los Angeles', city: 'Los Angeles, CA', tracks: 'Driver Development Track, Handling Circuit' },
  { name: 'Barber Motorsports Park', city: 'Birmingham, AL', tracks: '2.38-mile Road Course' }
]

function DrivingSchool() {
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'beginner',
    preferredDate: '',
    location: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleEnroll = (program) => {
    setSelectedProgram(program)
    setFormData(prev => ({ ...prev, program: program.name }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      await api.post('/api/driving-school/enroll', {
        ...formData,
        programId: selectedProgram?.id,
        programName: selectedProgram?.name
      })
      setStatus({ type: 'success', message: 'Enrollment request submitted! We will contact you shortly.' })
      setSelectedProgram(null)
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: 'beginner',
        preferredDate: '',
        location: ''
      })
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to submit enrollment. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="driving-school-page">
      <Header />

      <main>
        <section className="school-hero">
          <div className="school-hero-bg">
            <video autoPlay muted loop playsInline>
              <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d" type="video/mp4" />
            </video>
            <div className="school-hero-overlay" />
          </div>
          <motion.div
            className="school-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Porsche Driving School</h1>
            <p>Unlock your potential behind the wheel of the world's finest sports cars</p>
          </motion.div>
        </section>

        <section className="school-intro">
          <div className="container">
            <motion.div
              className="intro-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Experience Performance Like Never Before</h2>
              <p>
                Whether you're a novice driver or a seasoned enthusiast, our professional instructors
                will guide you through a journey of discovery, helping you master the art of
                performance driving in the latest Porsche models.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="programs-section">
          <div className="container">
            <h2>Our Programs</h2>
            <div className="programs-grid">
              {programs.map((program, index) => (
                <motion.div
                  key={program.id}
                  className="program-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="program-image">
                    <img src={program.image} alt={program.name} loading="lazy" />
                    <span className="program-level">{program.level}</span>
                  </div>
                  <div className="program-content">
                    <div className="program-header">
                      <h3>{program.name}</h3>
                      <div className="program-meta">
                        <span>{program.duration}</span>
                        <span className="program-price">{program.price}</span>
                      </div>
                    </div>
                    <p>{program.description}</p>
                    <ul className="program-includes">
                      {program.includes.slice(0, 4).map((item, i) => (
                        <li key={i}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {item}
                        </li>
                      ))}
                      {program.includes.length > 4 && (
                        <li className="more-items">+{program.includes.length - 4} more included</li>
                      )}
                    </ul>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEnroll(program)}
                    >
                      Enroll Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="locations-section">
          <div className="container">
            <h2>Training Locations</h2>
            <div className="locations-grid">
              {locations.map((location, index) => (
                <motion.div
                  key={location.name}
                  className="location-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3>{location.name}</h3>
                  <p className="location-city">{location.city}</p>
                  <p className="location-tracks">{location.tracks}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {selectedProgram && (
          <div className="enrollment-modal-overlay" onClick={() => setSelectedProgram(null)}>
            <motion.div
              className="enrollment-modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedProgram(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <h2>Enroll in {selectedProgram.name}</h2>
              <p className="modal-subtitle">{selectedProgram.level} • {selectedProgram.duration} • {selectedProgram.price}</p>

              {status.message && (
                <div className={`form-status ${status.type}`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="enrollment-form">
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
                      <option value="">Select a location</option>
                      {locations.map(loc => (
                        <option key={loc.name} value={loc.name}>{loc.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Enrollment'}
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

export default DrivingSchool
