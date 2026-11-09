import type { FormEvent } from 'react';

interface BookingSearchProps {
  today: string;
  branch: string;
  pickup: string;
  returnDate: string;
  error: string;
  onBranchChange: (value: string) => void;
  onPickupChange: (value: string) => void;
  onReturnChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function BookingSearch({ today, branch, pickup, returnDate, error, onBranchChange, onPickupChange, onReturnChange, onSubmit }: BookingSearchProps) {
  return <section className="hero-section d-flex align-items-center text-center"><div className="container py-5">
    <p className="eyebrow mb-3">BGS CAR · ARRIENDO DE VEHÍCULOS</p><h1 className="display-3 fw-bold mb-3">Tu próximo viaje<br /><span className="text-bgs">comienza aquí.</span></h1><p className="lead text-white-50 mb-5">Encuentra el auto ideal y reserva en minutos.</p>
    <form className="booking-form mx-auto text-start" onSubmit={onSubmit}><div className="row g-3 align-items-end">
      <div className="col-12 col-md-3"><label className="form-label small text-bgs fw-bold" htmlFor="branch">Sucursal</label><select id="branch" className="form-select bg-dark text-light border-secondary" value={branch} onChange={(event) => onBranchChange(event.target.value)} required><option value="">Selecciona una sucursal</option><option value="Santiago">Santiago</option><option value="Valparaíso">Valparaíso</option><option value="Concepción">Concepción</option></select></div>
      <div className="col-12 col-md-3"><label className="form-label small text-bgs fw-bold" htmlFor="pickup-date">Fecha de retiro</label><input id="pickup-date" className="form-control bg-dark text-light border-secondary" type="date" min={today} value={pickup} onChange={(event) => onPickupChange(event.target.value)} required /></div>
      <div className="col-12 col-md-3"><label className="form-label small text-bgs fw-bold" htmlFor="return-date">Fecha de devolución</label><input id="return-date" className="form-control bg-dark text-light border-secondary" type="date" min={pickup || today} value={returnDate} onChange={(event) => onReturnChange(event.target.value)} required /></div>
      <div className="col-12 col-md-3"><button className="btn btn-bgs w-100 fw-bold py-2" type="submit">Buscar vehículos</button></div>
    </div>{error && <p className="text-warning small mt-3 mb-0" role="alert">{error}</p>}</form>
  </div></section>;
}
