import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FleetProvider } from './context/FleetContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { FleetPage } from './pages/FleetPage';
import { CartPage } from './pages/CartPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';

export default function App() {
  return (
    <AuthProvider>
      <FleetProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/flota" element={<FleetPage />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Ruta Protegida: Solo accesible para admins */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<AdminPage />} />
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </CartProvider>
      </FleetProvider>
    </AuthProvider>
  );
}