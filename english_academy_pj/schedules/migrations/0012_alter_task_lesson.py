# Generated by Django 3.2.8 on 2021-11-23 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedules', '0011_alter_task_lesson_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='lesson',
            field=models.PositiveSmallIntegerField(),
        ),
    ]