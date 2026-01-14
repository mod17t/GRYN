import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './pages/Accueil'
import Footer from './components/UI/Footer'
import ProfilePage from './Pages/ProfilePage';


function App() {
  return (
    
    <>
      <main>
      <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/Profil" element={<ProfilePage />} />
        </Routes>
        <Footer/>
      </main>
    </>
  )
}

export default App
