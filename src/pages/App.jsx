import { Routes, Route } from "react-router-dom";
import Components from "./Components";
import Home from "./Home";
import ResultsPage from "./ResultsPage";
import CalculatorPage from "./CalculatorPage";
import LivingPage from "./LivingPage";
import MobilityPage from "./MobilityPage";
import FoodPage from "./FoodPage";
import ConsumptionPage from "./ConsumptionPage";
import Sidebar from "../components/Sidebar";
import { SidebarProvider } from "../contexts/SidebarContext";
import ScrollToTop from "../components/utils/ScrollToTop";

function App() {
    return (
        <main className="relative flex min-h-screen bg-green-800">
            <SidebarProvider>
                <Sidebar />
                <div className="flex-1 h-screen transition-all overflow-hidden duration-300 bg-orange-50 md:rounded-s-3xl">
                    <div className="h-full overflow-auto p-4">
                        <ScrollToTop />
                        <Routes>
                            <Route path="/" element={<Home />} />
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
