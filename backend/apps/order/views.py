from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Table, Order
from .serializers import TableSerializer, OrderSerializer

# Create your views here.
class TableViewSet(viewsets.ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    # permission_classes = [IsAuthenticated]

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    # permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['patch'], url_path='set-status')
    def set_status(self, request, pk=None):
        order = self.get_object()
        status_nuevo = request.data.get('status')
        if status_nuevo not in dict(Order._meta.get_field('status').choices):
            return Response({'error': 'Estado inválido'}, status=status.HTTP_400_BAD_REQUEST)
        order.status = status_nuevo
        order.save()
        return Response({'message': 'Estado actualizado', 'status': order.status})
