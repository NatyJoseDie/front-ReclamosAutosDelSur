import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
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
    <section className="vh-100">
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col md={6} className="text-black d-flex align-items-center justify-content-center">
            <Card className="px-5 py-5" style={{
              borderRadius: '1rem', 
              width: '100%', 
              maxWidth: '500px',
              backgroundColor: 'rgba(33, 37, 41, 0.9)',
              color: 'white'
            }}>
              <Card.Body>
                <div className="d-flex align-items-center mb-3 pb-1">
                  <i className="bi bi-car-front-fill me-3 text-warning" style={{ fontSize: '2rem' }}></i>
                  <span className="h1 fw-bold mb-0">Autos del Sur</span>
                </div>

                <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Inicia sesión en tu cuenta</h5>

                {error && (
                  <Alert variant="danger" onClose={() => setError('')} dismissible>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-light">Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      value={correoElectronico}
                      onChange={(e) => setCorreoElectronico(e.target.value)}
                      placeholder="Ingrese su correo electrónico"
                      required
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: 'none'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="text-light">Contraseña</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                        placeholder="Ingrese su contraseña"
                        required
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          border: 'none'
                        }}
                      />
                      <Button 
                        type="button"
                        variant="link"
                        className="position-absolute end-0 top-50 translate-middle-y"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword(!showPassword);
                        }}
                        style={{ 
                          zIndex: 2,
                          background: 'transparent',
                          border: 'none',
                          color: '#6c757d'
                        }}
                      >
                        <FontAwesomeIcon 
                          icon={showPassword ? faEyeSlash : faEye} 
                          style={{ fontSize: '1rem' }}
                        />
                      </Button>
                    </div>
                  </Form.Group>

                  <div className="pt-1 mb-4">
                    <Button 
                      type="submit" 
                      variant="warning"
                      className="btn-lg btn-block w-100"
                      disabled={loading}
                    >
                      {loading ? 'Iniciando sesión...' : 'Ingresar'}
                    </Button>
                  </div>

                  <Link to="/forgot-password" className="small text-light">¿Olvidaste tu contraseña?</Link>
                  <p className="mb-5 pb-lg-2 text-light">
                    ¿No tienes una cuenta? <Link to="/register" className="text-warning">Regístrate aquí</Link>
                  </p>
                  <Link to="/login-profesional" className="small text-light">Acceso Interno</Link>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="d-none d-md-flex align-items-center justify-content-center" style={{
            backgroundImage: `url('/concesionaria.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: '2rem',
              borderRadius: '1rem',
              color: 'white',
              textAlign: 'center'
            }}>
              <h2 className="mb-4">Concesionaria Autos del Sur</h2>
              <p>
                En nuestra concesionaria, nos especializamos en la venta de vehículos 
                nuevos y usados, brindando el mejor servicio y asesoramiento personalizado.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;