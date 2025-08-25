import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set([preloaderRef.current, progressBarRef.current, logoRef.current], {
      opacity: 0
    });

    // Animate preloader entrance
    tl.to(preloaderRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    })
    .to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, 0.2)
    .to(progressBarRef.current, {
      opacity: 1,
      duration: 0.3
    }, 0.5)
    // Progress bar animation
    .to(".progress-fill", {
      width: "100%",
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        const counter = document.querySelector('.progress-counter');
        if (counter) {
          counter.textContent = `${progress}%`;
        }
      }
    })
    // Exit animation
    .to(logoRef.current, {
      scale: 0.8,
      opacity: 0.8,
      duration: 0.3,
      ease: "power2.in"
    })
    .to(progressBarRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: "power2.in"
    }, "-=0.2")
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.8,
      ease: "power2.in",
      onComplete: () => {
        onComplete();
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
      }
    });

  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-orb w-32 h-32 top-1/4 left-1/4 bg-gradient-cyber opacity-20"></div>
        <div className="floating-orb w-24 h-24 top-3/4 right-1/4 bg-gradient-secondary opacity-15" style={{animationDelay: '2s'}}></div>
        <div className="floating-orb w-20 h-20 top-1/2 left-3/4 bg-gradient-primary opacity-25" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Logo/Brand */}
      <div 
        ref={logoRef}
        className="mb-16 text-center transform scale-75"
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          <span className="loading-text">Milad</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light">
          Creative Developer
        </p>
      </div>

      {/* Progress Bar */}
      <div 
        ref={progressBarRef}
        className="w-80 md:w-96 max-w-sm"
      >
        <div className="relative h-1 bg-muted rounded-full overflow-hidden mb-4">
          <div className="progress-fill absolute top-0 left-0 h-full bg-gradient-primary rounded-full w-0 shadow-glow"></div>
        </div>
        <div className="text-center">
          <span className="progress-counter text-primary font-mono text-sm">0%</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;