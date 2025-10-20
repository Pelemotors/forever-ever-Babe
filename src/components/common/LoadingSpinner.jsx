import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', className = '', text = '' }) => {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  };

  const spinnerSize = sizes[size] || sizes.md;

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 
        size={spinnerSize} 
        className="animate-spin text-romantic-burgundy" 
      />
      {text && (
        <p className="text-romantic-burgundy/70 text-sm">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;

