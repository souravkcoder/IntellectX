from django.urls import path,include
from api import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')

urlpatterns = [
    path("",views.index ),
    path('', include(router.urls)),
    path("course",views.initialcourse ),
    path("sub-add",views.subtopicadd ),
    path("user-course",views.usertakecourse),
    path("course-list",views.courselist),
    path("fullcourse",views.fullcourse),

    
]
