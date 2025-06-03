from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Table, Order
from .serializers import TableSerializer, OrderSerializer

# Create your views here.
class TableViewSet(viewsets.ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    # permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def disponibles(self, request):
        disponibles = Table.objects.filter(is_active=True)
        serializer = self.get_serializer(disponibles, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def ocupadas(self, request):
        no_disponibles = Table.objects.filter(is_active=False)
        serializer = self.get_serializer(no_disponibles, many=True)
        return Response(serializer.data)
    
    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [IsAuthenticated()]
        return [IsAuthenticated(), IsAdminUserRole()]

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    # permission_classes = [IsAuthenticated]

    # @action(detail=True, methods=['patch'], url_path='set-status')
    # def set_status(self, request, pk=None):
    #     order = self.get_object()
    #     status_nuevo = request.data.get('status')
    #     if status_nuevo not in dict(Order._meta.get_field('status').choices):
    #         return Response({'error': 'Estado inválido'}, status=status.HTTP_400_BAD_REQUEST)
    #     order.status = status_nuevo
    #     order.save()
    #     return Response({'message': 'Estado actualizado', 'status': order.status})

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsAuthenticated()]
        elif self.action == 'create':
            return [IsAuthenticated(), IsWaiter() | IsAdminUserRole()]
        elif self.action == 'set_status':
            # Solo admin, chef y cashier pueden cambiar estados
            user = self.request.user
            if user.role == 'chef' or user.role == 'cashier' or user.role == 'admin':
                return [IsAuthenticated()]
            return []  # Denegar explícitamente
        elif self.action == 'destroy':
            return [IsAuthenticated(), IsAdminUserRole() | IsWaiter()]
        return [IsAuthenticated()]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'waiter':
            return Order.objects.filter(user=user)
        if user.role == 'chef':
            return Order.objects.filter(status='pending')
        if user.role == 'cashier':
            return Order.objects.filter(status='served')
        return Order.objects.all()  # admin
