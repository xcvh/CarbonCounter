import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import RadioGroup from '../components/ui/RadioGroup';

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

function MobilityPage() {
    const navigate = useNavigate();
    const [carKilometers, setCarKilometers] = useState('');
    const [carType, setCarType] = useState('');
    const [publicTransport, setPublicTransport] = useState('');
    const [flights, setFlights] = useState('');

    const carKilometersOptions = [
        { value: 'under5000', label: 'Under 5,000 km' },
        { value: '5000-10000', label: '5,000–10,000 km' },
        { value: '10000-15000', label: '10,000–15,000 km' },
        { value: 'over15000', label: 'Over 15,000 km' },
    ];

    const carTypeOptions = [
        { value: 'petrol', label: 'Petrol' },
        { value: 'diesel', label: 'Diesel/LPG' },
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'natural_gas', label: 'Natural Gas' },
        { value: 'electric', label: 'Electric' },
    ];

    const publicTransportOptions = [
        { value: 'daily', label: 'Daily' },
        { value: '3-5_week', label: '3-5 times per week' },
        { value: '1-2_week', label: '1-2 times per week' },
        { value: 'rarely', label: 'Rarely' },
        { value: 'never', label: 'Never' },
    ];

    const flightOptions = [
        { value: 'never', label: 'Never' },
        { value: '1_short', label: '1 short-haul flight' },
        { value: '2-3_short', label: '2-3 short-haul flights' },
        { value: '1_long', label: '1 long-haul flight' },
        { value: 'multiple_long', label: 'More than 2 long-haul flights' },
    ];

    const handleSubmit = () => {
        // TODO: Calculate carbon footprint based on inputs
        console.log({ carKilometers, carType, publicTransport, flights });
        navigate('/calculator/food');
    };

    return (
        <div className="prose container mx-auto p-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Mobility</h2>
            <p className="text-gray-600 mb-6">Calculate your CO₂ footprint based on your transportation habits.</p>

            <div className="space-y-6">
                <Card className="bg-white p-6">
                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold m-0">Annual Car Usage</h3>
                        <InfoIcon onClick={() => document.getElementById('car-km-modal').showModal()} />
                    </div>
                    <div className="mt-2">
                        <RadioGroup
                            name="carKilometers"
                            options={carKilometersOptions}
                            value={carKilometers}
                            onChange={setCarKilometers}
                        />
                    </div>
                    <CalculationModal id="car-km-modal" title="Car Usage Calculation">
                        <p>The CO₂ balance for car usage is calculated as follows:</p>
                        <BlockMath>
                            {"CO_2 = km \\times EF_{car}"}
                        </BlockMath>
                        <p>Where:</p>
                        <ul className="list-disc pl-4">
                            <li><InlineMath>{"km"}</InlineMath> = Annual kilometers driven</li>
                            <li><InlineMath>{"EF_{car}"}</InlineMath> = Emission factor based on car type</li>
                        </ul>
                    </CalculationModal>
                </Card>

                <Card className="bg-white p-6">
                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold m-0">Vehicle Type</h3>
                        <InfoIcon onClick={() => document.getElementById('car-type-modal').showModal()} />
                    </div>
                    <div className="mt-2">
                        <RadioGroup
                            name="carType"
                            options={carTypeOptions}
                            value={carType}
                            onChange={setCarType}
                        />
                    </div>
                    <CalculationModal id="car-type-modal" title="Vehicle Emission Factors">
                        <p>Emission factors by vehicle type:</p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>Petrol: <InlineMath>{"0.200 \\frac{kg}{km}"}</InlineMath></li>
                            <li>Diesel/LPG: <InlineMath>{"0.185 \\frac{kg}{km}"}</InlineMath></li>
                            <li>Hybrid: <InlineMath>{"0.165 \\frac{kg}{km}"}</InlineMath></li>
                            <li>Natural Gas: <InlineMath>{"0.174 \\frac{kg}{km}"}</InlineMath></li>
                            <li>Electric: <InlineMath>{"0.150 \\frac{kg}{km}"}</InlineMath></li>
                        </ul>
                    </CalculationModal>
                </Card>

                <Card className="bg-white p-6">
                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold m-0">Public Transport Usage</h3>
                        <InfoIcon onClick={() => document.getElementById('transport-modal').showModal()} />
                    </div>
                    <div className="mt-2">
                        <RadioGroup
                            name="publicTransport"
                            options={publicTransportOptions}
                            value={publicTransport}
                            onChange={setPublicTransport}
                        />
                    </div>
                    <CalculationModal id="transport-modal" title="Public Transport Emission Factors">
                        <p>The CO₂ balance for public transport is calculated using an average emission factor:</p>
                        <BlockMath>
                            {"CO_2 = km \\times 0.090 \\frac{kg}{km}"}
                        </BlockMath>
                        <p>Specific emission factors:</p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>Bus: <InlineMath>{"0.105 \\frac{kg}{km}"}</InlineMath></li>
                            <li>Train: <InlineMath>{"0.035 \\frac{kg}{km}"}</InlineMath></li>
                        </ul>
                    </CalculationModal>
                </Card>

                <Card className="bg-white p-6">
                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold m-0">Air Travel</h3>
                        <InfoIcon onClick={() => document.getElementById('flight-modal').showModal()} />
                    </div>
                    <div className="mt-2">
                        <RadioGroup
                            name="flights"
                            options={flightOptions}
                            value={flights}
                            onChange={setFlights}
                        />
                    </div>
                    <CalculationModal id="flight-modal" title="Flight Emissions">
                        <p>CO₂ emissions per flight:</p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>Short-haul flight: <InlineMath>{"0.25"}</InlineMath> tonnes CO₂ per flight</li>
                            <li>Long-haul flight: <InlineMath>{"1.00"}</InlineMath> tonnes CO₂ per flight</li>
                        </ul>
                    </CalculationModal>
                </Card>

                <div className="flex justify-between mt-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/calculator/living')}
                        className="px-6 py-2"
                    >
                        ← Back to Living
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        className="px-6 py-2"
                    >
                        Continue to Food →
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MobilityPage; 