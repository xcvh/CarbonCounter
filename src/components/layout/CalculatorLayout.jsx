import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

export function InfoIcon({ modalId, onClick }) {
    return (
        <button
            onClick={onClick}
            className="ml-2 text-gray-500 hover:text-gray-700"
            title="More information"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
        </button>
    );
}

export function CalculationModal({ id, title, children }) {
    return (
        <Modal id={id} title={title}>
            <div className="space-y-4">
                {children}
            </div>
        </Modal>
    );
}

export default function CalculatorLayout({
    title,
    description,
    children,
    previousPage,
    nextPage,
    onNext
}) {
    const navigate = useNavigate();

    return (
        <div className="prose container mx-auto p-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-xl text-gray-800 font-medium mb-6">{description}</p>

            <div className="space-y-6">
                {children}

                <div className="flex justify-between mt-8">
                    {previousPage && (
                        <Button
                            variant="ghost"
                            onClick={() => navigate(previousPage)}
                            className="px-6 py-2"
                        >
                            ← Back to {previousPage.split('/').pop().replace(/^\w/, c => c.toUpperCase())}
                        </Button>
                    )}
                    {nextPage && (
                        <Button
                            variant="primary"
                            onClick={onNext}
                            className="px-6 py-2"
                        >
                            Continue to {nextPage.split('/').pop().replace(/^\w/, c => c.toUpperCase())} →
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
} 