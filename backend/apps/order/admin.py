from django.contrib import admin
from .models import Table, Order, OrderItem

# Register your models here.
admin.site.register(Table)
admin.site.register(Order)
admin.site.register(OrderItem)
