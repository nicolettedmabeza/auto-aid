# Generated by Django 4.0.3 on 2022-10-27 00:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='automobilevo',
            name='vin',
            field=models.CharField(max_length=17),
        ),
    ]