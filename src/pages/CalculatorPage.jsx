import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Home as HouseIcon, Car, Utensils, ShoppingBag } from 'lucide-react';

function CalculatorPage() {
    const navigate = useNavigate();

    const calculatorSections = [
        {
            title: "Living",
            icon: <HouseIcon size={24} />,
            description: "Calculate your carbon footprint based on your living situation, including home size, heating type, and energy efficiency.",
        },
        {
            title: "Mobility",
            icon: <Car size={24} />,
            description: "Measure your transportation impact, including car usage, public transport, and air travel.",
        },
        {
            title: "Food",
            icon: <Utensils size={24} />,
            description: "Measure the environmental impact of your eating habits, including meat consumption and local food choices.",
        },
        {
            title: "Consumption",
            icon: <ShoppingBag size={24} />,
            description: "Evaluate how your shopping habits and consumer choices affect your carbon footprint.",
        }
    ];

    return (
        <div className="prose container mx-auto">
            <h2>Carbon Footprint Calculator</h2>

            <Card className="bg-white mb-8">
                <h3 className="text-lg font-semibold">Welcome to Your Carbon Calculator</h3>
                <p>
                    Understanding your carbon footprint is the first step towards making environmentally conscious decisions.
                    This calculator helps you measure your impact across three key areas of daily life.
                </p>
                <div className="mt-6 space-y-4">
                    {calculatorSections.map((section, index) => (
                        <div key={section.title} className="flex items-start gap-3">
                            <div className="mt-1">{section.icon}</div>
                            <div>
                                <h4 className="text-base font-semibold m-0">{`${index + 1}. ${section.title}`}</h4>
                                <p className="text-sm text-gray-600 m-0">{section.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8">
                    <Button
                        variant="primary"
                        onClick={() => navigate('/calculator/living')}
                        className="w-full"
                    >
                        Start Calculator
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default CalculatorPage;
