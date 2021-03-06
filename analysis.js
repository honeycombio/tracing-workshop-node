const HONEYCOMB_API_KEY = "e841bedc1eb9ffd93c4c958b74e2d877";
const HONEYCOMB_DATASET = "workshop";

const GCP_URL_TEMPLATE = "https://language.googleapis.com/v1/documents:analyzeSentiment?key"
const GCP_API_KEY = "AIzaSyAXdTnJgZu0oMUb4I3VN2Mepx_KpXBB5RA"

const beeline = require("honeycomb-beeline")({
  writeKey: HONEYCOMB_API_KEY,
  dataset: HONEYCOMB_DATASET,
  serviceName: "analysis",
});
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(bodyParser.text({ type: "*/*" }));

// = HANDLER =======================================================
// Calls out to various APIs (in this case, Google's Natural Language
// API) to perform a bit of analysis on client-provided strings.
// Returns a float representing any detected sentiment.
// =================================================================
app.post('/', (req, res) => {
  if (typeof(req.body) !== 'string') {
    beeline.customContext.add('error', 'non-string body');
    res.status(500).send("not a string body");
    return;
  }

  let body = {  
    document: { type: "PLAIN_TEXT", content: req.body },
    encodingType: "UTF8"
  };
  let options = {
    uri: [GCP_URL_TEMPLATE, GCP_API_KEY].join('='),
    method: "POST",
    json: body
  };
  request(options, (err, resp, body) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(""+body.documentSentiment.score);
  });
});

app.listen(8088, () => console.log(`'analysis' service listening on port 8088!`));
