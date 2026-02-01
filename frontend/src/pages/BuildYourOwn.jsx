import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './BuildYourOwn.css'

const allCars = [
  // 911 variants
  { id: 1, model: '911', variant: '911 Carrera', price: 106100, bodyType: 'Coupe', year: 2024, transmission: 'PDK', drivetrain: 'RWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=500&h=375&fit=crop' },
  { id: 2, model: '911', variant: '911 Carrera S', price: 124300, bodyType: 'Coupe', year: 2024, transmission: 'PDK', drivetrain: 'RWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=500&h=375&fit=crop' },
  { id: 3, model: '911', variant: '911 Carrera 4S', price: 131400, bodyType: 'Coupe', year: 2024, transmission: 'PDK', drivetrain: 'AWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=500&h=375&fit=crop' },
  { id: 4, model: '911', variant: '911 Turbo S', price: 218400, bodyType: 'Coupe', year: 2025, transmission: 'PDK', drivetrain: 'AWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=375&fit=crop' },
  { id: 5, model: '911', variant: '911 GT3', price: 180500, bodyType: 'Coupe', year: 2025, transmission: 'Manual', drivetrain: 'RWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1619767886558-efdc259b6e09?w=500&h=375&fit=crop' },
  { id: 6, model: '911', variant: '911 Cabriolet', price: 119400, bodyType: 'Convertible', year: 2024, transmission: 'PDK', drivetrain: 'RWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&h=375&fit=crop' },

  // 718 variants
  { id: 7, model: '718', variant: '718 Boxster', price: 63400, bodyType: 'Convertible', year: 2024, transmission: 'PDK', drivetrain: 'RWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=375&fit=crop' },
  { id: 8, model: '718', variant: '718 Cayman', price: 63400, bodyType: 'Coupe', year: 2024, transmission: 'Manual', drivetrain: 'RWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=375&fit=crop' },
  { id: 9, model: '718', variant: '718 Cayman GT4', price: 104500, bodyType: 'Coupe', year: 2025, transmission: 'PDK', drivetrain: 'RWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=500&h=375&fit=crop' },

  // Taycan variants
  { id: 10, model: 'Taycan', variant: 'Taycan', price: 86700, bodyType: 'Sedan', year: 2024, transmission: 'Auto', drivetrain: 'RWD', fuelType: 'Electric', image: 'https://images.unsplash.com/photo-1619767886558-efdc259b6e09?w=500&h=375&fit=crop' },
  { id: 11, model: 'Taycan', variant: 'Taycan 4S', price: 106900, bodyType: 'Sedan', year: 2024, transmission: 'Auto', drivetrain: 'AWD', fuelType: 'Electric', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=500&h=375&fit=crop' },
  { id: 12, model: 'Taycan', variant: 'Taycan Turbo', price: 150900, bodyType: 'Sedan', year: 2025, transmission: 'Auto', drivetrain: 'AWD', fuelType: 'Electric', image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=500&h=375&fit=crop' },
  { id: 13, model: 'Taycan', variant: 'Taycan Cross Turismo', price: 96600, bodyType: 'Wagon', year: 2024, transmission: 'Auto', drivetrain: 'AWD', fuelType: 'Electric', image: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=500&h=375&fit=crop' },

  // Panamera variants
  { id: 14, model: 'Panamera', variant: 'Panamera', price: 92400, bodyType: 'Sedan', year: 2024, transmission: 'PDK', drivetrain: 'RWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=375&fit=crop' },
  { id: 15, model: 'Panamera', variant: 'Panamera 4', price: 98800, bodyType: 'Sedan', year: 2024, transmission: 'PDK', drivetrain: 'AWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=375&fit=crop' },
  { id: 16, model: 'Panamera', variant: 'Panamera E-Hybrid', price: 106600, bodyType: 'Sedan', year: 2025, transmission: 'PDK', drivetrain: 'AWD', fuelType: 'Hybrid', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&h=375&fit=crop' },

  // Macan variants
  { id: 17, model: 'Macan', variant: 'Macan', price: 60900, bodyType: 'SUV', year: 2024, transmission: 'PDK', drivetrain: 'AWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=375&fit=crop' },
  { id: 18, model: 'Macan', variant: 'Macan S', price: 69400, bodyType: 'SUV', year: 2024, transmission: 'PDK', drivetrain: 'AWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=500&h=375&fit=crop' },
  { id: 19, model: 'Macan', variant: 'Macan Electric', price: 78800, bodyType: 'SUV', year: 2025, transmission: 'Auto', drivetrain: 'AWD', fuelType: 'Electric', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=500&h=375&fit=crop' },

  // Cayenne variants
  { id: 20, model: 'Cayenne', variant: 'Cayenne', price: 76550, bodyType: 'SUV', year: 2024, transmission: 'Auto', drivetrain: 'AWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=500&h=375&fit=crop' },
  { id: 21, model: 'Cayenne', variant: 'Cayenne S', price: 91650, bodyType: 'SUV', year: 2024, transmission: 'Auto', drivetrain: 'AWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=375&fit=crop' },
  { id: 22, model: 'Cayenne', variant: 'Cayenne E-Hybrid', price: 88350, bodyType: 'SUV', year: 2025, transmission: 'Auto', drivetrain: 'AWD', fuelType: 'Hybrid', image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=500&h=375&fit=crop' },
  { id: 23, model: 'Cayenne', variant: 'Cayenne Turbo', price: 143350, bodyType: 'SUV', year: 2025, transmission: 'Auto', drivetrain: 'AWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=375&fit=crop' },
  { id: 24, model: 'Cayenne', variant: 'Cayenne Coupe', price: 81550, bodyType: 'Coupe', year: 2024, transmission: 'Auto', drivetrain: 'AWD', fuelType: 'Gasoline', image: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=500&h=375&fit=crop' }
]

const models = ['All', '911', '718', 'Taycan', 'Panamera', 'Macan', 'Cayenne']
const bodyTypes = ['All', 'Coupe', 'Convertible', 'Sedan', 'SUV', 'Wagon']
const years = ['All', '2025', '2024']
const transmissions = ['All', 'PDK', 'Manual', 'Auto']
const drivetrains = ['All', 'RWD', 'AWD']
const fuelTypes = ['All', 'Gasoline', 'Electric', 'Hybrid']

function BuildYourOwn() {
  const [searchParams] = useSearchParams()
  const initialModel = searchParams.get('model') || 'All'

  const [filters, setFilters] = useState({
    model: initialModel,
    bodyType: 'All',
    year: 'All',
    transmission: 'All',
    drivetrain: 'All',
    fuelType: 'All'
  })

  const filteredCars = useMemo(() => {
    return allCars.filter((car) => {
      if (filters.model !== 'All' && car.model !== filters.model) return false
      if (filters.bodyType !== 'All' && car.bodyType !== filters.bodyType) return false
      if (filters.year !== 'All' && car.year.toString() !== filters.year) return false
      if (filters.transmission !== 'All' && car.transmission !== filters.transmission) return false
      if (filters.drivetrain !== 'All' && car.drivetrain !== filters.drivetrain) return false
      if (filters.fuelType !== 'All' && car.fuelType !== filters.fuelType) return false
      return true
    })
  }, [filters])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      model: 'All',
      bodyType: 'All',
      year: 'All',
      transmission: 'All',
      drivetrain: 'All',
      fuelType: 'All'
    })
  }

  return (
    <div className="build-page">
      <Header />

      <main className="build-main">
        <aside className="build-sidebar">
          <div className="sidebar-header">
            <h2>Build Your Porsche</h2>
            <p>Customize your perfect vehicle</p>
          </div>

          <div className="filter-section">
            <h3>Model</h3>
            <div className="filter-options">
              {models.map((model) => (
                <button
                  key={model}
                  className={`filter-btn ${filters.model === model ? 'active' : ''}`}
                  onClick={() => handleFilterChange('model', model)}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Body Type</h3>
            <div className="filter-options">
              {bodyTypes.map((type) => (
                <button
                  key={type}
                  className={`filter-btn ${filters.bodyType === type ? 'active' : ''}`}
                  onClick={() => handleFilterChange('bodyType', type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Build Year</h3>
            <div className="filter-options">
              {years.map((year) => (
                <button
                  key={year}
                  className={`filter-btn ${filters.year === year ? 'active' : ''}`}
                  onClick={() => handleFilterChange('year', year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Transmission</h3>
            <div className="filter-options">
              {transmissions.map((trans) => (
                <button
                  key={trans}
                  className={`filter-btn ${filters.transmission === trans ? 'active' : ''}`}
                  onClick={() => handleFilterChange('transmission', trans)}
                >
                  {trans}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Drivetrain</h3>
            <div className="filter-options">
              {drivetrains.map((drive) => (
                <button
                  key={drive}
                  className={`filter-btn ${filters.drivetrain === drive ? 'active' : ''}`}
                  onClick={() => handleFilterChange('drivetrain', drive)}
                >
                  {drive}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Fuel Type</h3>
            <div className="filter-options">
              {fuelTypes.map((fuel) => (
                <button
                  key={fuel}
                  className={`filter-btn ${filters.fuelType === fuel ? 'active' : ''}`}
                  onClick={() => handleFilterChange('fuelType', fuel)}
                >
                  {fuel}
                </button>
              ))}
            </div>
          </div>

          <button className="reset-btn" onClick={resetFilters}>
            Reset All Filters
          </button>
        </aside>

        <section className="build-content">
          <div className="build-header">
            <h1>{filters.model === 'All' ? 'All Models' : filters.model}</h1>
            <span className="results-count">{filteredCars.length} vehicles available</span>
          </div>

          <div className="cars-grid">
            <AnimatePresence mode="popLayout">
              {filteredCars.map((car) => (
                <motion.div
                  key={car.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="car-card"
                >
                  <div className="car-card-image">
                    <img src={car.image} alt={car.variant} loading="lazy" />
                    <span className="car-year">{car.year}</span>
                  </div>
                  <div className="car-card-content">
                    <h3>{car.variant}</h3>
                    <div className="car-specs">
                      <span>{car.bodyType}</span>
                      <span className="dot">•</span>
                      <span>{car.transmission}</span>
                      <span className="dot">•</span>
                      <span>{car.drivetrain}</span>
                    </div>
                    <div className="car-fuel">{car.fuelType}</div>
                    <div className="car-card-footer">
                      <span className="car-price">From ${car.price.toLocaleString()}</span>
                      <button className="configure-btn">Configure</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredCars.length === 0 && (
            <div className="no-results">
              <h3>No vehicles match your criteria</h3>
              <p>Try adjusting your filters to see more options</p>
              <button className="btn btn-primary" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default BuildYourOwn
