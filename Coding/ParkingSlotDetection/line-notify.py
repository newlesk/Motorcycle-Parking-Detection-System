#!/usr/local/bin/python3
import requests
import datetime
while True:
    timestamp = datetime.datetime.now()
    from firebase import firebase
    firebase = firebase.FirebaseApplication('https://test-45088.firebaseio.com/', None)
    resultLicensePlate = firebase.get('/LicensePlate/1/LicensePlateStatus', '')
    Request = firebase.get('/LicensePlate/1', 'RequestLicen')
    LicensePlateNum = firebase.get('/LicensePlate/1', 'LicensePlateNum')
    if (Request == 1):
        if (resultLicensePlate == 0):
            firebase.post('/LicensePlate/1/OUT',timestamp)
            url = 'https://notify-api.line.me/api/notify'
            token = firebase.get('/LicensePlate/1', 'Token')
            headers = {'content-type':'application/x-www-form-urlencoded','Authorization':'Bearer '+token}
            msg = "รถท่านออกไปแล้ว",LicensePlateNum
            r = requests.post(url, headers=headers, data = {'message':msg})
            print (r.text)
            firebase.put('/LicensePlate/1','RequestLicen',0)
        if (resultLicensePlate == 1):
            firebase.post('/LicensePlate/1/IN',timestamp)
            url = 'https://notify-api.line.me/api/notify'
            token = firebase.get('/LicensePlate/1', 'Token')
            headers = {'content-type':'application/x-www-form-urlencoded','Authorization':'Bearer '+token}
            msg = "รถท่านเข้ามาแล้ว",LicensePlateNum
            firebase.put('/LicensePlate/1','RequestLicen',0)
            r = requests.post(url, headers=headers, data = {'message':msg})
            print (r.text)
