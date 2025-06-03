from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User
from .forms import CustomUserCreationForm, CustomUserChangeForm

# Register your models here.
# admin.site.register(User)
@admin.register(User)
class UserAdmin(BaseUserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User

    list_display = ('email', 'username', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Información personal', {
            'fields': ('username', 'names', 'last_name', 'gender', 'role', 'register_cod')
        }),
        ('Permisos', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Fechas importantes', {'fields': ('last_login',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email', 'username', 'names', 'last_name', 'gender',
                'role', 'register_cod', 'is_staff', 'is_active',
                'password1', 'password2',
            ),
        }),
    )

    search_fields = ('email', 'username', 'names', 'last_name')
    ordering = ('email',)

