import LandingPage from "./LandingPage";
import ResultsPage from "./ResultsPage";
import CalculatorPage from "./CalculatorPage";
import Sidebar from "../components/Sidebar";
import Route from "../components/Route";
import { SidebarProvider } from "../context/sidebar";

function App() {
  return (
    <main className="App flex bg-green-800">
      <SidebarProvider>
        <Sidebar></Sidebar>
      </SidebarProvider>
      <div className="flex-grow p-6 bg-orange-50 rounded-s-3xl">
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
    </main>
  );
}

export default App;
