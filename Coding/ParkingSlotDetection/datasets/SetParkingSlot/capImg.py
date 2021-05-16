import cv2
#url = 'http://10.8.10.116:8080/videostream.cgi?user=admin&pwd=12345678' #URL กล้อง
url  = 'rtsp://admin:12345678@192.168.137.214:10554/tcp/av0_1' #URL กล้อง
capture = cv2.VideoCapture(url) 

ret, frame = capture.read()
cv2.imshow('Output', frame)
cv2.imwrite('c:\image.png',frame)
print("Your image in c:\image.png")