# TerraViva — Frontend

Sistema de reservas para hotel boutique como sitio web estático con HTML, CSS y JavaScript.

## 🌐 Repositorios

- Frontend: https://github.com/handrymoran1/TerraViva
- Backend: https://github.com/Fasalpa/TerraViva-Backend

## 📖 Descripción

Esta carpeta contiene la interfaz del cliente de TerraViva:
- Páginas de reserva
- Registro e inicio de sesión
- Perfil de usuario
- Panel de administración de habitaciones

El frontend funciona como una aplicación estática, destinada a ser consumida por el backend en caso de integración.

## 🧩 Estructura de `TerraViva/`

```
TerraViva/
├── index.html
├── formspree.json
├── css/
├── js/
├── html/
├── assets/
├── img-nosotros/
└── data_base/
```

### Archivos y carpetas clave

- `index.html`: página principal.
- `html/`: páginas secundarias como `habitaciones.html`, `iniciarSesion.html`, `registrar.html`, `perfil_usuario.html`, `dashboard.html`, `contactanos.html`, `detalleReserva.html`.
- `css/`: estilos por página.
- `js/`: lógica de navegación, sesión, reservas, detalles y administración.
- `assets/` / `img-nosotros/`: recursos gráficos e imágenes.
- `data_base/terraviva.sql`: ejemplo de base de datos o script de respaldo.

## 🚀 Ejecución

El frontend no requiere instalación de dependencias.

1. Clona el repositorio frontend:
   ```bash
   git clone https://github.com/handrymoran1/TerraViva.git
   cd TerraViva
   ```

2. Abre `index.html` en tu navegador.

3. Opcional: usa **Live Server** en VS Code para servir el contenido localmente.

## ✨ Características principales

- Registro e inicio de sesión.
- Perfil de usuario editable.
- Catálogo de habitaciones responsive.
- Detalle de reserva con cálculo de noches y total.
- Panel administrativo para agregar, editar y eliminar habitaciones.
- Persistencia de datos en el navegador con `localStorage` / `sessionStorage`.

## 🔗 Conexión con el backend

Esta interfaz está pensada para integrarse con el backend de TerraViva.

- Repositorio del backend: https://github.com/Fasalpa/TerraViva-Backend
- En este repositorio local, la carpeta del backend es `../Backend/TerraViva-Backend/`.

## 📝 Notas importantes

- El frontend puede funcionar como demo estático.
- Para un sistema completo, usa el backend de Spring Boot junto con la API REST.
- Si necesitas revisar el backend, abre `../Backend/TerraViva-Backend/README.md` o visita el repositorio remoto.
