const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full';

  const variants = {
    default: 'bg-romantic-burgundy/10 text-romantic-burgundy',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    romantic: 'bg-gradient-to-r from-romantic-rose to-romantic-blush text-romantic-burgundy',
    gold: 'bg-romantic-gold/20 text-romantic-gold-muted',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const variantClass = variants[variant] || variants.default;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <span
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;

