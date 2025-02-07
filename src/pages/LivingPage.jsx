import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import Toggle from '../components/ui/Toggle';
import Dropdown from '../components/ui/Dropdown';
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

function RadioGroup({ name, options, value, onChange }) {
    return (
        <div className="space-y-3">
            {options.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange(e.target.value)}
                        className="radio radio-primary"
                    />
                    <span className="text-gray-700">{option.label}</span>
                </label>
            ))}
        </div>
    );
}

function LivingPage() {
    const navigate = useNavigate();
    const [powerConsumption, setPowerConsumption] = useState('');
    const [ecoElectricity, setEcoElectricity] = useState('');
    const [heatingType, setHeatingType] = useState('');
    const [heatingConsumption, setHeatingConsumption] = useState('');

    const powerConsumptionOptions = [
        { value: 'under100', label: 'Under 100 kWh/month' },
        { value: '100-300', label: '100–300 kWh/month' },
        { value: '300-500', label: '300–500 kWh/month' },
        { value: 'over500', label: 'Over 500 kWh/month' },
    ];

    const ecoElectricityOptions = [
        { value: 'yes', label: 'Yes, 100%' },
        { value: 'no', label: 'No' },
    ];

    const heatingTypeOptions = [
        { value: 'gas', label: 'Natural Gas' },
        { value: 'oil', label: 'Heating Oil' },
        { value: 'wood', label: 'Wood/Pellets' },
        { value: 'heatpump', label: 'Electric (Heat Pump)' },
        { value: 'district', label: 'District Heating' },
        { value: 'other', label: 'Other' },
    ];

    const heatingConsumptionOptions = [
        { value: 'under5000', label: 'Under 5,000 kWh/year' },
        { value: '5000-10000', label: '5,000–10,000 kWh/year' },
        { value: 'over10000', label: 'Over 10,000 kWh/year' },
    ];

    const handleSubmit = () => {
        // TODO: Calculate carbon footprint based on inputs
        console.log({ powerConsumption, ecoElectricity, heatingType, heatingConsumption });
        navigate('/calculator/mobility');
    };

    return (
        <div className="prose container mx-auto p-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Living & Energy</h2>
            <p className="text-xl text-gray-800 font-medium mb-6">See how your energy consumption is impacting your CO₂ footprint.</p>

            <div className="space-y-6">
                <Card className="bg-white p-6">
                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold m-0">Electricity</h3>
                        <InfoIcon onClick={() => document.getElementById('power-modal').showModal()} />
                    </div>
                    <div className="mt-2">
                        <RadioGroup
                            name="powerConsumption"
                            options={powerConsumptionOptions}
                            value={powerConsumption}
                            onChange={setPowerConsumption}
                        />
                    </div>
                    <CalculationModal id="power-modal" title="Power Consumption Calculation">
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
                    </CalculationModal>
                    <div className="mt-2">
                        <Toggle label="I use energy from renewable sources" checked={ecoElectricity === 'yes'} onChange={() => setEcoElectricity(ecoElectricity === 'yes' ? 'no' : 'yes')} />
                    </div>

                </Card>

                <Card className="bg-white p-6">
                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold m-0">Heating</h3>
                        <InfoIcon onClick={() => document.getElementById('heating-modal').showModal()} />
                    </div>
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
                    <CalculationModal id="heating-modal" title="Heating Calculation">
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
                    </CalculationModal>
                </Card>

                <div className="flex justify-end mt-8">
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        className="w-full md:w-auto px-6 py-2"
                    >
                        Continue to Mobility →
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LivingPage; 