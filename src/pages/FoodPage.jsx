import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import RadioGroup from '../components/ui/RadioGroup';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

function InfoIcon({ modalId, onClick }) {
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

function CalculationModal({ id, title, children }) {
    return (
        <Modal id={id} title={title}>
            <div className="space-y-4">
                {children}
            </div>
        </Modal>
    );
}

function FoodPage() {
    const navigate = useNavigate();
    const [dietType, setDietType] = useState('');
    const [localFood, setLocalFood] = useState('');
    const [processedFood, setProcessedFood] = useState('');

    const dietTypeOptions = [
        { value: 'vegan', label: 'Vegan' },
        { value: 'vegetarian', label: 'Vegetarian' },
        { value: 'mixed_low', label: 'Mixed Diet (low meat)' },
        { value: 'mixed_high', label: 'Mixed Diet (high meat)' },
    ];

    const localFoodOptions = [
        { value: 'over75', label: 'Over 75%' },
        { value: '50-75', label: '50–75%' },
        { value: '25-50', label: '25–50%' },
        { value: 'under25', label: 'Under 25%' },
    ];

    const processedFoodOptions = [
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' },
    ];

    const handleSubmit = () => {
        // TODO: Calculate carbon footprint based on inputs
        console.log({ dietType, localFood, processedFood });
        navigate('/calculator/consumption');
    };

    return (
        <div className="prose container mx-auto p-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Food & Diet</h2>
            <p className="text-gray-600 mb-6">Calculate your CO₂ footprint based on your eating habits.</p>

            <div className="space-y-6">
                <Card className="bg-white p-6">
                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold m-0">Diet Type</h3>
                        <InfoIcon onClick={() => document.getElementById('diet-modal').showModal()} />
                    </div>
                    <div className="mt-2">
                        <RadioGroup
                            name="dietType"
                            options={dietTypeOptions}
                            value={dietType}
                            onChange={setDietType}
                        />
                    </div>
                    <CalculationModal id="diet-modal" title="Diet Type CO₂ Impact">
                        <p>Annual CO₂ emissions by diet type:</p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>Vegan: <InlineMath>{"1.0"}</InlineMath> tonnes/year</li>
                            <li>Vegetarian: <InlineMath>{"1.5"}</InlineMath> tonnes/year</li>
                            <li>Mixed Diet: <InlineMath>{"2.0-3.0"}</InlineMath> tonnes/year</li>
                        </ul>
                    </CalculationModal>
                </Card>

                <Card className="bg-white p-6">
                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold m-0">Local/Seasonal Food Percentage</h3>
                        <InfoIcon onClick={() => document.getElementById('local-modal').showModal()} />
                    </div>
                    <div className="mt-2">
                        <RadioGroup
                            name="localFood"
                            options={localFoodOptions}
                            value={localFood}
                            onChange={setLocalFood}
                        />
                    </div>
                    <CalculationModal id="local-modal" title="Local Food Impact">
                        <p>The CO₂ reduction from local/seasonal food is calculated as:</p>
                        <BlockMath>
                            {"CO_2 = Diet_{base} \\times (1 - Local_{percentage} \\times 0.3)"}
                        </BlockMath>
                        <p>Where:</p>
                        <ul className="list-disc pl-4">
                            <li><InlineMath>{"Diet_{base}"}</InlineMath> = Base emissions from diet type</li>
                            <li><InlineMath>{"Local_{percentage}"}</InlineMath> = Percentage of local/seasonal food</li>
                            <li>Up to 50% reduction possible with high use of local/seasonal products</li>
                        </ul>
                    </CalculationModal>
                </Card>

                <Card className="bg-white p-6">
                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold m-0">Processed Food Consumption</h3>
                        <InfoIcon onClick={() => document.getElementById('processed-modal').showModal()} />
                    </div>
                    <div className="mt-2">
                        <RadioGroup
                            name="processedFood"
                            options={processedFoodOptions}
                            value={processedFood}
                            onChange={setProcessedFood}
                        />
                    </div>
                    <CalculationModal id="processed-modal" title="Processed Food Impact">
                        <p>Additional annual CO₂ emissions from processed foods:</p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>High: <InlineMath>{"200"}</InlineMath> kg CO₂/year</li>
                            <li>Medium: <InlineMath>{"130"}</InlineMath> kg CO₂/year</li>
                            <li>Low: <InlineMath>{"50"}</InlineMath> kg CO₂/year</li>
                        </ul>
                        <p className="text-sm text-gray-600 mt-2">Example: A frozen pizza produces about 5 kg CO₂e</p>
                    </CalculationModal>
                </Card>

                <div className="flex justify-between mt-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/calculator/mobility')}
                        className="px-6 py-2"
                    >
                        ← Back to Mobility
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        className="px-6 py-2"
                    >
                        Continue to Consumption →
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FoodPage; 