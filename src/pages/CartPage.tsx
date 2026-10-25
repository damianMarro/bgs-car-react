
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatCLP } from '../utils';

export function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();

  // Renderizado condicional: si el carrito esta vacio, mostramos otra vista
  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-4">Tu carrito esta vacio</h2>
        <p className="text-muted mb-4">Parece que aun no has seleccionado ningun vehiculo.</p>
        <Link to="/flota" className="btn btn-dark">
          Ir a la flota
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">Resumen de tu Reserva</h2>
      
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle bg-white mb-0">
          <thead className="table-dark">
            <tr>
              <th>Vehiculo</th>
              <th>Precio / Dia</th>
              <th>Dias</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img 
                      src={item.imagen} 
                      alt={item.modelo} 
                      style={{ width: '60px', height: '40px', objectFit: 'cover' }} 
                      className="rounded me-3"
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">{item.marca} {item.modelo}</h6>
                      <small className="text-muted text-capitalize">{item.categoria}</small>
                    </div>
                  </div>
                </td>
                <td>{formatCLP(item.precioDia)}</td>
                <td>{item.dias}</td>
                <td className="fw-bold">{formatCLP(item.precioDia * item.dias)}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4 p-4 bg-light rounded shadow-sm">
        <button className="btn btn-outline-secondary" onClick={clearCart}>
          Vaciar carrito
        </button>
        
        <div className="text-end">
          <h4 className="mb-0">
            Total: <span className="text-success">{formatCLP(totalPrice)}</span>
          </h4>
        </div>
      </div>
    </div>
  );
}