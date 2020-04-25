from django.db import models


# Create your models here.


class Status(models.Model):
    kran_id = models.IntegerField()
    status = models.CharField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'status'

    def __str__(self):
        return self.status


class SoftBlock(models.Model):
    kran_id = models.IntegerField()
    block = models.BooleanField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'soft_block'

    def __str__(self):
        if self.block == 1:
            return 'blocked'
        else:
            return 'not blocked'


class HardBlock(models.Model):
    kran_id = models.IntegerField()
    block = models.BooleanField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'hard_block'

    def __str__(self):
        if self.block == 1:
            return 'blocked'
        else:
            return 'not blocked'
