import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Menu from '../Menu/Menu'
import './Header.css'

function Header({ darkMode = false }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className={`header ${darkMode ? 'header-dark' : ''}`}>
        <div className="header-container">
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span className="menu-text">Menu</span>
          </button>

          <Link to="/" className="logo">
            <svg viewBox="0 0 100 80" className="porsche-logo" aria-label="Porsche">
              <g fill="currentColor">
                <path d="M50 0C22.4 0 0 17.9 0 40s22.4 40 50 40 50-17.9 50-40S77.6 0 50 0zm0 76C24.6 76 4 60 4 40S24.6 4 50 4s46 16 46 36-20.6 36-46 36z"/>
                <path d="M50 8C26.8 8 8 22.3 8 40s18.8 32 42 32 42-14.3 42-32S73.2 8 50 8zm0 60c-21 0-38-12.5-38-28s17-28 38-28 38 12.5 38 28-17 28-38 28z"/>
                <text x="50" y="48" textAnchor="middle" fontSize="20" fontWeight="700" fontFamily="Arial, sans-serif">PORSCHE</text>
              </g>
            </svg>
          </Link>

          <div className="header-actions">
            <Link to="/login" className="header-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

export default Header
