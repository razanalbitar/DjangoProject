from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import Book
from .forms import BookForm
from .serializers import BookSerializer

class BookList(APIView):
    def get(self, request):
        query = request.query_params.get('search', None)
        if query:
            books = Book.objects.filter(
                Q(title__icontains=query) |
                Q(author__icontains=query) |
                Q(category__icontains=query)
            )
        else:
            books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    def post(self, request):
        form = BookForm(request.POST, request.FILES)
        if form.is_valid():
            book = form.save()
            serializer = BookSerializer(book)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Convert form errors to DRF response format
            errors = {field: error[0] for field, error in form.errors.items()}
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

class BookDetail(APIView):
    def get_object(self, pk):
        try:
            return Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return None

    def get(self, request, pk):
        book = self.get_object(pk)
        if book:
            serializer = BookSerializer(book)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        book = self.get_object(pk)
        if book:
            form = BookForm(request.POST, request.FILES, instance=book)
            if form.is_valid():
                book = form.save()
                serializer = BookSerializer(book)
                return Response(serializer.data)
            else:
                # Convert form errors to DRF response format
                errors = {field: error[0] for field, error in form.errors.items()}
                return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        book = self.get_object(pk)
        if book:
            book.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)