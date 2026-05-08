import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HeaderNav from "./components/ui/HeaderNav.jsx";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HeaderNav />
      <App />
    </BrowserRouter>
  </StrictMode>
);