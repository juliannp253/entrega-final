import { useEffect, useState } from 'react';
import { getInfo } from '../../api/infoService';
import { type InfoResponse } from '../../types/Info';
import './Info.css'; // Importamos su propio archivo de estilos

export function Info() {
  // Manejamos 3 estados: los datos, si está cargando, y si hubo un error
  const [info, setInfo] = useState<InfoResponse | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect hace que esta lógica se ejecute solo UNA VEZ al montar el componente
  useEffect(() => {
    async function cargarInfo() {
      try {
        const data = await getInfo(); // Llamamos a nuestro servicio aislado
        setInfo(data);
      } catch (err) {
        setError('No se pudo conectar con el servidor.');
      } finally {
        setCargando(false);
      }
    }

    cargarInfo();
  }, []); // El arreglo vacío [] significa "ejecuta esto solo al inicio"

  // Renderizados condicionales según el estado
  if (cargando) {
    return <div className="info-container">Obteniendo metadatos...</div>;
  }

  if (error) {
    return <div className="info-container error">{error}</div>;
  }

  // Renderizado final si todo salió bien
  return (
    <div className="info-container">
      <h2 className="info-title">Estado del Servicio</h2>
      <div className="info-card">
        <div className="info-row">
          <span className="info-label">Aplicación:</span>
          <strong>{info?.app}</strong>
        </div>
        <div className="info-row">
          <span className="info-label">Versión:</span>
          <span className="info-badge">{info?.version}</span>
        </div>
      </div>
    </div>
  );
}