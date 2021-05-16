import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import time
import datetime

#======================Your Firebase FireStore Json=====================
cred = credentials.Certificate('test.json')
firebase_admin.initialize_app(cred)
db = firestore.client()
users_ref = db.collection(u'parking')
docs = users_ref.stream()
countRed = 0;
while True:
    for doc in docs:
        if(doc.id != 'cameraL' and doc.id != 'cameraP'):
            # print(u'{}'.format(doc.id))
            data_dict = doc.to_dict()
            if(data_dict['color'] == 'red'):
                countRed = countRed + 1
    print("count ==", countRed)
    datetimeNow = datetime.datetime.now()
    docRef = db.collection(u'parkingHistory').document(str(datetimeNow))
    docRef.set({
        u'time': str(datetimeNow),
        u'parkingCount': countRed
   
    })
    countRed == 0
    time.sleep(600)
