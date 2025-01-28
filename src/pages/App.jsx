import { Routes, Route } from 'react-router-dom';
import Components from "./Components";
import ResultsPage from "./ResultsPage";
import CalculatorPage from "./CalculatorPage";
import LivingPage from "./LivingPage";
import MobilityPage from "./MobilityPage";
import FoodPage from "./FoodPage";
import ConsumptionPage from "./ConsumptionPage";
import Sidebar from "../components/Sidebar";
import { SidebarProvider } from "../contexts/SidebarContext";

function App() {
    return (
        <main className="relative flex min-h-screen bg-green-800">
            <SidebarProvider>
                <Sidebar />
                <div className="flex-1 min-h-screen transition-all duration-300 bg-orange-50 md:rounded-s-3xl">
                    <div className="p-6">
                        <Routes>
                            <Route path="/" element={<Components />} />
                            <Route path="/results" element={<ResultsPage />} />
                            <Route path="/calculator" element={<CalculatorPage />} />
                            <Route path="/calculator/living" element={<LivingPage />} />
                            <Route path="/calculator/mobility" element={<MobilityPage />} />
                            <Route path="/calculator/food" element={<FoodPage />} />
                            <Route path="/calculator/consumption" element={<ConsumptionPage />} />
                        </Routes>
                    </div>
                </div>
            </SidebarProvider>
        </main>
    );
}

export default App;
