from django.contrib import admin

# Register your models here.
from wear.models import Exhauster, Statistics, SensorData

admin.site.register(Exhauster)
admin.site.register(Statistics)
admin.site.register(SensorData)