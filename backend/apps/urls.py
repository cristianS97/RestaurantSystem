from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.menu.views import ProductViewSet, CategoryViewSet
from apps.order.views import TableViewSet, OrderViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'tables', TableViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
