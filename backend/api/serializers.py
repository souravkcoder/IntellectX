from rest_framework import serializers
from .models import Article,Course,Subtopic,UserTakeCourse
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token
from api.utils import course_generator, subtopic_generator, class_generator
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Article
        fields=['id', 'title', 'description']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=Course
        fields=['id', 'topicName', 'topicDescription']
        extra_kwargs={
            "topicDescription":{"read_only":True}
        }
    def create(self, validated_data):
        td=course_generator(validated_data["topicName"])
        cg=Course(topicName=validated_data["topicName"],topicDescription=td)
        cg.save()
        return cg

class GetTopicSerializer(serializers.Serializer):
    topicName=serializers.CharField()


class SubtopicSerializer(serializers.ModelSerializer):
    class Meta:
        model=Subtopic
        fields=['id', 'subtopicsName', 'subtopicDescription','topicid']
        extra_kwargs={
            "subtopicDescription":{"read_only":True},
            "topicid":{"read_only":True},
            "subtopicsName":{"read_only":True},

        }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields=['id', 'username', 'email','password']
        extra_kwargs={
            'password':{
                'write_only':True,
                'required':True
            }
        }
    def create(self, validated_data):
        user=User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user