import type { DeliveryDetails } from '../../types';

const regions = ['Región Metropolitana de Santiago', 'Región de Valparaíso', 'Región del Biobío'];
const controlClass = 'form-control bg-dark text-light border-secondary';
const selectClass = 'form-select bg-dark text-light border-secondary';

export function CustomerDetailsForm({ customer, onChange }: { customer: { name: string; surname: string; email: string }; onChange: (field: keyof typeof customer, value: string) => void }) {
  return <section className="checkout-section bg-black border border-secondary rounded-3 p-4 mb-4"><h2 className="h5 mb-3">Información del cliente</h2><div className="row g-3">
    <div className="col-md-6"><label htmlFor="checkout-name" className="form-label">Nombre *</label><input id="checkout-name" autoComplete="given-name" className={controlClass} value={customer.name} onChange={(e) => onChange('name', e.target.value)} required /></div>
    <div className="col-md-6"><label htmlFor="checkout-surname" className="form-label">Apellido *</label><input id="checkout-surname" autoComplete="family-name" className={controlClass} value={customer.surname} onChange={(e) => onChange('surname', e.target.value)} required /></div>
    <div className="col-12"><label htmlFor="checkout-email" className="form-label">Correo electrónico *</label><input id="checkout-email" autoComplete="email" type="email" className={controlClass} value={customer.email} onChange={(e) => onChange('email', e.target.value)} required /></div>
  </div></section>;
}

export function DeliveryDetailsForm({ delivery, onChange }: { delivery: DeliveryDetails; onChange: (field: keyof DeliveryDetails, value: string) => void }) {
  return <section className="checkout-section bg-black border border-secondary rounded-3 p-4"><h2 className="h5 mb-3">Entrega del vehículo</h2>
    <div className="d-flex flex-column flex-sm-row gap-3 mb-4"><label className="delivery-option form-check flex-fill"><input className="form-check-input" type="radio" name="delivery" value="pickup" checked={delivery.method === 'pickup'} onChange={() => onChange('method', 'pickup')} /><span className="form-check-label">Retirar en sucursal</span></label><label className="delivery-option form-check flex-fill"><input className="form-check-input" type="radio" name="delivery" value="home" checked={delivery.method === 'home'} onChange={() => onChange('method', 'home')} /><span className="form-check-label">Entrega a domicilio</span></label></div>
    {delivery.method === 'pickup' ? <div className="mb-3"><label htmlFor="checkout-branch" className="form-label">Sucursal de retiro *</label><select id="checkout-branch" className={selectClass} value={delivery.branch} onChange={(e) => onChange('branch', e.target.value)} required><option>Santiago</option><option>Valparaíso</option><option>Concepción</option></select></div> :
      <div className="row g-3"><div className="col-md-8"><label htmlFor="checkout-street" className="form-label">Calle y número *</label><input id="checkout-street" className={controlClass} value={delivery.street} onChange={(e) => onChange('street', e.target.value)} required /></div><div className="col-md-4"><label htmlFor="checkout-apartment" className="form-label">Departamento</label><input id="checkout-apartment" className={controlClass} value={delivery.apartment} onChange={(e) => onChange('apartment', e.target.value)} /></div><div className="col-md-6"><label htmlFor="checkout-region" className="form-label">Región *</label><select id="checkout-region" className={selectClass} value={delivery.region} onChange={(e) => onChange('region', e.target.value)}>{regions.map((region) => <option key={region}>{region}</option>)}</select></div><div className="col-md-6"><label htmlFor="checkout-commune" className="form-label">Comuna *</label><input id="checkout-commune" className={controlClass} value={delivery.commune} onChange={(e) => onChange('commune', e.target.value)} required /></div></div>}
    <div className="mt-3"><label htmlFor="checkout-notes" className="form-label">Indicaciones para la entrega (opcional)</label><textarea id="checkout-notes" rows={3} className={controlClass} value={delivery.notes} onChange={(e) => onChange('notes', e.target.value)} /></div>
  </section>;
}
