import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-romantic-burgundy to-romantic-bordeaux text-white hover:shadow-lg hover:scale-105',
    secondary: 'bg-romantic-rose text-romantic-burgundy hover:bg-romantic-blush hover:shadow-md',
    ghost: 'bg-transparent text-romantic-burgundy hover:bg-romantic-rose/50',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg',
    outline: 'border-2 border-romantic-burgundy text-romantic-burgundy hover:bg-romantic-burgundy hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" size={18} />}
      {children}
    </motion.button>
  );
};

export default Button;

