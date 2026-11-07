import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FleetProvider } from './context/FleetContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { FleetPage } from './pages/FleetPage';
import { CartPage } from './pages/CartPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  return (
    <FleetProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/flota" element={<FleetPage />} />
              <Route path="/carrito" element={<CartPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </CartProvider>
    </FleetProvider>
  );
}