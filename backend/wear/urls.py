from django.urls import include, path
from rest_framework.routers import DefaultRouter
from wear.views import ExhausterViewSet, StatisticsViewSet, SensorDataViewSet
from .views import FileUploadView

router = DefaultRouter()
router.register(r'exhauster', ExhausterViewSet)
router.register(r'statistics', StatisticsViewSet)
router.register(r'sensor-data', SensorDataViewSet)


urlpatterns = [
    path('/', include(router.urls)),
    path('/upload-predict/', FileUploadView.as_view(), name='upload-file'),
]