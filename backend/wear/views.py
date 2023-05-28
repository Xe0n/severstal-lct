from rest_framework import viewsets
from wear.models import Exhauster, Statistics, SensorData
from wear.types import ExhausterSerializer, StatisticsSerializer, SensorDataSerializer
from rest_framework.response import Response
from rest_framework import parsers, renderers, serializers, status
from rest_framework.views import APIView
from .types import MyFileSerializer
from rest_framework.parsers import FileUploadParser

from wear.BL import generate_statistics, parse_subm

import datetime

class ExhausterViewSet(viewsets.ModelViewSet):
    queryset = Exhauster.objects.all()
    serializer_class = ExhausterSerializer
    def retrieve(self, request, **kwargs):
        instance = self.get_object()
        generate = request.GET.get("generate")
        if generate:
            generate_statistics(datetime.datetime.now())
            return Response({'status': 101})
        try:
            startDate = request.GET.get("startDate")
            endDate = request.GET.get("endDate")
            exhausterSerializer = self.get_serializer(instance)
            if startDate and endDate:
                statistics = Statistics.objects.filter(date__range=(startDate, endDate))
                statistics = statistics.filter(exhauster=instance)
                statisticsSerializer = StatisticsSerializer(statistics, many=True)
                return Response({'exhauster': exhausterSerializer.data, 'statistics': statisticsSerializer.data})
            
            return Response({'exhauster': exhausterSerializer.data})
        except Exhauster.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class StatisticsViewSet(viewsets.ModelViewSet):
    queryset = Statistics.objects.all()
    serializer_class = StatisticsSerializer

class SensorDataViewSet(viewsets.ModelViewSet):
    queryset = SensorData.objects.all()
    serializer_class = SensorDataSerializer

class FileUploadView(APIView):

    def get(self, request):
        parse_subm()
        return Response(status=204)
        file_obj = request.FILES['file']
        # do some stuff with uploaded file
        return Response(status=204)

#
# class MyFileView(GenericAPIView):
#     serializer_class = MyFileSerializer
#     def post(self, request, format=None):
#         """
#         Your docs
#         ---
#         # YAML (must be separated by `---`)
#
#         type:
#           name:
#             required: true
#             type: string
#           url:
#             required: false
#             type: url
#           created_at:
#             required: true
#             type: string
#             format: date-time
#
#         serializer: .serializers.FooSerializer
#         omit_serializer: false
#
#         parameters_strategy: merge
#         omit_parameters:
#             - path
#         parameters:
#             - name: name
#               description: Foobar long description goes here
#               required: true
#               type: string
#               paramType: form
#             - name: other_foo
#               paramType: query
#             - name: other_bar
#               paramType: query
#             - name: avatar
#               type: file
#
#         responseMessages:
#             - code: 401
#               message: Not authenticated
#         """
#         serializer = MyFileSerializer(data=request.data)
#         if serializer.is_valid():
#             file = serializer.validated_data['file']
#             reset = serializer.validated_data['reset']
#
#             return Response({'success': True})
#         return Response(serializer.errors, status=400)
#
