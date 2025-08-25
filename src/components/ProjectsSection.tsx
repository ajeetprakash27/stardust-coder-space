import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

// Import project images
import project1 from '../assets/project-1.jpg';
import project2 from '../assets/project-2.jpg';
import project3 from '../assets/project-3.jpg';
import project4 from '../assets/project-4.jpg';
import project5 from '../assets/project-5.jpg';
import project6 from '../assets/project-6.jpg';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "Gaming Universe",
      description: "Immersive gaming platform with 3D characters and interactive UI elements.",
      image: project1,
      tech: ["React", "Three.js", "GSAP", "TypeScript"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: 2,
      title: "Neural Network",
      description: "AI-powered analytics dashboard with real-time data visualization.",
      image: project2,
      tech: ["Next.js", "D3.js", "Python", "WebGL"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: 3,
      title: "Anime Portfolio",
      description: "Creative portfolio featuring animated characters and smooth transitions.",
      image: project3,
      tech: ["Vue.js", "Anime.js", "Sass", "Node.js"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: 4,
      title: "AuthKit Pro",
      description: "Modern authentication system with advanced security features.",
      image: project4,
      tech: ["React", "Firebase", "JWT", "Material-UI"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: 5,
      title: "3D Email Service",
      description: "Interactive email platform with 3D elements and smooth animations.",
      image: project5,
      tech: ["React", "Spline", "Node.js", "MongoDB"],
      demoUrl: "#",
      codeUrl: "#"
    },
    {
      id: 6,
      title: "NFT Marketplace",
      description: "Cutting-edge NFT trading platform with immersive 3D previews.",
      image: project6,
      tech: ["React", "Web3", "Solidity", "IPFS"],
      demoUrl: "#",
      codeUrl: "#"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (section && container) {
      // Section title animation
      gsap.fromTo('.projects-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Project cards stagger animation
      gsap.fromTo('.project-card',
        {
          y: 100,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Hover effects for project cards
      document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
          
          gsap.to(card.querySelector('.project-image'), {
            scale: 1.1,
            duration: 0.5,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
          
          gsap.to(card.querySelector('.project-image'), {
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        });
      });
    }
  }, []);

  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="floating-orb w-80 h-80 top-1/3 left-1/4 bg-gradient-cyber"></div>
        <div className="floating-orb w-60 h-60 bottom-1/4 right-1/6 bg-gradient-secondary" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="projects-title text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="bg-gradient-cyber bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A showcase of my latest work, featuring cutting-edge technologies and immersive user experiences.
          </p>
        </div>

        {/* Projects Grid */}
        <div 
          ref={containerRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card glass rounded-xl overflow-hidden hover-lift cursor-pointer group"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.demoUrl}
                    className="p-2 bg-primary/90 text-primary-foreground rounded-lg backdrop-blur-sm hover:bg-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href={project.codeUrl}
                    className="p-2 bg-secondary/90 text-secondary-foreground rounded-lg backdrop-blur-sm hover:bg-secondary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;