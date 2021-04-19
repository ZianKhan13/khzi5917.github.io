var express = require('express');
var app = express();
var bodyParser = require('body-parser')

//#7 Implement a Root-Level Request Logger Middleware that runs on all directories
app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

//#1 Meet the node console
console.log("Hello World");

//#2 Start a working express server
// app.get("/", function(req, res) {
//   res.send("Hello Express");
// });

//#3 Serve an HTML File
app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/index.html");
});

//#4 Serve Static Assets
app.use("/public", express.static(__dirname + "/public"));

//#5 Serve JSON on a Specific Route - #6 Use the .env File
app.get("/json", function(req, res){
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({"message": "HELLO JSON"});
  } else {
    res.json({"message": "Hello json"});
  }
});

//#8 Chain Middleware to Create a Time Server
app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, function(req, res){
    console.log("time: " + req.time);
    res.json({ "time": req.time });
});

//#11 Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//#9 Get Route Parameter Input from the Client
app.get("/:word/echo", function(req, res) {
  const { word } = req.params;
  res.json({echo: word});
});

//#10 Get Query Parameter Input from the Client
app.get("/name", function(req, res){
  var firstName = req.query.first;
  var lastName = req.query.last;
  var { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  });
});

//#12 Get Data from POST request
app.post("/name", function(req, res){
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});


 module.exports = app;
