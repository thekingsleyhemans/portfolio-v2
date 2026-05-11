import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Archives from "./pages/Archives";
import ProjectDetails from "./pages/ProjectDetails";
import HeaderNav from "./components/ui/HeaderNav";
import Loader from "./components/ui/Loader";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Loader />

      {location.pathname !== "/archives" && <HeaderNav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/project/:slug" element={<ProjectDetails />} />
      </Routes>
    </>
  );
}