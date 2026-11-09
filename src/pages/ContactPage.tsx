import { useState } from 'react';
import type { FormEvent } from 'react';

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <main className="container py-5 flex-grow-1">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <section className="contact-card bg-black border border-secondary rounded-3 p-4 p-md-5">
            <header className="text-center mb-4">
              <p className="eyebrow mb-2">ESTAMOS PARA AYUDARTE</p>
              <h1>Hablemos de tu <span className="text-bgs">viaje</span></h1>
              <p className="text-white-50 mb-0">Déjanos tus datos y tu consulta.</p>
            </header>
            {sent && <div className="alert alert-success" role="status">Gracias por escribirnos. Recibimos tu consulta.</div>}
            <form onSubmit={submit}>
              <div className="mb-3">
                <label htmlFor="contact-name" className="form-label">Nombre completo</label>
                <input id="contact-name" className="form-control bg-dark text-light border-secondary" type="text" required />
              </div>
              <div className="mb-3">
                <label htmlFor="contact-email" className="form-label">Correo electrónico</label>
                <input id="contact-email" className="form-control bg-dark text-light border-secondary" type="email" required />
              </div>
              <div className="mb-4">
                <label htmlFor="contact-message" className="form-label">Mensaje</label>
                <textarea id="contact-message" className="form-control bg-dark text-light border-secondary" rows={5} required />
              </div>
              <button className="btn btn-bgs w-100 fw-bold" type="submit">Enviar consulta</button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
