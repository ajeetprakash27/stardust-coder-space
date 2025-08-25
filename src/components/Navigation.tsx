import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      gsap.to('.mobile-menu', {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.from('.mobile-menu-item', {
        x: -50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.1
      });
    } else {
      gsap.to('.mobile-menu', {
        opacity: 0,
        y: -20,
        duration: 0.2
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass backdrop-blur-xl' : ''
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold">
              <span className="bg-gradient-cyber bg-clip-text text-transparent">
                MC
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['about', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-foreground hover:text-primary transition-colors duration-300 capitalize font-medium"
                >
                  {item}
                </button>
              ))}
              
              {/* Social Icons */}
              <div className="flex items-center space-x-4 ml-6 border-l border-border pl-6">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg border border-border hover:bg-card transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu fixed inset-0 z-30 bg-background/95 backdrop-blur-xl md:hidden opacity-0 translate-y-[-20px]">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {['about', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="mobile-menu-item text-2xl font-light text-foreground hover:text-primary transition-colors duration-300 capitalize"
              >
                {item}
              </button>
            ))}
            
            <div className="flex items-center space-x-6 mt-8">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mobile-menu-item text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mobile-menu-item text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;