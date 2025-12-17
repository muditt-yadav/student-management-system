'use client';

const Card = ({ children, className = '', hover = false }) => {
  return (
    <div 
      className={`
        bg-white dark:bg-neutral-900 
        rounded-xl 
        border border-neutral-200 dark:border-neutral-800
        shadow-sm
        ${hover ? 'transition-all duration-200 hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
