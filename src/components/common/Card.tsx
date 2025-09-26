import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

// Componente de tarjeta reutilizable con diferentes variantes
const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  padding = 'md',
  shadow = 'md',
  rounded = 'lg'
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };
  
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl'
  };
  
  return (
    <div className={`
      bg-white border border-pink-100
      ${paddingClasses[padding]}
      ${shadowClasses[shadow]}
      ${roundedClasses[rounded]}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;