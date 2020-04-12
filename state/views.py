from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import State
from .serializers import StateSerializer


# Create your views here.

class StatusView(ModelViewSet):
    queryset = State.objects.order_by("-id")[:1]
    serializer_class = StateSerializer


def index(request):
    return render(request, 'index.html')
