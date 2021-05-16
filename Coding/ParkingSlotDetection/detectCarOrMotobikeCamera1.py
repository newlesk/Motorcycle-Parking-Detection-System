#Import the neccesary libraries
import numpy as np
import argparse
import cv2 
import yaml
import time
from shapely.geometry import Polygon
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import base64


fn_yaml = r"datasets/parkingNew.yml"
#fn_yaml = r"datasets/parking2.yml"
fn_out = r"datasets/output.avi"

# construct the argument parse 
parser = argparse.ArgumentParser(
    description='Script to run MobileNet-SSD object detection network ')
parser.add_argument("--video", help="path to video file. If empty, camera's stream will be used")
parser.add_argument("--prototxt", default="MobileNetSSD_deploy.prototxt",
                                  help='Path to text network file: '
                                       'MobileNetSSD_deploy.prototxt for Caffe model or '
                                       )
parser.add_argument("--weights", default="MobileNetSSD_deploy.caffemodel",
                                 help='Path to weights: '
                                      'MobileNetSSD_deploy.caffemodel for Caffe model or '
                                      )
parser.add_argument("--thr", default=0.2, type=float, help="confidence threshold to filter out weak detections")
args = parser.parse_args()

# Labels of Network.
classNames = { 0: 'background',
    1: 'aeroplane', 2: 'bicycle', 3: 'bird', 4: 'boat',
    5: 'bottle', 6: 'bus', 7: 'car', 8: 'cat', 9: 'chair',
    10: 'cow', 11: 'diningtable', 12: 'dog', 13: 'horse',
    14: 'motorbike', 15: 'person', 16: 'pottedplant',
    17: 'sheep', 18: 'sofa', 19: 'train', 20: 'tvmonitor' }

