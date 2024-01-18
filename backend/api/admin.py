from django.contrib import admin
from .models import Article, Subtopic, Course,UserTakeCourse
# Register your models here.
admin.site.register(Article)
admin.site.register(Course)
admin.site.register(Subtopic)
admin.site.register(UserTakeCourse)