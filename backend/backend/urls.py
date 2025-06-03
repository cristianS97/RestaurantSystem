"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication
from drf_yasg.views import get_schema_view
from drf_yasg.generators import OpenAPISchemaGenerator
from drf_yasg import openapi

class CustomSchemaGenerator(OpenAPISchemaGenerator):
    def get_schema(self, request=None, public=False):
        schema = super().get_schema(request, public)
        schema.security = [{"Bearer": []}]
        return schema

schema_view = get_schema_view(
    openapi.Info(
        title="Restaurant System API",
        default_version='v1',
        description="""## 🔐 Autenticación JWT
Para usar esta API:
1. Autenticarse con usuario y contraseña en el endpoint: **`/api/token/`**, este método lo veras mas abajo como **`/token/`**  
    - Método: `POST`
    - Ejemplo:
        ```json
            {
                "email": "usuario@ejemplo.com",
                "password": "tu_clave"
            }
        ```
2. Copiar el token de respuesta y hacer clic en el botón **Authorize** arriba a la derecha.
3. Ingresar el token en este formato: **Bearer tu_token_jwt**
⚠️ No olvides anteponer la palabra **Bearer** seguida de un espacio.""",
        contact=openapi.Contact(email="correo@correo.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
    authentication_classes=(SessionAuthentication,),
    generator_class=CustomSchemaGenerator,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include('apps.users.urls')),
    path('api/', include('apps.users.urlsApi')),
    path('api/', include('apps.urls')),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc')
]
