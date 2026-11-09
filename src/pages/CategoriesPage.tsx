import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { useFleet } from '../hooks/useFleet';

export function CategoriesPage() {
  const { fleet } = useFleet();

  return (
    <main className="container py-5 flex-grow-1">
      <header className="page-heading mb-5">
        <p className="eyebrow mb-2">ENCUENTRA EL TIPO DE AUTO QUE BUSCAS</p>
        <h1>Explora por <span className="text-bgs">categoría</span></h1>
        <p className="text-white-50 mb-0">Selecciona una categoría para ver los vehículos disponibles.</p>
      </header>
      <div className="row g-4">
        {categories.map((category) => (
          <div className="col-6 col-md-3" key={category.id}>
            <Link to={`/categorias/${category.id}`} className="category-tile card bg-black border-secondary text-light h-100 text-decoration-none">
              <img src={category.image} className="card-img-top vehicle-image" alt="" />
              <div className="card-body">
                <p className="small text-bgs mb-1">{fleet.filter((vehicle) => vehicle.categoria === category.id).length} vehículos</p>
                <h2 className="h5">{category.name}</h2>
                <p className="small text-white-50 mb-0">{category.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
