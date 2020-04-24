from django.shortcuts import render
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_protect
from rest_framework.viewsets import ModelViewSet
from .models import Status, SoftBlock, HardBlock
from .serializers import StatusSerializer, HardBlockSerializer, SoftBlockSerializer


# Create your views here.



class StatusView(ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer

class SoftBlockView(ModelViewSet):
    queryset = SoftBlock.objects.all()
    serializer_class = SoftBlockSerializer

class HardBlockView(ModelViewSet):
    queryset = HardBlock.objects.all()
    serializer_class = HardBlockSerializer

# @csrf_protect
def index(request):

    return render(request, 'index.html')
