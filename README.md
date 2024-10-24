
# TrackrGym
**TrackrGYM** es un sistema basado en microservicios diseñado para gestionar las operaciones de un gimnasio, incluyendo la administración de planes de membresía, inventario de equipos, programación de reservas y pagos. El sistema es escalable, construido con Node.js y orquestado con Docker Compose para permitir un despliegue y gestión independiente de cada servicio.

## **Características**

- **Gestión de Membresías:** Permite a los usuarios registrar, actualizar y gestionar sus membresías, mientras que los administradores pueden supervisar los planes del gimnasio.
- **Seguimiento de Inventario:** Realiza un seguimiento de los equipos del gimnasio, como máquinas, instrumentos y otros elementos, permitiendo a los usuarios visualizar los servicios disponibles.
- **Sistema de Reservas:** Ofrece a los usuarios la capacidad de realizar reservas para sesiones en el gimnasio y gestionar la disponibilidad.
- **Pagos y Comprobantes:** Facilita el proceso de pago para productos y servicios, generando comprobantes y realizando seguimiento de las compras.
- **API Gateway:** Punto de entrada centralizado que redirige las solicitudes a los microservicios adecuados.

## **Arquitectura**

El proyecto usa una arquitectura de microservicios, compuesta por varios servicios independientes:
- **Gateway**: Gestiona el enrutamiento y redirige las solicitudes a los servicios específicos.
- **Microservicio de Membresías**: Gestiona todas las funcionalidades relacionadas con membresías.
- **Microservicio de Inventario**: Administra los equipos y elementos del gimnasio.
- **Microservicio de Reservas**: Gestiona la programación y disponibilidad de los servicios del gimnasio.
- **Microservicio de Pagos**: Procesa los pagos y genera comprobantes.

Todos los servicios están contenedorizados con Docker y gestionados mediante Docker Compose.

## **Tecnologías Utilizadas**

- Node.js (ECMAScript Modules)
- Express.js
- Docker y Docker Compose
- HTTP Proxy Middleware (API Gateway)
- Arquitectura de Microservicios

## **Instrucciones de Configuración**

1. Clona este repositorio:
   ```bash
   git clone https://github.com/mapallares/trackr-gym.git
   cd trackr-gym
   ```

2. Construye y ejecuta todos los servicios con Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Accede al API Gateway en `http://localhost:3000`.

## **Puertos de los Microservicios**

- **Gateway:** `3000`
- **Membresías:** `4001`
- **Inventario:** `4002`
- **Reservas:** `4003`
- **Pagos:** `4004`

## **Guía de Colaboración**

¡Damos la bienvenida a contribuciones en **TrackrGym System**! Sigue estas pautas para colaborar:

### **Reglas para Colaborar**

1. **Fork del repositorio**: Comienza haciendo un fork del repositorio en tu cuenta de GitHub.

2. **Branching**: Sigue esta convención para las ramas:
   - `main`: Esta rama debe contener siempre la última versión estable.
   - `dev`: Usa esta rama para agregar nuevas funcionalidades y corrección de errores.
   - Ramas de funcionalidad: Crea una nueva rama para cada funcionalidad o corrección de errores (e.g., `feature/add-membership-api`).

3. **Mensajes de commit**: Escribe mensajes de commit claros y concisos. Usa el siguiente formato:
   ```plaintext
   [Feature] Añadir nueva funcionalidad de membresías
   [Fix] Resolver error en el servicio de inventario
   ```

4. **Pull Requests**: Envía un pull request (PR) cuando tu funcionalidad o corrección esté lista para revisión. Asegúrate de incluir una descripción de tus cambios y que el código pase todas las pruebas.

5. **Pruebas**: Agrega pruebas para tu código. Asegúrate de que todas las pruebas pasen antes de enviar un PR.

6. **Estilo de código**: Mantén la consistencia del código siguiendo la guía de estilo del proyecto (usando módulos ECMAScript y herramientas como ESLint).

7. **Documentación**: Actualiza el README o cualquier otra documentación relevante si introduces nuevas características o cambios.

8. **Proceso de revisión**: Todos los PRs serán revisados por los mantenedores del proyecto antes de ser fusionados. Sé paciente y receptivo con el feedback.

9. **Respeto**: Trata a todos los colaboradores con respeto y mantén una actitud profesional y positiva al dar o recibir retroalimentación.

## **Licencia**

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

**TrackrGym System** es un proyecto de código abierto orientado a mejorar los procesos de gestión en gimnasios con soluciones tecnológicas modernas. ¡Siéntete libre de contribuir y ayudar a mejorar este proyecto!

---

¡Este README y las reglas te ayudarán a navegar por el proyecto de manera efectiva! ¡Feliz programación!
