import React from 'react';
import './Contacto.css';

const Contacto = () => {
  return (
    <div className="contacto-container">
      <h2>Contacto</h2>
      <form>
        <div className="form-group">
          <input type="text" placeholder="Nombre" required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Correo electrónico" required />
        </div>
        <div className="form-group">
          <textarea placeholder="Mensaje" required></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;
