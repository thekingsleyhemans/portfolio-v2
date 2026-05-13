import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Archives from "./pages/Archives";
import ProjectDetails from "./pages/ProjectDetails";
import HeaderNav from "./components/ui/HeaderNav";
import Loader from "./components/ui/Loader";

export default function App() {
  const location = useLocation();

  const [showLoader, setShowLoader] = useState(() => {
    return !localStorage.getItem("hasVisited");
  });

  useEffect(() => {
    if (!showLoader) return;

    localStorage.setItem("hasVisited", "true");

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showLoader]);

  // ✅ move logic HERE (outside JSX)
  const hideHeader =
    location.pathname.toLowerCase().startsWith("/archives");
    

  return (
    <>
      {showLoader && <Loader />}

      {!hideHeader && <HeaderNav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/project/:slug" element={<ProjectDetails />} />
      </Routes>
    </>
  );
}