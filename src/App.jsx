import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './pages/Accueil'
import Footer from './components/UI/Footer'

import ProfilePage from './Pages/ProfilePage';
import Calculateur from './pages/Calculateur';
import Challenges from './pages/Challenges';
import Login from './Pages/Login';
import Apropos from './pages/Apropos';


function App() {
  return (
    <>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/Profil" element={<ProfilePage />} />
          <Route path="/Calculateur" element={<Calculateur/>} />
          <Route path="/Challenges" element={<Challenges/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/about" element={<Apropos/>} />
        </Routes>
        <Footer />
      </main>
    </>
  )
}

export default App
