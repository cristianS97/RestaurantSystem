from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import UserRegisterSerializer, UserSerializer
from .models import User
from .functions import code_generator

class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            code = code_generator()
            user.register_cod = code
            user.save()
            # Aquí se puede enviar el código por correo
            print("Código de registro:", code)
            return Response({'message': 'Usuario creado. Verifica el código.', 'user_id': user.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyCodeAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_id = request.data.get('user_id')
        code = request.data.get('register_code')
        try:
            user = User.objects.get(pk=user_id)
            if user.register_cod == code:
                user.is_active = True
                user.save()
                return Response({'message': 'Cuenta activada.'})
            return Response({'error': 'Código inválido'}, status=400)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=404)

class UserListAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
