import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './pages/Accueil'
import Footer from './components/UI/Footer'

import ProfilePage from './Pages/ProfilePage';
import Calculateur from './pages/Calculateur';
import Challenges from './pages/Challenges';

function App() {
  return (
    <>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/Profil" element={<ProfilePage />} />

          <Route path="/Calculateur" element={<Calculateur />} />
          <Route path="/challenges" element={<Challenges />} />

        </Routes>
        <Footer />
      </main>
    </>
  )
}

export default App
