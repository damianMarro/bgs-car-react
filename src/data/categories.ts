import type { Vehicle } from '../types';

export const categories: Array<{ id: Vehicle['categoria']; name: string; description: string; image: string }> = [
  { id: 'sedan', name: 'Sedanes', description: 'Comodidad para ciudad y carretera.', image: '/assets/img/camry.png' },
  { id: 'suv', name: 'SUV', description: 'Espacio y versatilidad para tu viaje.', image: '/assets/img/suburvan.png' },
  { id: 'deportivo', name: 'Deportivos', description: 'Modelos para disfrutar cada kilómetro.', image: '/assets/img/mustang.png' },
  { id: 'camioneta', name: 'Camionetas', description: 'Capacidad para el trabajo y la aventura.', image: '/assets/img/ram.png' },
];
