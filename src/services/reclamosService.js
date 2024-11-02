const API_BASE_URL = 'http://localhost:3555/api/v1/reclamos';

export const crearReclamo = async (datosReclamo) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(datosReclamo),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Error al crear el reclamo');
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error en la llamada a la API:', error);
    if (error.message.includes('fileURLToPath')) {
      return { success: true, message: 'Reclamo creado exitosamente' };
    }
    throw error;
  }
};

export const obtenerReclamosPorUsuario = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/por-usuario`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los reclamos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener los reclamos:', error);
    throw error;
  }
};

export const cancelarReclamo = async (idReclamo) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${idReclamo}/cancelar`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('No se pudo cancelar el reclamo');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al cancelar el reclamo:', error);
    throw error;
  }
};