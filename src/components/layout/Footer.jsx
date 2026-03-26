import { Link }                      from 'react-router-dom';
import { Leaf, Twitter, Github, Mail } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Accueil',     to: '/'            },
  { label: 'Calculateur', to: '/calculateur'  },
  { label: 'Challenges',  to: '/challenges'   },
  { label: 'Profil',      to: '/profil'       },
];

const RESOURCE_LINKS = [
  { label: 'À propos', to: '/about'   },
  { label: 'Contact',  to: '/contact' },
];

const SOCIAL_LINKS = [
  { label: 'Twitter', icon: Twitter, href: '#' },
  { label: 'GitHub',  icon: Github,  href: '#' },
  { label: 'Email',   icon: Mail,    href: 'mailto:contact@gryn.com' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-20 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-emerald-400" />
              <span className="text-xl font-bold text-white">GRYN</span>
            </div>
            <p className="text-sm leading-relaxed">
              Suivez et réduisez votre empreinte carbone pour un avenir plus durable.
            </p>
            <p className="text-sm text-emerald-400 font-medium">Agir pour la planète 🌍</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm hover:text-emerald-400 transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Ressources</h4>
            <ul className="space-y-2">
              {RESOURCE_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm hover:text-emerald-400 transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Suivez-nous</h4>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors duration-200"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} GRYN. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
