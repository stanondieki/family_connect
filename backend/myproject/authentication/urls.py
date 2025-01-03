from django.urls import path
from .views import SignUpView, SignInView

urlpatterns = [
    path('auth/signup/', SignUpView.as_view(), name='signup'),
    path('auth/signin/', SignInView.as_view(), name='signin'),
]