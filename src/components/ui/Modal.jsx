import React from 'react';

const Modal = ({ id, title, children, className = '' }) => {
    return (
        <dialog id={id} className={`modal ${className}`}>
            <div className="modal-box">
                {title && <h3 className="font-bold text-lg">{title}</h3>}
                <div className="py-4">{children}</div>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export const useModal = (id) => {
    const open = () => document.getElementById(id)?.showModal();
    const close = () => document.getElementById(id)?.close();
    return { open, close };
};

export default Modal; 