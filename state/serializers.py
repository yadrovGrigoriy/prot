from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Status, Block


class StatusSerializer(ModelSerializer):
    class Meta:
        model = Status
        fields = ['status']


class BlockSerializer(ModelSerializer):
    class Meta:
        model = Block
        fields = ['block']
