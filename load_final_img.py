import face_recognition
import cv2
import glob
import pandas as pd
import pickle
import numpy as np
from tempfile import TemporaryFile


known_face_names=np.load('outfile.npy')
known_face_encodings=[]
dataset = pd.read_csv('second_year_thapar.csv',header=None)
person = dataset.iloc[0:,0:5].values

with open('dataset_faces.dat', 'rb') as f:
	faces_encoding = pickle.load(f)

known_face_encodings =faces_encoding


# Grab a single frame of video
frame = cv2.imread('Search_by_image/prakhar_ask.jpeg')

# Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
rgb_frame = frame[:, :, ::-1]

# Find all the faces and face enqcodings in the frame of video
face_locations = face_recognition.face_locations(rgb_frame)
face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

# Loop through each face in this frame of video
for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
  # See if the face is a match for the known face(s)
  matches = face_recognition.compare_faces(known_face_encodings, face_encoding,tolerance=0.508)

  # Draw a box around the face
  cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
  # Draw a label with a name below the face
  cv2.rectangle(frame, (left, bottom + 35), (right, bottom), (0,0, 200), cv2.FILLED)
  font = cv2.FONT_HERSHEY_DUPLEX
  
  print('MATCHES-FOUND-WITH:')

  total=0

  for i in range(0,len(matches)):
      if(matches[i]==True):
          print('Name: ',person[known_face_names[i]][1])
          print('Rollno: ',person[known_face_names[i]][0])
          name=str(person[known_face_names[i]][1])
          roll=str(person[known_face_names[i]][0])
          x_co=left
          y_co=bottom+10+total*33
          cv2.putText(frame, name, (x_co,y_co), font, 0.36, (0, 255,0), 1)
          cv2.putText(frame, roll, (x_co,y_co+15), font, 0.36, (0, 255,0), 1)
          total=total+1

                

while True:
 cv2.imshow('Video', frame)
 if cv2.waitKey(1) & 0xFF == ord('q'):
   break

cv2.destroyAllWindows()
