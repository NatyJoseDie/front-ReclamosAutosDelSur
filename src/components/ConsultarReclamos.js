import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Table, Image, Alert } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Notificaciones from './Notificaciones';
import './ConsultarReclamos.css';

const ConsultarReclamos = () => {
  const [reclamos, setReclamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');
  const [notificaciones, setNotificaciones] = useState(0); // Estado de notificaciones
  const navigate = useNavigate();

  const handleCancelarReclamo = async (idReclamo) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3555/api/v1/reclamos/cancelar/${idReclamo}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('No se pudo cancelar el reclamo');
      }

      // Actualizar la lista de reclamos después de cancelar
      setReclamos(reclamos.map(reclamo => 
        reclamo.idReclamo === idReclamo 
          ? { ...reclamo, estadoReclamo: 'Cancelado' }
          : reclamo
      ));

      // Aumentar contador de notificaciones
      setNotificaciones(notificaciones + 1);

      // Mostrar mensaje de éxito temporalmente
      setMensajeExito('Reclamo cancelado con éxito.');
      setTimeout(() => setMensajeExito(''), 3000);

    } catch (err) {
      console.error('Error al cancelar el reclamo:', err);
      setError('Error al cancelar el reclamo. Por favor, intente nuevamente.');
    }
  };

  useEffect(() => {
    const fetchReclamos = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3555/api/v1/reclamos/por-usuario', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('No se pudo obtener los reclamos');
        }

        const data = await response.json();
        const reclamosOrdenados = data.sort((a, b) => {
          if (a.estadoReclamo === 'Creado' && b.estadoReclamo !== 'Creado') return -1;
          if (a.estadoReclamo !== 'Creado' && b.estadoReclamo === 'Creado') return 1;
          return 0;
        });

        setReclamos(reclamosOrdenados);
      } catch (err) {
        console.error('Error al obtener los reclamos:', err);
        setError('No se pudieron cargar los reclamos. Por favor, intente de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    fetchReclamos();
  }, []);

  if (loading) return <div className="text-center mt-4">Cargando reclamos...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="dashboard-background">
      <Container fluid className="dashboard-container">
        
        {/* Navbar superior */}
        <Row className="header-section mb-4 py-3">
          <Col xs={12} md={6} className="text-center text-md-start">
            <Button 
              className="back-button" 
              onClick={() => navigate(-1)}
              variant="link"
            >
              <FaArrowLeft /> Volver
            </Button>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-end">
            <Image src="/logo.png" alt="Logo Empresa" className="company-logo me-3" />
            <div className="user-profile-section d-inline-flex align-items-center">
              <Image src="/path/to/userImage.png" roundedCircle className="user-avatar" />
              <span className="user-name ms-2">Nombre Usuario</span>
            </div>
          </Col>
        </Row>

        {/* Notificaciones */}
        <Row className="mb-4">
          <Col className="text-end">
            <Notificaciones nuevasNotificaciones={notificaciones} />
          </Col>
        </Row>

        {/* Mensajes de éxito y error */}
        {mensajeExito && <Alert variant="success">{mensajeExito}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Tabla de Reclamos */}
        <h2 className="text-center mb-4">Consultar Reclamos</h2>
        {reclamos.length === 0 ? (
          <p className="text-center">No tiene reclamos registrados.</p>
        ) : (
          <div className="table-responsive">
            <Table bordered hover className="reclamos-table text-center">
              <thead className="table-dark">
                <tr>
                  <th>Asunto</th>
                  <th>Estado</th>
                  <th>Fecha de creación</th>
                  <th>Tipo de reclamo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reclamos.map((reclamo) => (
                  <tr key={reclamo.idReclamo} className={`estado-${reclamo.estadoReclamo.toLowerCase()}`}>
                    <td>{reclamo.asunto}</td>
                    <td>{reclamo.estadoReclamo}</td>
                    <td>{new Date(reclamo.fechaCreado).toLocaleDateString()}</td>
                    <td>{reclamo.tipoReclamo}</td>
                    <td>
                      {reclamo.estadoReclamo === 'Creado' && (
                        <Button variant="danger" size="sm" onClick={() => handleCancelarReclamo(reclamo.idReclamo)}>
                          Cancelar Reclamo
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ConsultarReclamos;

