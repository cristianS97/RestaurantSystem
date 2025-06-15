from django.db import models
from apps.order.models import Table

# Create your models here.
class Reservation(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('confirmed', 'Confirmada'),
        ('cancelled', 'Cancelada'),
    ]

    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    num_people = models.PositiveIntegerField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    class Meta:
        unique_together = ('table', 'date', 'time')
        ordering = ['date', 'time']

    def __str__(self):
        return f"Reserva de {self.name} - Mesa {self.table} el {self.date} a las {self.time}"
