import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteFooter } from './components/layout/SiteFooter';
import { SiteHeader } from './components/layout/SiteHeader';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FleetProvider } from './context/FleetContext';
import { useAuth } from './hooks/useAuth';
import { AdminPage } from './pages/AdminPage';
import { BranchesPage } from './pages/BranchesPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CheckoutResultPage } from './pages/CheckoutResultPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { ContactPage } from './pages/ContactPage';
import { FleetPage } from './pages/FleetPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { OffersPage } from './pages/OffersPage';
import { ServicesPage } from './pages/ServicesPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';

function AdminRoute() {
  const { role } = useAuth();
  return role === 'admin' ? <AdminPage /> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flota" element={<FleetPage />} />
        <Route path="/categorias" element={<CategoriesPage />} />
        <Route path="/categorias/:categoria" element={<CategoryDetailPage />} />
        <Route path="/vehiculos/:id" element={<VehicleDetailPage />} />
        <Route path="/ofertas" element={<OffersPage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/resultado/:resultado" element={<CheckoutResultPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/sucursales" element={<BranchesPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SiteFooter />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FleetProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </FleetProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
