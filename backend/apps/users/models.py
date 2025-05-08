from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserManager

# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    GENDER_CHOICES = (
        ('m', 'Masculino'),
        ('f', 'Femenino'),
        ('o', 'Otro'),
    )

    ROLE_CHOICES = (
        ('admin', 'Administrador'),
        ('waiter', 'Mozo'),
        ('chef', 'Cocinero'),
        ('cashier', 'Cajero'),
    )

    email = models.EmailField(verbose_name='Correo electrónico', unique=True)
    username = models.CharField(verbose_name='Nombre de usuario', max_length=50, unique=True)
    names = models.CharField(verbose_name='Nombres', max_length=50, blank=True)
    last_name = models.CharField(verbose_name='Apellidos', max_length=50, blank=True)
    gender = models.CharField('Género', max_length=1, choices=GENDER_CHOICES, blank=True)
    role = models.CharField('Rol', max_length=10, choices=ROLE_CHOICES, default='waiter')
    register_cod = models.CharField(verbose_name='Código de registro', max_length=6, blank=True)
    is_staff = models.BooleanField(verbose_name='Staff', default=False)
    is_active = models.BooleanField(verbose_name='Activo', default=True)

    # Campo usado como login
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_short_name(self):
        return self.username

    def get_full_name(self):
        return f"{self.names} {self.last_name}"
