import { motion } from 'framer-motion';

const Card = ({
  children,
  variant = 'default',
  className = '',
  hover = true,
  onClick,
  ...props
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';

  const variants = {
    default: 'bg-white shadow-lg hover:shadow-xl',
    glass: 'glass shadow-lg hover:shadow-xl',
    romantic: 'bg-gradient-to-br from-romantic-cream to-romantic-rose shadow-lg hover:shadow-xl',
    outline: 'border-2 border-romantic-burgundy/20 bg-white hover:border-romantic-burgundy/40',
  };

  const variantClass = variants[variant] || variants.default;
  const hoverClass = hover ? 'hover:scale-[1.02]' : '';
  const clickableClass = onClick ? 'cursor-pointer' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`${baseClasses} ${variantClass} ${hoverClass} ${clickableClass} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;

