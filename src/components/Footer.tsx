import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;

    if (footer) {
      // Footer slide-up animation
      gsap.fromTo(footer,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating particles animation
      gsap.to('.footer-particle', {
        y: -15,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
          each: 0.5,
          from: "random"
        }
      });

      // Social icons hover animation
      document.querySelectorAll('.footer-social').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.1,
            y: -3,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        });

        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        });
      });
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative py-16 bg-background-secondary overflow-hidden"
    >
      {/* Floating Background Particles */}
      <div className="absolute inset-0">
        <div className="footer-particle floating-orb w-16 h-16 top-1/4 left-1/6 bg-gradient-primary opacity-10"></div>
        <div className="footer-particle floating-orb w-12 h-12 top-3/4 right-1/4 bg-gradient-secondary opacity-15"></div>
        <div className="footer-particle floating-orb w-20 h-20 top-1/2 left-1/3 bg-gradient-cyber opacity-8"></div>
        <div className="footer-particle floating-orb w-14 h-14 bottom-1/4 right-1/6 bg-accent-purple opacity-12"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="text-center md:text-left">
            <button
              onClick={scrollToTop}
              className="text-3xl font-bold mb-2 hover:scale-105 transition-transform duration-300"
            >
              <span className="bg-gradient-cyber bg-clip-text text-transparent">
                MiladiCode
              </span>
            </button>
            <p className="text-muted-foreground text-sm">
              Creative Developer & Digital Artist
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center">
            <nav className="flex flex-wrap justify-center space-x-8 mb-4">
              {['about', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 capitalize text-sm font-medium"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social p-3 glass rounded-lg hover:bg-primary/10 transition-colors duration-300"
              >
                <Github size={20} className="text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social p-3 glass rounded-lg hover:bg-primary/10 transition-colors duration-300"
              >
                <Linkedin size={20} className="text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center space-x-2">
            <span>&copy; 2024 MiladiCode. Made with</span>
            <Heart size={16} className="text-red-500 animate-pulse" />
            <span>and lots of caffeine ☕</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;