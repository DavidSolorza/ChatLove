import React from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
}

// Componente de input reutilizable con estilos consistentes
const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  required = false,
  disabled = false,
  className = '',
  name
}) => {
  const inputClasses = `
    w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200
    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
    ${error 
      ? 'border-red-300 dark:border-red-500 focus:border-red-500' 
      : 'border-pink-200 dark:border-gray-600 focus:border-pink-500'
    }
    ${disabled ? 'bg-gray-100 dark:bg-gray-600 cursor-not-allowed' : ''}
    focus:outline-none focus:ring-2 focus:ring-pink-200
  `;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={inputClasses}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;