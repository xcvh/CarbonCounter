import React, { createContext, useContext } from 'react';

const ModalContext = createContext();

export const useModal = (id) => {
    const open = () => document.getElementById(id)?.showModal();
    const close = () => document.getElementById(id)?.close();
    return { open, close };
};

export const ModalProvider = ({ children }) => {
    return (
        <ModalContext.Provider value={{}}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContext; 