# Generated by Django 5.1.7 on 2025-03-09 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='image',
            field=models.URLField(blank=True, null=True),
        ),
    ]
