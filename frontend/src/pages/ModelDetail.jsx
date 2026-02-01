import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './ModelDetail.css'

const modelData = {
  '911': {
    name: 'Porsche 911',
    tagline: 'The icon. Timeless machine.',
    description: 'The 911 is the heart of our brand. For over 60 years, we have been refining an icon that continues to set the benchmark for sports cars worldwide. Every curve, every line, every detail has been perfected to deliver an unparalleled driving experience.',
    startingPrice: '$106,100',
    heroImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1920&h=1080&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-sports-car-speeding-on-a-highway-34563-large.mp4',
    specs: {
      power: '379 hp',
      acceleration: '4.0 sec',
      topSpeed: '182 mph',
      engine: '3.0L Twin-Turbo Flat-6'
    },
    gallery: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop'
    ],
    features: [
      'Porsche Active Suspension Management (PASM)',
      'Sport Chrono Package',
      'Porsche Torque Vectoring Plus (PTV Plus)',
      'LED Matrix Headlights',
      'Bose Surround Sound System',
      'Adaptive Cruise Control'
    ]
  },
  '718': {
    name: 'Porsche 718',
    tagline: 'Mid-engine. Pure driving.',
    description: 'The 718 Boxster and 718 Cayman represent the purest form of driving pleasure. With the engine positioned in the middle, these sports cars deliver exceptional balance and agility that must be experienced to be believed.',
    startingPrice: '$63,400',
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=1080&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-driving-on-a-mountain-road-4126-large.mp4',
    specs: {
      power: '300 hp',
      acceleration: '4.9 sec',
      topSpeed: '170 mph',
      engine: '2.0L Turbo Flat-4'
    },
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop'
    ],
    features: [
      'Mid-Engine Layout',
      'Sport Chrono Package',
      'Porsche Stability Management (PSM)',
      'Bi-Xenon Headlights',
      'Touch Display Navigation',
      'Parking Sensors'
    ]
  },
  'taycan': {
    name: 'Porsche Taycan',
    tagline: 'Soul, electrified.',
    description: 'The Taycan is our first all-electric sports car and represents the future of the Porsche brand. With breathtaking acceleration, innovative technology, and the unmistakable Porsche DNA, the Taycan proves that electrification and driving pleasure go hand in hand.',
    startingPrice: '$86,700',
    heroImage: 'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=1920&h=1080&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-drifting-on-a-track-34606-large.mp4',
    specs: {
      power: '402 hp',
      acceleration: '5.1 sec',
      topSpeed: '143 mph',
      engine: 'Dual Electric Motors'
    },
    gallery: [
      'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1619767886558-efdc259b6e09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop'
    ],
    features: [
      '800-Volt Architecture',
      'Porsche Recuperation Management',
      'Performance Battery Plus',
      'Porsche Electric Sport Sound',
      'Adaptive Air Suspension',
      'DC Fast Charging Capability'
    ]
  },
  'panamera': {
    name: 'Porsche Panamera',
    tagline: 'The sports car for four.',
    description: 'The Panamera combines the soul of a sports car with the comfort and practicality of a luxury sedan. With four doors and four seats, it offers an uncompromising driving experience for those who refuse to choose between performance and everyday usability.',
    startingPrice: '$92,400',
    heroImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&h=1080&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-car-traveling-on-a-highway-at-sunset-34563-large.mp4',
    specs: {
      power: '325 hp',
      acceleration: '5.3 sec',
      topSpeed: '164 mph',
      engine: '2.9L Twin-Turbo V6'
    },
    gallery: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=800&h=600&fit=crop'
    ],
    features: [
      'Rear-Axle Steering',
      'Porsche Dynamic Chassis Control',
      'Adaptive Air Suspension',
      'Burmester High-End Sound System',
      'Ambient Lighting',
      'Panoramic Roof System'
    ]
  },
  'macan': {
    name: 'Porsche Macan',
    tagline: 'Life, intensified.',
    description: 'The Macan is the sports car of compact SUVs. Combining everyday practicality with genuine Porsche performance, it delivers an exhilarating driving experience whether on winding mountain roads or urban streets.',
    startingPrice: '$60,900',
    heroImage: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1920&h=1080&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-driving-in-the-countryside-4125-large.mp4',
    specs: {
      power: '261 hp',
      acceleration: '6.2 sec',
      topSpeed: '144 mph',
      engine: '2.0L Turbo Inline-4'
    },
    gallery: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop'
    ],
    features: [
      'Porsche Traction Management (PTM)',
      'Sport Chrono Package',
      'Lane Change Assist',
      'Panoramic Roof',
      'Power Tailgate',
      'Connect Plus Module'
    ]
  },
  'cayenne': {
    name: 'Porsche Cayenne',
    tagline: 'The sports car of SUVs.',
    description: 'The Cayenne proves that a true sports car can have the space and versatility of an SUV. With powerful engines, sophisticated chassis technology, and luxurious appointments, it delivers Porsche performance in a package that can handle any adventure.',
    startingPrice: '$76,550',
    heroImage: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=1920&h=1080&fit=crop',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-suv-car-driving-fast-34564-large.mp4',
    specs: {
      power: '348 hp',
      acceleration: '5.9 sec',
      topSpeed: '152 mph',
      engine: '3.0L Turbo V6'
    },
    gallery: [
      'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop'
    ],
    features: [
      'Porsche Traction Management (PTM)',
      'Adaptive Air Suspension',
      'Rear-Axle Steering',
      'Night Vision Assist',
      'Head-Up Display',
      'Soft-Close Doors'
    ]
  }
}

