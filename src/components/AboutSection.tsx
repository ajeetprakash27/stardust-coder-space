import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const skills = skillsRef.current;

    if (section && image && content && skills) {
      // Section entrance animation
      gsap.fromTo(section, 
        {
          opacity: 0,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Image animation - slide from left with rotation
      gsap.fromTo(image,
        {
          x: -100,
          opacity: 0,
          rotation: -10
        },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: image,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Content animation - fade and slide
      gsap.fromTo(content,
        {
          x: 50,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: content,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Skills icons stagger animation
      gsap.fromTo('.skill-icon',
        {
          y: 40,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: skills,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Image hover effect
      image.addEventListener('mouseenter', () => {
        gsap.to(image, {
          scale: 1.05,
          rotation: 2,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      image.addEventListener('mouseleave', () => {
        gsap.to(image, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }
  }, []);

  const skills = [
    { name: 'HTML5', icon: '🌐' },
    { name: 'CSS3', icon: '🎨' },
    { name: 'JavaScript', icon: '⚡' },
    { name: 'React', icon: '⚛️' },
    { name: 'GSAP', icon: '🚀' },
    { name: 'Node.js', icon: '🌟' }
  ];

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="floating-orb w-60 h-60 top-1/4 right-1/4 bg-gradient-secondary"></div>
        <div className="floating-orb w-40 h-40 bottom-1/3 left-1/4 bg-gradient-primary" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile Image */}
          <div 
            ref={imageRef}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto">
              {/* Glowing Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-cyber p-1">
                <div className="w-full h-full rounded-full bg-background"></div>
              </div>
              
              {/* Profile Image */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple p-4 shadow-cyber">
                <div className="w-full h-full rounded-full bg-muted flex items-center justify-center text-6xl">
                  👨‍💻
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div 
            ref={contentRef}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                About <span className="bg-gradient-cyber bg-clip-text text-transparent">Me</span>
              </h2>
              <div className="space-y-4 text-lg text-text-secondary leading-relaxed">
                <p>
                  I'm a passionate web developer with a keen eye for creating immersive digital experiences. 
                  With expertise in modern web technologies, I bring ideas to life through clean code and innovative design.
                </p>
                <p>
                  My journey in development spans across frontend frameworks, animation libraries, and cutting-edge 
                  tools that push the boundaries of what's possible on the web.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div 
              ref={skillsRef}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold text-foreground">Tech Stack</h3>
              <div className="grid grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="skill-icon glass p-4 rounded-xl text-center hover-lift cursor-pointer group"
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <div className="text-sm font-medium text-foreground">{skill.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;