import cv2
url = 'http://10.8.10.116:8080/videostream.cgi?user=admin&pwd=12345678' #RTSP URL ที่ได้มาจากข้อก่อนหน้า
capture = cv2.VideoCapture(url) 

ret, frame = capture.read()
cv2.imshow('Output', frame)
cv2.imwrite('c:\image.png',frame)
k = cv2.waitKey(10) &0xFF
