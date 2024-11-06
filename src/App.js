import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import LoginProfesional from './components/LoginProfesional'; // Nuevo import
import Register from './components/Register';
import Nosotros from './components/Nosotros';
import Contacto from './components/Contacto';
import Perfil from './components/Perfil';
import CrearReclamo from './components/CrearReclamo';
import ConsultarReclamos from './components/ConsultarReclamos';
import Notificaciones from './components/Notificaciones';
import ClientDashboard from './components/dashboards/ClientDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import ReclamosOficina from './components/ReclamosOficina';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Componente para proteger rutas
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Componente para redirigir al dashboard según el rol
const DashboardRouter = () => {
  const userRole = localStorage.getItem('userRole');

  switch (userRole) {
    case 'CLIENTE':
      return <Navigate to="/dashboard/client" replace />;
    case 'EMPLEADO':
      return <Navigate to="/reclamos-oficina" replace />; // Cambiado para empleados
    case 'ADMIN':
      return <Navigate to="/dashboard/admin" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-profesional" element={<LoginProfesional />} /> {/* Nueva ruta */}
          <Route path="/register" element={<Register />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Ruta de redirección al dashboard según rol */}
          <Route path="/dashboard" element={<DashboardRouter />} />

          {/* Ruta protegida para ReclamosOficina */}
          <Route
            path="/reclamos-oficina"
            element={
              <ProtectedRoute allowedRoles={['EMPLEADO']}>
                <ReclamosOficina />
              </ProtectedRoute>
            }
          />

          {/* Dashboards específicos por rol */}
          <Route
            path="/dashboard/client"
            element={
              <ProtectedRoute allowedRoles={['CLIENTE']}>
                <ClientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Rutas protegidas generales */}
          <Route 
            path="/perfil" 
            element={
              <ProtectedRoute allowedRoles={['CLIENTE', 'EMPLEADO', 'ADMIN']}>
                <Perfil />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/crear-reclamo" 
            element={
              <ProtectedRoute allowedRoles={['CLIENTE']}>
                <CrearReclamo />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/consultar-reclamos" 
            element={
              <ProtectedRoute allowedRoles={['CLIENTE']}>
                <ConsultarReclamos />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/notificaciones" 
            element={
              <ProtectedRoute allowedRoles={['CLIENTE', 'EMPLEADO', 'ADMIN']}>
                <Notificaciones />
              </ProtectedRoute>
            } 
          />

          {/* Ruta para acceso no autorizado */}
          <Route 
            path="/unauthorized" 
            element={
              <div className="container mt-5 text-center">
                <h2>Acceso No Autorizado</h2>
                <p>No tienes permiso para acceder a esta página.</p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => window.history.back()}
                >
                  Volver
                </button>
              </div>
            } 
          />

          {/* Ruta por defecto - redirige a home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;