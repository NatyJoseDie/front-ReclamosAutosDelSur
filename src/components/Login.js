import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import './Login.css';

function Login() {
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

        localStorage.setItem('userId', userData.idUsuario);
        localStorage.setItem('userName', userData.nombre);
        localStorage.setItem('userApellido', userData.apellido);
        localStorage.setItem('userEmail', userData.correoElectronico);
        
        const rol = userData.idUsuarioTipo === 1 ? 'ADMIN' : 
                   userData.idUsuarioTipo === 2 ? 'EMPLEADO' : 'CLIENTE';
        localStorage.setItem('userRole', rol);

        console.log('Rol del usuario:', rol);

        switch(rol) {
          case 'ADMIN':
            navigate('/dashboard/admin');
            break;
          case 'EMPLEADO':
            navigate('/dashboard/employee');
            break;
          case 'CLIENTE':
            navigate('/dashboard/client');
            break;
          default:
            navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Respuesta del servidor:', error.response);
      
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
        {/* Encabezado fuera del cuadro de login */}
        <div className="login-header">
          <h1>Concesionaria Autos del Sur</h1>
          <p className="login-description">
            En nuestra concesionaria, nos especializamos en la venta de vehículos 
            nuevos y usados, brindando el mejor servicio y asesoramiento personalizado.
          </p>
        </div>
        
        {/* Cuadro de login */}
        <div className="login-card">
          <img src="/logo.png" alt="Logo Concesionaria" className="login-logo" />
          <h2>Inicia sesión</h2>

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
                placeholder="Correo electrónico"
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
              <button type="button" className="help-button" title="Ayuda con la contraseña">
                ?
              </button>
            </div>

            <div className="remember-me">
              <input
                type="checkbox"
                id="recordar"
              />
              <label htmlFor="recordar">Recordarme</label>
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
            <Link to="/forgot-password" className="forgot-password">
              ¿Has olvidado tu contraseña?
            </Link>
            <p className="register-text">
              ¿No sos cliente aún? <Link to="/register">Registrate</Link>
            </p>
            <Link to="/login-profesional" className="professional-login">
              ACCESO INTERNO
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
