import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './RaceCalendar.css'

const races = [
  {
    id: 1,
    series: 'Porsche Carrera Cup',
    event: 'Season Opener',
    location: 'Sebring International Raceway',
    city: 'Sebring, FL',
    date: '2026-03-14',
    endDate: '2026-03-16',
    status: 'upcoming'
  },
  {
    id: 2,
    series: 'IMSA WeatherTech SportsCar Championship',
    event: '12 Hours of Sebring',
    location: 'Sebring International Raceway',
    city: 'Sebring, FL',
    date: '2026-03-15',
    endDate: '2026-03-15',
    status: 'upcoming'
  },
  {
    id: 3,
    series: 'Porsche Carrera Cup',
    event: 'Round 2',
    location: 'Long Beach Street Circuit',
    city: 'Long Beach, CA',
    date: '2026-04-18',
    endDate: '2026-04-20',
    status: 'upcoming'
  },
  {
    id: 4,
    series: 'IMSA WeatherTech SportsCar Championship',
    event: 'Grand Prix of Long Beach',
    location: 'Long Beach Street Circuit',
    city: 'Long Beach, CA',
    date: '2026-04-19',
    endDate: '2026-04-19',
    status: 'upcoming'
  },
  {
    id: 5,
    series: 'Porsche Sprint Challenge',
    event: 'Spring Classic',
    location: 'Laguna Seca',
    city: 'Monterey, CA',
    date: '2026-05-02',
    endDate: '2026-05-04',
    status: 'upcoming'
  },
  {
    id: 6,
    series: 'FIA World Endurance Championship',
    event: '6 Hours of Spa',
    location: 'Circuit de Spa-Francorchamps',
    city: 'Spa, Belgium',
    date: '2026-05-10',
    endDate: '2026-05-10',
    status: 'upcoming'
  },
  {
    id: 7,
    series: 'Porsche Carrera Cup',
    event: 'Mid-Season Championship',
    location: 'Road America',
    city: 'Elkhart Lake, WI',
    date: '2026-06-06',
    endDate: '2026-06-08',
    status: 'upcoming'
  },
  {
    id: 8,
    series: 'FIA World Endurance Championship',
    event: '24 Hours of Le Mans',
    location: 'Circuit de la Sarthe',
    city: 'Le Mans, France',
    date: '2026-06-14',
    endDate: '2026-06-15',
    featured: true,
    status: 'upcoming'
  },
  {
    id: 9,
    series: 'IMSA WeatherTech SportsCar Championship',
    event: 'Sahlen\'s Six Hours',
    location: 'Watkins Glen International',
    city: 'Watkins Glen, NY',
    date: '2026-06-28',
    endDate: '2026-06-29',
    status: 'upcoming'
  },
  {
    id: 10,
    series: 'Porsche Carrera Cup',
    event: 'Summer Series',
    location: 'Canadian Tire Motorsport Park',
    city: 'Bowmanville, ON',
    date: '2026-07-11',
    endDate: '2026-07-13',
    status: 'upcoming'
  }
]

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function RaceCalendar() {
  const [selectedSeries, setSelectedSeries] = useState('all')

  const series = ['all', ...new Set(races.map(r => r.series))]

  const filteredRaces = selectedSeries === 'all'
    ? races
    : races.filter(r => r.series === selectedSeries)

  const groupedByMonth = filteredRaces.reduce((acc, race) => {
    const date = new Date(race.date)
    const monthYear = `${months[date.getMonth()]} ${date.getFullYear()}`
    if (!acc[monthYear]) acc[monthYear] = []
    acc[monthYear].push(race)
    return acc
  }, {})

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatDateRange = (start, end) => {
    if (start === end) return formatDate(start)
    return `${formatDate(start)} - ${formatDate(end)}`
  }

  return (
    <div className="race-calendar-page">
      <Header />

      <main>
        <section className="calendar-hero">
          <div className="container">
            <motion.div
              className="calendar-hero-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>Race Calendar 2026</h1>
              <p>Follow Porsche Motorsport around the world</p>
            </motion.div>
          </div>
        </section>

        <section className="calendar-filters">
          <div className="container">
            <div className="filter-wrapper">
              <label>Filter by Series:</label>
              <select
                value={selectedSeries}
                onChange={(e) => setSelectedSeries(e.target.value)}
              >
                {series.map(s => (
                  <option key={s} value={s}>
                    {s === 'all' ? 'All Series' : s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="calendar-content">
          <div className="container">
            {Object.entries(groupedByMonth).map(([month, monthRaces]) => (
              <motion.div
                key={month}
                className="month-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="month-title">{month}</h2>
                <div className="races-list">
                  {monthRaces.map((race, index) => (
                    <motion.div
                      key={race.id}
                      className={`race-card ${race.featured ? 'featured' : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="race-date">
                        <span className="date-day">{new Date(race.date).getDate()}</span>
                        <span className="date-month">{months[new Date(race.date).getMonth()].substring(0, 3)}</span>
                      </div>
                      <div className="race-info">
                        <span className="race-series">{race.series}</span>
                        <h3 className="race-event">{race.event}</h3>
                        <div className="race-location">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          <span>{race.location}, {race.city}</span>
                        </div>
                      </div>
                      <div className="race-meta">
                        <span className="race-dates">{formatDateRange(race.date, race.endDate)}</span>
                        {race.featured && <span className="featured-badge">Featured</span>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {filteredRaces.length === 0 && (
              <div className="no-races">
                <p>No races found for the selected series.</p>
              </div>
            )}
          </div>
        </section>

        <section className="calendar-cta">
          <div className="container">
            <motion.div
              className="cta-content"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2>Experience Porsche Motorsport Live</h2>
              <p>Join us trackside for the ultimate motorsport experience</p>
              <Link to="/motorsport" className="btn btn-primary">
                View Experiences
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default RaceCalendar
