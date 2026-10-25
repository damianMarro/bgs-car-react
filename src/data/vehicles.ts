import type { Vehicle } from '../types';

export const vehicles: Vehicle[] = [
  {
    id: 1,
    marca: 'Toyota',
    modelo: 'Corolla',
    categoria: 'sedan',
    transmision: 'Automatico',
    precioDia: 35000, // adaptado de precio a precio dia.
    imagen: '/toyota-corolla.jpg', // adjuntar imagen a carpeta public! recordar
  },
  { 
    id: 2,
    marca: 'Honda',
    modelo: 'Civic',
    categoria: 'sedan',
    transmision: 'Automatico',
    precioDia: 38000,
    imagen: '/honda-civic.jpg',
  },
  {
    id: 3,
    marca: 'Jeep',
    modelo: 'Wrangler',
    categoria: 'camioneta',
    transmision: 'Manual',
    precioDia: 65000,
    imagen: '/jeep-wrangler.jpg',
  },
  {
    id: 4,
    marca: 'Ford',
    modelo: 'Mustang',
    categoria: 'deportivo',
    transmision: 'Automatico',
    precioDia: 90000,
    imagen: '/ford-mustang.jpg',
  },
  {
    id: 5,
    marca: 'Hyundai',
    modelo: 'Tucson',
    categoria: 'suv',
    transmision: 'Automatico',
    precioDia: 45000,
    imagen: '/hyundai-tucson.jpg',
  },
];