from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import QuestionViewSet
from .views_auth import RegisterView, CustomTokenObtainPairView, LogoutView

router = DefaultRouter()
router.register("questions", QuestionViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/logout/", LogoutView.as_view(), name="logout"),
]
