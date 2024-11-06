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
    faPlus,
    faFileDownload 
} from '@fortawesome/free-solid-svg-icons';

function AdminDashboard() {
    const [empleados, setEmpleados] = useState([]);
    const [oficinas, setOficinas] = useState([]);
    const [tiposReclamos, setTiposReclamos] = useState([]);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

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
            console.error('Error:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            } else {
                setError(`Error al cargar los datos: ${error.message}`);
            }
        }
    };

    const descargarInforme = async (formato) => {
        try {
            console.log('Iniciando descarga de:', formato);
            const token = localStorage.getItem('token');
            console.log('Token:', token ? 'Presente' : 'Ausente');

            if (!token) {
                setError('No hay sesión activa');
                navigate('/login');
                return;
            }

            setMensaje(`Generando informe ${formato.toUpperCase()}...`);

            const response = await axios({
                url: `http://localhost:3555/api/v1/reclamos/informe?formato=${formato}`,
                method: 'GET',
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Respuesta recibida');

            const blob = new Blob([response.data], { 
                type: formato === 'pdf' ? 'application/pdf' : 'text/csv' 
            });
            
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `informe-reclamos.${formato}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            setMensaje(`Informe ${formato.toUpperCase()} descargado con éxito`);
            
        } catch (error) {
            console.error('Error en la descarga:', error);
            setError(`Error al descargar el informe: ${error.message}`);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="bg-dark bg-opacity-75 min-vh-100">
            <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom border-secondary">
                <Container>
                    <Navbar.Brand>Panel de Administración</Navbar.Brand>
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
                {error && (
                    <Alert variant="danger" onClose={() => setError('')} dismissible>
                        {error}
                    </Alert>
                )}
                {mensaje && (
                    <Alert variant="success" onClose={() => setMensaje('')} dismissible>
                        {mensaje}
                    </Alert>
                )}

                <Row className="mb-4">
                    <Col>
                        <Card bg="dark" text="light">
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <FontAwesomeIcon icon={faUsers} className="me-2" />
                                    Empleados
                                </h5>
                                <Button variant="primary" size="sm">
                                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                                    Nuevo Empleado
                                </Button>
                            </Card.Header>
                            <Card.Body>
                                <Table variant="dark" hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {empleados.map(empleado => (
                                            <tr key={empleado.idUsuario}>
                                                <td>{empleado.idUsuario}</td>
                                                <td>{`${empleado.nombre} ${empleado.apellido}`}</td>
                                                <td>{empleado.correoElectronico}</td>
                                                <td>
                                                    <Button variant="warning" size="sm" className="me-2">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                    <Button variant="danger" size="sm">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col>
                        <Card bg="dark" text="light">
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <FontAwesomeIcon icon={faClipboardList} className="me-2" />
                                    Tipos de Reclamos
                                </h5>
                                <div>
                                    <Button 
                                        variant="light" 
                                        size="sm" 
                                        className="me-2"
                                        onClick={() => descargarInforme('pdf')}
                                    >
                                        <FontAwesomeIcon icon={faFileDownload} className="me-1" />
                                        PDF
                                    </Button>
                                    <Button 
                                        variant="light" 
                                        size="sm" 
                                        className="me-2"
                                        onClick={() => descargarInforme('csv')}
                                    >
                                        <FontAwesomeIcon icon={faFileDownload} className="me-1" />
                                        CSV
                                    </Button>
                                    <Button variant="primary" size="sm">
                                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                                        Nuevo Tipo
                                    </Button>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Table variant="dark" hover>
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
                                            <tr key={tipo.idReclamoTipo}>
                                                <td>{tipo.idReclamoTipo}</td>
                                                <td>{tipo.descripcion}</td>
                                                <td>
                                                    <span className={`badge bg-${tipo.activo ? 'success' : 'danger'}`}>
                                                        {tipo.activo ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Button variant="warning" size="sm" className="me-2">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                    <Button variant="danger" size="sm">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card bg="dark" text="light">
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <FontAwesomeIcon icon={faBuilding} className="me-2" />
                                    Oficinas
                                </h5>
                                <Button variant="primary" size="sm">
                                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                                    Nueva Oficina
                                </Button>
                            </Card.Header>
                            <Card.Body>
                                <Table variant="dark" hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {oficinas.map(oficina => (
                                            <tr key={oficina.idOficina}>
                                                <td>{oficina.idOficina}</td>
                                                <td>{oficina.nombre}</td>
                                                <td>
                                                    <Button variant="warning" size="sm" className="me-2">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                    <Button variant="danger" size="sm">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AdminDashboard;