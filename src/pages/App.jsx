import LandingPage from "./LandingPage";
import ResultsPage from "./ResultsPage";
import CalculatorPage from "./CalculatorPage";
import Sidebar from "../components/Sidebar";
import Route from "../components/Route";

function App() {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <Sidebar />
      <div className="col-span-5">
        <h1 className="text-xl font-serif font-bold text-green-700">
          CarbonCounter
        </h1>
        <Route path="/">
          <LandingPage />
        </Route>
        <Route path="/results">
          <ResultsPage />
        </Route>
        <Route path="/calculator">
          <CalculatorPage />
        </Route>
      </div>
    </div>
  );
}

export default App;
