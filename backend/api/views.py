from django.shortcuts import get_object_or_404, render
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


"""class CourseviewSet(viewsets.ModelViewSet):
    queryset=Course.objects.all()
    serializer_class=CourseSerializer
    def post(self, request, format=None):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)"""

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Course
from .serializers import CourseSerializer

@api_view(['POST'])
def initialcourse(request, format=None):
    try:
        course_name = request.data.get('topicName')
        existing_course = Course.objects.filter(topicName=course_name).first()

        if existing_course:
            serializer = CourseSerializer(existing_course)
            return Response(serializer.data, status=status.HTTP_200_OK)

        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def subtopicadd(request):
    if 'topicName' not in request.data:
        return Response({"error": "Missing 'topicName' in request data."}, status=status.HTTP_400_BAD_REQUEST)
    topic_name = request.data['topicName']
    tpid = get_object_or_404(Course, topicName=topic_name)

    try:
        if Subtopic.objects.filter(topicid=tpid).exists():
            return Response({"error": f"Subtopics already exist for {topic_name}."}, status=status.HTTP_400_BAD_REQUEST)
        subtopics = subtopic_generator(topic_name)
        for i, subtopic in enumerate(subtopics, start=1):
            topic = f"Subtopic {i}: {subtopic}"
            topic_des = class_generator(topic)
            cg = Subtopic(subtopicsName=topic, subtopicDescription=topic_des, topicid=tpid)
            cg.save()

        return Response({"message": "Data Saved Successfully."}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def usertakecourse(request):
    try:
        if 'topicName' not in request.data or 'username' not in request.data:
            return Response({"error": "Missing 'topicName' or 'username' in request data."}, status=status.HTTP_400_BAD_REQUEST)
        topic_name= request.data['topicName']
        username= request.data['username']
        tpid= get_object_or_404(Course, topicName=topic_name)
        userid= get_object_or_404(User, username=username)


        if UserTakeCourse.objects.filter(userid=userid, courseid=tpid).exists():
            return Response({"error": "Duplicate Entry"}, status=status.HTTP_400_BAD_REQUEST)
        user_take_course = UserTakeCourse(userid=userid, courseid=tpid)
        user_take_course.save()

        return Response({"message": "Data Saved Successfully."}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response(e, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def courselist(request):
    username = request.query_params.get('username', None)
    userid=User.objects.get(username=username)
    utc=UserTakeCourse.objects.filter(userid=userid)
    individual_objects=[]
    for i in utc:
        courseid=i.courseid
        course_obj=Course.objects.get(topicName=courseid)
        individual_objects.append(course_obj)
    result=CourseSerializer(individual_objects,many=True)
    return Response({"message":"Data Got Successfully.","data":result.data})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def fullcourse(request):
    topic_name=request.data['topicName']
    tpid=Course.objects.get(topicName=topic_name)
    subtopics=Subtopic.objects.filter(topicid=tpid)
    result=SubtopicSerializer(subtopics,many=True)
    return Response({"message":"Data Got Successfully.","data":result.data})






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


