import React from 'react';

export const Progress = ({ value, max = 100, className = '' }) => {
    return (
        <progress
            className={`progress progress-primary ${className}`}
            value={value}
            max={max}
        />
    );
};

export const RadialProgress = ({ value, className = '', children }) => {
    return (
        <div
            className={`radial-progress bg-primary text-primary-content border-primary border-4 ${className}`}
            style={{ "--value": value }}
            role="progressbar"
        >
            {children || `${value}%`}
        </div>
    );
};

export default Progress; 