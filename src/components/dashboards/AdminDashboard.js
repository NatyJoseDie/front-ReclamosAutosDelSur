import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Alert, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSignOutAlt, 
  faUsers, 
  faBuilding, 
  faClipboardList, 
  faEdit, 
  faTrash, 
  faPlus 
} from '@fortawesome/free-solid-svg-icons';


function AdminDashboard() {
  const [empleados, setEmpleados] = useState([]);
  const [oficinas, setOficinas] = useState([]);
  const [tiposReclamos, setTiposReclamos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const empleadosResponse = await axios.get('http://localhost:3555/api/v1/administradores/empleados', config);
      setEmpleados(empleadosResponse.data);

      const oficinasResponse = await axios.get('http://localhost:3555/api/v1/administradores/oficinas', config);
      setOficinas(oficinasResponse.data);

      const reclamosResponse = await axios.get('http://localhost:3555/api/v1/administradores/tipos-reclamos', config);
      setTiposReclamos(reclamosResponse.data);

    } catch (error) {
      console.error('Error detallado:', error);
      setError(`Error al cargar los datos: ${error.response?.status} - ${error.response?.data?.mensaje || error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  return (
    <div className="bg-dark bg-opacity-75 min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom border-secondary">
        <Container>
          <Navbar.Brand>
            <img
              src="/logo.png"
              height="30"
              className="d-inline-block align-top me-2"
              alt="Logo"
            />
            Panel de Administración
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="#empleados">
                <FontAwesomeIcon icon={faUsers} className="me-2" />
                Empleados
              </Nav.Link>
              <Nav.Link href="#oficinas">
                <FontAwesomeIcon icon={faBuilding} className="me-2" />
                Oficinas
              </Nav.Link>
              <Nav.Link href="#reclamos">
                <FontAwesomeIcon icon={faClipboardList} className="me-2" />
                Tipos de Reclamos
              </Nav.Link>
            </Nav>
            <Button variant="outline-light" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
              Cerrar Sesión
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="mb-4 justify-content-center" id="empleados">
          <Col lg={10}>
            <Card bg="dark" text="light" border="secondary">
              <Card.Header className="d-flex justify-content-between align-items-center bg-primary">
                <h5 className="mb-0">
                  <FontAwesomeIcon icon={faUsers} className="me-2" />
                  Empleados
                </h5>
                <Button variant="light" size="sm">
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Nuevo Empleado
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <Table variant="dark" hover bordered>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Oficina</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {empleados.map(empleado => (
                        <tr key={empleado.idUsuario}>
                          <td>{empleado.idUsuario}</td>
                          <td>{`${empleado.nombre} ${empleado.apellido}`}</td>
                          <td>{empleado.correoElectronico}</td>
                          <td>{empleado.oficina?.nombre || 'Sin asignar'}</td>
                          <td>
                            <Button variant="warning" size="sm" className="me-2">
                              <FontAwesomeIcon icon={faEdit} className="me-1" />
                              Editar
                            </Button>
                            <Button variant="danger" size="sm">
                              <FontAwesomeIcon icon={faTrash} className="me-1" />
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4 justify-content-center" id="reclamos">
          <Col lg={10}>
            <Card bg="dark" text="light" border="secondary">
              <Card.Header className="d-flex justify-content-between align-items-center bg-primary">
                <h5 className="mb-0">
                  <FontAwesomeIcon icon={faClipboardList} className="me-2" />
                  Tipos de Reclamos
                </h5>
                <Button variant="light" size="sm">
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Nuevo Tipo
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <Table variant="dark" hover bordered>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tiposReclamos.map(tipo => (
                        <tr key={tipo.idReclamosTipo}>
                          <td>{tipo.idReclamosTipo}</td>
                          <td>{tipo.descripcion}</td>
                          <td>
                            <span className={`badge bg-${tipo.activo ? 'success' : 'danger'}`}>
                              {tipo.activo ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td>
                            <Button variant="warning" size="sm" className="me-2">
                              <FontAwesomeIcon icon={faEdit} className="me-1" />
                              Editar
                            </Button>
                            <Button variant="danger" size="sm">
                              <FontAwesomeIcon icon={faTrash} className="me-1" />
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center" id="oficinas">
          <Col lg={10}>
            <Card bg="dark" text="light" border="secondary">
              <Card.Header className="d-flex justify-content-between align-items-center bg-primary">
                <h5 className="mb-0">
                  <FontAwesomeIcon icon={faBuilding} className="me-2" />
                  Oficinas
                </h5>
                <Button variant="light" size="sm">
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Nueva Oficina
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <Table variant="dark" hover bordered>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Empleados</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {oficinas.map(oficina => (
                        <tr key={oficina.idOficina}>
                          <td>{oficina.idOficina}</td>
                          <td>{oficina.nombre}</td>
                          <td>{oficina.direccion}</td>
                          <td>
                            <span className="badge bg-info">
                              {oficina.empleados?.length || 0}
                            </span>
                          </td>
                          <td>
                            <Button variant="warning" size="sm" className="me-2">
                              <FontAwesomeIcon icon={faEdit} className="me-1" />
                              Editar
                            </Button>
                            <Button variant="danger" size="sm">
                              <FontAwesomeIcon icon={faTrash} className="me-1" />
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;