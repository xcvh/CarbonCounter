import React from 'react';
import Card from '../ui/Card';
import { InfoIcon } from '../layout/CalculatorLayout';

export default function QuestionCard({
    title,
    description,
    modalId,
    modalContent,
    children,
    icon,
    image,
    imageAlt,
    badge,
    badgeColor = 'badge-primary',
    className = '',
    status,
    actions = [],
    highlight = false,
}) {
    const statusColors = {
        completed: 'bg-success/10 border-success/20',
        error: 'bg-error/10 border-error/20',
        warning: 'bg-warning/10 border-warning/20',
        default: 'bg-white'
    };

    const statusBorder = status ? 'border-2' : 'border';
    const statusBg = status ? statusColors[status] : statusColors.default;
    const highlightEffect = highlight ? 'ring-2 ring-primary/50' : '';

    return (
        <Card
            image={image}
            imageAlt={imageAlt || title}
            title={
                <div className="flex items-center gap-2">
                    {icon && (
                        <span className="text-2xl">
                            {icon}
                        </span>
                    )}
                    <span className="flex-grow">{title}</span>
                    <InfoIcon
                        onClick={() => document.getElementById(modalId).showModal()}
                        className="opacity-70"
                    />
                </div>
            }
            badges={[
                ...(badge ? [badge] : []),
                ...(status === 'completed' ? ['✓ Completed'] : []),
                ...(status === 'error' ? ['⚠️ Error'] : []),
                ...(status === 'warning' ? ['⚠️ Warning'] : [])
            ]}
            badgeColor={badgeColor}
            subtitle={description}
            className={`
                group
                ${statusBorder}
                ${statusBg}
                ${highlightEffect}
                transition-all
                duration-300
                ${className}
            `}
            actions={actions}
        >
            <div className="mt-4 space-y-4">
                {children}
            </div>
            {modalContent}
        </Card>
    );
} 