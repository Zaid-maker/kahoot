import React from 'react';

const Container = ({ children, className = '' }) => {
    return (
        <div className={`max-w-4xl mx-auto px-4 py-8 ${className}`}>
            {children}
        </div>
    );
};

export default Container;
