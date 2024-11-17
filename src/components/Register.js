import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import './Register.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeBienvenida, setMensajeBienvenida] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3555/api/v1/auth/register', {
        nombre,
        apellido,
        correoElectronico: email,
        contrasenia: password,
        idUsuarioTipo: 3
      });

      if (response.data) {
        setMensajeBienvenida(`¡Bienvenido, ${nombre}! Registro exitoso.`);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setError(
        error.response?.data?.message || 
        'Error en el registro. Por favor, intente nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col md={6} className="text-black d-flex align-items-center justify-content-center">
          <Card className="px-5 py-5" style={{borderRadius: '1rem', width: '100%', maxWidth: '500px'}}>
            <Card.Body>
              {mensajeBienvenida ? (
                <div className="text-center">
                  <h2>{mensajeBienvenida}</h2>
                  <p>Serás redirigido al login en breve...</p>
                </div>
              ) : (
                <>
                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="bi bi-car-front-fill me-3 text-warning" style={{ fontSize: '2rem' }}></i>
                    <span className="h1 fw-bold mb-0">Autos del Sur</span>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Crear una nueva cuenta</h5>

                  {error && (
                    <Alert variant="danger" onClose={() => setError('')} dismissible>
                      {error}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ingrese su nombre"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        placeholder="Ingrese su apellido"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingrese su correo electrónico"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingrese su contraseña"
                        required
                      />
                    </Form.Group>

                    <div className="pt-1 mb-4">
                      <Button 
                        type="submit" 
                        variant="dark" 
                        className="btn-lg btn-block"
                        disabled={loading}
                      >
                        {loading ? 'Registrando...' : 'Registrarse'}
                      </Button>
                    </div>

                    <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>
                      ¿Ya tienes una cuenta? <Link to="/login" style={{color: '#393f81'}}>Inicia sesión aquí</Link>
                    </p>
                  </Form>
                </>
              )}
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
              Únete a nuestra comunidad y disfruta de todos los beneficios 
              que tenemos para nuestros clientes registrados.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;