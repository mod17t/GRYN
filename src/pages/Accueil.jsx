import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import CategoriesSection from "../components/home/CategoriesSection";
import CtaSection from "../components/home/CtaSection";
import DashboardHome from "../components/home/DashboardHome";

export default function Accueil() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <DashboardHome />;
  }

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CategoriesSection />
      <CtaSection />
    </>
  );
}
