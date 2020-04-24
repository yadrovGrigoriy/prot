"""python_proto URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import SimpleRouter
from state.views import StatusView, HardBlockView, SoftBlockView


router = SimpleRouter()
router.register('api/status', StatusView)
router.register('api/hard_block', HardBlockView)
router.register('api/soft_block', SoftBlockView)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    
]

urlpatterns += router.urls



