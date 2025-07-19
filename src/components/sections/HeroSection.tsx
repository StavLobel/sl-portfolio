import { useInView } from "react-intersection-observer";
import profilePhoto from "@/assets/profile-photo.jpg";

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
                  src={profilePhoto}
                  alt="Stav Lobel"
                  className="w-full h-full object-cover"
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
                Software Engineer
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              Passionate about creating innovative solutions and beautiful, 
              functional software that makes a difference in people's lives.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
              >
                View My Work
              </button>
              <button 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};