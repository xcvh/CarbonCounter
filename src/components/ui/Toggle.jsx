import React from 'react';

const Toggle = ({ label, checked, onChange, className = '' }) => {
    return (
        <div className={`form-control ${className}`}>
            <label className="label cursor-pointer">
                <span className="label-text">{label}</span>
                <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={checked}
                    onChange={onChange}
                />
            </label>
        </div>
    );
};

Toggle.defaultProps = {
    checked: false,
    onChange: () => { },
};

export default Toggle; 