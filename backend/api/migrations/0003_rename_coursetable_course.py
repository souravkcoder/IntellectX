# Generated by Django 4.2.4 on 2023-09-23 07:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_coursetable"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="CourseTable",
            new_name="Course",
        ),
    ]