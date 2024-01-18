from django.urls import path,include
from api import views
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register(r'article', views.ArticleviewSet,basename="article")
router.register(r'users', views.UserViewSet,basename="user")
router.register(r'course', views.CourseviewSet,basename="course")


urlpatterns = [
    path("",views.index ),
    path("",include(router.urls) ),
    path("sub-add",views.subtopicadd )

    
]
