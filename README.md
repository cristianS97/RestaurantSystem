# RestaurantSystem

Sistema completo para la gestión de un restaurante, incluyendo backend con Django, frontend con React y aplicación móvil con Jetpack Compose. Utiliza PostgreSQL como base de datos y está preparado para desplegarse con Docker Compose.

---

## Tecnologías Utilizadas

### Backend
- Python 3.11+
- Django
- Django REST Framework (DRF)
- Simple JWT (Autenticación)
- PostgreSQL

### Frontend Web
- React
- TypeScript
- Vite
- SweetAlert2

### App Móvil
- Android Jetpack Compose (Kotlin)

### DevOps
- Docker
- Docker Compose
- Nginx (opcional)

---

## Estructura del Proyecto

### 1. Backend (API REST)
- Autenticación JWT
- Modelos:
  - Usuario personalizado con roles
  - Categorías de productos
  - Productos del menú
  - (Próximamente) Mesas, Pedidos, Pagos, Facturación
- Endpoints:
  - `/api/register/` – Registro de usuarios
  - `/api/verify/` – Verificación por código
  - `/api/token/` – Obtener token JWT
  - `/api/token/refresh/` – Refrescar token
  - `/api/products/` – CRUD de productos
  - `/api/categories/` – CRUD de categorías

### 2. Frontend Web
- Login
- Vista para mozos (crear/ver pedidos) *(pendiente)*
- Vista para cocina (ver/cambiar estado pedidos) *(pendiente)*
- Vista de administración:
  - CRUD de productos
  - CRUD de categorías
- Protección de rutas según rol *(en desarrollo)*

### 3. App Android
- Jetpack Compose
- Login con JWT
- Funcionalidades adaptadas a roles (mozo, cocina, caja, admin) *(en desarrollo)*

### 4. Docker
- `backend`: Django con Gunicorn
- `frontend`: React con Vite (opcional nginx)
- `db`: PostgreSQL
- (opcional) `nginx`: Reverse proxy

---

## Cómo ejecutar

### Requisitos
- Docker y Docker Compose instalados
- Node.js (si se corre frontend localmente fuera de contenedor)

### Instrucciones

```bash
# Clonar el repositorio
git clone https://github.com/tu_usuario/RestaurantSystem.git
cd RestaurantSystem

# Copiar archivos .env si es necesario
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Levantar el proyecto
docker-compose up --build
```

### Backend disponible en:
`http://localhost:8000`

### Frontend disponible en:
`http://localhost:5173`

---

## Usuarios

Se utiliza un modelo personalizado de usuario con campos extra como:

- `names`
- `last_name`
- `gender`
- `role` (admin, mozo, cocina, caja, etc.)

El registro genera un código de verificación (futura integración con email).

---

## Próximos Pasos

- Gestión de pedidos y mesas
- Roles y permisos más detallados
- Vistas específicas por tipo de usuario en frontend y móvil
- Integración de facturación/pagos
- Despliegue en nube

---

## Licencia

Este proyecto está bajo la Licencia MIT.
