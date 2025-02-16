import React from 'react';

const Input = ({
    label,
    topRightLabel,
    bottomLeftLabel,
    bottomRightLabel,
    className = '',
    ...props
}) => {
    return (
        <label className={`form-control w-full max-w-xs ${className}`}>
            {(label || topRightLabel) && (
                <div className="label">
                    {label && <span className="label-text">{label}</span>}
                    {topRightLabel && <span className="label-text-alt">{topRightLabel}</span>}
                </div>
            )}
            <input className="input input-bordered w-full max-w-xs" {...props} />
            {(bottomLeftLabel || bottomRightLabel) && (
                <div className="label">
                    {bottomLeftLabel && <span className="label-text-alt">{bottomLeftLabel}</span>}
                    {bottomRightLabel && <span className="label-text-alt">{bottomRightLabel}</span>}
                </div>
            )}
        </label>
    );
};

export default Input; 