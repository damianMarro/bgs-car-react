import { Link, useParams } from 'react-router-dom';
import { formatCLP } from '../utils';
import type { RentalOrder } from '../types';

function readOrder(key: string): RentalOrder | null {
  try {
    const order = localStorage.getItem(key);
    return order ? JSON.parse(order) as RentalOrder : null;
  } catch {
    return null;
  }
}

export function CheckoutResultPage() {
  const { resultado } = useParams();
  const approved = resultado === 'approved';
  const order = readOrder(approved ? 'bgs_ultima_orden' : 'bgs_ultimo_pago');

  return (
    <main className="container py-5 flex-grow-1">
      <section className="receipt-card bg-black border border-secondary rounded-3 shadow p-4 p-md-5 mx-auto">
        <p className={`eyebrow ${approved ? '' : 'text-danger'}`}>{approved ? 'RESERVA CONFIRMADA' : 'PAGO NO PROCESADO'}</p>
        <h1 className="h2">{approved ? '¡Gracias por reservar con BGS Car!' : 'No se pudo completar el pago'}</h1>
        <p className="text-white-50">{approved ? 'Tu solicitud quedó registrada en esta demostración.' : 'Tu reserva sigue en el carrito. Puedes volver a intentarlo.'}</p>

        {order && (
          <>
            <div className="receipt-summary border-top border-secondary mt-4 pt-4">
              <div className="d-flex justify-content-between gap-3"><span className="text-white-50">Código de reserva</span><strong>{order.code}</strong></div>
              <div className="d-flex justify-content-between gap-3 mt-2"><span className="text-white-50">Cliente</span><span>{order.customer.name} {order.customer.surname}</span></div>
              <div className="d-flex justify-content-between gap-3 mt-2"><span className="text-white-50">Correo</span><span>{order.customer.email}</span></div>
              <div className="d-flex justify-content-between gap-3 mt-2"><span className="text-white-50">Entrega</span><span>{order.delivery.method === 'pickup' ? `Retiro en ${order.delivery.branch}` : `${order.delivery.street}, ${order.delivery.commune}`}</span></div>
            </div>
            <div className="table-responsive mt-4">
              <table className="table table-dark align-middle mb-0">
                <thead><tr><th>Vehículo</th><th>Días</th><th className="text-end">Subtotal</th></tr></thead>
                <tbody>{order.items.map((item) => <tr key={item.id}><td>{item.marca} {item.modelo}</td><td>{item.dias}</td><td className="text-end">{formatCLP(item.precioDia * item.dias)}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between border-top border-secondary pt-3 mt-3 fs-5"><span>Total {approved ? 'pagado' : 'pendiente'}</span><strong className="text-bgs">{formatCLP(order.total)}</strong></div>
          </>
        )}

        <div className="d-flex flex-wrap gap-2 mt-4">
          {approved ? <button type="button" className="btn btn-outline-bgs" onClick={() => window.print()}>Imprimir / guardar como PDF</button> : <Link to="/checkout" className="btn btn-bgs">Intentar nuevamente</Link>}
          <Link to="/" className="btn btn-outline-light">Volver al inicio</Link>
        </div>
      </section>
    </main>
  );
}
