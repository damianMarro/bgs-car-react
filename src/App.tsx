// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { FleetPage } from './pages/FleetPage';
import { CartPage } from './pages/CartPage'; // Importamos la nueva pagina

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<FleetPage />} /> 
            <Route path="/flota" element={<FleetPage />} />
            {/* Agregamos la ruta del carrito */}
            <Route path="/carrito" element={<CartPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}