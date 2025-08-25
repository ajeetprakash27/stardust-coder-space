import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Initial states
    gsap.set([headlineRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    });

    gsap.set(splineRef.current, {
      opacity: 0,
      x: 100
    });

    // Animate elements
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power3.out"
    }, "-=0.7")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5")
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      duration: 1.5,
      ease: "power3.out"
    }, "-=1");

    // Floating background elements
    gsap.to('.hero-orb', {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: {
        each: 1,
        from: "random"
      }
    });

    // CTA hover animation
    const ctaElement = ctaRef.current;
    if (ctaElement) {
      ctaElement.addEventListener('mouseenter', () => {
        gsap.to(ctaElement, {
          scale: 1.05,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });

      ctaElement.addEventListener('mouseleave', () => {
        gsap.to(ctaElement, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });
    }

  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Spline 3D */}
      <div 
        ref={splineRef}
        className="absolute inset-0 w-full h-full"
      >
        <iframe 
          src='https://my.spline.design/orb-LAzdoFqbWcOfPLInjHj366D5/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="pointer-events-none"
        />
      </div>

      {/* Floating Background Orbs */}
      <div className="absolute inset-0">
        <div className="hero-orb floating-orb w-40 h-40 top-1/4 left-1/6 bg-gradient-cyber opacity-10"></div>
        <div className="hero-orb floating-orb w-32 h-32 top-3/4 right-1/4 bg-gradient-secondary opacity-15"></div>
        <div className="hero-orb floating-orb w-24 h-24 top-1/2 right-1/6 bg-gradient-primary opacity-20"></div>
        <div className="hero-orb floating-orb w-28 h-28 bottom-1/4 left-1/3 bg-accent-pink opacity-10"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div 
          ref={headlineRef}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
            Hi, I'm <span className="bg-gradient-cyber bg-clip-text text-transparent">Milad</span>
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-muted-foreground">
            Web Developer
          </h2>
        </div>

        <div 
          ref={subtitleRef}
          className="mb-12"
        >
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-text-secondary leading-relaxed">
            Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
          </p>
        </div>

        <button
          ref={ctaRef}
          onClick={scrollToProjects}
          className="glow-button text-lg px-8 py-4 font-semibold relative overflow-hidden group"
        >
          <span className="relative z-10">Hire Me</span>
          <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;