import { useLocation } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname.startsWith("/admin-dashboard") ||
    location.pathname.startsWith("/admin-requests") ||
    location.pathname.startsWith("/admin/residents") ||
    location.pathname.startsWith("/admin/complaints") ||
    location.pathname.startsWith("/admin/payments") ||
    location.pathname.startsWith("/admin/notices") ||

    location.pathname.startsWith("/resident-dashboard") ||
    location.pathname.startsWith("/resident-complaints") ||
    location.pathname.startsWith("/resident-notices") ||
    location.pathname.startsWith("/resident-payments") ||
    location.pathname.startsWith("/resident-profile") ||
    location.pathname.startsWith("/resident-notifications");

  return (
    <div
      className="d-flex flex-column"
      style={{ minHeight: "100vh" }}
    >
      {!hideLayout && <Navbar />}

      <main className="flex-grow-1">
        <AppRoutes />
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;