# Generated by Django 4.2.4 on 2023-09-23 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="CourseTable",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("topicName", models.CharField(max_length=200)),
                ("topicDescription", models.TextField()),
            ],
        ),
    ]
