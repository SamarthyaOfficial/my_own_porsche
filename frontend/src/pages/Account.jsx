import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import './Account.css'

const tabs = [
  { id: 'overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'cards', label: 'Saved Cards', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { id: 'bookings', label: 'Bookings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
]

// Mock data
const mockCards = [
  { id: 1, brand: 'Visa', last4: '4242', expiryMonth: 12, expiryYear: 2026 },
  { id: 2, brand: 'Mastercard', last4: '8888', expiryMonth: 3, expiryYear: 2025 }
]

const mockBookings = [
  { id: 1, type: 'Test Drive', model: '911 Carrera S', date: '2026-02-15', status: 'Confirmed', location: 'Porsche Center NYC' },
  { id: 2, type: 'Service', model: 'Taycan 4S', date: '2026-02-28', status: 'Pending', location: 'Porsche Service LA' },
  { id: 3, type: 'Motorsport Experience', model: 'GT3 Cup', date: '2026-03-10', status: 'Confirmed', location: 'Laguna Seca' }
]

function Account() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview')
  const { user, isAuthenticated, loading, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login')
    }
  }, [loading, isAuthenticated, navigate])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab user={user} />
      case 'cards':
        return <CardsTab cards={mockCards} />
      case 'bookings':
        return <BookingsTab bookings={mockBookings} />
      case 'settings':
        return <SettingsTab user={user} logout={logout} />
      default:
        return <OverviewTab user={user} />
    }
  }

  return (
    <div className="account-page">
      <Header />

      <main className="account-main">
        <div className="container">
          <div className="account-header">
            <h1>My Account</h1>
            <p>Welcome back, {user?.name || 'User'}</p>
          </div>

          <div className="account-layout">
            <aside className="account-sidebar">
              <nav className="account-nav">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={tab.icon} />
                    </svg>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </aside>

            <section className="account-content">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function OverviewTab({ user }) {
  return (
    <div className="tab-content">
      <h2>Overview</h2>

      <div className="overview-grid">
        <div className="overview-card">
          <h3>Profile</h3>
          <div className="profile-info">
            <div className="avatar">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="profile-name">{user?.name || 'User'}</p>
              <p className="profile-email">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
          <Link to="?tab=settings" className="edit-link">Edit Profile</Link>
        </div>

        <div className="overview-card">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <Link to="/build" className="action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20V10M18 20V4M6 20v-4"/>
              </svg>
              Configure Vehicle
            </Link>
            <Link to="/travel" className="action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
              </svg>
              Travel Experience
            </Link>
            <Link to="/motorsport" className="action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Track Days
            </Link>
          </div>
        </div>

        <div className="overview-card full-width">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            <li>
              <span className="activity-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <span>Test drive scheduled for 911 Carrera S</span>
              <span className="activity-date">2 days ago</span>
            </li>
            <li>
              <span className="activity-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 10h18M7 15h1m4 0h1"/>
                </svg>
              </span>
              <span>Payment method added</span>
              <span className="activity-date">1 week ago</span>
            </li>
            <li>
              <span className="activity-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              <span>Account created</span>
              <span className="activity-date">2 weeks ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function CardsTab({ cards }) {
  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Saved Cards</h2>
        <button className="btn btn-primary">Add New Card</button>
      </div>

      <div className="cards-list">
        {cards.map((card) => (
          <div key={card.id} className="payment-card">
            <div className="card-brand">
              {card.brand === 'Visa' ? (
                <span className="visa">VISA</span>
              ) : (
                <span className="mastercard">MC</span>
              )}
            </div>
            <div className="card-details">
              <span className="card-number">•••• •••• •••• {card.last4}</span>
              <span className="card-expiry">Expires {card.expiryMonth}/{card.expiryYear}</span>
            </div>
            <div className="card-actions">
              <button className="icon-btn" title="Edit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button className="icon-btn delete" title="Delete">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BookingsTab({ bookings }) {
  return (
    <div className="tab-content">
      <div className="tab-header">
        <h2>My Bookings</h2>
        <button className="btn btn-primary">New Booking</button>
      </div>

      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-type">
              <span className={`type-badge ${booking.type.toLowerCase().replace(' ', '-')}`}>
                {booking.type}
              </span>
            </div>
            <div className="booking-details">
              <h4>{booking.model}</h4>
              <p>{booking.location}</p>
              <span className="booking-date">{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="booking-status">
              <span className={`status-badge ${booking.status.toLowerCase()}`}>
                {booking.status}
              </span>
            </div>
            <div className="booking-actions">
              <button className="btn btn-outline">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingsTab({ user, logout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="tab-content">
      <h2>Settings</h2>

      <div className="settings-section">
        <h3>Account Information</h3>
        <form className="settings-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" defaultValue={user?.name || ''} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" defaultValue={user?.email || ''} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" placeholder="+1 (555) 000-0000" />
          </div>
          <button type="button" className="btn btn-primary">Save Changes</button>
        </form>
      </div>

      <div className="settings-section">
        <h3>Password</h3>
        <form className="settings-form">
          <div className="form-group">
            <label>Current Password</label>
            <input type="password" placeholder="Enter current password" />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" placeholder="Enter new password" />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input type="password" placeholder="Confirm new password" />
          </div>
          <button type="button" className="btn btn-primary">Update Password</button>
        </form>
      </div>

      <div className="settings-section">
        <h3>Preferences</h3>
        <div className="preference-item">
          <div>
            <h4>Email Notifications</h4>
            <p>Receive updates about your bookings and offers</p>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="preference-item">
          <div>
            <h4>Marketing Communications</h4>
            <p>Receive news about new models and events</p>
          </div>
          <label className="toggle">
            <input type="checkbox" />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section danger-zone">
        <h3>Account Actions</h3>
        <button className="btn btn-outline logout-btn" onClick={handleLogout}>
          Log Out
        </button>
        <button className="btn delete-account-btn">
          Delete Account
        </button>
      </div>
    </div>
  )
}

export default Account
