"""backend URL Configuration
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework_simplejwt.views import TokenVerifyView

from .views import UserAPIView
from rest_framework_swagger.views import get_swagger_view

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

schema_view = get_swagger_view(title='API documentation')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/me/', UserAPIView.as_view(), name='user-info'),
    path('api/wear', include('wear.urls')),
    path('swagger/', schema_view)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += staticfiles_urlpatterns()