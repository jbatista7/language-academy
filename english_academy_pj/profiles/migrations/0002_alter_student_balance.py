# Generated by Django 3.2.8 on 2021-11-16 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='balance',
            field=models.FloatField(blank=True, default=0.0, help_text='in US dollars $'),
        ),
    ]
