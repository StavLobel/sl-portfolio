import packageJson from '../../package.json';

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
          <p className="text-xs text-muted-foreground/70">
            v{packageJson.version} - Deployed: {new Date().toISOString().split('T')[0]}
          </p>
        </div>
      </div>
    </footer>
  );
};