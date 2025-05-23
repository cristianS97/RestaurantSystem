
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
- Swagger / Redoc (Documentación)

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
- Documentación automática:
  - Swagger: `/swagger/`
  - Redoc: `/redoc/`
- Modelos:
  - Usuario personalizado con roles
  - Categorías de productos
  - Productos del menú
  - Mesas
  - Pedidos y detalles de pedidos (items)
- Endpoints principales:
  - `/api/register/` – Registro de usuarios
  - `/api/verify/` – Verificación por código
  - `/api/token/` – Obtener token JWT
  - `/api/token/refresh/` – Refrescar token
  - `/api/products/` – CRUD de productos
  - `/api/categories/` – CRUD de categorías
  - `/api/tables/` – CRUD de mesas

#### Endpoints especiales para mesas:
  - `/api/tables/disponibles/` (GET)  
    Devuelve las mesas activas (disponibles).
  - `/api/tables/ocupadas/` (GET)  
    Devuelve las mesas inactivas (ocupadas).

  - `/api/orders/` – CRUD completo de pedidos con manejo de items
  - `/api/orders/{id}/set-status/` (PATCH)  
    Cambia el estado de una orden.  
    Parámetros:  
    {
      "status": "pending" | "served" | "paid" | "cancelled"
    }  
    Retorna un mensaje de confirmación y el nuevo estado.

### 2. Frontend Web
- Login y logout
- Listado de usuarios
- CRUD de productos
- CRUD de categorías
- CRUD de mesas
- CRUD de órdenes con creación, edición, eliminación y cambio de estado

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
- Node.js (solo si se corre frontend localmente fuera del contenedor)

### Instrucciones

# Clonar el repositorio
git clone https://github.com/cristianS97/RestaurantSystem.git
cd RestaurantSystem

# Copiar archivos .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Levantar el proyecto
docker-compose up --build

### Backend disponible en:
http://localhost:8000

### Documentación API:
- Swagger: http://localhost:8000/swagger/
- Redoc: http://localhost:8000/redoc/

### Frontend disponible en:
http://localhost:5173

---

## Usuarios

Se utiliza un modelo personalizado de usuario con los siguientes campos:

- `names`
- `last_name`
- `gender`
- `role` (admin, mozo, cocina, caja, etc.)

El registro genera un código de verificación (futura integración con email).

---

## Próximos Pasos

- Vista para mozos
- Vista para cocina
- Gestión de estados de pedidos
- Vistas y navegación completas en app móvil
- Gestión de usuarios y permisos desde el frontend
- Integración de facturación y pagos
- Despliegue en servicios en la nube (ej: Render, Railway, AWS)

---

## Licencia

Este proyecto está bajo la Licencia MIT.
