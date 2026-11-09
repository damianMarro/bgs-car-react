import { Link } from 'react-router-dom';
import { CartItemsTable, CartOrderSummary } from '../components/cart/CartContents';
import { useCart } from '../hooks/useCart';

export function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice, rentalDays } = useCart();
  const branch = localStorage.getItem('bgs_sucursal_reserva') || 'Por seleccionar';
  return <main className="container py-5 flex-grow-1"><header className="page-heading mb-4"><p className="eyebrow mb-2">TU VIAJE, A UN PASO</p><h1>Mi <span className="text-bgs">reserva</span></h1></header>
    {cart.length === 0 ? <section className="empty-state text-center rounded-3 p-5"><h2 className="h4">Tu reserva está vacía</h2><p className="text-white-50">Explora la flota y agrega un vehículo para continuar.</p><Link to="/flota" className="btn btn-bgs">Ver la flota</Link></section> :
      <div className="row g-4 align-items-start"><section className="col-12 col-lg-8" aria-label="Vehículos en la reserva"><CartItemsTable items={cart} onRemove={removeFromCart} /></section><aside className="col-12 col-lg-4"><CartOrderSummary branch={branch} rentalDays={rentalDays} total={totalPrice} onClear={clearCart} /></aside></div>}
  </main>;
}
