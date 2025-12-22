import React from 'react';

const Input = ({
    type = 'text',
    placeholder = '',
    value,
    onChange,
    className = '',
    name,
    required = false
}) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`
        w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
        focus:outline-none focus:border-purple-500 
        transition-colors text-center font-bold text-lg
        ${className}
      `}
        />
    );
};

export default Input;
