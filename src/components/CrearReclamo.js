import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import DashboardLayout from './layout/DashboardLayout';
import { crearReclamo } from '../services/reclamosService';
import './CrearReclamo.css';

const CrearReclamo = () => {
  const [descripcion, setDescripcion] = useState('');
  const [asunto, setAsunto] = useState('');
  const [idReclamoTipo, setIdReclamoTipo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!descripcion || !asunto || !idReclamoTipo) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      const idUsuarioCreador = localStorage.getItem('userId');
      
      const resultado = await crearReclamo({
        asunto,
        descripcion,
        idReclamoTipo,
        idUsuarioCreador
      });

      if (resultado.success) {
        setMensaje('Reclamo creado con éxito.');
        setDescripcion('');
        setAsunto('');
        setIdReclamoTipo('');
        setError('');
        
        setTimeout(() => {
          navigate('/consultar-reclamos');
        }, 2000);
      } else {
        setError(resultado.message || 'No se pudo crear el reclamo. Por favor, intente nuevamente.');
      }

    } catch (error) {
      setError('Error al crear el reclamo: ' + (error.message || 'Error desconocido'));
    }
  };

  return (
    <DashboardLayout userImage={userImage} userName={userName}>
      <Container className="py-4">
        <Button 
          className="back-button mb-4" 
          onClick={() => navigate(-1)}
          variant="link"
        >
          <FaArrowLeft /> Volver
        </Button>

        <h2 className="text-center mb-4">Crear Nuevo Reclamo</h2>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {mensaje && <Alert variant="success">{mensaje}</Alert>}
        
        <Form onSubmit={handleSubmit} className="reclamo-form">
          <Form.Group className="mb-3">
            <Form.Label>Asunto del Reclamo</Form.Label>
            <Form.Control
              type="text"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              required
              placeholder="Ingrese el asunto del reclamo"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción del Reclamo</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              placeholder="Describa detalladamente su reclamo"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de Reclamo</Form.Label>
            <Form.Select
              value={idReclamoTipo}
              onChange={(e) => setIdReclamoTipo(e.target.value)}
              required
            >
              <option value="">Seleccione el tipo de reclamo</option>
              <option value="1">Eléctrico</option>
              <option value="2">Mecánico</option>
              <option value="3">Administrativo</option>
              <option value="4">Facturación</option>
            </Form.Select>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" size="lg">
              Enviar Reclamo
            </Button>
          </div>
        </Form>
      </Container>
    </DashboardLayout>
  );
};

export default CrearReclamo;
