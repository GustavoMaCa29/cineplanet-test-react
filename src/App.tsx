import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

// Lazy loaded pages
const Home = lazy(() => import("./pages/Home"));
const CandyStore = lazy(() => import("./pages/CandyStore"));
const Login = lazy(() => import("./pages/Login"));
const Payment = lazy(() => import("./pages/Payment"));

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/login";

  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideNavbarFooter && <NavigationBar />}
      <main className="flex-grow-1">{children}</main>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <Layout>
              <Suspense fallback={<div className="text-center p-5">Cargando...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/candy-store" element={<CandyStore />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/payment" element={<Payment />} />
                </Routes>
              </Suspense>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;