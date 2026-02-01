import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BuildYourOwn from './pages/BuildYourOwn'
import Travel from './pages/Travel'
import TravelDetail from './pages/TravelDetail'
import Motorsport from './pages/Motorsport'
import ExperienceDetail from './pages/ExperienceDetail'
import RaceCalendar from './pages/RaceCalendar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import ModelDetail from './pages/ModelDetail'
import Contact from './pages/Contact'
import Museum from './pages/Museum'
import DrivingSchool from './pages/DrivingSchool'
import Dealers from './pages/Dealers'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/build" element={<BuildYourOwn />} />
      <Route path="/model/:modelName" element={<ModelDetail />} />
      <Route path="/travel" element={<Travel />} />
      <Route path="/travel/:destinationId" element={<TravelDetail />} />
      <Route path="/motorsport" element={<Motorsport />} />
      <Route path="/motorsport/calendar" element={<RaceCalendar />} />
      <Route path="/motorsport/:experienceId" element={<ExperienceDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/account" element={<Account />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/museum" element={<Museum />} />
      <Route path="/driving-school" element={<DrivingSchool />} />
      <Route path="/dealers" element={<Dealers />} />
      {/* Service pages - redirect to main for now */}
      <Route path="/service" element={<Home />} />
      <Route path="/approved" element={<Home />} />
      <Route path="/accessories" element={<Home />} />
      <Route path="/tequipment" element={<Home />} />
    </Routes>
  )
}

export default App
