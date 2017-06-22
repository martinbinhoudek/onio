var express=require('express');
var app=express();

var util=require('util');
var mongo=require('mongodb');//.MongoClient;
var MongoClient=mongo.MongoClient;
var url="mongodb://localhost:27017/mydb";

app.get('/', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  
  MongoClient.connect(url, function(err,db) {
    if (err) throw err;
    console.log("Database connected");
	
	db.collection("contacts").find().toArray(function (err, result) {
	  if (err) throw err;
	  res.send(result);
	});
  });
});

app.get('/delete', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log('Trying delete branch');
  console.log(req.query.id);
  res.send('oh yeah');
});

app.delete('/', function (req,res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  
  console.log('Trying to delete ');
});

app.post('/', function (req,res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.sendStatus(200);
  
  console.log('Trying to post ');
});

app.listen(8080, function() {
  console.log('App listening on port 8080');
});