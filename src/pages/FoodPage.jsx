import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Range from '../components/ui/Range';
import RadioGroup from '../components/ui/RadioGroup';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import CalculatorLayout from '../components/layout/CalculatorLayout';
import QuestionCard from '../components/calculator/QuestionCard';
import Modal from '../components/ui/Modal';

function CalculationContent({ children }) {
    return (
        <div className="space-y-4">
            {children}
        </div>
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
            .then(data => document.cookie = "userCode=" + data["code"] + "; max-age=3153600000; path=/")
            .catch(error => console.error("Fehler:", error))
    }
}

function sendToBackend(dietType, localFood, processedFood) {
    fetch("http://localhost:5500/api/food-results", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userCode: getCookie("userCode"), dietType: dietType, localFood: localFood, processedFood: processedFood }),
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

    // Helper function to determine card status
    const getCardStatus = (value) => {
        if (!value) return undefined;
        return 'completed';
    };

    return (
        <CalculatorLayout
            title="Food & Diet"
            description="See how your diet is impacting your CO₂ footprint."
            previousPage="/calculator/mobility"
            nextPage="/calculator/consumption"
            onNext={handleSubmit}
        >
            <QuestionCard
                title="Diet Type"
                description="How much meat do you eat? Are you vegan, vegetarian, or on a mixed diet?"
                icon="🥗"
                image="images/calculator/diet-type.jpg"
                imageAlt="Various diet types from vegan to meat-based"
                badge={dietType ? dietTypeOptions.find(opt => opt.value === dietType)?.label : 'Not Selected'}
                badgeColor={dietType ? 'badge-primary' : 'badge-ghost'}
                status={getCardStatus(dietType)}
                highlight={!dietType}
                actions={[
                    dietType === 'vegan' && '🌱 Low Impact',
                    dietType === 'mixed_high' && '⚠️ High Impact'
                ].filter(Boolean)}
                modalId="diet-modal"
                modalContent={
                    <Modal id="diet-modal" title="Diet Type CO₂ Impact">
                        <CalculationContent>
                            <p>Annual CO₂ emissions by diet type:</p>
                            <ul className="list-disc pl-4 space-y-2">
                                <li>Vegan: <InlineMath>{"1.0"}</InlineMath> tonnes/year</li>
                                <li>Vegetarian: <InlineMath>{"1.5"}</InlineMath> tonnes/year</li>
                                <li>Mixed Diet: <InlineMath>{"2.0-3.0"}</InlineMath> tonnes/year</li>
                            </ul>
                        </CalculationContent>
                    </Modal>
                }
            >
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
            </QuestionCard>

            <QuestionCard
                title="Local and Seasonal Food"
                description="How much local and seasonal food do you eat?"
                icon="🌾"
                image="images/calculator/local-food.jpg"
                imageAlt="Local and seasonal produce"
                badge={localFood ? localFoodOptions.find(opt => opt.value === localFood)?.label : 'Not Selected'}
                badgeColor={localFood ? 'badge-secondary' : 'badge-ghost'}
                status={getCardStatus(localFood)}
                highlight={!localFood && dietType}
                actions={[
                    localFood === 'over75' && '🌱 Eco-friendly',
                    localFood === 'under25' && '🌍 High Food Miles'
                ].filter(Boolean)}
                modalId="local-modal"
                modalContent={
                    <Modal id="local-modal" title="Local Food Impact">
                        <CalculationContent>
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
                        </CalculationContent>
                    </Modal>
                }
            >
                <RadioGroup
                    name="localFood"
                    options={localFoodOptions}
                    value={localFood}
                    onChange={setLocalFood}
                />
            </QuestionCard>

            <QuestionCard
                title="Processed Food"
                description="Are you cooking from scratch or buying processed food? Just give a guess based on your diet in the last 12 months."
                icon="🥫"
                image="images/calculator/processed-food.jpg"
                imageAlt="Processed vs fresh food comparison"
                badge={processedFood ? processedFoodOptions.find(opt => opt.value === processedFood)?.label : 'Not Selected'}
                badgeColor={processedFood ? 'badge-accent' : 'badge-ghost'}
                status={getCardStatus(processedFood)}
                highlight={!processedFood && localFood && dietType}
                actions={[
                    processedFood === 'low' && '🌱 Fresh Food',
                    processedFood === 'high' && '⚠️ High Processing'
                ].filter(Boolean)}
                modalId="processed-modal"
                modalContent={
                    <Modal id="processed-modal" title="Processed Food Impact">
                        <CalculationContent>
                            <p>Additional annual CO₂ emissions from processed foods:</p>
                            <ul className="list-disc pl-4 space-y-2">
                                <li>High: <InlineMath>{"200"}</InlineMath> kg CO₂/year</li>
                                <li>Medium: <InlineMath>{"130"}</InlineMath> kg CO₂/year</li>
                                <li>Low: <InlineMath>{"50"}</InlineMath> kg CO₂/year</li>
                            </ul>
                            <p className="text-sm text-gray-600 mt-2">Example: A frozen pizza produces about 5 kg CO₂e</p>
                        </CalculationContent>
                    </Modal>
                }
            >
                <Range
                    value={processedFoodOptions.findIndex(opt => opt.value === processedFood)}
                    onChange={(val) => setProcessedFood(processedFoodOptions[val].value)}
                    min={0}
                    max={2}
                    step={1}
                    markers={['🍔', '🥫', '🌽']}
                    markerSize="3xl"
                    className="w-full"
                />
            </QuestionCard>
        </CalculatorLayout>
    );
}

export default FoodPage; 