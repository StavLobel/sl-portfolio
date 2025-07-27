import { useInView } from "react-intersection-observer";
import { Download, FileText, MapPin, Building } from "lucide-react";
import { useLinkedInProfile } from "@/hooks/useLinkedInProfile";

export const AboutSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { data: linkedinProfile, isLoading: isLinkedInLoading } = useLinkedInProfile();

  const handleDownloadResume = (format: 'pdf' | 'txt') => {
    const link = document.createElement('a');
    if (format === 'pdf') {
      link.href = '/stav-lobel-resume.pdf';
      link.download = 'Stav_Lobel_Resume.pdf';
    } else {
      link.href = '/stav-lobel-resume.txt';
      link.download = 'Stav_Lobel_Resume.txt';
    }
    link.click();
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 px-6"
    >
      <div className="container mx-auto max-w-4xl">
        <div className={`text-center space-y-12 ${inView ? "fade-in visible" : "fade-in"}`}>
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              About <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/70 mx-auto rounded-full"></div>
          </div>

          <div className="portfolio-card max-w-3xl mx-auto">
            <div className="space-y-6">
              {/* LinkedIn Profile Info */}
              {!isLinkedInLoading && linkedinProfile && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    <span>{linkedinProfile.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{linkedinProfile.location}</span>
                  </div>
                </div>
              )}

              <p className="text-lg leading-relaxed text-muted-foreground">
                I'm Stav Lobel, a Software Engineer with strong technical skills and a solid foundation 
                in object-oriented programming, clean architecture, and scalable system design. My journey 
                in technology began with a fascination for how code can transform ideas into reality, and 
                that passion has only grown stronger with every project I've tackled.
              </p>
              
              <p className="text-lg leading-relaxed text-muted-foreground">
                I specialize in developing tools and automation workflows across complex environments, 
                with expertise in software engineering principles and modern development practices. My approach 
                combines technical excellence with creative problem-solving, ensuring that every system 
                I build is not only powerful but also maintainable and scalable.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                When I'm not immersed in code, you'll find me contributing to open-source projects, 
                mentoring fellow developers, or exploring emerging technologies. I believe in the 
                power of continuous learning and sharing knowledge within the developer community. 
                Every challenge is an opportunity to grow, and every project is a chance to make 
                a meaningful impact.
              </p>

              <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleDownloadResume('pdf')}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Resume (PDF)
                </button>
                <button
                  onClick={() => handleDownloadResume('txt')}
                  className="px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Download Resume (TXT)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};