import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './DashboardLayout.css';

function DashboardLayout({ children, userImage, userName }) {
  return (
    <div className="dashboard-background">
      <Container fluid className="dashboard-container">
        {/* Header con Logo y Perfil */}
        <Row className="header-section mb-4 py-3">
          <Col xs={12} md={6} className="text-center text-md-start">
            <Image 
              src="/logo.png" // Logo desde la carpeta public
              alt="Logo Empresa" 
              className="company-logo" 
            />
          </Col>
          <Col xs={12} md={6} className="text-center text-md-end">
            <div className="user-profile-section">
              <Image 
                src={userImage || 'https://via.placeholder.com/150'} 
                roundedCircle 
                className="user-avatar" 
              />
              <span className="user-name ms-2">{userName}</span>
            </div>
          </Col>
        </Row>

        {/* Contenido del Dashboard */}
        <div className="dashboard-content">
          {children}
        </div>
      </Container>
    </div>
  );
}

export default DashboardLayout;