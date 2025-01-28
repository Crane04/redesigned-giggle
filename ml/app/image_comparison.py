import cv2
import numpy as np
import requests

def compare_faces(target_image_url, people):
    # Download the target image
    response = requests.get(target_image_url)
    target_image = cv2.imdecode(np.frombuffer(response.content, np.uint8), cv2.IMREAD_COLOR)

    # Initialize an empty list to store the results
    results = []

    # Iterate over each person
    for person in people:
        # Download the person's image
        response = requests.get(person['image'])
        person_image = cv2.imdecode(np.frombuffer(response.content, np.uint8), cv2.IMREAD_COLOR)

        # Convert images to grayscale
        gray_target = cv2.cvtColor(target_image, cv2.COLOR_BGR2GRAY)
        gray_person = cv2.cvtColor(person_image, cv2.COLOR_BGR2GRAY)

        # Detect faces using Haar cascades
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        target_faces = face_cascade.detectMultiScale(gray_target, scaleFactor=1.1, minNeighbors=5)
        person_faces = face_cascade.detectMultiScale(gray_person, scaleFactor=1.1, minNeighbors=5)

        # Check if faces were detected in both images
        if len(target_faces) > 0 and len(person_faces) > 0:
            # Extract face regions
            target_face = target_image[target_faces[0][1]:target_faces[0][1]+target_faces[0][3], target_faces[0][0]:target_faces[0][0]+target_faces[0][2]]
            person_face = person_image[person_faces[0][1]:person_faces[0][1]+person_faces[0][3], person_faces[0][0]:person_faces[0][0]+person_faces[0][2]]

            # Resize face regions to 100x100
            target_face = cv2.resize(target_face, (100, 100))
            person_face = cv2.resize(person_face, (100, 100))

            # Convert face regions to grayscale
            gray_target_face = cv2.cvtColor(target_face, cv2.COLOR_BGR2GRAY)
            gray_person_face = cv2.cvtColor(person_face, cv2.COLOR_BGR2GRAY)

            # Calculate the absolute difference between the two face regions
            diff = cv2.absdiff(gray_target_face, gray_person_face)

            # Calculate the mean of the absolute difference
            mean_diff = np.mean(diff)

            # Thresholding
            if mean_diff < 50:
                results.append({'name': person['name'], 'match': True})
            else:
                results.append({'name': person['name'], 'match': False})
        else:
            results.append({'name': person['name'], 'match': False})

    matching_names = [result['name'] for result in results if result['match'] == True]
    return {'matching_names': matching_names}

# Example usage:
url1 = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
url2 = "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"

target_image_url = "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
people = [
    {'name': 'John', 'image': 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'},
    {'name': 'Jane', 'image': 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"'},
    {'name': 'Bob', 'image': 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
]

results = compare_faces(target_image_url, people)
print(results)