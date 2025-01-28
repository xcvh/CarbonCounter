import React from 'react';

function RadioGroup({ name, options, value, onChange }) {
    return (
        <div className="space-y-3">
            {options.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange(e.target.value)}
                        className="radio radio-primary"
                    />
                    <span className="text-gray-700">{option.label}</span>
                </label>
            ))}
        </div>
    );
}

export default RadioGroup; 