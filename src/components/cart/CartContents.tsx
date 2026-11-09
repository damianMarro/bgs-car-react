import { Link } from 'react-router-dom';
import type { CartItem } from '../../types';
import { formatCLP } from '../../utils';

export function CartItemsTable({ items, onRemove }: { items: CartItem[]; onRemove: (id: number) => void }) {
  return <div className="table-responsive bg-black border border-secondary rounded-3 p-2 p-md-3"><table className="table table-dark table-hover align-middle mb-0">
    <thead><tr><th>Vehículo</th><th>Precio / día</th><th>Días</th><th className="text-end">Subtotal</th><th aria-label="Acciones" /></tr></thead>
    <tbody>{items.map((item) => <tr key={item.id}><td><div className="d-flex align-items-center gap-3"><img src={item.imagen} alt="" className="cart-thumb rounded" /><span className="fw-semibold">{item.marca} {item.modelo}</span></div></td><td>{formatCLP(item.precioDia)}</td><td>{item.dias}</td><td className="text-end text-bgs fw-bold">{formatCLP(item.precioDia * item.dias)}</td><td><button type="button" className="btn btn-outline-danger btn-sm" aria-label={`Quitar ${item.marca} ${item.modelo}`} onClick={() => onRemove(item.id)}>×</button></td></tr>)}</tbody>
  </table></div>;
}

export function CartOrderSummary({ branch, rentalDays, total, onClear }: { branch: string; rentalDays: number; total: number; onClear: () => void }) {
  return <div className="card bg-black border-secondary summary-card"><div className="card-body p-4"><h2 className="h5 border-bottom border-secondary pb-3 mb-4">Resumen de orden</h2>
    <div className="d-flex justify-content-between mb-3"><span className="text-white-50">Sucursal</span><span>{branch}</span></div><div className="d-flex justify-content-between mb-3"><span className="text-white-50">Duración</span><span>{rentalDays} día(s)</span></div><div className="d-flex justify-content-between border-top border-secondary pt-3 mt-4"><span className="fs-5">Total</span><strong className="fs-4 text-bgs">{formatCLP(total)}</strong></div>
    <Link to="/checkout" className="btn btn-bgs fw-bold w-100 mt-4">Continuar al checkout</Link><button type="button" className="btn btn-outline-danger w-100 mt-2" onClick={onClear}>Vaciar reserva</button><Link to="/flota" className="btn btn-link text-white-50 w-100 mt-2">Seguir explorando</Link>
  </div></div>;
}
