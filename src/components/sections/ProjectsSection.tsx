import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, AlertCircle, Loader2 } from "lucide-react";
import { useGitHubRepositories } from "@/hooks/useGitHub";

export const ProjectsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { data: projects, isLoading, error } = useGitHubRepositories();

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

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading projects from GitHub...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex items-center justify-center py-12 text-center">
              <div className="space-y-4">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-destructive">Failed to load projects</h3>
                  <p className="text-muted-foreground max-w-md">{error}</p>
                  <p className="text-sm text-muted-foreground">
                    Please ensure your GitHub token is configured correctly.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Projects Grid */}
          {projects && projects.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`portfolio-card group ${inView ? "fade-in visible" : "fade-in"}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        {project.featured && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="View on GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label="View live project"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
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
          )}

          {/* No Projects State */}
          {projects && projects.length === 0 && !isLoading && !error && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No public repositories found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};