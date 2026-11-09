import { formatCLP } from '../../utils';
import type { CartItem } from '../../types';

export function OrderSummary({ items, total, title, action }: { items: CartItem[]; total: number; title: string; action: React.ReactNode }) {
  return <section className="card bg-black border-secondary summary-card"><div className="card-body p-4"><h2 className="h5 border-bottom border-secondary pb-3 mb-3">{title}</h2>
    <div className="checkout-items mb-3">{items.map((item) => <div className="d-flex justify-content-between gap-3 small py-2 border-bottom border-secondary" key={item.id}><span>{item.marca} {item.modelo} · {item.dias} día(s)</span><span className="text-nowrap">{formatCLP(item.precioDia * item.dias)}</span></div>)}</div>
    <div className="d-flex justify-content-between fs-5"><span>Total</span><strong className="text-bgs">{formatCLP(total)}</strong></div>{action}
  </div></section>;
}
