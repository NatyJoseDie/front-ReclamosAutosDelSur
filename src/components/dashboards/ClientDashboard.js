import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaClipboardList, FaPlus, FaBell, FaUser, FaArrowLeft } from 'react-icons/fa';
import './Dashboard.css';

function ClientDashboard() {
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const nombre = localStorage.getItem('userName');
    const apellido = localStorage.getItem('userApellido');
    const imagen = localStorage.getItem('userImage') || 'https://via.placeholder.com/150';
    setUserName(`${nombre} ${apellido}`);
    setUserImage(imagen);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-background">
      <Container fluid className="dashboard-container">
        {/* Botón Volver */}
        <Button 
          className="back-button" 
          onClick={() => navigate(-1)}
          variant="link"
        >
          <FaArrowLeft /> Volver
        </Button>

        {/* Header con Logo y Perfil */}
        <Row className="header-section mb-4 py-3">
          <Col xs={12} md={6} className="text-center text-md-start">
            <Image 
              src="/logo.png"
              alt="Logo Empresa" 
              className="company-logo" 
            />
          </Col>
          <Col xs={12} md={6} className="text-center text-md-end">
            <div className="user-profile-section">
              <Image 
                src={userImage} 
                roundedCircle 
                className="user-avatar" 
              />
              <span className="user-name ms-2">{userName}</span>
            </div>
          </Col>
        </Row>

        <Container>
          {/* Mensaje de Bienvenida */}
          <Row className="welcome-section text-center mb-5">
            <Col>
              <h1 className="welcome-title">Bienvenido, {userName}</h1>
              <p className="welcome-subtitle">¿Qué deseas hacer hoy?</p>
            </Col>
          </Row>

          {/* Botones de Acción Principal */}
          <Row className="action-buttons-section">
            <Col lg={3} md={6} className="mb-4">
              <Card className="action-card">
                <Card.Body>
                  <FaClipboardList className="action-icon" />
                  <Card.Title>MIS RECLAMOS</Card.Title>
                  <Button 
                    variant="light"
                    onClick={() => handleNavigation('/consultar-reclamos')}
                  >
                    Ver Reclamos
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="action-card">
                <Card.Body>
                  <FaPlus className="action-icon" />
                  <Card.Title>NUEVO RECLAMO</Card.Title>
                  <Button 
                    variant="light"
                    onClick={() => handleNavigation('/crear-reclamo')}
                  >
                    Crear Reclamo
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="action-card">
                <Card.Body>
                  <FaBell className="action-icon" />
                  <Card.Title>NOTIFICACIONES</Card.Title>
                  <Button 
                    variant="light"
                    onClick={() => handleNavigation('/notificaciones')}
                  >
                    Ver Notificaciones
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="action-card">
                <Card.Body>
                  <FaUser className="action-icon" />
                  <Card.Title>MI PERFIL</Card.Title>
                  <Button 
                    variant="light"
                    onClick={() => handleNavigation('/perfil')}
                  >
                    Editar Perfil
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Nueva sección para la imagen */}
          <Row className="dashboard-image-section">
            <Col className="text-center">
              <img 
                src="/taller.jpg"
                alt="Taller Autos del Sur"
                className="dashboard-bottom-image"
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default ClientDashboard;