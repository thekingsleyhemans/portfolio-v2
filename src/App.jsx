import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Archives from "./pages/Archives";
import ProjectDetails from "./pages/ProjectDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/archives" element={<Archives />} />
      <Route path="/project/:slug" element={<ProjectDetails />} />
    </Routes>
  );
}