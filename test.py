import cv2
from matplotlib import pyplot as plt

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()  # captures frame and returns boolean value and captured image
    if not ret:
        continue
    gray_img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    cv2.imshow("Hello World!", frame)
    if cv2.waitKey(10) == ord('q'):  # wait until 'q' key is pressed
        break

cap.release()
cv2.destroyAllWindows