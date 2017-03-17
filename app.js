'use strict';

const express = require('express');

const app = express();
var bodyParser = require('./node_modules/body-parser');

app.set('view engine', 'jade');

var fs = require("fs");
var file = "./resources/dataDb.db";
var exists = fs.existsSync(file);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

var result = [];
  
function function1(id,language,spoken,translated) {
  result.push({ID:id,LANGUAGE:language,SPOKEN_TEXT:spoken,TRANSLATED_TEXT:translated});

  }


function function_start(){
  db.each("SELECT ID,LANGUAGE,SPOKEN,TRANSLATED FROM DATAS", function(err, row) {  
    function1(row.ID,row.LANGUAGE,row.SPOKEN,row.TRANSLATED);
  });
}


db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE IF NOT EXISTS DATAS (ID INTEGER PRIMARY KEY AUTOINCREMENT, LANGUAGE TEXT, SPOKEN TEXT, TRANSLATED TEXT)");
  };
  function_start();
});


app.get('/', (req, res) => {
  res.status(200).render('scripts');
});


app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(bodyParser.json());

var http = require('http');
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { console.log(stdout)};
var selectedLanguage = '';

app.post('/convert', (req, res) => {
	
  	selectedLanguage =(req.body.language);
 
  		var buf = new Buffer(req.body.blob, 'base64'); // decode
	  	fs.writeFile("./resources/test.flac", buf, function(err) {
	    	if(err) {
	      		console.log("err", err);
	    	} else {
	    	}
	  	});
	  	res.redirect('/record');
});

app.get('/record', (req, res) => {

// [START speech_quickstart]
// Imports the Google Cloud client library
exec("ffmpeg -i ./resources/test.flac -y ./resources/test2.flac", puts);

const Speech = require('@google-cloud/speech');
const Translate = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'plivonode-161216';

const projectId2 = 'YOUR_PROJECT_ID';

// Instantiates a client
const speechClient = Speech({
  projectId: projectId,
  keyFilename: 'plivoNode-574ba322d9aa.json'
});

// Instantiates a client
const translateClient = Translate({
  projectId: projectId,
  keyFilename: 'plivoNode-574ba322d9aa.json'
});


// The text to translate
var text = 'Hello';
// The target language
const target = 'en';

// The name of the audio file to transcribe
const fileName = './resources/test2.flac';

// The audio file's encoding and sample rate
const options = {
  encoding: 'FLAC',
  sampleRate: 48000,
  languageCode: selectedLanguage
};
function function2() {

	speechClient.recognize(fileName, options)
	  .then((results) => {
	    const transcription = results[0];
      text= transcription;
	    console.log(`Transcription: ${transcription}`);
	    function3();
	    //res.status(200).send(transcription);
	  });
}


function function3(){

  // Translates some text into Russian
  translateClient.translate(text, target)
    .then((results) => {
      const translation = results[0];
      console.log(`Text: ${text}`);
      console.log(`Translation: ${translation}`);
      var stmt = db.prepare("INSERT INTO DATAS (LANGUAGE, SPOKEN, TRANSLATED ) VALUES (?,?,?)"); 
      stmt.run(selectedLanguage,text,translation);
      stmt.finalize();
      var datax="<!DOCTYPE html><html><body><h2>";
      datax+=(`Recorded Text: ${text}`+'\n'+'  ||   '+`Translation: ${translation}`);
      datax+="</h2><form action='http://localhost:8080/'><input type='submit' value='Press to try again' /></form></body></html>";
      res.status(200).send(datax);
      exec("rm ./resources/test2.flac", puts);
      exec("rm ./resources/test.flac", puts);
      db.get("SELECT ID, LANGUAGE, SPOKEN, TRANSLATED FROM DATAS ORDER BY ID DESC LIMIT 1;", function(err, row){
        function1(row.ID,row.LANGUAGE,row.SPOKEN,row.TRANSLATED);
      });
    });
// [END translate_quickstart]

}

setTimeout(function2, 4000);

});

app.get('/history', (req, res) => {
 
  function function_end(){
    var o2x = require('object-to-xml');
    res.set('Content-Type', 'text/xml');
    res.send(o2x({
      '?xml version="1.0" encoding="utf-8"?' : null,
      Totalresults: {
        result
      }
    }));
  }

  //function_start();

  db.get("SELECT ID FROM DATAS ORDER BY ID DESC LIMIT 1;", function(err, row){
    function_end();
  });
  
});


process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
  db.close();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));


if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
