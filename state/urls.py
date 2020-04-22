from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path
from .views import StatusView, BlockView

from rest_framework import renderers

# status = StatusView.as_view(dict(get='list', post='create'))
# block = BlockView.as_view(dict(get='list', post='create'))

# urlpattern = format_suffix_patterns([
#     path('status', status, name='status-list'),
#     path('block', block, name='block-list')
# ])
