import openai
from django.conf import settings
import re

openai.api_key=settings.APIKEY

def course_generator(inp):
    msg2=f" Is {inp} a learning topic?? Answer in only yes or no."
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a good teacher."},
        {"role": "user", "content":msg2 },
       
    ])
    conf= response['choices'][0]['message']['content']
    ans="Sorry, This is not a learning Topic."
    if(conf=='Yes.'):
        msg3= f"Give me an overview of the course: {inp} "
        res = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
        {"role": "system", "content": "You are a good teacher."},
        {"role": "user", "content":msg3 },
       
        ])
        ans=res['choices'][0]['message']['content']

    
    return ans

def subtopic_generator(inp):
    
    """msg2=f"Suppose, you are an instructor of udemy. You are going to teach me about {inp} via text output. First create a module of subtopics that you are going to teach in this course. Write them with numbered order(1,2,3.....)"""
    
    
    """response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a good teacher."},
        {"role": "user", "content":msg2 },
       
    ])
    res= response['choices'][0]['message']['content']
    pattern = r'\d+\.\s+(.+)'
    subtopics = re.findall(pattern, res)"""
    subtopics=['**Introduction to Data Structures**', '**Arrays and Linked Lists**', '**Stacks and Queues**', '**Trees: Basics and Binary Trees**', '**Binary Search Trees and Balanced Trees**', '**Heaps and Priority Queues**', '**Graphs: Concepts and Representations**', '**Graph Traversals: BFS and DFS**', '**Graph Algorithms: Shortest Paths**', '**Minimum Spanning Trees and Applications**', '**Hashing and Hash Tables**', '**Collision Resolution Techniques**', '**Advanced Data Structures: Trie and Suffix Trees**', '**Segment Trees and Fenwick Trees**', '**Disjoint Set Union (Union-Find)**', '**Spatial Data Structures**', '**Caches and Memory Management**', '**Real-world Case Studies**', '**Optimization Techniques and Trade-offs**', '**Practical Project: Design and Implementation**', '**Review and Practice Day**', '**Interview Preparation: Data Structures**', '**Quiz and Assessments**', '**Advanced Topics: Big O Analysis**', '**Advanced Topics: Space Complexity**', '**Debugging and Optimizing Data Structures**', '**Practical Applications and Implementations**', '**Documentation and Code Reviews**', '**Final Project and Presentation**', '**Course Conclusion and Next Steps**']
    return subtopics

def class_generator(inp):

    """
    msg2=f"Now, as a course instructor, teach me the following topic : {inp}. Explain this in a very easy way, clearify every detail and teach me the whole topic step by step. provide me if any example/code needed."
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a good teacher."},
        {"role": "user", "content":msg2 },
       
    ])
    res= response['choices'][0]['message']['content']
    """
    res="working"
    return res