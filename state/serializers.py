from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Status, HardBlock, SoftBlock





class HardBlockSerializer(ModelSerializer):
    class Meta:
        model = HardBlock
        fields = '__all__'


class SoftBlockSerializer(ModelSerializer):
    class Meta:
        model = SoftBlock
        fields = '__all__'




class StatusSerializer(ModelSerializer):

    class Meta:
        model = Status
        fields = '__all__'