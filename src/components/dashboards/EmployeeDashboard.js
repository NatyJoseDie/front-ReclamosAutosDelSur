import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList, FaBell, FaUserCog } from 'react-icons/fa';
import DashboardLayout from '../layout/DashboardLayout';
import './Dashboard.css';

function EmployeeDashboard() {
  const navigate = useNavigate();
  const userName = `${localStorage.getItem('userName')} ${localStorage.getItem('userApellido')}`;
  const userImage = localStorage.getItem('userImage') || 'https://via.placeholder.com/150';

  const menuItems = [
    {
      title: 'Gestión de Reclamos',
      description: 'Administrar y dar seguimiento a los reclamos asignados',
      icon: <FaClipboardList size={40} />,
      path: '/ReclamosOficina',
      color: '#4CAF50'
    },
    {
      title: 'Notificaciones',
      description: 'Ver notificaciones y actualizaciones',
      icon: <FaBell size={40} />,
      path: '/notificaciones',
      color: '#2196F3'
    },
    {
      title: 'Mi Perfil',
      description: 'Gestionar información de la cuenta',
      icon: <FaUserCog size={40} />,
      path: '/perfil',
      color: '#9C27B0'
    }
  ];

  return (
    <DashboardLayout userImage={userImage} userName={userName}>
      <Container fluid className="dashboard-container py-4">
        <h2 className="text-center mb-4">Panel de Control - Oficina</h2>
        
        <Row className="g-4">
          {menuItems.map((item, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card 
                className="dashboard-card h-100" 
                onClick={() => navigate(item.path)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body className="text-center">
                  <div 
                    className="icon-circle mb-3" 
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </div>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mt-4">
          <Col>
            <Card className="dashboard-stats">
              <Card.Body>
                <h3 className="text-center mb-4">Resumen de Actividad</h3>
                <Row className="text-center">
                  <Col xs={12} md={4}>
                    <div className="stat-item">
                      <h4>Reclamos Pendientes</h4>
                      <p className="stat-number">0</p>
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="stat-item">
                      <h4>En Proceso</h4>
                      <p className="stat-number">0</p>
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="stat-item">
                      <h4>Resueltos</h4>
                      <p className="stat-number">0</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
}

export default EmployeeDashboard;