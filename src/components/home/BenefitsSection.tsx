import { Link } from 'react-router-dom';

const benefits = [
  ['Tarifas claras', 'Precios diarios transparentes para que planifiques sin sorpresas.'],
  ['Una flota para cada plan', 'Sedanes, SUV, deportivos y camionetas listos para salir.'],
  ['Estamos contigo', 'Atención y asistencia para acompañarte durante tu viaje.'],
];

export function BenefitsSection() {
  return <section className="benefits-section py-5"><div className="container py-lg-3">
    <div className="text-center mb-5"><p className="eyebrow mb-2">POR QUÉ BGS CAR</p><h2>Viaja con tranquilidad</h2></div>
    <div className="row g-4">{benefits.map(([title, description]) => <div className="col-12 col-md-4" key={title}><article className="benefit-card h-100 p-4 rounded-3"><span className="benefit-mark" aria-hidden="true">✦</span><h3 className="h5 mt-3">{title}</h3><p className="text-white-50 mb-0">{description}</p></article></div>)}</div>
    <div className="text-center mt-5"><Link to="/sucursales" className="btn btn-outline-bgs px-4">Encuentra tu sucursal</Link></div>
  </div></section>;
}
