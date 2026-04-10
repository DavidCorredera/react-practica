# Arquitectura Final - Módulo 3

## Justificación de la Arquitectura Estricta

El uso de TypeScript estricto en este proyecto React no es una simple adición estética, sino una capa de seguridad arquitectónica que elimina la inmensa mayoría de los errores de runtime comunes en JavaScript:

1. **Componentes Genéricos (`DataTable<T>`)**: 
   Al usar genéricos, la tabla es agnóstica a los datos, pero completamente segura (Type Safe). Gracias a `keyof T` en las columnas, es matemáticamente imposible que un desarrollador configure la tabla para intentar renderizar una columna que no existe en el objeto original, ya que el compilador lo bloqueará en el acto.

2. **Utility Types (`Partial<T>`)**: 
   En la gestión del estado de edición de una fila, usar `Partial<T>` nos permite cumplir con la realidad del dominio: cuando un usuario edita un formulario, los datos pueden estar temporalmente incompletos. Evitamos tener que usar el destructivo tipo `any` o inicializar valores falsos.

3. **Análisis Exhaustivo (`never`) y Uniones Discriminadas**: 
   Al acoplar el bloque `default: never` en los `switch` que evalúan uniones (como en `EstadoMatricula` del módulo 2), creamos código a prueba de futuro. Si el negocio dicta un nuevo estado, el propio TypeScript nos obligará a actualizar la interfaz de usuario antes de poder compilar la aplicación, haciendo imposible que el cliente se encuentre con una "pantalla en blanco" por un estado no manejado.

El coste inicial de definir tipados y genéricos se amortiza al instante mediante el autocompletado inteligente (IntelliSense) y la total eliminación de errores de tipo `TypeError: Cannot read properties of undefined`.