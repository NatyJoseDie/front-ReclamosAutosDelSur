import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="position-relative min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark position-fixed w-100" style={{ backgroundColor: 'rgba(33, 37, 41, 0.8)', zIndex: 2 }}>
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <i className="bi bi-car-front-fill me-2 text-warning"></i>
            Autos del Sur
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <Link to="/" className="nav-link">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to="/nosotros" className="nav-link">Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link to="/contacto" className="nav-link">Contacto</Link>
              </li>
              <li className="nav-item ms-3">
                <Link to="/login" className="btn btn-light rounded-1">Iniciar Sesión</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Video Background */}
      <div className="position-fixed top-0 start-0 w-100 h-100 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          className="position-absolute w-100 h-100"
          style={{ objectFit: 'cover' }}
        >
          <source src="https://cdn.pixabay.com/video/2016/01/31/2029-153703075_large.mp4" type="video/mp4" />
        </video>
        {/* Agregamos un gradiente más elegante */}
        <div className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ 
            background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
            backdropFilter: 'blur(2px)'
          }}>
        </div>
      </div>

      {/* Hero Content */}
      <div className="position-relative" style={{ zIndex: 1 }}>
        <div className="container text-center" style={{ paddingTop: '200px' }}>
          {/* Título con efecto de sombra suave */}
          <h1 className="display-1 fw-bold text-white mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            El lujo es<br />
            <span className="text-warning">nuestra esencia</span>
          </h1>
          <p className="lead text-white mb-5" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            Bienvenidos a la Concesionaria Autos del Sur, donde la excelencia se encuentra con la elegancia en cada detalle.
          </p>
          
          {/* Botones con hover effect */}
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-light rounded-1 px-4 py-2 fw-semibold" 
              style={{ transition: 'all 0.3s ease' }}>
              <i className="bi bi-collection me-2"></i>
              Ver Catálogo
            </button>
            <button className="btn btn-outline-light rounded-1 px-4 py-2 fw-semibold" 
              style={{ backgroundColor: 'transparent', transition: 'all 0.3s ease' }}>
              <i className="bi bi-calendar-check me-2"></i>
              Agendar Test Drive
            </button>
          </div>

          {/* Features con cards más elegantes */}
          <div className="row mt-5 pt-5 g-4">
            <div className="col-md-4">
              <div className="feature-card text-white p-4 rounded-3" 
                style={{ 
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(10px)',
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <div className="feature-icon-wrapper mb-4">
                  <i className="bi bi-star-fill text-warning" style={{ fontSize: '2.5rem' }}></i>
                </div>
                <h3 className="h4 mb-3">Calidad Premium</h3>
                <p className="text-white-50 mb-0 text-center">Vehículos seleccionados con los más altos estándares</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card text-white p-4 rounded-3" 
                style={{ 
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(10px)',
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <div className="feature-icon-wrapper mb-4">
                  <i className="bi bi-shield-check text-warning" style={{ fontSize: '2.5rem' }}></i>
                </div>
                <h3 className="h4 mb-3">Garantía Extendida</h3>
                <p className="text-white-50 mb-0 text-center">Respaldo y seguridad en cada compra</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card text-white p-4 rounded-3" 
                style={{ 
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(10px)',
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <div className="feature-icon-wrapper mb-4">
                  <i className="bi bi-clock text-warning" style={{ fontSize: '2.5rem' }}></i>
                </div>
                <h3 className="h4 mb-3">Servicio 24/7</h3>
                <p className="text-white-50 mb-0 text-center">Asistencia personalizada cuando la necesites</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


