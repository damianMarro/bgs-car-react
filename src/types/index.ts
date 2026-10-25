export interface Vehicle {
  id: number;
  marca: string;
  modelo: string;
  categoria: 'sedan' | 'suv' | 'deportivo' | 'camioneta';
  transmision: 'Automatico' | 'Manual';
  precioDia: number;
  imagen: string; // aqui ira la ruta de la imagen
}


export interface CartItem extends Vehicle {
  dias: number; 
}

export type UserRole = 'cliente' | 'admin' | null;