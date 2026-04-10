import { DateTime } from 'luxon';

/**
 * Calcula la diferencia en días entre dos fechas (formato ISO).
 * Tipado estricto en entrada (string) y salida (number).
 */
export function calcularDiferenciaDias(fechaInicioISO: string, fechaFinISO: string): number {
  const inicio = DateTime.fromISO(fechaInicioISO);
  const fin = DateTime.fromISO(fechaFinISO);
  
  if (!inicio.isValid || !fin.isValid) {
    throw new Error("Formato de fecha inválido. Se requiere formato ISO (ej: 2024-05-10)");
  }

  // Calculamos la diferencia y devolvemos solo la parte entera
  const diferencia = fin.diff(inicio, 'days').days;
  return Math.floor(diferencia);
}