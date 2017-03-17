
'use strict';

// [START translate_quickstart]
// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'YOUR_PROJECT_ID';
const projectId2 = 'plivonode-161216';


// Instantiates a client
const translateClient = Translate({
  projectId: projectId2,
  keyFilename: 'plivoNode-574ba322d9aa.json'
});

// The text to translate
const text = 'Hello, world!';
// The target language
const target = 'ru';

// Translates some text into Russian
translateClient.translate(text, target)
  .then((results) => {
    const translation = results[0];
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
  });
// [END translate_quickstart]
