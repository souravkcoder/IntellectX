from django.contrib import admin
from .models import Article, Subtopic, Course,UserTakeCourse
# Register your models here.
admin.site.register(Article)
admin.site.register(Subtopic)
class UserTakeCourseAdmin(admin.ModelAdmin):
    list_display = ('userid', 'courseid', 'verified')
    list_filter = ('verified',)
    search_fields = ('userid__username', 'courseid__topicName')

admin.site.register(UserTakeCourse, UserTakeCourseAdmin)

class SubtopicInline(admin.TabularInline):
    model = Subtopic
    extra = 1  # Number of empty forms to display for adding new subtopics

class CourseAdmin(admin.ModelAdmin):
    inlines = [SubtopicInline]

admin.site.register(Course, CourseAdmin)