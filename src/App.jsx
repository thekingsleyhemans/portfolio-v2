import { Routes, Route } from "react-router-dom";
import "./styles/global.css";

import Home from "./pages/Home";
import Archives from "./pages/Archives";
import ProjectDetails from "./pages/ProjectDetails";

import Loader from "./components/ui/Loader";
import Layout from "./components/layout/Layout";

export default function App() {

  return (
    <>
     <Loader />

      {
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/project/:slug" element={<ProjectDetails />} />
          </Routes>
        </Layout>
      }
    </>
  );
}