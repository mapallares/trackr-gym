# Documentación de APIs de TrackrGym

Dentrontro de este directorio se encuentran las colecciones de Postman para probar los endpoints expuestos por cada API de cada microservicio para las funcionalidades desarrolladas.


## Requisitos Previos

1. **Postman**: Asegúrate de tener Postman instalado. Puedes descargarlo desde [https://www.postman.com/downloads/](https://www.postman.com/downloads/).
2. **Archivo de la Colección**: Obtén el archivo `.json` de la colección de Postman que deseas probar.
3. **Archivo de Entorno** (Opcional): Si la colección requiere variables de entorno, obtén el archivo `.json` correspondiente para configurarlas.

## Paso 1: Importar la Colección

1. Abre Postman.
2. Haz clic en **Import** en la esquina superior izquierda.
3. Arrastra el archivo `.json` de la colección o selecciona el archivo desde tu equipo.
4. Postman importará la colección y estará disponible en el panel de colecciones.

## Paso 2: Configurar el Entorno (si aplica)

1. Si tienes un archivo de entorno `.json`, repite el proceso de importación y selecciona el archivo de entorno.
2. En el menú desplegable de entornos, selecciona el entorno que has importado.
3. Asegúrate de que las variables de entorno, como URLs o tokens, estén correctamente configuradas. Puedes modificarlas en **Environments** en la pestaña de administración de entornos.

## Paso 3: Probar la Colección

1. Abre la colección importada desde el panel de colecciones.
2. Si deseas ejecutar todas las solicitudes:
   - Selecciona la colección y haz clic en **Run**.
   - Esto abrirá la ventana **Collection Runner**.
   - Configura la cantidad de iteraciones y el entorno.
   - Haz clic en **Run [Nombre de la Colección]** para iniciar las pruebas.
3. Si deseas ejecutar una solicitud específica:
   - Expande la colección y selecciona la solicitud deseada.
   - Revisa los parámetros, encabezados y el cuerpo de la solicitud.
   - Haz clic en **Send** para ejecutar la solicitud y ver la respuesta.

## Paso 4: Revisar Resultados

- **Collection Runner**: En la ventana de Collection Runner, podrás ver el estado de cada solicitud (éxito, error, etc.) y los tiempos de respuesta.
- **Solicitud Individual**: Si ejecutaste una solicitud específica, los resultados se mostrarán en la sección de **Response**.

## Paso 5: Solución de Problemas

- **Errores de Variables**: Asegúrate de que las variables de entorno y colección están correctamente configuradas.
- **Autenticación**: Verifica los tokens de autenticación si las solicitudes requieren autenticación.
- **URL Base Incorrecta**: Asegúrate de que la variable de la URL base está correctamente definida en el entorno.
