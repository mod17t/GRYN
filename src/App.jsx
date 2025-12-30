import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './pages/Accueil'
import Footer from './components/UI/Footer'


function App() {
  return (
    <>
      <main>
      <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
        </Routes>
        <Footer/>
      </main>
    </>
  )
}

export default App
