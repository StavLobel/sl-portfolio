import { useInView } from "react-intersection-observer";
import { useLinkedInProfile } from "@/hooks/useLinkedIn";
import { Loader2 } from "lucide-react";

export const HeroSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { data: linkedinProfilePic, isLoading: isLinkedInLoading } = useLinkedInProfile();

  // Use LinkedIn profile picture if available, otherwise fallback to initials
  const profileImageSrc = linkedinProfilePic || 'https://ui-avatars.com/api/?name=Stav+Lobel&background=10b981&color=ffffff&size=320&bold=true&font-size=0.4';

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
                {isLinkedInLoading ? (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <img
                    src={profileImageSrc}
                    alt="Stav Lobel"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if LinkedIn image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://ui-avatars.com/api/?name=Stav+Lobel&background=10b981&color=ffffff&size=320&bold=true&font-size=0.4';
                    }}
                  />
                )}
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