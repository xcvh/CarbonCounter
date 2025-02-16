import React from 'react';

const Button = ({ children, variant = 'default', className = '', ...props }) => {
    const getVariantClass = () => {
        switch (variant) {
            case 'neutral':
                return 'btn-neutral';
            case 'primary':
                return 'btn-primary';
            case 'secondary':
                return 'btn-secondary';
            case 'accent':
                return 'btn-accent';
            case 'ghost':
                return 'btn-ghost';
            case 'link':
                return 'btn-link';
            default:
                return '';
        }
    };

    return (
        <button className={`btn ${getVariantClass()} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button; 