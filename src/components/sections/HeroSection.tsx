import { useInView } from "react-intersection-observer";

export const HeroSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Use a reliable profile image - either from environment variable or fallback to professional avatar
  const profileImageSrc = import.meta.env.VITE_LINKEDIN_PROFILE_PIC_URL || 
    'https://ui-avatars.com/api/?name=Stav+Lobel&background=10b981&color=ffffff&size=320&bold=true&font-size=0.4';

  return (
    <section
      id="home"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 pt-20"
      style={{ background: "var(--gradient-subtle)" }}
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Photo */}
          <div className={`flex justify-center md:justify-end ${inView ? "fade-in visible" : "fade-in"}`}>
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img
                  src={profileImageSrc}
                  alt="Stav Lobel"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://ui-avatars.com/api/?name=Stav+Lobel&background=10b981&color=ffffff&size=320&bold=true&font-size=0.4';
                  }}
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </div>
          </div>

          {/* Hero Content */}
          <div className={`text-center md:text-left space-y-6 ${inView ? "fade-in visible" : "fade-in"}`}>
            <div className="space-y-2">
              <h1 className="hero-title">
                Hi, I'm Stav
              </h1>
              <p className="hero-subtitle">
                Software Engineer & AI Innovator
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              I develop cutting-edge automation solutions and intelligent systems for complex 
              engineering challenges. With a passion for innovation and clean code architecture, 
              I bridge the gap between advanced technology and practical business solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="btn-primary"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="btn-secondary"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};