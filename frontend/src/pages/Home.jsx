import { useState } from 'react'
import Header from '../components/Header/Header'
import HeroBanner from '../components/HeroBanner/HeroBanner'
import LatestModels from '../components/LatestModels/LatestModels'
import ModelShowcase from '../components/ModelShowcase/ModelShowcase'
import FindStore from '../components/FindStore/FindStore'
import DiscoverSection from '../components/DiscoverSection/DiscoverSection'
import Footer from '../components/Footer/Footer'

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <div className="home-page">
      <Header darkMode={isDarkMode} />
      <main>
        <HeroBanner />
        <LatestModels />
        <ModelShowcase onDarkModeChange={setIsDarkMode} />
        <FindStore />
        <DiscoverSection />
      </main>
      <Footer />
    </div>
  )
}

export default Home
