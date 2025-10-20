import { forwardRef } from 'react';

const Textarea = forwardRef(({
  label,
  error,
  helperText,
  maxLength,
  showCount = false,
  value = '',
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const baseClasses = 'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-right resize-none';
  const normalClasses = 'border-romantic-burgundy/20 focus:border-romantic-burgundy focus:ring-2 focus:ring-romantic-burgundy/20 focus:outline-none';
  const errorClasses = 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none';

  const charCount = value?.length || 0;
  const isNearLimit = maxLength && charCount > maxLength * 0.9;

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-romantic-burgundy mb-2">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        value={value}
        maxLength={maxLength}
        className={`${baseClasses} ${error ? errorClasses : normalClasses} ${className}`}
        {...props}
      />
      <div className="flex justify-between items-center mt-1">
        <div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          {helperText && !error && (
            <p className="text-sm text-gray-500">{helperText}</p>
          )}
        </div>
        {showCount && maxLength && (
          <p className={`text-sm ${isNearLimit ? 'text-red-500' : 'text-gray-500'}`}>
            {charCount} / {maxLength}
          </p>
        )}
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;

