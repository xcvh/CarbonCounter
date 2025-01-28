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

function ConsumptionPage() {
    const navigate = useNavigate();
    const [clothingAmount, setClothingAmount] = useState('');
    const [usedClothing, setUsedClothing] = useState('');
    const [onlineOrders, setOnlineOrders] = useState('');
    const [foodWaste, setFoodWaste] = useState('');

    const clothingAmountOptions = [
        { value: '1-2', label: '1-2 items' },
        { value: '3-6', label: '3-6 items' },
        { value: '7-10', label: '7-10 items' },
        { value: 'over10', label: 'More than 10 items' },
    ];

    const usedClothingOptions = [
        { value: 'always', label: 'Always' },
        { value: 'often', label: 'Often' },
        { value: 'rarely', label: 'Rarely' },
        { value: 'never', label: 'Never' },
    ];

    const onlineOrderOptions = [
        { value: 'never', label: 'Never' },
        { value: '1-2', label: '1-2 times/month' },
        { value: '3-5', label: '3-5 times/month' },
        { value: 'over5', label: 'More than 5 times/month' },
    ];

    const foodWasteOptions = [
        { value: 'none', label: 'None' },
        { value: 'under1', label: 'Less than 1 kg/month' },
        { value: '1-3', label: '1-3 kg/month' },
        { value: 'over3', label: 'More than 3 kg/month' },
    ];

    const handleSubmit = () => {
        // TODO: Calculate carbon footprint based on inputs
        console.log({ clothingAmount, usedClothing, onlineOrders, foodWaste });
        navigate('/results');
    };

    return (
        <div className="prose container mx-auto p-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Consumption Habits</h2>
            <p className="text-gray-600 mb-6">Calculate your CO₂ footprint based on your consumption patterns.</p>

            <div className="space-y-6">
                <Card className="bg-white p-6">
                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold m-0">Annual Clothing Purchases</h3>
                        <InfoIcon onClick={() => document.getElementById('clothing-modal').showModal()} />
                    </div>
                    <div className="mt-2">
                        <RadioGroup
                            name="clothingAmount"
                            options={clothingAmountOptions}
                            value={clothingAmount}
                            onChange={setClothingAmount}
                        />
                    </div>
                    <CalculationModal id="clothing-modal" title="Clothing CO₂ Impact">
                        <p>The CO₂ emissions from clothing are calculated as:</p>
                        <BlockMath>
                            {"CO_2 = Items \\times 17\\text{ kg}"}
                        </BlockMath>
                        <p>Where:</p>
                        <ul className="list-disc pl-4">
                            <li><InlineMath>{"Items"}</InlineMath> = Number of clothing items purchased per year</li>
                            <li>Each item produces approximately 17 kg of CO₂</li>
                        </ul>
                    </CalculationModal>
                </Card>

                <Card className="bg-white p-6">
                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold m-0">Second-hand Clothing</h3>
                        <InfoIcon onClick={() => document.getElementById('used-modal').showModal()} />
                    </div>
                    <div className="mt-2">
                        <RadioGroup
                            name="usedClothing"
                            options={usedClothingOptions}
                            value={usedClothing}
                            onChange={setUsedClothing}
                        />
                    </div>
                    <CalculationModal id="used-modal" title="Second-hand Impact">
                        <p>The CO₂ reduction from second-hand clothing is calculated as:</p>
                        <BlockMath>
                            {"CO_2 = Clothing_{CO_2} \\times (1 - Usage_{percentage} \\times 0.5)"}
                        </BlockMath>
                        <p>Where:</p>
                        <ul className="list-disc pl-4">
                            <li>Always: 100% reduction</li>
                            <li>Often: 50% reduction</li>
                            <li>Rarely: 10% reduction</li>
                            <li>Never: 0% reduction</li>
                        </ul>
                        <p>Second-hand clothing can save up to 60% CO₂ emissions</p>
                    </CalculationModal>
                </Card>

                <Card className="bg-white p-6">
                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold m-0">Online Shopping Frequency</h3>
                        <InfoIcon onClick={() => document.getElementById('online-modal').showModal()} />
                    </div>
                    <div className="mt-2">
                        <RadioGroup
                            name="onlineOrders"
                            options={onlineOrderOptions}
                            value={onlineOrders}
                            onChange={setOnlineOrders}
                        />
                    </div>
                    <CalculationModal id="online-modal" title="Online Shopping Impact">
                        <p>The CO₂ emissions from online shopping are calculated as:</p>
                        <BlockMath>
                            {"CO_2 = Orders \\times 1\\text{ kg}"}
                        </BlockMath>
                        <p>Where:</p>
                        <ul className="list-disc pl-4">
                            <li><InlineMath>{"Orders"}</InlineMath> = Number of online orders per month</li>
                            <li>Each order produces approximately 1 kg of CO₂</li>
                        </ul>
                    </CalculationModal>
                </Card>

                <Card className="bg-white p-6">
                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold m-0">Food Waste</h3>
                        <InfoIcon onClick={() => document.getElementById('waste-modal').showModal()} />
                    </div>
                    <div className="mt-2">
                        <RadioGroup
                            name="foodWaste"
                            options={foodWasteOptions}
                            value={foodWaste}
                            onChange={setFoodWaste}
                        />
                    </div>
                    <CalculationModal id="waste-modal" title="Food Waste Impact">
                        <p>The CO₂ emissions from food waste are calculated as:</p>
                        <BlockMath>
                            {"CO_2 = Weight \\times 4.5\\text{ kg}"}
                        </BlockMath>
                        <p>Where:</p>
                        <ul className="list-disc pl-4">
                            <li><InlineMath>{"Weight"}</InlineMath> = Amount of food waste in kg per month</li>
                            <li>Each kg of food waste produces 4.5 kg of CO₂e</li>
                        </ul>
                    </CalculationModal>
                </Card>

                <div className="flex justify-between mt-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/calculator/food')}
                        className="px-6 py-2"
                    >
                        ← Back to Food
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        className="px-6 py-2"
                    >
                        View Results →
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConsumptionPage; 