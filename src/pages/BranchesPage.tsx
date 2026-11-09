const branches = [
  { city: 'Santiago Centro', address: "Av. Libertador Bernardo O'Higgins 1234", hours: 'Lun–Vie: 08:00–20:00', phone: '+56 2 2900 1100' },
  { city: 'Valparaíso', address: 'Av. Errázuriz 850, frente al puerto', hours: 'Lun–Sáb: 09:00–19:00', phone: '+56 32 250 4400' },
  { city: 'Concepción', address: "Av. O'Higgins 450, centro de la ciudad", hours: 'Lun–Vie: 08:30–19:30', phone: '+56 41 270 8800' },
];

export function BranchesPage() {
  return (
    <main className="container py-5 flex-grow-1">
      <header className="page-heading mb-5">
        <p className="eyebrow mb-2">CERCA DE TU PRÓXIMO DESTINO</p>
        <h1>Sucursales y puntos de <span className="text-bgs">retiro</span></h1>
        <p className="text-white-50 mb-0">Retira y devuelve tu vehículo en una de nuestras ubicaciones.</p>
      </header>
      <div className="row g-4">
        {branches.map((branch) => (
          <div className="col-12 col-md-4" key={branch.city}>
            <article className="branch-card bg-black border border-secondary rounded-3 p-4 h-100">
              <p className="eyebrow">BGS CAR · CHILE</p>
              <h2 className="h4 text-bgs">{branch.city}</h2>
              <p className="mb-2">{branch.address}</p>
              <hr className="border-secondary" />
              <p className="small text-white-50 mb-2">Atención: {branch.hours}</p>
              <p className="small text-white-50 mb-0">Teléfono: {branch.phone}</p>
            </article>
          </div>
        ))}
      </div>
    </main>
  );
}
