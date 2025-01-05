import LandingPage from "./LandingPage";
import ResultsPage from "./ResultsPage";
import CalculatorPage from "./CalculatorPage";
import Sidebar from "../components/Sidebar";

function App() {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <Sidebar />
      <div>
        <h1 className="text-xl font-serif font-bold text-green-700">
          CarbonCounter
        </h1>
        <LandingPage />
        <ResultsPage />
        <CalculatorPage />
      </div>
    </div>
  );
}

export default App;
