import React from 'react';

function UserProfileForm({ userData, previewImage, handleImageChange, handleSubmit, loading }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="foto-perfil-container">
        <img src={previewImage || 'https://via.placeholder.com/150'} alt="Foto de perfil" className="foto-perfil-preview" />
        <div>
          <label htmlFor="foto-perfil" className="btn-foto">Cambiar foto de perfil</label>
          <input id="foto-perfil" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
        </div>
      </div>
      <div>
        <label>Nombre:</label>
        <input type="text" value={userData.nombre} onChange={(e) => userData.setNombre(e.target.value)} required />
      </div>
      <div>
        <label>Apellido:</label>
        <input type="text" value={userData.apellido} onChange={(e) => userData.setApellido(e.target.value)} required />
      </div>
      <div>
        <label>Correo Electrónico:</label>
        <input type="email" value={userData.correoElectronico} onChange={(e) => userData.setCorreoElectronico(e.target.value)} required />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Actualizando...' : 'Actualizar Perfil'}
      </button>
    </form>
  );
}

export default UserProfileForm;
