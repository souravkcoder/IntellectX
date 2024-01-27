from django.db import models
from django.conf import settings

# Create your models here.
class Article(models.Model):
    title=models.CharField(max_length=30)
    description=models.TextField()


    def __str__(self):
        return self.title
    
class Course(models.Model):
    topicName=models.CharField(max_length=200,unique=True)
    topicDescription=models.TextField()
    verified=models.BooleanField(default=False)

    def __str__(self):
        return self.topicName

class Subtopic(models.Model):
    subtopicsName=models.CharField(max_length=200)
    subtopicDescription=models.TextField(blank=True)
    topicid=models.ForeignKey("Course", on_delete=models.CASCADE)

    def __str__(self):
        return self.subtopicsName

class UserTakeCourse(models.Model):
    userid=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    courseid=models.ForeignKey("Course",on_delete=models.CASCADE)
    verified=models.BooleanField(default=False)

