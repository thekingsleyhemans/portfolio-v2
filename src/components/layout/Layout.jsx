import { useLocation } from "react-router-dom";

import HeaderNav from "../ui/HeaderNav";
import Footer from "../ui/Footer";

export default function Layout({ children }) {
  const location = useLocation();

  const path = location.pathname.toLowerCase().replace(/\/$/, "");

  const hideChrome = path.startsWith("/archives");

  return (
    <div className="app-shell">
      {!hideChrome && <HeaderNav />}

      <main>{children}</main>

      {!hideChrome && <Footer />}
    </div>
  );
}