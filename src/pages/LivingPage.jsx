import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toggle from '../components/ui/Toggle';
import Dropdown from '../components/ui/Dropdown';
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

function sendToBackend(powerConsumption, ecoElectricity, heatingType, heatingConsumption) {
    fetch("http://localhost:5500/api/living-results", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userCode: getCookie("userCode"), powerConsumption: powerConsumption, ecoElectricity: ecoElectricity, heatingType: heatingType, heatingConsumption: heatingConsumption }),
    })
        .then(response => response.json())
        .then(data => console.log("Antwort:", data))
        .catch(error => console.error("Fehler:", error));
}

function LivingPage() {
    const navigate = useNavigate();
    const [powerConsumption, setPowerConsumption] = useState('');
    const [ecoElectricity, setEcoElectricity] = useState('');
    const [heatingType, setHeatingType] = useState('');
    const [heatingConsumption, setHeatingConsumption] = useState('');
    const [energySource, setEnergySource] = useState('');
    const [homeSize, setHomeSize] = useState('');

    const powerConsumptionOptions = [
        { value: '100', label: 'Under 100 kWh/month' },
        { value: '200', label: '100–300 kWh/month' },
        { value: '400', label: '300–500 kWh/month' },
        { value: '500', label: 'Over 500 kWh/month' },
    ];

    const heatingTypeOptions = [
        { value: 'naturalGas', label: 'Natural Gas' },
        { value: 'heatingOil', label: 'Heating Oil' },
        { value: 'woodOrPallets', label: 'Wood/Pellets' },
        { value: 'heatingPump', label: 'Electric (Heat Pump)' },
        { value: 'district', label: 'District Heating' },
        { value: 'other', label: 'Other' },
    ];

    const heatingConsumptionOptions = [
        { value: '5000', label: 'Under 5,000 kWh/year' },
        { value: '75000', label: '5,000–10,000 kWh/year' },
        { value: '10000', label: 'Over 10,000 kWh/year' },
    ];

    const energySourceOptions = [
        { value: 'renewable', label: 'Renewable' },
        { value: 'coal', label: 'Coal' },
    ];

    const handleSubmit = () => {
        console.log({ energySource, heatingType, homeSize });
        navigate('/calculator/mobility');
    };

    // Helper function to determine card status
    const getCardStatus = (value) => {
        if (!value) return undefined;
        return 'completed';
    };

    return (
        <CalculatorLayout
            title="Living & Energy"
            description="See how your living situation and energy usage impact your CO₂ footprint."
            previousPage="/calculator/consumption"
            nextPage="/calculator/mobility"
            onNext={handleSubmit}
        >
            <QuestionCard
                title="Energy Source"
                description="What's your primary source of electricity?"
                icon="⚡"
                image="images/calculator/energy-source.jpg"
                imageAlt="Various energy sources"
                badge={energySource ? energySourceOptions.find(opt => opt.value === energySource)?.label : 'Not Selected'}
                badgeColor={energySource ? 'badge-primary' : 'badge-ghost'}
                status={getCardStatus(energySource)}
                highlight={!energySource}
                actions={[
                    energySource === 'renewable' && '🌱 Clean Energy',
                    energySource === 'coal' && '⚠️ High Impact'
                ].filter(Boolean)}
                modalId="energy-modal"
                modalContent={
                    <Modal id="energy-modal" title="Energy Source Calculation">
                        <CalculationContent>
                            <p>The CO₂ balance for power consumption is calculated as follows:</p>
                            <BlockMath>
                                {"CO_2 = V_{power} \\times EF_{power}"}
                            </BlockMath>
                            <p>Where:</p>
                            <ul className="list-disc pl-4 space-y-2">
                                <li><InlineMath>{"V_{power}"}</InlineMath> = Power consumption in kWh</li>
                                <li><InlineMath>{"EF_{power}"}</InlineMath> = Emission factor in kg CO₂/kWh</li>
                            </ul>
                            <p>The emission factor varies by power source:</p>
                            <ul className="list-disc pl-4 space-y-2">
                                <li>Green Electricity: <InlineMath>{"EF = 0.032 \\frac{kg}{kWh}"}</InlineMath></li>
                                <li>Conventional: <InlineMath>{"EF = 0.380 \\frac{kg}{kWh}"}</InlineMath></li>
                            </ul>
                        </CalculationContent>
                    </Modal>
                }
            >
                <div className="mt-2">
                    <RadioGroup
                        name="energySource"
                        options={energySourceOptions}
                        value={energySource}
                        onChange={setEnergySource}
                    />
                </div>
            </QuestionCard>

            <QuestionCard
                title="Heating Type"
                description="How do you heat your home?"
                icon="🔥"
                image="images/calculator/heating-type.jpg"
                imageAlt="Home heating systems"
                badge={heatingType ? heatingTypeOptions.find(opt => opt.value === heatingType)?.label : 'Not Selected'}
                badgeColor={heatingType ? 'badge-secondary' : 'badge-ghost'}
                status={getCardStatus(heatingType)}
                highlight={!heatingType && energySource}
                actions={[
                    heatingType === 'heatpump' && '🌱 Efficient',
                    heatingType === 'oil' && '⚠️ High Emissions'
                ].filter(Boolean)}
                modalId="heating-modal"
                modalContent={
                    <Modal id="heating-modal" title="Heating Calculation">
                        <CalculationContent>
                            <p>The CO₂ balance for heating energy is calculated as follows:</p>
                            <BlockMath>
                                {"CO_2 = V_{heat} \\times EF_{heat}"}
                            </BlockMath>
                            <p>Where:</p>
                            <ul className="list-disc pl-4">
                                <li><InlineMath>{"V_{heat}"}</InlineMath> = Heating energy consumption in kWh</li>
                                <li><InlineMath>{"EF_{heat}"}</InlineMath> = Emission factor of the chosen heating source</li>
                            </ul>
                            <p>The emission factors for different heating sources:</p>
                            <ul className="list-disc pl-4 space-y-2">
                                <li>Natural Gas: <InlineMath>{"EF = 0.201 \\frac{kg}{kWh}"}</InlineMath></li>
                                <li>Heating Oil: <InlineMath>{"EF = 0.266 \\frac{kg}{kWh}"}</InlineMath></li>
                                <li>Heat Pump: <InlineMath>{"EF = \\frac{EF_{power}}{4} \\frac{kg}{kWh}"}</InlineMath></li>
                                <li>District Heating: <InlineMath>{"EF = 0.148 \\frac{kg}{kWh}"}</InlineMath></li>
                                <li>Other: <InlineMath>{"EF = 0.02 \\frac{kg}{kWh}"}</InlineMath></li>
                            </ul>
                        </CalculationContent>
                    </Modal>
                }
            >
                <div className="mt-2">
                    <Dropdown
                        trigger={heatingTypeOptions.find(opt => opt.value === heatingType)?.label || "Select your heating source"}
                        items={heatingTypeOptions.map(option => ({
                            label: option.label,
                            onClick: () => setHeatingType(option.value)
                        }))}
                    />
                </div>
                <div className="mt-4">
                    <h4 className="text-md font-medium mb-2">Energy Consumption</h4>
                    <RadioGroup
                        name="heatingConsumption"
                        options={heatingConsumptionOptions}
                        value={heatingConsumption}
                        onChange={setHeatingConsumption}
                    />
                </div>
            </QuestionCard>

            <QuestionCard
                title="Home Size"
                description="What's the size of your living space?"
                icon="🏠"
                image="images/calculator/home-size.jpg"
                imageAlt="Different home sizes"
                badge={homeSize ? `${homeSize}m²` : 'Not Selected'}
                badgeColor={homeSize ? 'badge-accent' : 'badge-ghost'}
                status={getCardStatus(homeSize)}
                highlight={!homeSize && heatingType && energySource}
                actions={[
                    homeSize < 50 && '🌱 Efficient Space',
                    homeSize > 150 && '📊 Large Space'
                ].filter(Boolean)}
                modalId="size-modal"
                modalContent={
                    <Modal id="size-modal" title="Home Size Calculation">
                        <CalculationContent>
                            <p>The CO₂ balance for home size is calculated as follows:</p>
                            <BlockMath>
                                {"CO_2 = A \\times EF"}
                            </BlockMath>
                            <p>Where:</p>
                            <ul className="list-disc pl-4">
                                <li><InlineMath>{"A"}</InlineMath> = Area in m²</li>
                                <li><InlineMath>{"EF"}</InlineMath> = Emission factor in kg CO₂/m²</li>
                            </ul>
                            <p>The emission factor varies by region and building type:</p>
                            <ul className="list-disc pl-4 space-y-2">
                                <li>Average: <InlineMath>{"EF = 0.15 \\frac{kg}{m²}"}</InlineMath></li>
                                <li>Efficient: <InlineMath>{"EF = 0.05 \\frac{kg}{m²}"}</InlineMath></li>
                                <li>Large: <InlineMath>{"EF = 0.25 \\frac{kg}{m²}"}</InlineMath></li>
                            </ul>
                        </CalculationContent>
                    </Modal>
                }
            >
                <div className="mt-2">
                    <RadioGroup
                        name="homeSize"
                        options={[
                            { value: '50', label: 'Under 50m²' },
                            { value: '100', label: '50–100m²' },
                            { value: '150', label: '100–150m²' },
                            { value: '200', label: 'Over 150m²' },
                        ]}
                        value={homeSize}
                        onChange={setHomeSize}
                    />
                </div>
            </QuestionCard>
        </CalculatorLayout>
    );
}

export default LivingPage; 