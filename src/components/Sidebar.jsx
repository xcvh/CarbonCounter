import {
  Calculator,
  ChevronFirst,
  Home,
  LayoutDashboard,
  MoreVertical,
} from "lucide-react";
import Link from "./Link";

function Sidebar() {
  const links = [
    { label: "Home", path: "/", icon: <Home size={20} /> },
    {
      label: "Calculator",
      path: "/calculator",
      icon: <Calculator size={20} />,
    },
    { label: "Results", path: "/results", icon: <LayoutDashboard size={20} /> },
  ];

  const renderedLinks = links.map((link) => {
    return (
      <li
        key={link.label}
        className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer"
      >
        {link.icon}
        <Link
          to={link.path}
          className="text-green-900"
          activeClassName="font-bold"
        >
          {link.label}
        </Link>
      </li>
    );
  });

  return (
    <aside className="h-screen col-span-2">
      <nav className="h-full flex flex-col bg-green-50 border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/254.svg"
            className="w-32"
            alt="Logo placeholder"
          />
          <button className="p-1.5 rounded-lg bg-green-100 hover:bg-green-200">
            <ChevronFirst />
          </button>
        </div>

        <ul className="flex-1 px-3">{renderedLinks}</ul>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?name=Jeldo+Meppen"
            alt="Placeholder Avatar"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
            flex justify-between items-center
            w-52 ml-3
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Jeldo Meppen</h4>
              <span className="text-xs text-green-600">hi@jel.do</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
