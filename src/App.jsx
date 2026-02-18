import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./pages/Accueil";
import Footer from "./components/UI/Footer";
import ResetPasswordPage from './Pages/ResetPasswordPage';
import ProfilePage from "./Pages/ProfilePage";
import Calculateur from "./pages/Calculateur";
import Challenges from "./pages/Challenges";
import Login from "./Pages/Login";
import Apropos from "./pages/Apropos";
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
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
              <Route path="/profil" element={<ProfilePage />} />
              <Route path="/calculateur" element={<Calculateur />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<Apropos />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
              <Route path="/reset-password" element={<ResetPasswordPage/>} />
              <Route
                path="/edit-profile"
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
