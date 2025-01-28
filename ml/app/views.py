from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CompareImageSerializer
from .image_comparison import compare_faces


class CompareImageView(APIView):
    def post(self, request):
        serializer = CompareImageSerializer(data=request.data)
        if serializer.is_valid():
            target_image = serializer.validated_data['target_image']
            people = serializer.validated_data['people']

            # Process the images and compare them
            results = compare_faces(target_image, people)

            return Response({"results": results})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)