import { useInView } from "react-intersection-observer";
import { Download } from "lucide-react";

export const AboutSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleDownloadResume = () => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = '/placeholder-resume.pdf';
    link.download = 'Stav_Lobel_Resume.pdf';
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
              <p className="text-lg leading-relaxed text-muted-foreground">
                I'm a passionate Software Engineer with a love for creating elegant solutions 
                to complex problems. With expertise in modern web technologies and a keen eye 
                for design, I build applications that are not only functional but also beautiful 
                and user-friendly.
              </p>
              
              <p className="text-lg leading-relaxed text-muted-foreground">
                When I'm not coding, you can find me exploring new technologies, contributing 
                to open-source projects, or sharing knowledge with the developer community. 
                I believe in continuous learning and staying at the forefront of technological 
                innovation.
              </p>

              <div className="pt-6">
                <button
                  onClick={handleDownloadResume}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};