import Link from "./Link";

function Sidebar() {
  const links = [
    { label: "Home", path: "/" },
    { label: "Calculator", path: "/calculator" },
    { label: "Results", path: "/results" },
  ];

  const renderedLinks = links.map((link) => {
    return (
      <Link
        key={link.label}
        to={link.path}
        className="mb-1 text-white hover:underline"
        activeClassName="font-bold border-l-4 pl-2 border-white"
      >
        {link.label}
      </Link>
    );
  });

  return (
    <div className="sticky top-0 overscroll-y-scroll flex flex-col items-start bg-green-800">
      {renderedLinks}
    </div>
  );
}

export default Sidebar;
