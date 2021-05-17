# Motorcycle-Parking-Detection-System
 
เครื่องมือที่ใช้ในการพัฒนา
 - Python
 - YoloV5
 - Mobilenet SSD
 - Firebase
 - React

==========================================================================

<h2>ปริญญานิพนธ์เรื่อง       ระบบตรวจสอบที่ว่างของที่จอดรถจักรยานยนต์ภายในสาขาวิศวกรรมคอมพิวเตอร์</h2> 

<h3>ชื่อนักศึกษา</h3>

- นายกฤติพงศ์	วชิรางกุล
  
- นายชนม์แดน	อุตตาลกาญจนา

- นายชนชนันท์	หาวา

- นายวรภพ	โสมนัส

<h3>อาจารย์ที่ปรึกษา</h3>          

- อาจารย์ปรัชญ์  	ปิยะวงศ์วิศาล    

<h3>หลักสูตร</h3> 		

- วิศวกรรมศาสตรบัณทิต  

<h3>สาขาวิชา</h3> 	

- วิศวกรรมคอมพิวเตอร์

<h3>ปีการศึกษา</h3> 	

- 2563

<h3>บทคัดย่อ</h3>

- โครงงานนี้มีวัตถุประสงค์เพื่อศึกษาวิธีการควบคุมการทำงานของ raspberry pi และการเชื่อมระบบฐานข้อมูล Firebase และใช้กล้องในการตรวจจับช่องว่างในที่จอดรถ โดยโครงงานชิ้นนี้นั้นจะทำการตรวจสอบว่ามีรถจักรยานยนต์เข้ามาที่จอดรถสาขาวิศวกรรมคอมพิวเตอร์หรือไม่   ถ้ามีรถจักรยานยนต์ระบบจะทำการตรวจจับว่ารถจักรยานยนต์คันนั้นเข้ามาจอดในช่องไหนแล้วและจะบันทึกไว้ว่าในช่องนั้นมีรถจักรยานยนต์จอดอยู่  อีกทั้งยังจะสามารถแสดงว่าที่จอดรถนั้นว่างหรือไม่ จากหน้าจอแสดงผลหน้าสาขาวิศวกรรมคอมพิวเตอร์และยังสามารถแสดงผลได้ว่าในสาขาวิศวกรรมคอมพิวเตอร์นั้นมีที่จอดรถจักรยานยนต์ว่างกี่ช่อง ระบบจะทำการส่งข้อมูลเข้าไปใน Firebase เพื่อนำข้อมูลที่ได้ไปแสดงทุก 30 วินาทีใน Application แล้วส่งข้อมูลไปยังหน้าจอแสดงผลและ Smart Phone ของนักศึกษาสาขาวิศวกรรมคอมพิวเตอร์
การทดสอบระบบและแอปพลิเคชันฯ ผู้ได้ทำการวัดประสิทธิภาพ Model ของ Machine Learning แบบ Classification ด้วยหลักการ Confusion Matrix โดยเก็บผลการทดสอบ ตั้งแต่เวลา 08.00-18:00 ทุก ๆ 30 นาที ทั้งหมด 4410 ครั้ง สรุปได้ว่าโปรแกรมทำนายได้ว่าจริง เป็น Recall ทั้งหมด 97% และมี Precision 73% ดังนั้นการตรวจจับรถจักรยานยนต์ที่เข้าจอดในลานจอดรถมี Accuracy 95% 

==========================================================================

<h2>Project Title	Motorcycle Parking Detection System for Computer Engineer Department</h2>

<h3>Students</h3>		

- MR. Krittipong		Wachirangkul

- MR. Chondan		Audtankarnjana

- MR. Chonchanan	Hawa

- MR. Woraphob 	Somanut

<h3>Project Advisor</h3>	
 
- MR. Pratch  		Piyawongwisal

<h3>Curriculum</h3>		
 
- Bachelor of Engineering 

<h3>Major Field</h3>		
 
- Computer Engineering

<h3>Academic</h3> 

- Year	2020

<h3>ABSTRACT</h3> 

- The purpose of this project is study about how to control raspberry pi system and how to connect with firebase and how to use camera for parking lot detection this project can detection with camera when motorcycle arrived to parking lot if motorcycle come to parking lot detection system can detect motorcycle and record in which parking lot also this system can show the number of parking lot and monitor can show parking lot , this system will send data to firebase for showing data every 30 second in application next send data to monitor and student smart phone for checking parking lot in computer engineering major
       System and application testing The model of Machine Learning Classification with the Confusion Matrix. The test results from 08.00-18.00 every 30 minutes, all 4410 times, concluded that the program predicted that true. It is 97% true and 73% accurate. The detection of motorbike parked in the parking lot is 95% accurate.
