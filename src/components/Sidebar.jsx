import Link from "./Link";

function Sidebar() {
  return (
    <div className="sticky top-0 overscroll-y-scroll flex flex-col bg-green-800">
      <ul>
        <li>
          <Link to="/">Landing Page</Link>
        </li>
        <li>
          <Link to="/calculator">Calculator</Link>
        </li>
        <li>
          <Link to="/results">Results</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
