import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "Modern e-commerce solution with real-time inventory management and secure payment processing.",
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    githubUrl: "https://github.com/stavlobel/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.com"
  },
  {
    id: 2,
    name: "Task Management App",
    description: "Collaborative task management tool with real-time updates and team productivity analytics.",
    techStack: ["Flutter", "Firebase", "Dart"],
    githubUrl: "https://github.com/stavlobel/task-manager",
    liveUrl: "https://task-manager-demo.com"
  },
  {
    id: 3,
    name: "Weather Analytics Dashboard",
    description: "Interactive dashboard for weather data visualization with predictive analytics and alerts.",
    techStack: ["Python", "Django", "D3.js", "TensorFlow"],
    githubUrl: "https://github.com/stavlobel/weather-dashboard",
    liveUrl: "https://weather-dashboard-demo.com"
  },
  {
    id: 4,
    name: "Social Media Aggregator",
    description: "Unified platform for managing multiple social media accounts with automated posting features.",
    techStack: ["Vue.js", "Express.js", "MongoDB", "Redis"],
    githubUrl: "https://github.com/stavlobel/social-aggregator",
    liveUrl: "https://social-aggregator-demo.com"
  },
  {
    id: 5,
    name: "AI-Powered Code Review Tool",
    description: "Intelligent code review assistant that provides suggestions and detects potential issues.",
    techStack: ["TypeScript", "OpenAI API", "Docker", "Kubernetes"],
    githubUrl: "https://github.com/stavlobel/ai-code-review",
    liveUrl: "https://ai-code-review-demo.com"
  },
  {
    id: 6,
    name: "Blockchain Voting System",
    description: "Secure and transparent voting platform built on blockchain technology for enhanced trust.",
    techStack: ["Solidity", "Web3.js", "Ethereum", "React"],
    githubUrl: "https://github.com/stavlobel/blockchain-voting",
    liveUrl: "https://blockchain-voting-demo.com"
  }
];

export const ProjectsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 px-6 bg-muted/30"
    >
      <div className="container mx-auto">
        <div className={`text-center space-y-12 ${inView ? "fade-in visible" : "fade-in"}`}>
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              My <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/70 mx-auto rounded-full"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of the projects I've worked on, showcasing different technologies and problem-solving approaches.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`portfolio-card group ${inView ? "fade-in visible" : "fade-in"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <div className="flex gap-2">
                      <a
                        href={project.githubUrl}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href={project.liveUrl}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="View live project"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="tech-badge text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};