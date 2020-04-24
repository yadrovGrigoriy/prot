from django.contrib import admin
from .models import Status, HardBlock, SoftBlock

# Register your models here.

admin.site.register(Status)
admin.site.register(HardBlock)
admin.site.register(SoftBlock)