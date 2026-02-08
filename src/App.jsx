import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./pages/Accueil";
import Footer from "./components/UI/Footer";
import ProfilePage from "./Pages/ProfilePage";
import Calculateur from "./pages/Calculateur";
import Challenges from "./pages/Challenges";
import Login from "./Pages/Login";
import Apropos from "./pages/Apropos";
import EditProfile from "./components/profil/editProfile";

import ProfileProvider from "./context/ProfileContext";

function App() {
  return (
    <>
      <main>
        <Navbar />
        <div className="mt-25">
          <ProfileProvider>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/Profil" element={<ProfilePage />} />
              <Route path="/Calculateur" element={<Calculateur />} />
              <Route path="/Challenges" element={<Challenges />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<Apropos />} />
              <Route
                path="/editProfile"
                element={
                  <EditProfile user={{ name: "alex", email: "mod@exemple.com" }} />
                }/>
            </Routes>
          </ProfileProvider>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default App;