#======================Your Firebase FireStore Json=====================
cred = credentials.Certificate('test.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Open video file or capture device. 
url = 'rtsp://admin:12345678@192.168.137.232:10554/tcp/av0_1'
if args.video:
    cap = cv2.VideoCapture(args.video)
else:
    cap = cv2.VideoCapture(url) 



 
#Load the Caffe model 
net = cv2.dnn.readNetFromCaffe(args.prototxt, args.weights)

with open(fn_yaml, 'r') as stream:
    parking_data = yaml.load(stream)
parking_contours = []
parking_bounding_rects = []
parking_mask = []

for park in parking_data:
    points = np.array(park['points'])
    rect = cv2.boundingRect(points)
    points_shifted = points.copy()
    points_shifted[:,0] = points[:,0] - rect[0] # shift contour to roi
    points_shifted[:,1] = points[:,1] - rect[1]
    
    parking_contours.append(points)
    parking_bounding_rects.append(rect)
    mask = cv2.drawContours(np.zeros((rect[3], rect[2]), dtype=np.uint8), [points_shifted], contourIdx=-1,
                            color=255, thickness=-1, lineType=cv2.LINE_8)
    
    
    mask = mask==255
    parking_mask.append(mask)
    countSet = int(np.array(park['id']))+1
    converted_num = str(int(np.array(park['id']))+1) 
    slot = converted_num 
    print("park == ",converted_num)
    docRef = db.collection(u'parking').document(slot)
    docRef.set({
         u'color': u'lightgreen',
         u'parking': countSet})




parking_status = [False]*len(parking_data)
parking_buffer = [None]*len(parking_data)


while True:
    frames = 0
    for x in range(0, 20):

        ret, frame = cap.read()
        # url = 'rtsp://admin:12345678@192.168.137.214:10554/tcp/av0_1' #RTSP URL ที่ได้มาจากข้อก่อนหน้า
        cap = cv2.VideoCapture(url) #rtsp://192.168.137.157:554/mcast/11
        # start = 0
        # start = time.time()
        # Capture frame-by-frame
        
        try:
            #cap = cv2.VideoCapture(url)
            #cap = cv2.VideoCapture("rtsp://192.168.137.157:554/mcast/11")
            frame_resized = cv2.resize(frame,(300,300)) # resize frame for prediction
            #frame_resized.set(cv2.CAP_PROP_BUFFERSIZE, 1)
        except Exception as e:
            print(str(e))
            # MobileNet requires fixed dimensions for input image(s)
            # so we have to ensure that it is resized to 300x300 pixels.
            # set a scale factor to image because network the objects has differents size. 
            # We perform a mean subtraction (127.5, 127.5, 127.5) to normalize the input;
            # after executing this command our "blob" now has the shape:
            # (1, 3, 300, 300)
        try:
            blob = cv2.dnn.blobFromImage(frame_resized, 0.007843, (300, 300), (127.5, 127.5, 127.5), False)
        
            #Set to network the input blob 
            net.setInput(blob)
            #Prediction of network
            detections = net.forward()

            #Size of frame resize (300x300)
            cols = frame_resized.shape[1] 
            rows = frame_resized.shape[0]

            #For get the class and location of object detected, 
            # There is a fix index for class, location and confidence
            # value in @detections array .
            couter = 0
            for ind, park in enumerate(parking_data):
                iouArray = []  
        
                points = np.array(park['points'])
                # print (parking_status[ind])
                #centroidnew= np.array(xLeftBottom,yLeftBottom)
                points1 = np.array(points[0:1])
                points2 = np.array(points[1:2])
                points3 = np.array(points[2:3])
                points4 = np.array(points[3:4])
                print(points1[0][0],points1[0][1],"= 1")
                print(points2[0][0],points2[0][1],"= 2")
                print(points3[0][0],points3[0][1],"= 3")
                print(points4[0][0],points4[0][1],"= 4")
                color = (0,255,0)
                cv2.drawContours(frame, [points], contourIdx=-1,color=color, thickness=2, lineType=cv2.LINE_8)
                # converted_num = str(ind) 
                

                for i in range(detections.shape[2]):
                    confidence = detections[0, 0, i, 2] #Confidence of prediction 
                    if confidence > args.thr: # Filter prediction 
                        class_id = int(detections[0, 0, i, 1]) # Class label
                        # Object location 
                        xLeftBottom = int(detections[0, 0, i, 3] * cols) 
                        yLeftBottom = int(detections[0, 0, i, 4] * rows)
                        xRightTop   = int(detections[0, 0, i, 5] * cols)
                        yRightTop   = int(detections[0, 0, i, 6] * rows)
                        # Factor for scale to original size of frame
                        heightFactor = frame.shape[0]/300.0  
                        widthFactor = frame.shape[1]/300.0 
                        # Scale object detection to frame
                        xLeftBottom = int(widthFactor * xLeftBottom) 
                        yLeftBottom = int(heightFactor * yLeftBottom)
                        xRightTop   = int(widthFactor * xRightTop)
                        yRightTop   = int(heightFactor * yRightTop)
                        xc= int((xLeftBottom + xRightTop)/2)
                        yc= int((yLeftBottom + yRightTop)/2)
                        centroid = (int(xc)-3, int(yc)+3) 
                        if class_id == 7 or class_id == 14:
                            cv2.rectangle(frame, (xLeftBottom, yLeftBottom), (xRightTop, yRightTop),(255, 255, 255))
                            label = classNames[class_id] + ": " + str(confidence)
                            labelSize, baseLine = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 1)
                            yLeftBottom = max(yLeftBottom, labelSize[1])
                            cv2.rectangle(frame, (xLeftBottom, yLeftBottom - labelSize[1]),(xLeftBottom + labelSize[0], yLeftBottom + baseLine),(0, 0, 0), cv2.FILLED)
                            cv2.putText(frame, label, (xLeftBottom, yLeftBottom),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255))
                            cv2.putText(frame, "*", (xc, yc),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255))
                            print(label) #print class and confidence
                            couter =  couter + 1
                            box_1 = [[points1[0][0], points1[0][1]], [points2[0][0], points2[0][1]], [points3[0][0], points3[0][1]], [points4[0][0], points4[0][1]]]
                            box_2 = [[xLeftBottom,yRightTop],[xRightTop, yRightTop],[xRightTop,yLeftBottom],[xLeftBottom, yLeftBottom]]
                            print(box_1,'\n',box_2)
                            poly_1 = Polygon(box_1)
                            poly_2 = Polygon(box_2)

                            print(poly_1,'\n',poly_2)
                            print(poly_1.intersection(poly_2).area,poly_1.union(poly_2).area)
                            #poly1area = poly_1.area
                            #poly2area = poly_2.area
                            #print(poly1area,poly2area)
                            #iou = intersection_area / (union_area - intersection_area)
                            #iou = intersection_area / (union_area - intersection_area)
                            iou = poly_1.intersection(poly_2).area / (poly_1.union(poly_2).area - poly_1.intersection(poly_2).area)
                            iouArray.append(iou)
                            #iou = poly_1.intersection(poly_2).area / (poly_1.union(poly_2).area)
                            print("iouBeforeIF == ",iou*100,"%")
                            #p1         = centroidnew[0] >= points1[0][0] and centroidnew[1] >= points1[0][1] 
                            #p2         = centroidnew[0] <= points2[0][0] and centroidnew[1] >= points2[0][1] 
                            #p3         = centroidnew[0] <= points3[0][0] and centroidnew[1] <= points3[0][1] 
                            #p4         = centroidnew[0] >= points4[0][0] and centroidnew[1] <= points4[0][1]
                iouArray.sort(reverse=True)
                print("iouArray === ",iouArray)
                iouArraySearch = len(iouArray)
                print("Data in iouArray == ",iouArraySearch)
                slot = str(ind) 
                print("slot == ",slot)
                docRef = db.collection(u'parking').document(slot)
                if(iouArraySearch > 0):
                    if(iouArray[0] > 0.65 ):
                        print("iouInIFiou > 0.65 ",iou*100,"%")
                        if(x == 0):
                            docRef.set({
                                u'color': u'red',
                                u'parking': ind})
                        color = (0,0,255)
                        cv2.drawContours(frame, [points], contourIdx=-1,color=color, thickness=2, lineType=cv2.LINE_8)            
                        moments = cv2.moments(points)        
                        print(centroid[0]+1, centroid[1]+1)
                        cv2.putText(frame, str(park['id']), (centroid[0]+1, centroid[1]+1), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255,255,255), 1, cv2.LINE_AA)
                        cv2.putText(frame, str(park['id']), (centroid[0]-1, centroid[1]-1), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255,255,255), 1, cv2.LINE_AA)
                        cv2.putText(frame, str(park['id']), (centroid[0]+1, centroid[1]-1), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255,255,255), 1, cv2.LINE_AA)
                        cv2.putText(frame, str(park['id']), (centroid[0]-1, centroid[1]+1), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255,255,255), 1, cv2.LINE_AA)
                        cv2.putText(frame, str(park['id']), centroid, cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0,0,0), 1, cv2.LINE_AA)
                        frames += 1
                    elif(iouArray[0] > 0.01 ):
                        print("iouInIFiou <= 0.20 ",iou*100,"%")
                        if(x == 0):
                            docRef.set({
                                u'color': u'lightgreen',
                                u'parking': ind})
                        color = (0,255,0)
                        cv2.drawContours(frame, [points], contourIdx=-1,color=color, thickness=2, lineType=cv2.LINE_8)            
                        moments = cv2.moments(points)        
                        print(centroid[0]+1, centroid[1]+1)

                        # cv2.putText(frame, str(park['id']), (centroid[0]+1, centroid[1]+1), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255,255,255), 1, cv2.LINE_AA)
                        # cv2.putText(frame, str(park['id']), (centroid[0]-1, centroid[1]-1), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255,255,255), 1, cv2.LINE_AA)
                        # cv2.putText(frame, str(park['id']), (centroid[0]+1, centroid[1]-1), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255,255,255), 1, cv2.LINE_AA)
                        # cv2.putText(frame, str(park['id']), (centroid[0]-1, centroid[1]+1), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255,255,255), 1, cv2.LINE_AA)
                        # cv2.putText(frame, str(park['id']), centroid, cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0,0,0), 1, cv2.LINE_AA)     
                        frames += 1 
                else:
                    if(x == 0):
                        color = (0,255,0)
                        cv2.drawContours(frame, [points], contourIdx=-1,color=color, thickness=2, lineType=cv2.LINE_8)
                        docRef.set({
                            u'color': u'lightgreen',
                            u'parking': ind})

                        
        
            if(True):
                image_code = str(base64.b64encode(cv2.imencode('.jpg', frame)[1]).decode())
                docRefCamera = db.collection(u'parking').document(u'cameraP')
                docRefCamera.set({
                    u'base64': image_code
                    })

            print("X == ",x)
            print("FPS of the video is {:5.2f}".format( frames ))           
            print(parking_data)
            #print(" centroid :",centroid)
            print(" couter :",couter)
            cv2.namedWindow("frame", cv2.WINDOW_NORMAL)
            cv2.imshow("frame", frame)

            #time.sleep(0.5)
            if cv2.waitKey(1) == 27:  # Break with ESC 
                break
        except Exception as e:
            print(str(e))
        


