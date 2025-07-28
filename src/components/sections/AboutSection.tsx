import { useInView } from "react-intersection-observer";
import { Download } from "lucide-react";

export const AboutSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/stav-lobel-resume.pdf';
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
                When I'm not developing automation solutions, you'll find me exploring artificial 
                intelligence and machine learning technologies, contributing to innovative projects, 
                and staying at the forefront of industry trends. I'm passionate about leveraging 
                technology to solve real-world problems and am always eager to take on new challenges 
                that push the boundaries of what's possible.
              </p>

              <div className="pt-6 flex justify-center">
                <button
                  onClick={handleDownloadResume}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Resume (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};