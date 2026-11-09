import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckoutOrderSummary } from '../components/checkout/CheckoutOrderSummary';
import { CustomerDetailsForm, DeliveryDetailsForm } from '../components/checkout/CheckoutForms';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import type { DeliveryDetails, RentalOrder } from '../types';

const initialDelivery: DeliveryDetails = { method: 'pickup', branch: localStorage.getItem('bgs_sucursal_reserva') || 'Santiago', street: '', apartment: '', region: 'Región Metropolitana de Santiago', commune: '', notes: '' };

export function CheckoutPage() {
  const navigate = useNavigate();
  const { name, surname, email } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();
  const [customer, setCustomer] = useState({ name, surname, email });
  const [delivery, setDelivery] = useState(initialDelivery);
  const [paymentMode, setPaymentMode] = useState<'approved' | 'rejected'>('approved');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cart.length) return;
    const order: RentalOrder = { code: `BGS-${Date.now().toString().slice(-8)}`, createdAt: new Date().toISOString(), customer, delivery, items: cart, total: totalPrice, status: paymentMode };
    if (paymentMode === 'approved') {
      const previous = JSON.parse(localStorage.getItem('bgs_ordenes') || '[]') as RentalOrder[];
      localStorage.setItem('bgs_ordenes', JSON.stringify([order, ...previous]));
      localStorage.setItem('bgs_ultima_orden', JSON.stringify(order));
      clearCart();
    } else localStorage.setItem('bgs_ultimo_pago', JSON.stringify(order));
    navigate(`/checkout/resultado/${paymentMode}`);
  };
  const changeDelivery = (field: keyof DeliveryDetails, value: string) => setDelivery((current) => ({ ...current, [field]: value }));
  if (!cart.length) return <main className="container py-5 flex-grow-1"><section className="empty-state text-center rounded-3 p-5"><h1 className="h3">No hay una reserva para pagar</h1><p className="text-white-50">Agrega un vehículo desde la flota para continuar.</p><Link to="/flota" className="btn btn-bgs">Ir a la flota</Link></section></main>;
  return <main className="container py-5 flex-grow-1"><header className="page-heading mb-4"><p className="eyebrow mb-2">PASO FINAL</p><h1>Datos de <span className="text-bgs">reserva</span></h1><p className="text-white-50">Completa tus datos y elige cómo recibir o retirar el vehículo.</p></header>
    <form onSubmit={submit}><div className="row g-4 align-items-start"><div className="col-12 col-lg-8"><CustomerDetailsForm customer={customer} onChange={(field, value) => setCustomer((current) => ({ ...current, [field]: value }))} /><DeliveryDetailsForm delivery={delivery} onChange={changeDelivery} /></div><aside className="col-12 col-lg-4"><CheckoutOrderSummary items={cart} total={totalPrice} rejected={paymentMode === 'rejected'} onRejectedChange={(rejected) => setPaymentMode(rejected ? 'rejected' : 'approved')} /></aside></div></form>
  </main>;
}
