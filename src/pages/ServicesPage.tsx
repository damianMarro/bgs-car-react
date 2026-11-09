const services = [
  { title: 'Arriendo diario y vacacional', body: 'Tarifas flexibles por día o fin de semana, con cobertura básica para viajar con tranquilidad.' },
  { title: 'Flotas para empresas', body: 'Alternativas de arriendo para equipos y empresas que necesitan movilidad durante todo el año.' },
  { title: 'Asistencia en ruta', body: 'Acompañamiento y orientación durante tu viaje, estés donde estés.' },
];

export function ServicesPage() {
  return (
    <main className="container py-5 flex-grow-1">
      <header className="page-heading text-center mb-5">
        <p className="eyebrow mb-2">SOLUCIONES PARA TU CAMINO</p>
        <h1>Nuestros <span className="text-bgs">servicios</span></h1>
        <p className="text-white-50 mb-0">Opciones de movilidad para viajes, trabajo y escapadas.</p>
      </header>
      <div className="row g-4">
        {services.map((service, index) => (
          <div className="col-12 col-md-4" key={service.title}>
            <article className="service-card bg-black border border-secondary rounded-3 p-4 h-100">
              <span className="service-number">0{index + 1}</span>
              <h2 className="h4 mt-4">{service.title}</h2>
              <p className="text-white-50 mb-0">{service.body}</p>
            </article>
          </div>
        ))}
      </div>
    </main>
  );
}
