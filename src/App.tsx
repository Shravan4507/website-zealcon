import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Grainient from './components/background/grainient'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './pages/home/home'
import Events from './pages/events/events'
import Competitions from './pages/competitions/competitions'
import Sponsors from './pages/sponsors/sponsors'
import Team from './pages/team/team'
import Join from './pages/join/join'
import Contact from './pages/contact/contact'
import Register from './pages/register/register'
import Login from './components/login/login'
import { PrivacyPolicy, TermsOfService } from './components/policy/policy'
import UserDashboard from './user/user-dashboard/user-dashboard'
import UserSignup from './user/user-signup/user-signup'
import { ToastProvider } from './components/toast/Toast'
import './App.css'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ToastProvider>
        <div className="app">
          <div className="app-background">
            <Grainient
              color1="#201d20"
              color2="#5227FF"
              color3="#000000"
              timeSpeed={0.25}
              colorBalance={0}
              warpStrength={1}
              warpFrequency={5}
              warpSpeed={2}
              warpAmplitude={50}
              blendAngle={0}
              blendSoftness={0.05}
              rotationAmount={500}
              noiseScale={2}
              grainAmount={0.1}
              grainScale={2}
              grainAnimated={false}
              contrast={1.5}
              gamma={1}
              saturation={1}
              centerX={0}
              centerY={0}
              zoom={0.9}
            />
          </div>
          <div className="app-content">
            <header className="app-header">
              <Navbar />
            </header>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/competitions" element={<Competitions />} />
                <Route path="/sponsors" element={<Sponsors />} />
                <Route path="/team" element={<Team />} />
                <Route path="/join" element={<Join />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user-signup" element={<UserSignup />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App

