from django.shortcuts import render
from rest_framework import viewsets
from .models import Table, Order
from .serializers import TableSerializer, OrderSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class TableViewSet(viewsets.ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    # permission_classes = [IsAuthenticated]

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    # permission_classes = [IsAuthenticated]
