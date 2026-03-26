import { Navigate, Route, Routes } from 'react-router-dom';
import AuthProvider, { useAuth }  from './context/AuthContext';
import ProfileProvider            from './context/ProfileContext';
import Navbar                     from './components/layout/Navbar';
import Footer                     from './components/layout/Footer';
import Spinner                    from './components/ui/Spinner';
import Accueil                    from './pages/Accueil';
import Calculateur                from './pages/Calculateur';
import Challenges                 from './pages/Challenges';
import Login                      from './pages/Login';
import ProfilePage                from './pages/ProfilePage';
import EditProfile                from './pages/EditProfile';
import Apropos                    from './pages/Apropos';
import Contact                    from './pages/Contact';
import ForgotPassword             from './pages/ForgotPassword';
import ResetPassword              from './pages/ResetPassword';

// ─── Garde de route privée ────────────────────────────────────────────────────

function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <Spinner />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// ─── Routes ───────────────────────────────────────────────────────────────────

function AppRoutes() {
  return (
    <Routes>
      {/* Publiques */}
      <Route path="/"                element={<Accueil />}       />
      <Route path="/challenges"      element={<Challenges />}    />
      <Route path="/about"           element={<Apropos />}       />
      <Route path="/contact"         element={<Contact />}       />
      <Route path="/login"           element={<Login />}         />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password"  element={<ResetPassword />} />

      {/* Privées */}
      <Route path="/calculateur"  element={<PrivateRoute><Calculateur /></PrivateRoute>} />
      <Route path="/profil"       element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-12">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </ProfileProvider>
    </AuthProvider>
  );
}
