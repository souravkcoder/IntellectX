# Generated by Django 4.2.4 on 2023-09-23 08:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("api", "0006_alter_course_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="course",
            name="id",
            field=models.BigAutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
        migrations.CreateModel(
            name="UserTakeCourse",
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
                (
                    "courseid",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.course"
                    ),
                ),
                (
                    "userid",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
