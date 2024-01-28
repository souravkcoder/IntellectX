from django.urls import path,include
from api import views
from rest_framework.routers import DefaultRouter


urlpatterns = [
    path("",views.index ),
    path("course",views.initialcourse ),
    path("sub-add",views.subtopicadd ),
    path("user-course",views.usertakecourse),
    path("course-list",views.courselist),
    path("fullcourse",views.fullcourse),

    
]
