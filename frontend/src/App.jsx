import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'

const App = () => {
  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </div>
  )
}

export default App
