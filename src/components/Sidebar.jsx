import Link from "./Link";

function Sidebar() {
  return (
    <div className="sticky top-0 overscroll-y-scroll flex flex-col bg-green-800">
      <ul>
        <li>
          <Link to="/" className="text-gray-100 underline">
            Landing Page
          </Link>
        </li>
        <li>
          <Link to="/calculator" className="text-gray-100 underline">
            Calculator
          </Link>
        </li>
        <li>
          <Link to="/results" className="text-gray-100 underline">
            Results
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
