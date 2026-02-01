import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './Dealers.css'

const mockDealers = [
  {
    id: 1,
    name: 'Porsche Manhattan',
    address: '770 11th Avenue',
    city: 'New York',
    state: 'NY',
    zipCode: '10019',
    phone: '(212) 586-7000',
    services: ['Sales', 'Service', 'Parts'],
    hours: 'Mon-Fri: 9AM-7PM, Sat: 9AM-5PM',
    distance: 2.3
  },
  {
    id: 2,
    name: 'Porsche Brooklyn',
    address: '725 Atlantic Avenue',
    city: 'Brooklyn',
    state: 'NY',
    zipCode: '11238',
    phone: '(718) 797-1977',
    services: ['Sales', 'Service', 'Parts', 'Certified Pre-Owned'],
    hours: 'Mon-Fri: 9AM-8PM, Sat: 9AM-6PM',
    distance: 5.1
  },
  {
    id: 3,
    name: 'Porsche Englewood',
    address: '105 Grand Avenue',
    city: 'Englewood',
    state: 'NJ',
    zipCode: '07631',
    phone: '(201) 227-6500',
    services: ['Sales', 'Service', 'Parts'],
    hours: 'Mon-Fri: 9AM-7PM, Sat: 9AM-5PM',
    distance: 12.4
  },
  {
    id: 4,
    name: 'Porsche Gold Coast',
    address: '895 Northern Boulevard',
    city: 'Great Neck',
    state: 'NY',
    zipCode: '11021',
    phone: '(516) 829-9400',
    services: ['Sales', 'Service', 'Parts', 'Certified Pre-Owned'],
    hours: 'Mon-Fri: 9AM-8PM, Sat: 9AM-6PM',
    distance: 18.7
  },
  {
    id: 5,
    name: 'Porsche Westchester',
    address: '333 Tarrytown Road',
    city: 'White Plains',
    state: 'NY',
    zipCode: '10607',
    phone: '(914) 997-9700',
    services: ['Sales', 'Service', 'Parts'],
    hours: 'Mon-Fri: 9AM-7PM, Sat: 9AM-5PM',
    distance: 25.2
  }
]

function Dealers() {
  const [searchParams] = useSearchParams()
  const [zipCode, setZipCode] = useState('')
  const [searchedZip, setSearchedZip] = useState('')
  const [dealers, setDealers] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    const zipFromUrl = searchParams.get('zip')
    if (zipFromUrl) {
      setZipCode(zipFromUrl)
      performSearch(zipFromUrl)
    }
  }, [searchParams])

  const performSearch = (zip) => {
    if (!zip.trim()) return

    setLoading(true)
    setSearchedZip(zip)

    // Simulate API call
    setTimeout(() => {
      // Filter mock dealers based on "proximity" (using zip code prefix match for demo)
      const zipPrefix = zip.substring(0, 3)
      const nearbyDealers = mockDealers.filter(dealer =>
        dealer.zipCode.startsWith(zipPrefix) ||
        dealer.zipCode.startsWith('1') // Show NY/NJ dealers for demo
      )

      setDealers(nearbyDealers.length > 0 ? nearbyDealers : mockDealers.slice(0, 3))
      setSearched(true)
      setLoading(false)
    }, 800)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    performSearch(zipCode)
  }

  return (
    <div className="dealers-page">
      <Header />

      <main>
        <section className="dealers-hero">
          <div className="container">
            <motion.div
              className="dealers-hero-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>Find a Porsche Center</h1>
              <p>Locate your nearest authorized Porsche dealership</p>
            </motion.div>
          </div>
        </section>

        <section className="dealers-search-section">
          <div className="container">
            <motion.div
              className="search-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter ZIP code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    pattern="[0-9]*"
                    maxLength="5"
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {searched && (
          <section className="dealers-results">
            <div className="container">
              <div className="results-header">
                <h2>
                  {dealers.length > 0
                    ? `${dealers.length} Porsche Centers near ${searchedZip}`
                    : `No Porsche Centers found near ${searchedZip}`
                  }
                </h2>
              </div>

              {dealers.length > 0 ? (
                <div className="dealers-grid">
                  {dealers.map((dealer, index) => (
                    <motion.div
                      key={dealer.id}
                      className="dealer-card"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="dealer-header">
                        <h3>{dealer.name}</h3>
                        <span className="dealer-distance">{dealer.distance} mi</span>
                      </div>

                      <div className="dealer-info">
                        <div className="info-row">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          <span>{dealer.address}, {dealer.city}, {dealer.state} {dealer.zipCode}</span>
                        </div>
                        <div className="info-row">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                          </svg>
                          <a href={`tel:${dealer.phone}`}>{dealer.phone}</a>
                        </div>
                        <div className="info-row">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span>{dealer.hours}</span>
                        </div>
                      </div>

                      <div className="dealer-services">
                        {dealer.services.map(service => (
                          <span key={service} className="service-tag">{service}</span>
                        ))}
                      </div>

                      <div className="dealer-actions">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${dealer.name} ${dealer.address} ${dealer.city} ${dealer.state}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline"
                        >
                          Get Directions
                        </a>
                        <a href={`tel:${dealer.phone}`} className="btn btn-primary">
                          Call Now
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  className="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <h3>No Porsche Centers Found</h3>
                  <p>We couldn't find any Porsche Centers near your location. Try searching with a different ZIP code.</p>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {!searched && (
          <section className="dealers-info">
            <div className="container">
              <div className="info-grid">
                <motion.div
                  className="info-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="info-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <path d="M3 9h18"/>
                      <path d="M9 21V9"/>
                    </svg>
                  </div>
                  <h3>New Vehicles</h3>
                  <p>Explore the latest Porsche models and configure your dream car.</p>
                </motion.div>

                <motion.div
                  className="info-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="info-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
                    </svg>
                  </div>
                  <h3>Service & Parts</h3>
                  <p>Expert technicians and genuine Porsche parts for your vehicle.</p>
                </motion.div>

                <motion.div
                  className="info-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="info-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <polyline points="9 12 11 14 15 10"/>
                    </svg>
                  </div>
                  <h3>Certified Pre-Owned</h3>
                  <p>Quality assured pre-owned Porsche vehicles with warranty.</p>
                </motion.div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Dealers
