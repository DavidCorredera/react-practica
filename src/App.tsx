import { DataTable, type Columna } from './components/DataTable';
import { calcularDiferenciaDias } from './utils/date-utils';

// Interfaz de prueba para nuestra tabla
interface Proyecto {
  id: string;
  nombre: string;
  estado: string;
}

const datosProyectos: Proyecto[] = [
  { id: '1', nombre: 'Migración a TypeScript', estado: 'En progreso' },
  { id: '2', nombre: 'Diseño de UI', estado: 'Completado' }
];

// Fíjate en el autocompletado aquí: Si pones un 'key' que no existe en Proyecto, ¡dará error!
const columnasProyectos: Columna<Proyecto>[] = [
  { key: 'id', label: 'ID' },
  { key: 'nombre', label: 'Nombre del Proyecto' },
  { key: 'estado', label: 'Estado Actual' }
];

function App() {
  const diasFaltantes = calcularDiferenciaDias("2024-01-01", "2024-01-15"); // Devuelve 14

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Laboratorio 3: React + TypeScript</h1>
      <p>Diferencia calculada con Luxon: <strong>{diasFaltantes} días</strong></p>
      
      <DataTable<Proyecto> 
        datos={datosProyectos} 
        columnas={columnasProyectos} 
        onGuardarEdicion={(parcial) => console.log("Guardando datos parciales:", parcial)}
      />
    </div>
  );
}

export default App;