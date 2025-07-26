import { useInView } from "react-intersection-observer";
import { useLinkedInProfile } from "@/hooks/useLinkedIn";
import { Loader2 } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

export const HeroSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { data: linkedinProfilePic, isLoading: isLinkedInLoading, error: linkedinError } = useLinkedInProfile();

  // Use LinkedIn profile picture if available, otherwise fallback to local image
  const profileImageSrc = linkedinProfilePic && !linkedinError ? linkedinProfilePic : profilePhoto;

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
                      // Fallback to local image if LinkedIn image fails to load
                      const target = e.target as HTMLImageElement;
                      if (target.src !== profilePhoto) {
                        target.src = profilePhoto;
                      }
                    }}
                  />
                )}
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent"></div>
              
              {/* LinkedIn indicator */}
              {linkedinProfilePic && !linkedinError && !isLinkedInLoading && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
              )}
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