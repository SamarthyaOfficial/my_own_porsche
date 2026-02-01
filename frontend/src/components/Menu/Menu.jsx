import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import './Menu.css'

const models = [
  { name: '911', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=400&h=300&fit=crop', price: 'From $106,100' },
  { name: '718', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop', price: 'From $63,400' },
  { name: 'Taycan', image: 'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=400&h=300&fit=crop', price: 'From $86,700' },
  { name: 'Panamera', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop', price: 'From $92,400' },
  { name: 'Macan', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop', price: 'From $60,900' },
  { name: 'Cayenne', image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=400&h=300&fit=crop', price: 'From $76,550' }
]

const menuItems = [
  {
    name: 'Models',
    type: 'models',
    submenu: models
  },
  {
    name: 'Services',
    type: 'links',
    submenu: [
      { name: 'Porsche Service', link: '/service' },
      { name: 'Porsche Approved', link: '/approved' },
      { name: 'Accessories', link: '/accessories' },
      { name: 'Tequipment', link: '/tequipment' }
    ]
  },
  {
    name: 'Experience',
    type: 'links',
    submenu: [
      { name: 'Travel Experience', link: '/travel' },
      { name: 'Motorsport', link: '/motorsport' },
      { name: 'Porsche Museum', link: '/museum' }
    ]
  },
  {
    name: 'Account',
    type: 'account',
    submenu: null
  }
]

function Menu({ isOpen, onClose }) {
  const [activeItem, setActiveItem] = useState(null)
  const { user, isAuthenticated, logout } = useAuth()
  const leaveTimeoutRef = useRef(null)

  const handleMouseEnter = useCallback((item) => {
    // Clear any pending leave timeout
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }
    setActiveItem(item)
  }, [])

  const handleMouseLeave = useCallback(() => {
    // Add a small delay before closing to allow moving to submenu
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveItem(null)
    }, 150)
  }, [])

  const handleSubmenuEnter = useCallback(() => {
    // Cancel the leave timeout when entering submenu
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }
  }, [])

  const handleSubmenuLeave = useCallback(() => {
    // Close submenu when leaving submenu area
    setActiveItem(null)
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.nav
            className="menu"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="menu-header">
              <button className="menu-close" onClick={onClose} aria-label="Close menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="menu-content">
              <ul className="menu-list">
                {menuItems.map((item) => (
                  <li
                    key={item.name}
                    className={`menu-item ${activeItem?.name === item.name ? 'active' : ''}`}
                    onMouseEnter={() => handleMouseEnter(item)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="menu-item-text">{item.name}</span>
                    <svg className="menu-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </li>
                ))}
              </ul>

              <AnimatePresence mode="wait">
                {activeItem && (
                  <motion.div
                    key={activeItem.name}
                    className="menu-submenu"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={handleSubmenuEnter}
                    onMouseLeave={handleSubmenuLeave}
                  >
                    {activeItem.type === 'models' && (
                      <div className="models-grid">
                        {activeItem.submenu.map((model) => (
                          <Link
                            key={model.name}
                            to={`/model/${model.name.toLowerCase()}`}
                            className="model-preview"
                            onClick={onClose}
                          >
                            <div className="model-image-wrapper">
                              <img src={model.image} alt={model.name} loading="lazy" />
                            </div>
                            <div className="model-info">
                              <h4>{model.name}</h4>
                              <span>{model.price}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {activeItem.type === 'links' && (
                      <ul className="submenu-links">
                        {activeItem.submenu.map((link) => (
                          <li key={link.name}>
                            <Link to={link.link} onClick={onClose}>
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}

                    {activeItem.type === 'account' && (
                      <div className="account-menu">
                        {isAuthenticated ? (
                          <>
                            <p className="account-greeting">Hello, {user?.name}</p>
                            <ul className="submenu-links">
                              <li><Link to="/account" onClick={onClose}>My Account</Link></li>
                              <li><Link to="/account?tab=cards" onClick={onClose}>Saved Cards</Link></li>
                              <li><Link to="/account?tab=bookings" onClick={onClose}>My Bookings</Link></li>
                              <li><Link to="/account?tab=settings" onClick={onClose}>Settings</Link></li>
                              <li><button onClick={() => { logout(); onClose(); }}>Log Out</button></li>
                            </ul>
                          </>
                        ) : (
                          <div className="account-actions">
                            <Link to="/login" className="btn btn-primary" onClick={onClose}>
                              Log In
                            </Link>
                            <Link to="/signup" className="btn btn-outline" onClick={onClose}>
                              Sign Up
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}

export default Menu
