import { useInView } from "react-intersection-observer";
import { Mail, Phone, Linkedin, ExternalLink } from "lucide-react";
export const ContactSection = () => {
  const {
    ref,
    inView
  } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const contactItems = [{
    icon: Mail,
    label: "Email",
    value: "stav.lobel@email.com",
    link: "mailto:stav.lobel@email.com"
  }, {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567"
  }, {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/stavlobel",
    link: "https://linkedin.com/in/stavlobel"
  }];
  return <section id="contact" ref={ref} className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className={`text-center space-y-12 ${inView ? "fade-in visible" : "fade-in"}`}>
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Get In <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Touch</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/70 mx-auto rounded-full"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. 
              Let's connect and discuss how we can work together!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactItems.map((item, index) => {
            const IconComponent = item.icon;
            return <a key={item.label} href={item.link} className={`portfolio-card group block ${inView ? "fade-in visible" : "fade-in"}`} style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{item.label}</h3>
                      <p className="text-muted-foreground group-hover:text-primary transition-colors flex items-center justify-center gap-2">
                        {item.value}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                    </div>
                  </div>
                </a>;
          })}
          </div>

          
        </div>
      </div>
    </section>;
};