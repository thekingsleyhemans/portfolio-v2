import HeaderNav from "../ui/HeaderNav";
import Footer from "../ui/Footer";

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <HeaderNav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}