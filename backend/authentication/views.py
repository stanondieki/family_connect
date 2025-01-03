from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError
from rest_framework import status

class SignUpView(APIView):
    def post(self, request):
        data = request.data
        username = data.get('username')
        email = data.get('email')
        phone = data.get('phone')
        password = data.get('password')

        if User.objects.filter(username=username).exists():
            raise ValidationError({'error': 'Username already taken.'})
        if User.objects.filter(email=email).exists():
            raise ValidationError({'error': 'Email already registered.'})

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        return Response({'message': 'User registered successfully!'}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        try:
            user = User.objects.get(username=username)
            if not user.check_password(password):
                return Response({"error": "Invalid credentials"}, status=400)
            
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=400)
