import { useInView } from "react-intersection-observer";
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react";

export const ContactSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "stav.lobel@email.com",
      link: "mailto:stav.lobel@email.com"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/stavlobel",
      link: "https://linkedin.com/in/stavlobel"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/stavlobel",
      link: "https://github.com/stavlobel"
    }
  ];

  return (
    <section id="contact" ref={ref} className="py-20 px-6">
      <div className="container mx-auto">
        <div className={`text-center space-y-12 ${inView ? "fade-in visible" : "fade-in"}`}>
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, 
              or just having a great conversation about technology.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactItems.map((item, index) => (
              <div 
                key={item.label}
                className={`portfolio-card group ${inView ? "fade-in visible" : "fade-in"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <a
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : '_self'}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block space-y-4 text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.value}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};