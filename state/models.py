from django.db import models


# Create your models here.


class Status(models.Model):
    status = models.CharField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'status'

    def __str__(self):
        return self.status   
    


class Block(models.Model):
    block = models.BooleanField()
    timestamp = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = 'block'

    def __str__(self):
        if self.block == 1:
            return 'blocked'
        else:
            return 'not blocked'


