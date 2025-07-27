import { useInView } from "react-intersection-observer";
import { Download, FileText } from "lucide-react";

export const AboutSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
              <p className="text-lg leading-relaxed text-muted-foreground">
                I'm Stav Lobel, a Software Engineer with over 5 years of experience crafting 
                innovative solutions and building robust applications. My journey in technology 
                began with a fascination for how code can transform ideas into reality, and 
                that passion has only grown stronger with every project I've tackled.
              </p>
              
              <p className="text-lg leading-relaxed text-muted-foreground">
                I specialize in modern web development with expertise in React, TypeScript, 
                Node.js, and cloud technologies. My approach combines technical excellence 
                with a deep understanding of user experience, ensuring that every application 
                I build is not only powerful but also intuitive and delightful to use.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                When I'm not immersed in code, you'll find me contributing to open-source 
                projects, mentoring fellow developers, or exploring emerging technologies. 
                I believe in the power of continuous learning and sharing knowledge within 
                the developer community. Every challenge is an opportunity to grow, and every 
                project is a chance to make a meaningful impact.
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