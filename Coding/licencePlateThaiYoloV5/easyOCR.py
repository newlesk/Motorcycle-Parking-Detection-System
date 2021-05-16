import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import easyocr
import time;
from datetime import datetime
import os
import cv2
import difflib

result = "none"
resultBefore = "none"
cred = credentials.Certificate('newlnwza-firebase-adminsdk-1lyue-0789b3a872.json')
firebase_admin.initialize_app(cred)
db = firestore.client()
province = [
  'กรุงเทพมหานคร',
  'กระบี่',
  'กาญจนบุรี',
  'กาฬสินธุ์',
  'กำแพงเพชร',
  'ขอนแก่น',
  'จันทบุรี',
  'ฉะเชิงเทรา',
  'ชลบุรี',
  'ชัยนาท',
  'ชัยภูมิ',
  'ชุมพร',
  'เชียงใหม่',
  'เชียงราย',
  'ตรัง',
  'ตราด',
  'ตาก',
  'นครนายก',
  'นครปฐม',
  'นครพนม',
  'นครราชสีมา',
  'นครศรีธรรมราช',
  'นครสวรรค์',
  'นนทบุรี',
  'นราธิวาส',
  'น่าน',
  'บึงกาฬ',
  'บุรีรัมย์',
  'ปทุมธานี',
  'ประจวบคีรีขันธ์',
  'ปราจีนบุรี',
  'ปัตตานี',
  'พระนครศรีอยุธยา',
  'พะเยา',
  'พังงา',
  'พัทลุง',
  'พิจิตร',
  'พิษณุโลก',
  'เพชรบุรี',
  'เพชรบูรณ์',
  'แพร่',
  'ภูเก็ต',
  'มหาสารคาม',
  'มุกดาหาร',
  'แม่ฮ่องสอน',
  'ยโสธร',
  'ยะลา',
  'ร้อยเอ็ด',
  'ระนอง',
  'ระยอง',
  'ราชบุรี',
  'ลพบุรี',
  'ลำปาง',
  'ลำพูน',
  'เลย',
  'ศรีสะเกษ',
  'สกลนคร',
  'สงขลา',
  'สตูล',
  'สมุทรปราการ',
  'สมุทรสงคราม',
  'สมุทรสาคร',
  'สระแก้ว',
  'สระบุรี',
  'สิงห์บุรี',
  'สุโขทัย',
  'สุพรรณบุรี',
  'สุราษฎร์ธานี',
  'สุรินทร์',
  'หนองคาย',
  'หนองบัวลำภู',
  'อ่างทอง',
  'อำนาจเจริญ',
  'อุดรธานี',
  'อุตรดิตถ์',
  'อุทัยธานี',
  'อุบลราชธานี',
];


reader = easyocr.Reader(['th'])
folder = 'C:/firstCrop/'
while True:
    try:
        for filename in os.listdir(folder):
            img = cv2.imread(os.path.join(folder,filename))
            print(os.path.join(folder,filename))
            print(filename)
            result = reader.readtext(img,rotation_info = [0],batch_size = 10,allowlist = 'กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮเีาะูุั่้๋๊็ืิึ์ใไำ0123456789',detail = 0)
            print(result)
            proviceSearch = len(result)
            now = datetime.now()
            timestamp = datetime.timestamp(now)
            print(int(timestamp))
            sumResult = []
            finalResult = []
            numResult = '';
            for x in range(proviceSearch):
                provicePrediction = difflib.get_close_matches(result[x], province)
                if(len(provicePrediction) >= 1  ):
                    result[x] = str(provicePrediction)[2:-2];
            for x in range(proviceSearch):
                if(x < proviceSearch-1):
                    sumResult.append(result[x])
                    print ("sumResult == ",' '.join(sumResult))
                else:
                    numResult = result[x]
            finalResult.append(' '.join(sumResult))
            finalResult.append(numResult)
            print("finalResult == ",finalResult)
            if(result != resultBefore):
                resultBefore = result;
                localtime = time.asctime( time.localtime(time.time()) )
                print (' '.join(result))
                docRef = db.collection(u'notifications').document()
                docRef.set({
                    u'licenceplate': ' '.join(finalResult),
                    u'time': localtime,
                })
                docRefCamera = db.collection(u'licenceplate').document(u'camera')
                docRefCamera.set({
                    u'licenceplate': finalResult,
                })  
            os.remove(os.path.join(folder,filename)) 
                
		



    except Exception as e:
        time.sleep(1)
        print(e)









                                    


    

