import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import VehicleDetails from './pages/VehicleDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Finance from './pages/Finance';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/vehicle/:id" element={<VehicleDetails />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
