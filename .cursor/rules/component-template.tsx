import React from 'react';

// Example of proper TypeScript interfaces
interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

interface ExampleComponentProps {
  title: string;
  description?: string;
  isVisible?: boolean;
  onAction?: () => void;
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({
  title,
  description,
  isVisible = true,
  onAction
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Proper cleanup example
    const cleanup = () => {
      // Cleanup logic here
    };

    return cleanup;
  }, []);

  const handleAsyncAction = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // API call example
      await onAction?.();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-4 p-6 bg-background rounded-lg border border-border">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <button
        onClick={handleAsyncAction}
        disabled={loading}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Loading...' : 'Action'}
      </button>
    </div>
  );
};

export default ExampleComponent; 