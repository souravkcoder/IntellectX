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
from django.shortcuts import get_object_or_404

from api.utils import course_generator, subtopic_generator, class_generator

from django.contrib.auth.models import User
# Create your views here.

class ArticleviewSet(viewsets.ModelViewSet):
    queryset=Article.objects.all()
    serializer_class=ArticleSerializer
    authentication_classes=(TokenAuthentication,)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def initialcourse(request, format=None):
    try:
        course_name = request.data.get('topicName')
        course_name=course_name.capitalize()
        existing_course = Course.objects.filter(topicName=course_name).first()

        if existing_course:
            serializer = CourseSerializer(existing_course)
            return Response(serializer.data, status=status.HTTP_200_OK)

        topic_description = course_generator(course_name)

        if topic_description != "Sorry, This is not a learning Topic.":
            new_course = Course(topicName=course_name, topicDescription=topic_description)
            new_course.save()

            response_data = {
                'id': new_course.id,
                'topicName': new_course.topicName,
                'topicDescription': new_course.topicDescription,
                'verified': new_course.verified
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            new_course = Course(topicName=course_name, topicDescription=topic_description)
            response_data = {
                'id': new_course.id,
                'topicName': new_course.topicName,
                'topicDescription': new_course.topicDescription,
                'verified': new_course.verified
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def subtopicadd(request):
    if 'topicName' not in request.data:
        return Response({"error": "Missing 'topicName' in request data."}, status=status.HTTP_400_BAD_REQUEST)
    topic_name = request.data['topicName']
    topic_name=topic_name.capitalize()
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
        topic_name=topic_name.capitalize()
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
    if not username:
        return Response({"message": "Username is required in query parameters."}, status=400)

    user = get_object_or_404(User, username=username)
    user_courses = UserTakeCourse.objects.filter(userid=user)
    courses = Course.objects.filter(id__in=[user_course.courseid_id for user_course in user_courses])
    serializer = CourseSerializer(courses, many=True)
    return Response({"message": "Data retrieved successfully.", "data": serializer.data})



@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def fullcourse(request):
    topic_name = request.query_params.get('topicName', None)
    topic_name=topic_name.capitalize()
    if not topic_name:
        return Response({"message": "Topic name is required in query parameters."}, status=400)

    course = get_object_or_404(Course, topicName=topic_name)
    subtopics = Subtopic.objects.filter(topicid=course)
    serializer = SubtopicSerializer(subtopics, many=True)
    return Response({"message": "Data retrieved successfully.", "data": serializer.data})





    
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


