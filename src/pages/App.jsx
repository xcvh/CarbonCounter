import { Routes, Route } from 'react-router-dom';
import Components from "./Components";
import ResultsPage from "./ResultsPage";
import CalculatorPage from "./CalculatorPage";
import Sidebar from "../components/Sidebar";
import { SidebarProvider } from "../context/sidebar";

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
                        </Routes>
                    </div>
                </div>
            </SidebarProvider>
        </main>
    );
}

export default App;
