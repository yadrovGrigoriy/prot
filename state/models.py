from django.db import models

# Create your models here.
class State(models.Model):
    status = models.CharField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)


class Block(models.Model):
    block = models.BooleanField()
    timestamp = models.DateTimeField(auto_now_add=True)
