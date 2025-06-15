from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.menu.views import ProductViewSet, CategoryViewSet
from apps.order.views import TableViewSet, OrderViewSet
from apps.reservation.views import ReservationViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'tables', TableViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'reservation', ReservationViewSet)

urlpatterns = [
    path('', include(router.urls))
]
