from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer
from django.db import IntegrityError

class SignUpView(APIView):
    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                refresh = RefreshToken.for_user(user)
                
                return Response({
                    'message': 'Registration successful!',
                    'tokens': {
                        'access': str(refresh.access_token),
                        'refresh': str(refresh),
                    },
                    'user': UserSerializer(user).data
                }, status=status.HTTP_201_CREATED)
            
            # Return specific validation errors
            error_messages = []
            for field, errors in serializer.errors.items():
                error_messages.append(f"{field}: {', '.join(errors)}")
            
            return Response({
                'error': 'Validation error',
                'details': error_messages
            }, status=status.HTTP_400_BAD_REQUEST)
            
        except IntegrityError as e:
            # Handle duplicate email/username
            if 'unique constraint' in str(e).lower():
                if 'email' in str(e).lower():
                    return Response({
                        'error': 'This email is already registered.'
                    }, status=status.HTTP_400_BAD_REQUEST)
                if 'username' in str(e).lower():
                    return Response({
                        'error': 'This username is already taken.'
                    }, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({
                'error': 'Database error occurred.'
            }, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({
                'error': 'Something went wrong. Please try again.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class SignInView(APIView):
    def post(self, request):
        email = request.data.get('username')  # Since frontend sends email as username
        password = request.data.get('password')
        
        user = authenticate(email=email, password=password)
        
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'Login successful!',
                'tokens': {
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                },
                'user': UserSerializer(user).data
            })
        return Response({
            'error': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)