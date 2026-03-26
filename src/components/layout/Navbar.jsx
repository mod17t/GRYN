import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { LogIn, LogOut, Leaf } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const NAV_PUBLIC = [
  { label: "Accueil", to: "/" },
  { label: "À propos", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const NAV_PRIVATE = [
  { label: "Accueil", to: "/" },
  { label: "Calculateur", to: "/calculateur" },
  { label: "Challenges", to: "/challenges" },
  { label: "Profil", to: "/profil" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = isAuthenticated ? NAV_PRIVATE : NAV_PUBLIC;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 bg-white transition-shadow duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"}`}
      >
        <div className="container mx-auto px-4">
          <nav
            className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">GRYN</span>
            </Link>

            {/* Bouton menu mobile */}
            <button
              type="button"
              className="lg:hidden p-2 text-gray-600 hover:text-emerald-600 transition"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <IoMenu className="h-6 w-6" />
            </button>

            {/* Liens desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group relative text-sm font-semibold text-gray-600 hover:text-emerald-700 transition"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-emerald-600 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>

            {/* Auth desktop */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600 font-medium">
                    {user?.first_name ?? user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-red-600 transition"
                  >
                    <LogOut size={16} /> Déconnexion
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition"
                >
                  <LogIn size={16} /> Connexion
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-40 bg-black/30"
            onClick={closeMobile}
            aria-hidden="true"
          />
          <div className="fixed top-0 right-0 z-50 w-full max-w-xs h-full bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <Link
                to="/"
                onClick={closeMobile}
                className="flex items-center gap-2"
              >
                <Leaf className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-gray-900">GRYN</span>
              </Link>
              <button
                onClick={closeMobile}
                className="p-2 text-gray-600"
                aria-label="Fermer"
              >
                <IoClose className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMobile}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobile();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-medium transition"
                >
                  <LogOut size={16} /> Déconnexion
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobile}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
                >
                  <LogIn size={16} /> Connexion
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
