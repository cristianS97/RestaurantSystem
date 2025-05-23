from django.urls import path
from .viewsApi import RegisterAPIView, VerifyCodeAPIView, UserListAPIView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView

urlpatterns = [
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('register/', RegisterAPIView.as_view(), name='api-register'),
    path('verify/', VerifyCodeAPIView.as_view(), name='api-verify'),
    path('token/', CustomTokenObtainPairView.as_view(), name='api-token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='api-token_refresh'),
    path('users/', UserListAPIView.as_view(), name='api-users-list')
]
