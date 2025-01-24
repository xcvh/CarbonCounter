import React from 'react';

const Range = ({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    markers,
    className = ''
}) => {
    return (
        <div className={className}>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="range range-primary"
                step={step}
            />
            {markers && (
                <div className="flex w-full justify-between px-2 text-xl">
                    {markers.map((marker, index) => (
                        <span key={index}>{marker}</span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Range; 