import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import './Login.css';

function LoginProfesional() {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const loginResponse = await axios.post('http://localhost:3555/api/v1/auth/login', {
        correoElectronico,
        contrasenia
      });

      const token = loginResponse.data.token;

      if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const perfilResponse = await axios.get('http://localhost:3555/api/v1/auth/perfil');
        const userData = perfilResponse.data.user;

        // Verificar si es personal interno (tipo 1 o 2)
        if (userData.idUsuarioTipo === 3) {
          setError('Acceso denegado. Esta entrada es solo para personal interno. Por favor, use el login principal.');
          localStorage.clear();
          return;
        }

        localStorage.setItem('userId', userData.idUsuario);
        localStorage.setItem('userName', userData.nombre);
        localStorage.setItem('userApellido', userData.apellido);
        localStorage.setItem('userEmail', userData.correoElectronico);
        
        const rol = userData.idUsuarioTipo === 1 ? 'ADMIN' : 'EMPLEADO';
        localStorage.setItem('userRole', rol);

        switch(rol) {
          case 'ADMIN':
            navigate('/dashboard/admin');
            break;
          case 'EMPLEADO':
            navigate('/reclamos-oficina');
            break;
          default:
            navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error completo:', error);
      
      if (error.response?.status === 401) {
        setError('Credenciales incorrectas. Por favor, verifica tu correo y contraseña.');
      } else {
        setError(
          error.response?.data?.message || 
          'Error al iniciar sesión. Por favor, intenta de nuevo.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        {/* Fondo oscuro con gradiente */}
      </div>
      <div className="login-right">
        <div className="login-header">
          <h1>Acceso Interno - Autos del Sur</h1>
          <p className="login-description">
            Portal exclusivo para personal interno de la concesionaria.
          </p>
        </div>
        
        <div className="login-card">
          <img src="/logo.png" alt="Logo Concesionaria" className="login-logo" />
          <h2>Acceso Personal Interno</h2>

          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={correoElectronico}
                onChange={(e) => setCorreoElectronico(e.target.value)}
                placeholder="Correo electrónico corporativo"
                className="login-input"
                required
              />
            </div>

            <div className="form-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                placeholder="Contraseña"
                className="login-input"
                required
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>

            <button 
              type="submit" 
              className="login-button" 
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'INGRESAR'}
            </button>
          </form>

          <div className="login-footer">
            <Link to="/login" className="back-to-login">
              Volver al login principal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginProfesional;