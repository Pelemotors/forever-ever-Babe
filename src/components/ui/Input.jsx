import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helperText,
  className = '',
  containerClassName = '',
  type = 'text',
  ...props
}, ref) => {
  const baseClasses = 'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-right';
  const normalClasses = 'border-romantic-burgundy/20 focus:border-romantic-burgundy focus:ring-2 focus:ring-romantic-burgundy/20 focus:outline-none';
  const errorClasses = 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none';

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-romantic-burgundy mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`${baseClasses} ${error ? errorClasses : normalClasses} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

