import { Link } from 'react-router-dom'
import './Footer.css'

const footerLinks = {
  models: [
    { name: '911', link: '/build?model=911' },
    { name: '718', link: '/build?model=718' },
    { name: 'Taycan', link: '/build?model=Taycan' },
    { name: 'Panamera', link: '/build?model=Panamera' },
    { name: 'Macan', link: '/build?model=Macan' },
    { name: 'Cayenne', link: '/build?model=Cayenne' }
  ],
  services: [
    { name: 'Porsche Service', link: '/service' },
    { name: 'Porsche Approved', link: '/approved' },
    { name: 'Tequipment', link: '/tequipment' },
    { name: 'Accessories', link: '/accessories' }
  ],
  experience: [
    { name: 'Travel Experience', link: '/travel' },
    { name: 'Motorsport', link: '/motorsport' },
    { name: 'Porsche Museum', link: '/museum' },
    { name: 'Driving School', link: '/driving-school' }
  ],
  support: [
    { name: 'Contact Us', link: '/contact' },
    { name: 'Find a Dealer', link: '/dealers' },
    { name: 'FAQ', link: '/faq' },
    { name: 'Careers', link: '/careers' }
  ]
}

const socialLinks = [
  { name: 'Facebook', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
  { name: 'Instagram', icon: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01' },
  { name: 'YouTube', icon: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z' },
  { name: 'LinkedIn', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z' }
]

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <svg viewBox="0 0 100 80" className="footer-logo" aria-label="Porsche">
              <g fill="currentColor">
                <path d="M50 0C22.4 0 0 17.9 0 40s22.4 40 50 40 50-17.9 50-40S77.6 0 50 0zm0 76C24.6 76 4 60 4 40S24.6 4 50 4s46 16 46 36-20.6 36-46 36z"/>
                <path d="M50 8C26.8 8 8 22.3 8 40s18.8 32 42 32 42-14.3 42-32S73.2 8 50 8zm0 60c-21 0-38-12.5-38-28s17-28 38-28 38 12.5 38 28-17 28-38 28z"/>
                <text x="50" y="48" textAnchor="middle" fontSize="20" fontWeight="700" fontFamily="Arial, sans-serif">PORSCHE</text>
              </g>
            </svg>
            <p className="footer-tagline">There is no substitute.</p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-column">
              <h4>Models</h4>
              <ul>
                {footerLinks.models.map((link) => (
                  <li key={link.name}>
                    <Link to={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link to={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Experience</h4>
              <ul>
                {footerLinks.experience.map((link) => (
                  <li key={link.name}>
                    <Link to={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link to={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-social">
          <span>Follow Porsche</span>
          <div className="social-links">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={`https://${social.name.toLowerCase()}.com/porsche`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={social.name}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/cookies">Cookie Settings</Link>
            <Link to="/legal">Legal Notice</Link>
          </div>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Dr. Ing. h.c. F. Porsche AG. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
