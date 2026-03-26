import HeroSection       from '../components/home/HeroSection';
import FeaturesSection   from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import CategoriesSection from '../components/home/CategoriesSection';
import CtaSection        from '../components/home/CtaSection';

export default function Accueil() {
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
