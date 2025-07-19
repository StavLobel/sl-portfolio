export const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center space-y-4">
          <div className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Stav Lobel
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Stav Lobel. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};