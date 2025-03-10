import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Range from '../components/ui/Range';
import Dropdown from '../components/ui/Dropdown';
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


function sendToBackend(carDistance, carType, publicTransport, flightOptions) {
    console.log({ userCode: getCookie("userCode"), carType: carType, carDistance: carDistance, publicTransport: publicTransport, flightOptions: flightOptions })
    fetch("http://localhost:5500/api/mobility-results", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userCode: getCookie("userCode"), carType: carType, carDistance: carDistance, publicTransport: publicTransport, flightOptions: flightOptions }),
    })
        .then(response => response.json())
        .then(data => console.log("Antwort:", data))
        .catch(error => console.error("Fehler:", error));
}

function MobilityPage() {
    const navigate = useNavigate();
    const [carKilometers, setCarKilometers] = useState('');
    const [carType, setCarType] = useState('');
    const [publicTransport, setPublicTransport] = useState('');
    const [flights, setFlights] = useState('');

    const carTypeOptions = [
        { value: 'petrol', label: 'Petrol' },
        { value: 'diesel', label: 'Diesel/LPG' },
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'naturalGas', label: 'Natural Gas' },
        { value: 'electric', label: 'Electric' },
    ];

    const publicTransportOptions = [
        { value: 'bikeWalk', label: 'Mostly bike or walk', emissionFactor: 0 },
        { value: 'eScooter', label: 'Mostly e-scooter or e-bike', emissionFactor: 0.015 },
        { value: 'publicTransport', label: 'Mostly bus or metro', emissionFactor: 0.090 }
    ];

    const flightOptions = [
        { value: '0', label: 'Never' },
        { value: '1 s', label: '1 short-haul flight' },
        { value: '2.5 s', label: '2-3 short-haul flights' },
        { value: '1 l', label: '1 long-haul flight' },
        { value: '3 l', label: 'More than 2 long-haul flights' },
    ];

    const handleSubmit = () => {
        console.log({ carKilometers, carType, publicTransport, flights });
        sendToBackend(carKilometers, carType, publicTransport, flights);
        navigate('/calculator/food');
    };

    // Helper function to determine card status
    const getCardStatus = (value) => {
        if (!value) return undefined;
        return 'completed';
    };

    return (
        <CalculatorLayout
            title="Mobility"
            description="See how your transportation choices are impacting your CO₂ footprint."
            previousPage="/calculator/living"
            nextPage="/calculator/food"
            onNext={handleSubmit}
        >
            <QuestionCard
                title="Car Usage & Type"
                icon="🚗"
                image="images/calculator/car-usage.jpg"
                imageAlt="Electric car charging"
                badge={carType ? carTypeOptions.find(opt => opt.value === carType)?.label : 'Not Selected'}
                badgeColor={carType ? 'badge-primary' : 'badge-ghost'}
                status={getCardStatus(carType && carKilometers)}
                highlight={!carType}
                actions={[
                    carType === 'electric' && '⚡ Low Emissions',
                    carType === 'hybrid' && '🔋 Hybrid Power'
                ].filter(Boolean)}
                modalId="car-modal"
                modalContent={
                    <Modal id="car-modal" title="Car Usage & Emissions">
                        <CalculationContent>
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
                        </CalculationContent>
                    </Modal>
                }
            >
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
                        min={0}
                        max={4}
                        step={1}
                        markers={['0', '<5000', '<10000', '<15000', '>15000']}
                        markerSize="lg"
                        valueMap={[0, 5000, 10000, 15000, 20000]}
                    />
                </div>
            </QuestionCard>

            <QuestionCard
                title="Urban Transportation"
                description="How do you usually get around your city?"
                icon="🚊"
                image="images/calculator/urban-transport.jpg"
                imageAlt="Public transportation"
                badge={publicTransport ? publicTransportOptions.find(opt => opt.value === publicTransport)?.label : 'Not Selected'}
                badgeColor={publicTransport ? 'badge-secondary' : 'badge-ghost'}
                status={getCardStatus(publicTransport)}
                highlight={!publicTransport && !carType}
                actions={[
                    publicTransport === 'bike_walk' && '🌱 Zero Emissions',
                    publicTransport === 'escooter' && '⚡ Low Impact'
                ].filter(Boolean)}
                modalId="transport-modal"
                modalContent={
                    <Modal id="transport-modal" title="Urban Transportation Impact">
                        <CalculationContent>
                            <p>Environmental impact of different urban transportation modes:</p>
                            <ul className="list-disc pl-4 space-y-2">
                                <li>Biking/Walking: Zero direct emissions</li>
                                <li>E-scooter/E-bike: <InlineMath>{"0.015 \\frac{kg}{km}"}</InlineMath> (includes charging)</li>
                                <li>Bus/Metro: <InlineMath>{"0.090 \\frac{kg}{km}"}</InlineMath> (averaged)</li>
                                <li>Mixed usage: <InlineMath>{"0.045 \\frac{kg}{km}"}</InlineMath> (estimated average)</li>
                            </ul>
                        </CalculationContent>
                    </Modal>
                }
            >
                <Range
                    value={publicTransportOptions.findIndex(opt => opt.value === publicTransport)}
                    onChange={(index) => setPublicTransport(publicTransportOptions[index].value)}
                    min={0}
                    max={2}
                    step={1}
                    markers={['🚴‍♂️', '🛴', '🚌']}
                    markerSize="3xl"
                />
            </QuestionCard>

            <QuestionCard
                title="Air Travel"
                description="How many flights do you take per year?"
                icon="✈️"
                image="images/calculator/air-travel.jpg"
                imageAlt="Airplane in flight"
                badge={flights ? flightOptions.find(opt => opt.value === flights)?.label : 'Not Selected'}
                badgeColor={flights ? 'badge-accent' : 'badge-ghost'}
                status={getCardStatus(flights)}
                highlight={!flights && !carType && !publicTransport}
                actions={[
                    flights === 'never' && '🌱 Zero Emissions',
                    flights === 'multiple_long' && '⚠️ High Impact'
                ].filter(Boolean)}
                modalId="flight-modal"
                modalContent={
                    <Modal id="flight-modal" title="Flight Emissions">
                        <CalculationContent>
                            <p>CO₂ emissions per flight:</p>
                            <ul className="list-disc pl-4 space-y-2">
                                <li>Short-haul flight: <InlineMath>{"0.25"}</InlineMath> tonnes CO₂ per flight</li>
                                <li>Long-haul flight: <InlineMath>{"1.00"}</InlineMath> tonnes CO₂ per flight</li>
                            </ul>
                        </CalculationContent>
                    </Modal>
                }
            >
                <Dropdown
                    trigger={flightOptions.find(opt => opt.value === flights)?.label || "Select number of flights"}
                    items={flightOptions.map(option => ({
                        label: option.label,
                        onClick: () => setFlights(option.value)
                    }))}
                />
            </QuestionCard>
        </CalculatorLayout>
    );
}

export default MobilityPage; 