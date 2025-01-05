import LandingPage from "./LandingPage";
import ResultsPage from "./ResultsPage";
import CalculatorPage from "./CalculatorPage";
import Sidebar from "../components/Sidebar";

function App() {
  return (
    <div>
      CarbonCounter
      <Sidebar />
      <LandingPage />
      <ResultsPage />
      <CalculatorPage />
    </div>
  );
}

export default App;
