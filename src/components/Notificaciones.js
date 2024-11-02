// src/components/Notificaciones.js
import React, { useEffect, useState } from 'react';

const Notificaciones = ({ nuevasNotificaciones }) => {
  const [notificaciones, setNotificaciones] = useState(0);

  useEffect(() => {
    if (nuevasNotificaciones > 0) {
      setNotificaciones(nuevasNotificaciones);
    }
  }, [nuevasNotificaciones]);

  return (
    <div>
      <span>Notificaciones: {notificaciones}</span>
      {notificaciones > 0 && <span className="notification-indicator">🔔</span>}
    </div>
  );
};

export default Notificaciones;
