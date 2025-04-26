import { Routes, Route } from "react-router";
import AuthLayout from "./Providers/AuthLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Employees from "./pages/Employees";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import Charts from "./pages/Charts";
import Tables from "./pages/Tables";
import DashboardLayout from "./components/Layout/DashboardLayout/DashboardLayout";
import EmployeeProfile from "./pages/EmployeeProfile";
import Costs from "./pages/Costs";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/charts" element={<Charts />} />
      <Route path="/tables" element={<Tables />} />

      {/* Protected Route */}
      <Route element={<DashboardLayout />}>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeProfile />} />
          <Route path="/costs" element={<Costs />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
