from rest_framework import serializers
from .models import Table, Order, OrderItem

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'table', 'user', 'created_at', 'status', 'items', 'total']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order

    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', [])

        # Actualizar los campos simples de la orden
        instance.table = validated_data.get('table', instance.table)
        instance.user = validated_data.get('user', instance.user)
        instance.status = validated_data.get('status', instance.status)
        instance.save()

        # Eliminar los items actuales y reemplazarlos
        instance.items.all().delete()

        for item_data in items_data:
            OrderItem.objects.create(order=instance, **item_data)

        return instance

    def get_total(self, obj):
        return sum(item.price * item.quantity for item in obj.items.all())

    def validate(self, data):
        mesa = data.get('table')
        ordenes_activas = Order.objects.filter(table=mesa, status__in=['pending', 'served'])
        if self.instance:
            ordenes_activas = ordenes_activas.exclude(id=self.instance.id)
        if ordenes_activas.exists():
            raise serializers.ValidationError("Esta mesa ya tiene una orden activa.")
        return data