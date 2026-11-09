import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nombre: '', apellido: '', rut: '', correo: '', password: '' });

  const update = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = form.correo.trim().toLowerCase();
    const validDomain = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'].some((domain) => email.endsWith(domain));
    if (!form.nombre.trim() || !form.apellido.trim() || !form.rut.trim().includes('-')) {
      setError('Completa tu nombre, apellido y RUT con guion.');
      return;
    }
    if (!validDomain || form.password.length < 4 || form.password.length > 10) {
      setError('Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com y una contraseña de 4 a 10 caracteres.');
      return;
    }
    const role = email === 'admin@duoc.cl' ? 'admin' : 'cliente';
    signIn(form.nombre.trim(), form.apellido.trim(), email, role);
    navigate(role === 'admin' ? '/admin' : '/', { replace: true });
  };

  return (
    <main className="container py-5 flex-grow-1 d-flex align-items-center justify-content-center">
      <section className="login-card bg-black border border-secondary rounded-3 shadow-lg p-4 p-md-5">
        <header className="text-center mb-4">
          <p className="eyebrow mb-2">TU CUENTA BGS CAR</p>
          <h1 className="h2">Bienvenido a <span className="text-bgs">BGS Car</span></h1>
          <p className="small text-white-50 mb-0">El correo admin@duoc.cl abre el panel de administración en esta demo.</p>
        </header>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={submit}>
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="login-name" className="form-label">Nombre</label>
              <input id="login-name" name="nombre" className="form-control bg-dark text-light border-secondary" value={form.nombre} onChange={update} required />
            </div>
            <div className="col-sm-6">
              <label htmlFor="login-surname" className="form-label">Apellido</label>
              <input id="login-surname" name="apellido" className="form-control bg-dark text-light border-secondary" value={form.apellido} onChange={update} required />
            </div>
            <div className="col-12">
              <label htmlFor="login-rut" className="form-label">RUT</label>
              <input id="login-rut" name="rut" className="form-control bg-dark text-light border-secondary" placeholder="12345678-9" value={form.rut} onChange={update} required />
            </div>
            <div className="col-12">
              <label htmlFor="login-email" className="form-label">Correo electrónico</label>
              <input id="login-email" name="correo" type="email" className="form-control bg-dark text-light border-secondary" value={form.correo} onChange={update} required />
            </div>
            <div className="col-12">
              <label htmlFor="login-password" className="form-label">Contraseña</label>
              <input id="login-password" name="password" type="password" className="form-control bg-dark text-light border-secondary" value={form.password} onChange={update} minLength={4} maxLength={10} required />
            </div>
            <div className="col-12 pt-2">
              <button className="btn btn-bgs fw-bold w-100" type="submit">Crear cuenta / Ingresar</button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
