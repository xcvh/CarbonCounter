import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Range from '../components/ui/Range';
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

function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
}

createUserCookie();
function createUserCookie() {
    if (!getCookie("userCode")) {
        fetch("http://localhost:5500/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({})
        })
        .then(response => response.json())
        .then(data => document.cookie = "userCode="+data["code"]+"; max-age=3153600000; path=/")
        .catch(error => console.error("Fehler:", error))
    }
}

function sendToBackend(dietType, localFood, processedFood) {
    fetch("http://localhost:5500/api/food-results", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userCode: getCookie("userCode"), dietType: dietType, localFood: localFood, processedFood: processedFood}),
    })
        .then(response => response.json())
        .then(data => console.log("Antwort:", data))
        .catch(error => console.error("Fehler:", error));
}

function FoodPage() {
    const navigate = useNavigate();
    const [dietType, setDietType] = useState('');
    const [localFood, setLocalFood] = useState('');
    const [processedFood, setProcessedFood] = useState('');

    const dietTypeOptions = [
        { value: 'vegan', label: 'Vegan' },
        { value: 'vegetarian', label: 'Vegetarian' },
        { value: 'mixedLow', label: 'Mixed Diet (low meat)' },
        { value: 'mixedHigh', label: 'Mixed Diet (high meat)' },
    ];

    const localFoodOptions = [
        { value: 'over75', label: 'Mainly local and seasonal food' },
        { value: '50-75', label: 'Quite a lot of local and seasonal food' },
        { value: '25-50', label: 'Some local and seasonal food' },
        { value: 'under25', label: 'Little local and seasonal food' },
    ];

    const processedFoodOptions = [
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' },
    ];

    const handleSubmit = () => {
        console.log({ dietType, localFood, processedFood });
        sendToBackend(dietType, localFood, processedFood);
        navigate('/calculator/consumption');
    };

    return (
        <div className="prose container mx-auto p-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Food & Diet</h2>
            <p className="text-xl text-gray-800 font-medium mb-6">See how your diet is impacting your CO₂ footprint.</p>

            <div className="space-y-6">
                <Card className="bg-white p-6">
                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold m-0">Diet Type</h3>
                        <InfoIcon onClick={() => document.getElementById('diet-modal').showModal()} />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        How much meat do you eat? Are you vegan, vegetarian, or on a mixed diet? Or even a carnivore?
                    </p>
                    <div className="mt-2">
                        <Range
                            value={dietTypeOptions.findIndex(opt => opt.value === dietType)}
                            onChange={(val) => setDietType(dietTypeOptions[val].value)}
                            min={0}
                            max={3}
                            step={1}
                            markers={['🥗', '🥗🧀', '🥗🥓', '🥩🍗']}
                            markerSize="3xl"
                            className="w-full"
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
                        <h3 className="text-lg font-semibold m-0">Local and Seasonal Food</h3>
                        <InfoIcon onClick={() => document.getElementById('local-modal').showModal()} />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        How much local and seasonal food do you eat?
                    </p>
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
                        <h3 className="text-lg font-semibold m-0">Processed Food</h3>
                        <InfoIcon onClick={() => document.getElementById('processed-modal').showModal()} />

                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        Are cooking from scratch or buying processed food? Just give a guess based on your diet in the last 12 months.
                    </p>
                    <div className="mt-2">
                        <Range
                            value={processedFoodOptions.findIndex(opt => opt.value === processedFood)}
                            onChange={(val) => setProcessedFood(processedFoodOptions[val].value)}
                            min={0}
                            max={2}
                            step={1}
                            markers={['🌽', '🥫', '🍔']}
                            markerSize="3xl"
                            className="w-full"
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