import React from 'react';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    type = 'button',
    className = '',
    disabled = false,
    fullWidth = false
}) => {
    const baseStyles = 'px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-[0_4px_0_0_rgba(0,0,0,0.15)] active:shadow-none active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed text-white';

    const variants = {
        primary: 'bg-purple-600 hover:bg-purple-700',
        secondary: 'bg-sky-500 hover:bg-sky-600',
        success: 'bg-green-500 hover:bg-green-600',
        danger: 'bg-red-500 hover:bg-red-600',
        warning: 'bg-amber-400 hover:bg-amber-500',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        ${baseStyles} 
        ${variants[variant] || variants.primary} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
        >
            {children}
        </button>
    );
};

export default Button;
