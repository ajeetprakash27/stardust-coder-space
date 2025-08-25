import { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Update page title and meta
    document.title = "Milad Abdi - Creative Developer | Portfolio";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Creative Developer specializing in immersive web experiences with React, GSAP, and 3D technologies. View my portfolio of cutting-edge projects.');
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {!isLoading && (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
          <Navigation />
          
          <main>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          
          <Footer />
        </div>
      )}
    </>
  );
};

export default Portfolio;