function ModelDetail() {
  const { modelName } = useParams()
  const model = modelData[modelName?.toLowerCase()]

  if (!model) {
    return (
      <div className="model-detail-page">
        <Header />
        <main className="model-not-found">
          <h1>Model Not Found</h1>
          <p>The model you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">Return Home</Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="model-detail-page">
      <Header darkMode />

      <main>
        {/* Hero Section with Video */}
        <section className="model-hero">
          <video
            className="model-hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster={model.heroImage}
          >
            <source src={model.video} type="video/mp4" />
          </video>
          <div className="model-hero-overlay" />
          <motion.div
            className="model-hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>{model.name}</h1>
            <p className="model-tagline">{model.tagline}</p>
            <div className="model-hero-actions">
              <Link to={`/build?model=${modelName}`} className="btn btn-primary">
                Build Your Own
              </Link>
              <a href="#specs" className="btn btn-outline hero-btn-outline">
                View Specs
              </a>
            </div>
          </motion.div>
          <motion.div
            className="model-price-badge"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span>Starting at</span>
            <strong>{model.startingPrice}</strong>
          </motion.div>
        </section>

        {/* Description Section */}
        <section className="model-description">
          <div className="container">
            <motion.div
              className="description-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>The Legend Continues</h2>
              <p>{model.description}</p>
            </motion.div>
          </div>
        </section>

        {/* Specs Section */}
        <section id="specs" className="model-specs">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Performance Specifications
            </motion.h2>
            <div className="specs-grid">
              <motion.div
                className="spec-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <span className="spec-value">{model.specs.power}</span>
                <span className="spec-label">Max Power</span>
              </motion.div>
              <motion.div
                className="spec-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="spec-value">{model.specs.acceleration}</span>
                <span className="spec-label">0-60 mph</span>
              </motion.div>
              <motion.div
                className="spec-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <span className="spec-value">{model.specs.topSpeed}</span>
                <span className="spec-label">Top Speed</span>
              </motion.div>
              <motion.div
                className="spec-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <span className="spec-value">{model.specs.engine}</span>
                <span className="spec-label">Engine</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="model-gallery">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Gallery
            </motion.h2>
            <div className="gallery-grid">
              {model.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  className="gallery-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <img src={image} alt={`${model.name} view ${index + 1}`} loading="lazy" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="model-features">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Key Features
            </motion.h2>
            <div className="features-grid">
              {model.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="model-cta">
          <div className="container">
            <motion.div
              className="cta-content"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2>Ready to Experience the {model.name}?</h2>
              <p>Configure your dream car or schedule a test drive today.</p>
              <div className="cta-buttons">
                <Link to={`/build?model=${modelName}`} className="btn btn-primary">
                  Build Your {model.name.split(' ')[1]}
                </Link>
                <Link to="/dealers" className="btn btn-outline cta-outline">
                  Find a Dealer
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default ModelDetail
