# Generated by Django 4.2.4 on 2023-09-23 08:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0007_alter_course_id_usertakecourse"),
    ]

    operations = [
        migrations.RenameField(
            model_name="subtopic",
            old_name="subtpoicsName",
            new_name="subtopicsName",
        ),
    ]
