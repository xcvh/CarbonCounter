import { createContext, useState } from "react";

const SidebarContext = createContext();

function SidebarProvider({ children }) {
  const [expanded, setExpanded] = useState(true);

  const value = {
    expanded,
    setExpanded,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export { SidebarProvider };
export default SidebarContext; 