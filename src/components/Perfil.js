import React, { useState, useEffect } from 'react';
import './Perfil.css';

function Perfil() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [imagen, setImagen] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3555/api/v1/auth/perfil', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNombre(data.user.nombre);
          setApellido(data.user.apellido);
          setCorreoElectronico(data.user.correoElectronico);
          if (data.user.imagen) {
            setPreviewImage(data.user.imagen);
          }
        }
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      let imageUrl = previewImage;

      // Si hay una nueva imagen, subirla a Cloudinary
      if (imagen) {
        const formData = new FormData();
        formData.append('file', imagen);
        formData.append('upload_preset', 'perfil_usuarios'); // Asegúrate de que el preset está en Cloudinary y configurado como "sin firmar"

        const cloudinaryResponse = await fetch(
          'https://api.cloudinary.com/v1_1/dseo6ulep/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!cloudinaryResponse.ok) {
          const errorData = await cloudinaryResponse.json();
          console.error('Respuesta de error de Cloudinary:', errorData);
          throw new Error(`Error de Cloudinary: ${errorData.error.message}`);
        }

        const cloudinaryData = await cloudinaryResponse.json();
        imageUrl = cloudinaryData.secure_url;
      }

      const userData = {
        nombre,
        apellido,
        correoElectronico,
        imagen: imageUrl,
      };

      const response = await fetch('http://localhost:3555/api/v1/auth/actualizar-perfil', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.usuario?.imagen) {
          setPreviewImage(data.usuario.imagen);
          localStorage.setItem('userImage', data.usuario.imagen);
        }
        alert('Perfil actualizado exitosamente');
      } else {
        throw new Error(data.message || 'Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error completo:', error);
      alert(error.message || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="perfil-container">
      <h1>Modificar Perfil</h1>
      <form onSubmit={handleSubmit}>
        <div className="foto-perfil-container">
          <img 
            src={previewImage || 'https://via.placeholder.com/150'} 
            alt="Foto de perfil" 
            className="foto-perfil-preview"
          />
          <div>
            <label htmlFor="foto-perfil" className="btn-foto">
              Cambiar foto de perfil
            </label>
            <input
              id="foto-perfil"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <div>
          <label>Nombre:</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input 
            type="text" 
            value={apellido} 
            onChange={(e) => setApellido(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input 
            type="email" 
            value={correoElectronico} 
            onChange={(e) => setCorreoElectronico(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Actualizando...' : 'Actualizar Perfil'}
        </button>
      </form>
    </div>
  );
}

export default Perfil;

