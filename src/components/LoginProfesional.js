import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
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

    // Limpiar sesión anterior
    localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];

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
        if (userData.idUsuarioTipo !== 1 && userData.idUsuarioTipo !== 2) {
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
            navigate('/dashboard/employee');
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
                  <span className="h1 fw-bold mb-0">Portal Interno</span>
                </div>

                <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Acceso Personal Interno</h5>

                {error && (
                  <Alert variant="danger" onClose={() => setError('')} dismissible>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-light">Correo corporativo</Form.Label>
                    <Form.Control
                      type="email"
                      value={correoElectronico}
                      onChange={(e) => setCorreoElectronico(e.target.value)}
                      placeholder="usuario@autosdelsur.com"
                      required
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: 'none'
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="text-light">Contraseña</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                        placeholder="Tu contraseña"
                        required
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          border: 'none'
                        }}
                      />
                      <Button 
                        type="button"
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        }}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
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
                      {loading ? 'Verificando credenciales...' : 'Acceder'}
                    </Button>
                  </div>

                  <div className="text-center">
                    <Link to="/login" className="btn btn-outline-light">
                      Volver al login principal
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="d-none d-md-flex align-items-center justify-content-center" style={{
            backgroundImage: `url('/concesionaria-interna.jpg')`,
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
              <h2 className="mb-4">Portal Interno</h2>
              <p>
                Acceso exclusivo para personal de Autos del Sur.
                Gestiona tus actividades y accede a las herramientas internas.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default LoginProfesional;