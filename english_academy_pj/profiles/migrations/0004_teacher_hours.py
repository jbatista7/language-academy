# Generated by Django 3.2.8 on 2021-11-22 15:20

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_teacher_country'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacher',
            name='hours',
            field=multiselectfield.db.fields.MultiSelectField(choices=[(0, '12:00 AM'), (1, '01:00 AM'), (2, '02:00 AM')], default=0, max_length=3),
            preserve_default=False,
        ),
    ]