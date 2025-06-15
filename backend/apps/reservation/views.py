from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import date
from .models import Reservation
from .serializers import ReservationSerializer
from apps.permissions import IsAdminUserRole, IsWaiterOrAdmin

# Create your views here.
class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [IsAuthenticated()]
        elif self.action in ['list', 'retrieve', 'reservas_hoy']:
            return [IsWaiterOrAdmin()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsAdminUserRole()]
        return [IsAdminUserRole()]

    @action(detail=False, methods=['get'], url_path='hoy')
    def reservas_hoy(self, request):
        hoy = date.today()
        reservas = Reservation.objects.filter(date=hoy)
        serializer = self.get_serializer(reservas, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        return Reservation.objects.all()
