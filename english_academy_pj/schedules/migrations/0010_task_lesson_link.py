# Generated by Django 3.2.8 on 2021-11-23 08:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedules', '0009_task_lesson'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='lesson_link',
            field=models.URLField(default='https://mokka.com'),
            preserve_default=False,
        ),
    ]
