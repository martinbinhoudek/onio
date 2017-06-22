var express=require('express');
var app=express();
var util=require('util');
var mongo=require('mongodb');
var MongoClient=mongo.MongoClient;
var url="mongodb://localhost:27017/mydb";


/**
* Loads all contact data based on http get request on /
**/
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

/**
* Delete one record based on id sent by http get request on /delete
**/
app.get('/delete', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log('Trying delete branch');
  console.log(req.query.id);
  
  MongoClient.connect(url, function(err,db) {
    if (err) throw err;
    console.log("Database connected");
	
	var o_id=new mongo.ObjectID(req.query.id);
	var myquery= { "_id" : o_id };
	db.collection("contacts").deleteOne(myquery, function (err, obj) {
	  if (err) throw err;
	  console.log(req.query.id + " deleted");
	  db.close();
	});
	  res.send("OK");
	});
});

/**
* Saves new record in mongo db based on http get request on /save
**/
app.get('/save', function(req,res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log('Trying save branch');
  console.log(req.query.name);
  
  MongoClient.connect(url, function(err,db) {
    if (err) throw err;
    console.log("Database connected");
	
	db.collection("contacts").insertOne(req.query, function (err, obj) {
	  if (err) throw err;
	  console.log(req.query + " saved");
	  db.close();
	});
	  res.send("Saved");  
	});
});


/**
* Saves changes made to the record based on http get request on /edit
**/
app.get('/edit', function(req,res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log('Trying edit branch');
  console.log(req.query.id);
  
  MongoClient.connect(url, function(err,db) {
    if (err) throw err;
    console.log("Database connected");
	var o_id=new mongo.ObjectID(req.query.id);
	var myquery= { "_id" : o_id };
	db.collection("contacts").updateOne(myquery, req.query, function (err, obj) {
	  if (err) throw err;
	  console.log(req.query + " edited");
	  db.close();
	});
	  res.send("Edited");
	});
});

app.listen(8080, function() {
  console.log('App listening on port 8080');
});