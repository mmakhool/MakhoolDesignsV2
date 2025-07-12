// Simple utility to combine class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export interface LoadingViewProps {
  message?: string;
  className?: string;
}

export const LoadingView: React.FC<LoadingViewProps> = ({ 
  message = "Loading...", 
  className 
}) => {
  return (
    <div className={cn(
      "flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900",
      className
    )}>
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{message}</p>
      </div>
    </div>
  );
};
