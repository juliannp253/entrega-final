// Importamos la interfaz que creamos en el paso anterior
import { type InfoResponse } from '../types/Info';

const API_URL = 'https://d3ujwk09smrk9z.cloudfront.net';

export async function getInfo(): Promise<InfoResponse> {
  const response = await fetch(`${API_URL}/info`);
  
  if (!response.ok) {
    throw new Error('Error al obtener la información de la API');
  }
  
  // El "as InfoResponse" (o tipar el Promise) asegura que TypeScript 
  // sepa que el JSON devuelto tiene la forma { version, app }
  return response.json();
}