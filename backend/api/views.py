from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from .serializers import ArticleSerializer,UserSerializer,CourseSerializer,SubtopicSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.decorators import api_view,authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from api.utils import course_generator, subtopic_generator, class_generator

from django.contrib.auth.models import User
# Create your views here.

class ArticleviewSet(viewsets.ModelViewSet):
    queryset=Article.objects.all()
    serializer_class=ArticleSerializer
    authentication_classes=(TokenAuthentication,)


class CourseviewSet(viewsets.ModelViewSet):
    queryset=Course.objects.all()
    serializer_class=CourseSerializer
    def post(self, request, format=None):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""topic_name = validated_data.get('topicName')
        subtopics=subtopic_generator(topic_name)
        tpid=Course.objects.get(topic_name)
        for i, subtopic in enumerate(subtopics, start=1):
            topic= f"Subtopic {i}: {subtopic}"
            topic_des=class_generator(topic)
            cg=Subtopic(subtopicsName=topic,subtopicDescription=topic_des,topicid=tpid)
            cg.save()"""
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def subtopicadd(request):
    topic_name=request.data['topicName']
    subtopics=subtopic_generator(topic_name)
    tpid=Course.objects.get(topicName=topic_name)
    for i, subtopic in enumerate(subtopics, start=1):
            topic= f"Subtopic {i}: {subtopic}"
            topic_des=class_generator(topic)
            cg=Subtopic(subtopicsName=topic,subtopicDescription=topic_des,topicid=tpid)
            cg.save()
    return Response({"message":"Data Saved Successfully."})
    data_serialized=SubtopicSerializer(cg)
    if(data_serialized.is_valid()):
        data_serialized.save()
        return Response({"message":"Data Saved Successfully.","data":data_serialized.data})
    return Response({"message":"Error Encountered.","errors":data_serialized.errors})

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def usertakecourse(request):
    topic_name=request.data['topicName']
    username=request.data['username']
    tpid=Course.objects.get(topicName=topic_name)
    userid=User.objects.get(username=username)
    res=UserTakeCourse(userid=userid,courseid=tpid)
    res.save()
    return Response({"message":"Data Saved Successfully."})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def courselist(request):
    username=request.data['username']
    userid=User.objects.get(username=username)
    utc=UserTakeCourse.objects.filter(userid=userid)
    individual_objects=[]
    for i in utc:
        courseid=i.courseid
        course_obj=Course.objects.get(topicName=courseid)
        individual_objects.append(course_obj)
    result=CourseSerializer(individual_objects,many=True)
    return Response({"message":"Data Saved Successfully.","data":result.data})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def fullcourse(request):
    topic_name=request.data['topicName']
    tpid=Course.objects.get(topicName=topic_name)
    subtopics=Subtopic.objects.filter(topicid=tpid)
    result=SubtopicSerializer(subtopics,many=True)
    return Response({"message":"Data Saved Successfully.","data":result.data})






class SubtopicGeneratorAPIView(APIView):
    def post(self, request, *args, **kwargs):
        topic_name = request.data.get('topicName')

        try:
            course = Course.objects.get(topicName=topic_name)
        except Course.DoesNotExist:
            return Response({'error': f'Course with topicName {topic_name} does not exist'}, status=status.HTTP_404_NOT_FOUND)

        subtopics_data = subtopic_generator(topic_name)

        subtopics = []
        for subtopic_data in subtopics_data:
            subtopic_data['topicid'] = course.id
            serializer = SubtopicSerializer(subtopicsName=subtopic_data,subtopicDescription="topic_des",topicid=course)
            if serializer.is_valid():
                serializer.save()
                subtopics.append(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'subtopics': subtopics}, status=status.HTTP_201_CREATED)

class SubtopicviewSet(viewsets.ModelViewSet):
    queryset=Subtopic.objects.all()
    serializer_class=SubtopicSerializer
    def post(self, request, format=None):
        serializer = SubtopicSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer

def index(request):
    return HttpResponse('It is working')

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'email': user.email
        })


'''

class ArticleDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return Article.objects.get(pk=pk)
        except Article.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ArticleSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ArticleSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class ArticleList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
'''
