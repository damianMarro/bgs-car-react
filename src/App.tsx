
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { FleetPage } from './pages/FleetPage';

export default function App() {
  return (
    
    <CartProvider>
      
      <BrowserRouter>
        <Navbar />
        
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<FleetPage />} /> 
            <Route path="/flota" element={<FleetPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}