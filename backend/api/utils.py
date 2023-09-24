import openai
from django.conf import settings

openai.api_key=settings.APIKEY

def course_generator(inp):
    msg2=f"Tell me the definition of {inp}"
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a good teacher."},
        {"role": "user", "content":msg2 },
       
    ])
    return response['choices'][0]['message']['content']