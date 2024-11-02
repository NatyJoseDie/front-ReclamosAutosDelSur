import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeBienvenida, setMensajeBienvenida] = useState(''); // Para el mensaje de bienvenida
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTimeout(() => {
      const isSuccess = true;
      if (isSuccess) {
        setMensajeBienvenida(`¡Bienvenido, ${nombre}! Registro exitoso.`);
        setTimeout(() => {
          navigate('/perfil');
        }, 2000); // Redirige al perfil después de 2 segundos
      } else {
        setError('Error en el registro, intente nuevamente.');
      }
    }, 1000); 
  };

  return (
    <div className="register-container">
      {mensajeBienvenida ? (
        <div className="welcome-message">
          <h2>{mensajeBienvenida}</h2>
          <p>Serás redirigido a tu perfil en breve...</p>
        </div>
      ) : (
        <>
          <h2>Registro</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <input
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Registrar</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
