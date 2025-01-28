from rest_framework import serializers

class PersonSerializer(serializers.Serializer):
    name = serializers.CharField()
    image = serializers.URLField()

class CompareImageSerializer(serializers.Serializer):
    target_image = serializers.URLField()
    people = PersonSerializer(many=True)