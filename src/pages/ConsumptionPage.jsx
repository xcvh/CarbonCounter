import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        .then(data => document.cookie = "userCode="+data["code"]+"; max-age=3153600000; path=/")
        .catch(error => console.error("Fehler:", error))
    }
}

function sendToBackend(clothingAmount, usedClothing, onlineOrders, foodWaste) {
    fetch("http://localhost:5500/api/consumption-results", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userCode: getCookie("userCode"), clothingAmount: clothingAmount, usedClothing: usedClothing, onlineOrders: onlineOrders, foodWaste: foodWaste}),
    })
        .then(response => response.json())
        .then(data => console.log("Antwort:", data))
        .catch(error => console.error("Fehler:", error));
}


function ConsumptionPage() {
    const navigate = useNavigate();
    const [clothingAmount, setClothingAmount] = useState('');
    const [usedClothing, setUsedClothing] = useState('');
    const [onlineOrders, setOnlineOrders] = useState('');
    const [foodWaste, setFoodWaste] = useState('');

    const clothingAmountOptions = [
        { value: '1.5', label: '1-2 items' },
        { value: '4.5', label: '3-6 items' },
        { value: '8.5', label: '7-10 items' },
        { value: '10', label: 'More than 10 items' },
    ];

    const usedClothingOptions = [
        { value: '1', label: 'Always' },
        { value: '0.5', label: 'Often' },
        { value: '0.1', label: 'Rarely' },
        { value: '0', label: 'Never' },
    ];

    const onlineOrderOptions = [
        { value: '0', label: 'Never' },
        { value: '1.5', label: '1-2 times/month' },
        { value: '4', label: '3-5 times/month' },
        { value: '5', label: 'More than 5 times/month' },
    ];

    const foodWasteOptions = [
        { value: '0', label: 'None' },
        { value: '1', label: 'Less than 1 kg/month' },
        { value: '2', label: '1-3 kg/month' },
        { value: '3', label: 'More than 3 kg/month' },
    ];

    const handleSubmit = () => {
        console.log({ clothingAmount, usedClothing, onlineOrders, foodWaste });
        sendToBackend(clothingAmount, usedClothing, onlineOrders, foodWaste);
        navigate('/results');
    };

    // Helper function to determine card status
    const getCardStatus = (value) => {
        if (!value) return undefined;
        return 'completed';
    };

    return (
        <CalculatorLayout
            title="Consumption & Waste"
            description="See how your consumption and waste habits impact your CO₂ footprint."
            previousPage="/calculator/food"
            nextPage="/calculator/living"
            onNext={handleSubmit}
        >
            <QuestionCard
                title="Clothing & Shopping"
                description="How often do you buy new clothes and other items?"
                icon="👕"
                image="images/calculator/clothing-habits.jpg"
                imageAlt="Sustainable fashion and shopping"
                badge={clothingAmount ? clothingAmountOptions.find(opt => opt.value === clothingAmount)?.label : 'Not Selected'}
                badgeColor={clothingAmount ? 'badge-primary' : 'badge-ghost'}
                status={getCardStatus(clothingAmount)}
                highlight={!clothingAmount}
                actions={[
                    clothingAmount === '1-2' && '🌱 Sustainable',
                    clothingAmount === '3-6' && '🌱 Sustainable',
                    clothingAmount === '7-10' && '🌱 Sustainable',
                    clothingAmount === 'over10' && '⚠️ High Consumption'
                ].filter(Boolean)}
                modalId="clothing-modal"
                modalContent={
                    <Modal id="clothing-modal" title="Clothing CO₂ Impact">
                        <CalculationContent>
                            <p>The CO₂ emissions from clothing are calculated as:</p>
                            <BlockMath>
                                {"CO_2 = Items \\times 17\\text{ kg}"}
                            </BlockMath>
                            <p>Where:</p>
                            <ul className="list-disc pl-4">
                                <li><InlineMath>{"Items"}</InlineMath> = Number of clothing items purchased per year</li>
                                <li>Each item produces approximately 17 kg of CO₂</li>
                            </ul>
                        </CalculationContent>
                    </Modal>
                }
            >
                <div className="mt-2">
                    <RadioGroup
                        name="clothingAmount"
                        options={clothingAmountOptions}
                        value={clothingAmount}
                        onChange={setClothingAmount}
                    />
                </div>
            </QuestionCard>

            <QuestionCard
                title="Second-hand Clothing"
                description="How often do you buy second-hand clothes?"
                icon="👕"
                image="images/calculator/second-hand-clothing.jpg"
                imageAlt="Second-hand clothing"
                badge={usedClothing ? usedClothingOptions.find(opt => opt.value === usedClothing)?.label : 'Not Selected'}
                badgeColor={usedClothing ? 'badge-secondary' : 'badge-ghost'}
                status={getCardStatus(usedClothing)}
                highlight={!usedClothing}
                actions={[
                    usedClothing === 'always' && '🌱 Zero Waste',
                    usedClothing === 'often' && '🌱 Sustainable',
                    usedClothing === 'rarely' && '⚠️ High Waste',
                    usedClothing === 'never' && '⚠️ High Waste'
                ].filter(Boolean)}
                modalId="used-modal"
                modalContent={
                    <Modal id="used-modal" title="Second-hand Clothing Impact">
                        <CalculationContent>
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
                        </CalculationContent>
                    </Modal>
                }
            >
                <div className="mt-2">
                    <RadioGroup
                        name="usedClothing"
                        options={usedClothingOptions}
                        value={usedClothing}
                        onChange={setUsedClothing}
                    />
                </div>
            </QuestionCard>

            <QuestionCard
                title="Online Shopping Frequency"
                description="How often do you shop online?"
                icon="🌐"
                image="images/calculator/online-shopping.jpg"
                imageAlt="Online shopping"
                badge={onlineOrders ? onlineOrderOptions.find(opt => opt.value === onlineOrders)?.label : 'Not Selected'}
                badgeColor={onlineOrders ? 'badge-accent' : 'badge-ghost'}
                status={getCardStatus(onlineOrders)}
                highlight={!onlineOrders}
                actions={[
                    onlineOrders === 'never' && '🌱 Sustainable',
                    onlineOrders === '1-2' && '🌱 Sustainable',
                    onlineOrders === '3-5' && '🌱 Sustainable',
                    onlineOrders === 'over5' && '⚠️ High Consumption'
                ].filter(Boolean)}
                modalId="online-modal"
                modalContent={
                    <Modal id="online-modal" title="Online Shopping Impact">
                        <CalculationContent>
                            <p>The CO₂ emissions from online shopping are calculated as:</p>
                            <BlockMath>
                                {"CO_2 = Orders \\times 1\\text{ kg}"}
                            </BlockMath>
                            <p>Where:</p>
                            <ul className="list-disc pl-4">
                                <li><InlineMath>{"Orders"}</InlineMath> = Number of online orders per month</li>
                                <li>Each order produces approximately 1 kg of CO₂</li>
                            </ul>
                        </CalculationContent>
                    </Modal>
                }
            >
                <div className="mt-2">
                    <RadioGroup
                        name="onlineOrders"
                        options={onlineOrderOptions}
                        value={onlineOrders}
                        onChange={setOnlineOrders}
                    />
                </div>
            </QuestionCard>

            <QuestionCard
                title="Food Waste"
                description="How much food waste do you generate weekly?"
                icon="🍽️"
                image="images/calculator/food-waste.jpg"
                imageAlt="Food waste"
                badge={foodWaste ? foodWasteOptions.find(opt => opt.value === foodWaste)?.label : 'Not Selected'}
                badgeColor={foodWaste ? 'badge-accent' : 'badge-ghost'}
                status={getCardStatus(foodWaste)}
                highlight={!foodWaste}
                actions={[
                    foodWaste === 'none' && '🌱 Zero Waste',
                    foodWaste === 'under1' && '🌱 Sustainable',
                    foodWaste === '1-3' && '⚠️ High Waste',
                    foodWaste === 'over3' && '⚠️ High Impact'
                ].filter(Boolean)}
                modalId="waste-modal"
                modalContent={
                    <Modal id="waste-modal" title="Food Waste Impact">
                        <CalculationContent>
                            <p>The CO₂ emissions from food waste are calculated as:</p>
                            <BlockMath>
                                {"CO_2 = Weight \\times 4.5\\text{ kg}"}
                            </BlockMath>
                            <p>Where:</p>
                            <ul className="list-disc pl-4">
                                <li><InlineMath>{"Weight"}</InlineMath> = Amount of food waste in kg per month</li>
                                <li>Each kg of food waste produces 4.5 kg of CO₂e</li>
                            </ul>
                        </CalculationContent>
                    </Modal>
                }
            >
                <div className="mt-2">
                    <RadioGroup
                        name="foodWaste"
                        options={foodWasteOptions}
                        value={foodWaste}
                        onChange={setFoodWaste}
                    />
                </div>
            </QuestionCard>
        </CalculatorLayout>
    );
}

export default ConsumptionPage; 