import React from 'react';
import Navbar from './Navbar'; // Importa el componente Navbar
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Barra de navegación */}
      <Navbar />  {/* Mantienes la navbar */}

      {/* Fondo de video */}
      <div className="video-background">
        <video autoPlay loop muted>
          <source src="https://cdn.pixabay.com/video/2016/01/31/2029-153703075_large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero con frase destacada */}
      <header className="hero">
        <h1>El lujo es vulgaridad, bienvenidos a la Concesionaria Autos del Sur</h1>
        <p>La excelencia en cada detalle, la mejor concesionaria de autos en la región</p>
      </header>
    </div>
  );
};

export default Home;



