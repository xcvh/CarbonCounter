import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import RadioGroup from '../components/ui/RadioGroup';
import Range from '../components/ui/Range';
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
        { value: 'bike_walk', label: 'Mostly bike or walk', emissionFactor: 0 },
        { value: 'escooter', label: 'Mostly e-scooter or e-bike', emissionFactor: 0.015 },
        { value: 'public_transport', label: 'Mostly bus or metro', emissionFactor: 0.090 }
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
            <p className="text-xl text-gray-800 font-medium mb-6">See how your transportation choices are impacting your CO₂ footprint.</p>

            <div className="space-y-6">
                <Card className="bg-white p-6">
                    <div className="flex items-center mb-4">
                        <h3 className="text-lg font-semibold m-0">Car Usage & Type</h3>
                        <InfoIcon onClick={() => document.getElementById('car-modal').showModal()} />
                    </div>

                    <div className="mt-4">
                        <Dropdown
                            trigger={carTypeOptions.find(opt => opt.value === carType)?.label || "Select your vehicle type"}
                            items={carTypeOptions.map(option => ({
                                label: option.label,
                                onClick: () => setCarType(option.value)
                            }))}
                        />
                    </div>

                    <div className="mt-2">
                        <h4 className="text-md font-medium mb-2">Annual Distance in km</h4>
                        <Range
                            value={carKilometers}
                            onChange={setCarKilometers}
                            min={5000}
                            max={20000}
                            step={5000}
                            markers={['<5000', '<10000', '<15000', '>15000']}
                            markerSize="lg"
                        />
                    </div>

                    <CalculationModal id="car-modal" title="Car Usage & Emissions">
                        <p>The CO₂ balance for car usage is calculated as follows:</p>
                        <BlockMath>
                            {"CO_2 = km \\times EF_{car}"}
                        </BlockMath>
                        <p>Where:</p>
                        <ul className="list-disc pl-4">
                            <li><InlineMath>{"km"}</InlineMath> = Annual kilometers driven</li>
                            <li><InlineMath>{"EF_{car}"}</InlineMath> = Emission factor based on car type</li>
                        </ul>
                        <p className="mt-4">Emission factors by vehicle type:</p>
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
                        <h3 className="text-lg font-semibold m-0">Urban Transportation</h3>
                        <InfoIcon onClick={() => document.getElementById('transport-modal').showModal()} />
                    </div>
                    <div className="mt-2">
                        <p className="text-gray-600 mb-2">How do you usually get around your city?</p>
                        <Range
                            value={publicTransportOptions.findIndex(opt => opt.value === publicTransport)}
                            onChange={(index) => setPublicTransport(publicTransportOptions[index].value)}
                            min={0}
                            max={2}
                            step={1}
                            markers={['🚴‍♂️', '🛴', '🚌']}
                            markerSize="3xl"
                        />
                    </div>
                    <CalculationModal id="transport-modal" title="Urban Transportation Impact">
                        <p>Environmental impact of different urban transportation modes:</p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>Biking/Walking: Zero direct emissions</li>
                            <li>E-scooter/E-bike: <InlineMath>{"0.015 \\frac{kg}{km}"}</InlineMath> (includes charging)</li>
                            <li>Bus/Metro: <InlineMath>{"0.090 \\frac{kg}{km}"}</InlineMath> (averaged)</li>
                            <li>Mixed usage: <InlineMath>{"0.045 \\frac{kg}{km}"}</InlineMath> (estimated average)</li>
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