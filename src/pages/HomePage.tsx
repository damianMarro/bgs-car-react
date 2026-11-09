import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { BenefitsSection } from '../components/home/BenefitsSection';
import { BookingSearch } from '../components/home/BookingSearch';
import { FeaturedVehicles } from '../components/home/FeaturedVehicles';
import { useCart } from '../hooks/useCart';
import { useFleet } from '../hooks/useFleet';
import type { Vehicle } from '../types';
import { calculateRentalDays } from '../utils';

function todayValue() {
  const today = new Date();
  const local = new Date(today.getTime() - today.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

export function HomePage() {
  const navigate = useNavigate();
  const { fleet } = useFleet();
  const { addToCart, setRentalDays } = useCart();
  const today = todayValue();
  const [branch, setBranch] = useState('');
  const [pickup, setPickup] = useState(today);
  const [returnDate, setReturnDate] = useState('');
  const [error, setError] = useState('');

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!branch || !pickup || !returnDate || returnDate <= pickup) {
      setError('Elige una sucursal y una devolución posterior a la fecha de retiro.');
      return;
    }
    setError('');
    setRentalDays(calculateRentalDays(pickup, returnDate));
    localStorage.setItem('bgs_sucursal_reserva', branch);
    navigate('/flota');
  };

  const handleRent = (vehicle: Vehicle) => addToCart(vehicle);
  return <>
    <BookingSearch today={today} branch={branch} pickup={pickup} returnDate={returnDate} error={error}
      onBranchChange={setBranch} onPickupChange={setPickup} onReturnChange={setReturnDate} onSubmit={submitSearch} />
    <FeaturedVehicles vehicles={fleet.slice(0, 3)} onRent={handleRent} />
    <BenefitsSection />
  </>;
}
