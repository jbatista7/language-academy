# Generated by Django 3.2.8 on 2021-11-02 15:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0001_initial'),
        ('schedules', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchasedpackage',
            name='packs',
            field=models.ManyToManyField(related_name='PurchasedPackages', to='lessons.Pack'),
        ),
        migrations.AlterField(
            model_name='task',
            name='date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]