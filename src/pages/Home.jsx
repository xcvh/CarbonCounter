import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

function Home() {
    return ( 
        <div className="prose container mx-auto">
            <h2>Welcome to your Carbon Footprint!</h2>

            <Card
                image="https://www.conteyor.com/media/pages/library/48e78ddaed-1699614519/carbon-footprint.jpg"
                imageAlt="CarbonCounterLandingPage"
                className="bg-white mb-8 p-6 shadow-lg rounded-lg">
                <h3 className="text-lg font-semibold m-0">Measure Your Carbon Footprint & Make a Difference!</h3>
                
                <p className="text-sm text-gray-600 mt-2">
                    Climate change is one of the biggest challenges of our time, but together, we can create a more sustainable future.
                    Understanding your personal carbon footprint is the first step toward making meaningful changes.
                    With our easy-to-use CO2 calculator, you can quickly assess your impact on the planet and discover simple ways to reduce emissions.
                    Small actions—like choosing sustainable transport, saving energy, or adjusting your diet—can add up to a big difference.
                    Every step counts! By measuring and reducing your footprint, you’re not just helping the environment—you’re shaping a better world for future generations.
                    Start today and be part of the change!
                </p>
                <Link 
                    to="/calculator"
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition inline-flex items-center justify-center w-full">
                    Calculate Your Footprint
                </Link>

            </Card>
        </div>
    );


    



}

export default Home;
