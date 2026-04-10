import { useState } from 'react';

// Interfaz para definir las columnas basadas estrictamente en las claves de T
export interface Columna<T> {
  key: keyof T;
  label: string;
}

// Props del componente usando el genérico T
interface DataTableProps<T> {
  datos: T[];
  columnas: Columna<T>[];
  onGuardarEdicion?: (itemActualizado: Partial<T>) => void;
}

// El componente debe declarar el genérico <T,> (la coma es necesaria en TSX para que no lo confunda con una etiqueta HTML)
export function DataTable<T extends { id: string | number }>( { datos, columnas, onGuardarEdicion }: DataTableProps<T> ) {
  
  // UTILITY TYPE: Partial<T>
  // Permite guardar un objeto incompleto mientras el usuario lo edita
  const [filaEnEdicion, setFilaEnEdicion] = useState<Partial<T> | null>(null);

  const iniciarEdicion = (item: T) => {
    setFilaEnEdicion(item as Partial<T>);
  };

  const guardar = () => {
    if (filaEnEdicion && onGuardarEdicion) {
      onGuardarEdicion(filaEnEdicion);
    }
    setFilaEnEdicion(null); // Limpiamos el estado
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '20px 0' }}>
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333' }}>
            {columnas.map((col, index) => (
              <th key={index} style={{ padding: '8px' }}>{col.label}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => {
            const isEditing = filaEnEdicion?.id === item.id;

            return (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                {columnas.map((col, index) => (
                  <td key={index} style={{ padding: '8px' }}>
                    {isEditing ? (
                       <span style={{ color: 'blue', fontSize: '12px' }}>[Editando...]</span>
                    ) : (
                      // Renderizamos dinámicamente el valor. TypeScript sabe que esto es seguro.
                      String(item[col.key]) 
                    )}
                  </td>
                ))}
                <td>
                  {isEditing ? (
                    <button onClick={guardar}>Guardar</button>
                  ) : (
                    <button onClick={() => iniciarEdicion(item)}>Editar</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}