import { useInView } from "react-intersection-observer";
import { profilePictureSrc, fallbackProfilePicture } from "../../assets";

export const HeroSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
                  src={profilePictureSrc}
                  alt="Stav Lobel"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = fallbackProfilePicture;
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