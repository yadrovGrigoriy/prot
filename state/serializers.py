from rest_framework.serializers import ModelSerializer
from .models import State


class StateSerializer(ModelSerializer):
    class Meta:
        model = State
        fields = ['status', 'timestamp']