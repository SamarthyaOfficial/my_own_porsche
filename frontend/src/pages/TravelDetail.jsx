import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import api from '../services/api'
import './TravelDetail.css'

const destinations = {
  'new-england': {
    id: 'new-england',
    name: 'New England Fall Colors',
    location: 'Vermont & New Hampshire',
    duration: '4 Days / 3 Nights',
    price: '$4,995',
    description: 'Experience the breathtaking fall foliage of New England in a Porsche 911. Wind through covered bridges, past historic villages, and along scenic mountain roads.',
    heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop',
    highlights: [
      'Drive through the Green Mountains of Vermont',
      'Visit historic covered bridges',
      'Luxury accommodations at mountain resorts',
      'Curated dining experiences',
      'Professional photography package'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Welcome', description: 'Arrive in Burlington, VT. Evening welcome reception and vehicle assignment.' },
      { day: 2, title: 'Mountain Drive', description: 'Scenic drive through Stowe and the Green Mountains. Lunch at a historic inn.' },
      { day: 3, title: 'Covered Bridge Tour', description: 'Visit iconic covered bridges. Cross into New Hampshire for sunset views.' },
      { day: 4, title: 'Return Journey', description: 'Final morning drive and farewell brunch.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1601568544619-b03062b6a4a8?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1573551089778-46a7abc39d9f?w=600&h=400&fit=crop'
    ]
  },
  'texas': {
    id: 'texas',
    name: 'Texas Hill Country',
    location: 'Austin to Fredericksburg',
    duration: '3 Days / 2 Nights',
    price: '$3,495',
    description: 'Discover the winding roads and rolling hills of Texas Hill Country. Experience German heritage towns, world-class wineries, and legendary Texas hospitality.',
    heroImage: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=1920&h=1080&fit=crop',
    highlights: [
      'Drive the famous "Three Sisters" roads',
      'Wine tasting at Texas wineries',
      'Stay at luxury ranch resorts',
      'BBQ and fine dining experiences',
      'Visit historic Fredericksburg'
    ],
    itinerary: [
      { day: 1, title: 'Austin Departure', description: 'Meet at Circuit of the Americas. Hot laps before scenic drive to Hill Country.' },
      { day: 2, title: 'Willow City Loop', description: 'The most scenic drive in Texas. Wine country tour and evening dinner.' },
      { day: 3, title: 'Ranch Roads', description: 'Final drives on Ranch Road 965 and return to Austin.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1545194445-dddb8f4487c6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
    ]
  },
  'pacific-coast': {
    id: 'pacific-coast',
    name: 'Pacific Coast Highway',
    location: 'San Francisco to Los Angeles',
    duration: '5 Days / 4 Nights',
    price: '$6,995',
    description: 'The ultimate California road trip along one of the world\'s most scenic highways. From Big Sur to Malibu, experience the Pacific Coast like never before.',
    heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop',
    highlights: [
      'Drive the iconic Pacific Coast Highway',
      'Stay at oceanfront luxury hotels',
      'Visit Hearst Castle',
      'Wine tasting in Paso Robles',
      'Sunset dinner in Malibu'
    ],
    itinerary: [
      { day: 1, title: 'San Francisco', description: 'Begin in SF. Drive across Golden Gate Bridge to Half Moon Bay.' },
      { day: 2, title: 'Big Sur', description: 'The most dramatic coastline in America. Overnight at Post Ranch Inn.' },
      { day: 3, title: 'Hearst Castle', description: 'Tour the castle, then continue to Paso Robles wine country.' },
      { day: 4, title: 'Santa Barbara', description: 'American Riviera. Beach drive and evening in downtown SB.' },
      { day: 5, title: 'Malibu to LA', description: 'Canyon roads to the coast. Farewell lunch overlooking the Pacific.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502175353174-a7a70e73b362?w=600&h=400&fit=crop'
    ]
  }
}

function TravelDetail() {
  const { destinationId } = useParams()
  const destination = destinations[destinationId]

  const [showInquiry, setShowInquiry] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    guests: '2',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  if (!destination) {
    return (
      <div className="travel-detail-page">
        <Header />
        <main className="not-found">
          <div className="container">
            <h1>Destination Not Found</h1>
            <p>The travel experience you're looking for doesn't exist.</p>
            <Link to="/travel" className="btn btn-primary">View All Destinations</Link>
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
      await api.post('/api/travel/inquiry', {
        ...formData,
        destinationId: destination.id,
        destinationName: destination.name
      })
      setStatus({ type: 'success', message: 'Inquiry submitted! Our travel team will contact you shortly.' })
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        guests: '2',
        message: ''
      })
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to submit inquiry. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadBrochure = () => {
    // Create a simple text-based brochure for demo
    const brochureContent = `
PORSCHE TRAVEL EXPERIENCE
========================

${destination.name}
${destination.location}
${destination.duration}
${destination.price}

DESCRIPTION
-----------
${destination.description}

HIGHLIGHTS
----------
${destination.highlights.map(h => `• ${h}`).join('\n')}

ITINERARY
---------
${destination.itinerary.map(d => `Day ${d.day}: ${d.title}\n${d.description}`).join('\n\n')}

BOOK NOW
--------
Visit porsche.com/travel or call 1-800-PORSCHE

© Porsche Travel Experience
    `

    const blob = new Blob([brochureContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${destination.id}-brochure.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="travel-detail-page">
      <Header />

      <main>
        <section className="travel-hero" style={{ backgroundImage: `url(${destination.heroImage})` }}>
          <div className="travel-hero-overlay" />
          <motion.div
            className="travel-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="travel-location">{destination.location}</span>
            <h1>{destination.name}</h1>
            <div className="travel-meta">
              <span>{destination.duration}</span>
              <span className="divider">|</span>
              <span className="travel-price">{destination.price}</span>
            </div>
          </motion.div>
        </section>

        <section className="travel-overview">
          <div className="container">
            <div className="overview-grid">
              <motion.div
                className="overview-content"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2>Overview</h2>
                <p>{destination.description}</p>

                <h3>Experience Highlights</h3>
                <ul className="highlights-list">
                  {destination.highlights.map((highlight, index) => (
                    <li key={index}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="overview-actions">
                  <button className="btn btn-primary" onClick={() => setShowInquiry(true)}>
                    Book This Trip
                  </button>
                  <button className="btn btn-outline" onClick={handleDownloadBrochure}>
                    Download Brochure
                  </button>
                </div>
              </motion.div>

              <motion.div
                className="overview-gallery"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="gallery-grid">
                  {destination.gallery.map((image, index) => (
                    <div key={index} className="gallery-item">
                      <img src={image} alt={`${destination.name} ${index + 1}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="travel-itinerary">
          <div className="container">
            <h2>Day-by-Day Itinerary</h2>
            <div className="itinerary-timeline">
              {destination.itinerary.map((day, index) => (
                <motion.div
                  key={day.day}
                  className="itinerary-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="itinerary-day">Day {day.day}</div>
                  <div className="itinerary-content">
                    <h3>{day.title}</h3>
                    <p>{day.description}</p>
                  </div>
                </motion.div>
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
            >
              <h2>Ready for an Unforgettable Journey?</h2>
              <p>Spaces are limited. Reserve your spot today.</p>
              <button className="btn btn-primary btn-lg" onClick={() => setShowInquiry(true)}>
                Inquire Now
              </button>
            </motion.div>
          </div>
        </section>

        {showInquiry && (
          <div className="inquiry-modal-overlay" onClick={() => setShowInquiry(false)}>
            <motion.div
              className="inquiry-modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setShowInquiry(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <h2>Book {destination.name}</h2>
              <p className="modal-subtitle">{destination.duration} • {destination.price} per person</p>

              {status.message && (
                <div className={`form-status ${status.type}`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="inquiry-form">
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
                    <label htmlFor="guests">Number of Guests</label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="preferredDate">Preferred Start Date</label>
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
                  <label htmlFor="message">Additional Notes (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Special requests, dietary requirements, etc."
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Inquiry'}
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

export default TravelDetail
