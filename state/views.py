from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Status, Block
from .serializers import StatusSerializer, BlockSerializer


# Create your views here.

class StatusView(ModelViewSet):
    queryset = Status.objects.order_by("-id")[:1]
    serializer_class = StatusSerializer


class BlockView(ModelViewSet):
    queryset = Block.objects.order_by("-id")[:1]
    serializer_class = BlockSerializer


def index(request):
    return render(request, 'index.html')
