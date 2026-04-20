# Huellas de la Pola

Plataforma turística para reservas de hoteles y alojamientos en Guaduas.

## Descripción

Este proyecto es un sitio web con front-end estático y un backend Node/Express para manejar registro de usuarios, inicio de sesión y reservas.

## Características

- Diseño responsivo con Bootstrap 5
- Navegación intuitiva
- Formularios reales de registro, login y reservas
- Backend Express con almacenamiento local JSON
- Optimización para SEO y accesibilidad

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/huellas-de-la-pola.git
   cd huellas-de-la-pola
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el frontend en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Ejecuta el backend localmente:
   ```bash
   npm run server
   ```

   Para recargar automáticamente el backend cuando cambies `server.js` o los datos:
   ```bash
   npm run dev-server
   ```

5. Construye para producción:
   ```bash
   npm run build
   ```

## API disponible

- `POST /api/register` — Registrar nuevo usuario
- `POST /api/login` — Iniciar sesión y recibir token
- `POST /api/reservations` — Crear reserva
- `GET /api/rooms` — Consultar habitaciones disponibles

## Scripts Disponibles

- `npm run dev`: Inicia servidor de desarrollo del frontend
- `npm run build`: Construye los archivos estáticos para producción
- `npm run server`: Inicia el backend Node/Express
- `npm run dev-server`: Inicia el backend con nodemon
- `npm run lint`: Linta el código JavaScript
- `npm run format`: Formatea el proyecto

## Estructura del Proyecto

- `index.html`: Página principal
- `html/`: Páginas adicionales
- `css/`: Estilos CSS
- `js/`: Scripts JavaScript
- `assets/`: Imágenes y recursos
- `server.js`: Backend Express
- `data/`: Persistencia local de usuarios y reservas JSON

## Despliegue

Para desplegar la aplicación, primero genera los archivos estáticos con `npm run build`. Luego, usa un hosting que admita Node.js si deseas ejecutar el backend y las APIs reales, o despliega solo el front-end si deseas usar otro servicio de formularios.

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

MIT
