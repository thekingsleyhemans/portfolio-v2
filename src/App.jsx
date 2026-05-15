import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Archives from "./pages/Archives";
import ProjectDetails from "./pages/ProjectDetails";

import Loader from "./components/ui/Loader";
import Layout from "./components/layout/Layout";

export default function App() {
  const [showLoader, setShowLoader] = useState(() => {
    return !localStorage.getItem("hasVisited");
  });

  useEffect(() => {
    if (!showLoader) return;

    const timer = setTimeout(() => {
      setShowLoader(false);
      localStorage.setItem("hasVisited", "true");
    }, 2000);

    return () => clearTimeout(timer);
  }, [showLoader]);

  return (
    <>
      {showLoader && <Loader />}

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/project/:slug" element={<ProjectDetails />} />
        </Routes>
      </Layout>
    </>
  );
}