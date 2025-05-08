from django.urls import path
from .views import UserRegisterView, LoginView, LogoutView, UpdatePasswordView, ConfirmView

app_name = 'users_app'

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
    path('update-password/', UpdatePasswordView.as_view(), name='update-password'),
    path('verify/<int:pk>/', ConfirmView.as_view(), name='verify'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout')
]
