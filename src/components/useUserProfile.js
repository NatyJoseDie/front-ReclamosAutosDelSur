import { useState, useEffect } from 'react';

function useUserProfile() {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    correoElectronico: '',
  });
  const [imagen, setImagen] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3555/api/v1/auth/perfil', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
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

      if (imagen) {
        const formData = new FormData();
        formData.append('file', imagen);
        formData.append('upload_preset', 'perfil_usuarios');

        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/dseo6ulep/image/upload`, 
          { method: 'POST', body: formData }
        );

        if (!cloudinaryResponse.ok) throw new Error('Error al cargar imagen');

        const cloudinaryData = await cloudinaryResponse.json();
        imageUrl = cloudinaryData.secure_url;
      }

      const response = await fetch('http://localhost:3555/api/v1/auth/actualizar-perfil', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...userData, imagen: imageUrl })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setPreviewImage(data.usuario.imagen || previewImage);
        alert('Perfil actualizado exitosamente');
      } else throw new Error(data.message || 'Error al actualizar perfil');
    } catch (error) {
      alert(error.message || 'Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return { userData, setUserData, previewImage, handleImageChange, handleSubmit, loading };
}

export default useUserProfile;
