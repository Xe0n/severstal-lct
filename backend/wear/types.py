from rest_framework import serializers
from wear.models import Exhauster, Statistics, SensorData

class ExhausterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exhauster
        fields = '__all__'


class StatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistics
        fields = '__all__'

class SensorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorData
        fields = '__all__'


class MyFileSerializer(serializers.Serializer):
    file = serializers.FileField()
    reset = serializers.BooleanField()