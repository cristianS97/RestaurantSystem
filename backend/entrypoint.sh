#!/bin/bash

# Esperar al puerto
./wait-for-it.sh db:5432 --timeout=30 --strict --

# Esperar a que PostgreSQL acepte conexiones reales
echo "Esperando que PostgreSQL esté completamente listo..."
until python manage.py migrate; do
    echo "Aún no disponible. Reintentando..."
    sleep 2
done

# Ejecutar Gunicorn
exec gunicorn backend.wsgi:application --bind 0.0.0.0:8000
