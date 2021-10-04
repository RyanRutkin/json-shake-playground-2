/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



var logics = [];

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/logic', function(req, res) {
  res.statusCode = 200;
  res.json(logics);
});

app.get('/logic/:id', function(req, res) {
  const logic = logics.find(l => l.id === req.params.id);
  if (!logic) {
    res.statusCode = 404;
    res.send({ message: `Logic by id ${req.params.id} not found.`});
  } else {
    res.statusCode = 200;
    res.json(logic);
  }
});

/****************************
* Example post method *
****************************/

app.post('/logic', function(req, res) {
  logics.push(req.body);
  res.statusCode = 200;
  res.send();
});

/****************************
* Example put method *
****************************/

app.put('/logic', function(req, res) {
  logics.push(req.body);
  res.statusCode = 200;
  res.send();
});

/****************************
* Example delete method *
****************************/

app.delete('/resources', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/resources/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
