import LandingPage from "./LandingPage";
import ResultsPage from "./ResultsPage";
import CalculatorPage from "./CalculatorPage";
import Sidebar from "../components/Sidebar";

function App() {
  return (
    <div>
      <h1>CarbonCounter</h1>
      <Sidebar />
      <LandingPage />
      <ResultsPage />
      <CalculatorPage />
    </div>
  );
}

export default App;
