import type { CartItem } from '../../types';
import { formatCLP } from '../../utils';
import { OrderSummary } from '../shared/OrderSummary';

export function CheckoutOrderSummary({ items, total, rejected, onRejectedChange }: { items: CartItem[]; total: number; rejected: boolean; onRejectedChange: (rejected: boolean) => void }) {
  return <OrderSummary items={items} total={total} title="Resumen de compra" action={<>
    <div className="form-check mt-4"><input className="form-check-input" type="checkbox" id="payment-rejected" checked={rejected} onChange={(e) => onRejectedChange(e.target.checked)} /><label className="form-check-label small text-white-50" htmlFor="payment-rejected">Simular un pago rechazado para probar el flujo de error</label></div>
    <p className="form-text text-white-50">Demo local: no se procesan cargos reales.</p><button className="btn btn-bgs fw-bold w-100 mt-2" type="submit">{rejected ? 'Simular pago rechazado' : `Pagar ahora ${formatCLP(total)}`}</button>
  </>} />;
}
