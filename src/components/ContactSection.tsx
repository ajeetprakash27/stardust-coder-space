import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Github, Linkedin, Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;

    if (section && form) {
      // Section title animation
      gsap.fromTo('.contact-title',
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

      // Form inputs animation
      gsap.fromTo('.form-input',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: form,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Contact info animation
      gsap.fromTo('.contact-info',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.contact-info-container',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Submit button hover animation
      const submitBtn = document.querySelector('.submit-btn');
      if (submitBtn) {
        submitBtn.addEventListener('mouseenter', () => {
          gsap.to(submitBtn, {
            scale: 1.05,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        });

        submitBtn.addEventListener('mouseleave', () => {
          gsap.to(submitBtn, {
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        });
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);

    // Success animation
    gsap.fromTo('.success-message', 
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
    );

    setTimeout(() => {
      gsap.to('.success-message', { opacity: 0, duration: 0.3 });
    }, 3000);
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="floating-orb w-96 h-96 top-1/4 right-1/4 bg-gradient-primary"></div>
        <div className="floating-orb w-64 h-64 bottom-1/3 left-1/6 bg-gradient-cyber" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="contact-title text-4xl lg:text-5xl font-bold mb-6">
            Get In <span className="bg-gradient-cyber bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Drop me a message and let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="relative">
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="form-input">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="cyber-input w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              <div className="form-input">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="cyber-input w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              <div className="form-input">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="cyber-input w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn glow-button w-full flex items-center justify-center space-x-2 py-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

            {/* Success Message */}
            <div className="success-message absolute top-0 left-0 right-0 bg-primary/10 border border-primary/20 rounded-xl p-4 text-primary text-center opacity-0">
              Message sent successfully! I'll get back to you soon.
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-info-container space-y-8">
            <div className="contact-info glass p-6 rounded-xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-text-secondary">hello@miladcode.dev</p>
                </div>
              </div>
            </div>

            <div className="contact-info glass p-6 rounded-xl">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <MapPin className="text-secondary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Location</h3>
                  <p className="text-text-secondary">San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact-info">
              <h3 className="font-semibold text-foreground mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 glass rounded-xl hover-lift transition-all duration-300 group"
                >
                  <Github className="text-muted-foreground group-hover:text-primary transition-colors" size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 glass rounded-xl hover-lift transition-all duration-300 group"
                >
                  <Linkedin className="text-muted-foreground group-hover:text-primary transition-colors" size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;