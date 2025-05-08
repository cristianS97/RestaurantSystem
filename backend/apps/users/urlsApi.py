from django.urls import path
from .viewsApi import RegisterAPIView, VerifyCodeAPIView, UserListAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='api-register'),
    path('verify/', VerifyCodeAPIView.as_view(), name='api-verify'),
    path('token/', TokenObtainPairView.as_view(), name='api-token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='api-token_refresh'),
    path('users/', UserListAPIView.as_view(), name='api-users-list')
]
