import React from 'react';

const Dropdown = ({ trigger, items, className = '' }) => {
    return (
        <div className={`dropdown ${className}`}>
            <div tabIndex={0} role="button" className="btn m-1">
                {trigger}
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {items.map((item, index) => (
                    <li key={index}>
                        <a onClick={item.onClick}>{item.label}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dropdown; 