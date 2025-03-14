from django.db import models
from django.core.validators import FileExtensionValidator

def upload_to(instance, filename):
   
    if len(filename) > 100:
        filename = filename[-100:]  
    return f"book_images/{filename}"

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    publication_year = models.IntegerField()
    category = models.CharField(max_length=100)
    image = models.ImageField(
        upload_to=upload_to,
        null=True,
        blank=True,
        validators=[FileExtensionValidator(allowed_extensions=["png", "jpg", "jpeg", "gif", "bmp", "webp"])]
    )

    def __str__(self):
        return self.title