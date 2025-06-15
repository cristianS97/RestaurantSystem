from rest_framework import serializers
from .models import Reservation
from datetime import datetime, date

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'
    
    def validate(self, data):
        reservation_date = data['date']
        reservation_time = data['time']
        now = datetime.now()

        # Componer el datetime completo
        reservation_datetime = datetime.combine(reservation_date, reservation_time)

        if reservation_datetime < now:
            raise serializers.ValidationError("No puedes reservar en una fecha u hora pasada.")

        # Validar rango de horario permitido
        if not (12 <= reservation_time.hour < 23):
            raise serializers.ValidationError("Solo se permiten reservas entre las 12:00 y las 23:00 horas.")

        return data

