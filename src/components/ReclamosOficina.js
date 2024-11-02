import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import DashboardLayout from './layout/DashboardLayout';
import axios from 'axios';
import './ReclamosOficina.css';

const ReclamosOficina = () => {
  const [reclamos, setReclamos] = useState([]);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const nombre = localStorage.getItem('userName');
    const apellido = localStorage.getItem('userApellido');
    const imagen = localStorage.getItem('userImage') || 'https://via.placeholder.com/150';
    setUserName(`${nombre} ${apellido}`);
    setUserImage(imagen);
    cargarReclamos();
  }, []);

  const cargarReclamos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3555/api/v1/oficinas/reclamos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setReclamos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar reclamos:', error);
      setError('Error al cargar los reclamos');
      setLoading(false);
    }
  };

  const atenderReclamo = async (idReclamo, nuevoEstado) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3555/api/v1/oficinas/reclamos/${idReclamo}`, 
        { 
          nuevoEstado: nuevoEstado === 'En Proceso' ? 2 : 
                       nuevoEstado === 'Finalizado' ? 4 : 
                       nuevoEstado === 'Suspendido' ? 5 : 
                       nuevoEstado === 'Cancelado' ? 3 : 1
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
  
      if (response.data) {
        setMensaje('Reclamo actualizado exitosamente');
        cargarReclamos();
      }
    } catch (error) {
      console.error('Error al atender reclamo:', error);
      setError('Error al actualizar el estado del reclamo');
    }
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      'Creado': 'primary',
      'En Proceso': 'warning',
      'Resuelto': 'success',
      'Cancelado': 'danger'
    };
    return badges[estado] || 'secondary';
  };

  return (
    <DashboardLayout userImage={userImage} userName={userName}>
      <Container fluid className="py-4">
        <Button 
          className="back-button mb-4" 
          onClick={() => navigate('/dashboard/employee')}
          variant="link"
        >
          <FaArrowLeft /> Volver al Dashboard
        </Button>

        <h2 className="text-center mb-4">Gestión de Reclamos</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {mensaje && <Alert variant="success">{mensaje}</Alert>}

        {loading ? (
          <div className="text-center">Cargando reclamos...</div>
        ) : (
          <Table responsive bordered hover className="reclamos-table">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Asunto</th>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reclamos.map((reclamo) => (
                <tr key={reclamo.idReclamo}>
                  <td>{reclamo.idReclamo}</td>
                  <td>{reclamo.asunto}</td>
                  <td>{reclamo.descripcion}</td>
                  <td>{reclamo.tipoReclamo}</td>
                  <td>
                    <Badge bg={getEstadoBadge(reclamo.estadoReclamo)}>
                      {reclamo.estadoReclamo}
                    </Badge>
                  </td>
                  <td>{new Date(reclamo.fechaCreado).toLocaleDateString()}</td>
                  <td>
                    {reclamo.estadoReclamo === 'Creado' && (
                      <Button 
                        variant="warning" 
                        size="sm"
                        onClick={() => atenderReclamo(reclamo.idReclamo, 'En Proceso')}
                      >
                        Atender
                      </Button>
                    )}
                    {reclamo.estadoReclamo === 'En Proceso' && (
                      <>
                        <Button 
                          variant="success" 
                          size="sm"
                          className="me-2"
                          onClick={() => atenderReclamo(reclamo.idReclamo, 'Finalizado')}
                        >
                          Finalizar
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          className="me-2"
                          onClick={() => atenderReclamo(reclamo.idReclamo, 'Cancelado')}
                        >
                          Cancelar
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => atenderReclamo(reclamo.idReclamo, 'Suspendido')}
                        >
                          Suspender
                        </Button>
                      </>
                    )}
                    {reclamo.estadoReclamo === 'Suspendido' && (
                      <Button 
                        variant="warning" 
                        size="sm"
                        onClick={() => atenderReclamo(reclamo.idReclamo, 'En Proceso')}
                      >
                        Reactivar
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default ReclamosOficina;