# 1 - Deployment of App 

Documentation

PART 1 : Running the code in local server
System Requirements and Specifications – for running on local machine (localhost)

Ubuntu-16.04   (32 bit) with node, npm installed
Steps :- (for 32 bit Ubuntu OS)
1) Download and unzip 1-hello-world.zip
2) Go inside 1-hello-world (cd /1-hello-world)
3) run following commands in the terminal after step 1 : 
	a)  Run “npm install”    to install dependencies and node modules
	b)  Run “npm install jade”   (Web display engine)
	c) Run “npm install object-to-xml” (For Xml output of localhost:8080/results)
	d) Run “npm install body-parser”  (For parsing the response in node js server )
      e) Run “npm install sqlite3”    (For storing the records and history page)
      f) sudo apt-get update    
     g) sudu apt-get install ffmpeg    (For converting the recorded sound’s format 		into .flac which is accepted by google speech api)
4) To finally start the node js  server, run the code:
        node app.js (run “node app.js”  after going inside 1-hello-world/  directory)
5) On browser, go to link : http://localhost:8080/
6) Click on Record button and record sound for less than 8 sec and press STOP 
7) Option to download the recorded sound clip will be temporarily available after clicking the stop button, for sound clip
8) For history go to ,  http://localhost:8080/history/
9) Use back button for next recording





Note: for running on 64-bit Ubuntu, DIFFERENT COMMAND LINE instructions:
1) Download and unzip 1-hello-world.zip
2) Go inside 1-hello-world (cd /1-hello-world)
3) Run npm install to install the dependencies and node modules
4) npm install jsprim
5)npm install grpc
6)npm install  --save @google-cloud/speech
7)npm install  --save @google-cloud/translat
8) npm install jade
9)npm install object-to-xml
10)npm install body-parser
11)npm install sqlite3
12)sudo apt-get update
13)sudo apt-get install ffmpeg            ( required to install ffmpeg)


Note: It is highly preferrable to deploy the app on localmachine having ubuntu 32 bit as the modules installed are compatible with it.


PART 2 : Using the live app link
System Requirements and Specifications – for using my live link
LINK : http://192.81.214.144/

Instructions for use:
1) Only use MOZILLA FIREFOX (51.0.1 (32-bit) or above)*
2) Go to the above link and allow access to microphone 
3) Then click on the record button to start recording your audio
4) You can select the language to be recorded via the dropdown list 
5) Please keep the recording duration less than 8 seconds
6) Click stop button to stop the audio recording
7) Keep patient with app after pressing the stop button as it takes time to process  data recorded via an API
8) The second page will load after 6 seconds

*Chrome does not allow app on test to have powerful permissions like microphone access etc. You can continue using Chrome while running code on localhost.
About the App
The app is developed in Node js framework.  Here Google API client libraries are used to  handle speech and translaation api callbacks. The app uses javascript to record audio through the microphone. For audio recording purposes we have used MediaRecorder API. The recorded media is then converted into Blob. Then this blob is sent to the server via post command. The server recieives the ‘base64’  encoded blob    and then deocdes it from ‘base64’. This decoded sound blob is then converted into .flac format by ffmpeg . After converting the sound stream into .flac, the converted stream alongwith the its language is then sent to Google speech API for recognition and then the recognised speech is forwarded to google translate api to be translated into english.

Thanks
Kumar Pratik
IIT Bombay
EP Third Year Btech
