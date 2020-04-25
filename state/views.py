from django.shortcuts import render
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_protect
from rest_framework.viewsets import ModelViewSet
from .models import Status, SoftBlock, HardBlock
from .serializers import StatusSerializer, HardBlockSerializer, SoftBlockSerializer


# Create your views here.



class StatusView(ModelViewSet):
    qs1 = Status.objects.filter(kran_id=1).order_by("-id")[:1]
    qs2 = Status.objects.filter(kran_id=2).order_by("-id")[:1]
    queryset = qs1.union(qs2)
    serializer_class = StatusSerializer

class SoftBlockView(ModelViewSet):
    qs1 = SoftBlock.objects.filter(kran_id=1).order_by("-id")[:1]
    qs2 = SoftBlock.objects.filter(kran_id=2).order_by("-id")[:1]
    queryset = qs2.union(qs1)
    serializer_class = SoftBlockSerializer

class HardBlockView(ModelViewSet):
    qs1 = HardBlock.objects.filter(kran_id=1).order_by("-id")[:1]
    qs2 = HardBlock.objects.filter(kran_id=2).order_by("-id")[:1]
    queryset = qs2.union(qs1)
    serializer_class = HardBlockSerializer

# @csrf_protect
def index(request):

    return render(request, 'index.html')
