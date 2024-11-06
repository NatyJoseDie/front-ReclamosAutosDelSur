import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCar, FaUsers, FaHandshake, FaAward } from 'react-icons/fa';
import './Nosotros.css';

const Nosotros = () => (
  <div className="nosotros-page">
    <header className="nosotros-header">
      <h1>Sobre Nosotros</h1>
      <p className="header-subtitle">
        Más de 10 años brindando excelencia en servicio automotriz
      </p>
    </header>
    
    <Container>
      <Row className="mission-vision-section">
        <Col md={6}>
          <Card className="mission-card">
            <Card.Body>
              <h3>Nuestra Misión</h3>
              <p>
                Brindar soluciones automotrices integrales de alta calidad.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="vision-card">
            <Card.Body>
              <h3>Nuestra Visión</h3>
              <p>
                Ser líderes en servicio automotriz con excelencia e innovación.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="features-section">
        <h2 className="section-title">¿Por qué elegirnos?</h2>
        <Col md={3}>
          <div className="feature-card">
            <FaCar className="feature-icon" />
            <h4>Amplia Selección</h4>
            <p>Vehículos nuevos y usados.</p>
          </div>
        </Col>
        <Col md={3}>
          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h4>Equipo Experto</h4>
            <p>Personal capacitado.</p>
          </div>
        </Col>
        <Col md={3}>
          <div className="feature-card">
            <FaHandshake className="feature-icon" />
            <h4>Servicio Premium</h4>
            <p>Atención personalizada.</p>
          </div>
        </Col>
        <Col md={3}>
          <div className="feature-card">
            <FaAward className="feature-icon" />
            <h4>Garantía Total</h4>
            <p>Respaldo en todos los servicios.</p>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Nosotros;


