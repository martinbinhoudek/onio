#!/usr/bin/env nodejs
var http = require('http');
var url = require('url');
var fs = require('fs');
var util = require('util');

http.createServer(function (req, res) {
	console.log(req);
	//res.set('Access-Control-Allow-Origin', '*');
	res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8',
		'Content-Language': 'cs',
			'Access-Control-Allow-Origin':'*',
			'Access-Control-Allow-Headers':'Content-Type,X-Requested-With,cache-control,pragma'});
		
		/*res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
               'Content-Type,X-Requested-With,cache-control,pragma');*/
//res.end('{"data":"response"}');
res.end('ddd');
	
	/*res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8',
		'Content-Language': 'cs' });
	res.write("The date and time are currently unknown<br>");
	res.write(req.url + "<br>" );


	var q=url.parse(req.url, true).query;
	var txt=q.year + "  " +q.month;
	res.end(txt);*/
	
}).listen(8080);
console.log('Server running at http://localhost:8080/');
