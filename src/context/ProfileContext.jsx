import { createContext, useState } from "react";

export const ProfileContext = createContext(null);

const ProfileProvider = ({ children }) => {
  const [user,setUser] = useState({
    firstName: "Alex",
    lastName: "Martin",
    email: "alex.martin@email.com",
    level: 3,
    points: 1250,
  });
  
  const monthlyData = [
    { month: "Jan", emissions: 850 },
    { month: "Fév", emissions: 820 },
    { month: "Mar", emissions: 780 },
    { month: "Avr", emissions: 720 },
    { month: "Mai", emissions: 680 },
    { month: "Jun", emissions: 650 },
    { month: "Jul", emissions: 600 },
    { month: "Aoû", emissions: 580 },
  ];

  const badges = [
    { name: "Éco-débutant", icon: "🌱", date: "Mars 2024", earned: true },
    { name: "Cycliste urbain", icon: "🚴", date: "Avril 2024", earned: true },
    { name: "Végétarien", icon: "🥗", date: "Mai 2024", earned: true },
    { name: "Économe", icon: "💡", date: "Juin 2024", earned: true },
    { name: "Zéro déchet", icon: "♻️", date: "-", earned: false },
    { name: "Champion", icon: "🏆", date: "-", earned: false },
    { name: "Ambassadeur", icon: "⭐", date: "-", earned: false },
    { name: "Légende", icon: "👑", date: "-", earned: false },
  ];

  const goals = [
    {
      title: "Réduire de 30% mes émissions",
      progress: 65,
      target: "Décembre 2025",
    },
    { title: "Compléter 20 challenges", progress: 60, target: "Fin d'année" },
    {
      title: "Passer sous 500kg CO₂/mois",
      progress: 80,
      target: "Septembre 2025",
    },
  ];

  const recentActivities = [
    {
      title: "Challenge 'Semaine sans voiture' commencé",
      date: "Il y a 2 jours",
      icon: "🚴",
    },
    { title: "Badge 'Économe' débloqué", date: "Il y a 5 jours", icon: "💡" },
    {
      title: "Nouvelle empreinte calculée: 650kg CO₂",
      date: "Il y a 1 semaine",
      icon: "📊",
    },
    {
      title: "Challenge 'Lundi vert' terminé",
      date: "Il y a 2 semaines",
      icon: "🥗",
    },
  ];
  return (
    <ProfileContext.Provider value={{user,setUser, monthlyData, badges, goals, recentActivities}}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
