var express = require("express");
var bdPars = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var pgp = require('pg-promise')();
var mustacheExpress = require('mustache-express');
var request = require('request');
var rp = require('request-promise');
var fs = require('fs');
var cheerio = require('cheerio');
var session = require('express-session');


const bcrypt=require('bcryptjs')

var util = require('util');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public/"));
app.use(methodOverride('_method')); //method override
app.use(bdPars.urlencoded({ extended: false })); //body parser
app.use(bdPars.json()); //body parser

var db = pgp('postgres://student_12@localhost:5432/secondProject_db');


var port = process.env.PORT || 8015;
app.listen(port)
console.log("Callooh! Callay! Server is running on " + port);

//the code

app.use(session({
  secret: 'theTruthIsOutThere51',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

//user stuff code block beginnning

app.get("/", function (req,res){
  var logged_in;
  var email;
  if(req.session.user){}
    var data={
      "logged_in": false,
      "email": "heyThereMisterLookAtMyEmailOk@someWebsitePleaseConsume.com"
    }
    res.render('index')
})

app.get("/signup", function(req, res){
  res.render('signup/index')
})

//to post new email
app.post("/signup", function(req, res){
//save user to the database
//ni bezonas savi uzanton kaj poste meti la kasxvorton en la datumbazo
var data=req.body

//bcrypt needs to use callbacks instead of promises, unfortunately.
bcrypt.hash(data.password, 10, function(err, hash){

db.none(
  "INSERT INTO users (email, password_digest) VALUES ($1, $2)",
  [data.email, hash]
  ).then(function(){
    res.send('user created')
  })
})


})

app.post('/login', function(req, res){
  //we need to grab stuff off the body
  var data=req.body;

  //check if user exists is step one.
  db.one(
    "SELECT * FROM users WHERE email=$1", [data.email]
    //the above in brackets sanatizes
  ).catch(function(){
    res.send('Email/Password not found')
    //we are ambigious above to make it easier. but it should just saw user.
  }).then(function(user){
    //cmp boolean response. this compare function is the magical thing.
    //takes a red square, and tests if what comes out of the machine matches
    //the order of the values below matter. the first one must be the users plaintext pw
    bcrypt.compare(data.password, user.password_digest, function(err, cmp){

      req.session.user=user;
      //we don't have the understand the session thing yet.
      res.redirect('/')

    })
  })
})





//user stuff code block ending


app.get('/', function(req, res) {
    res.render('index');
});



app.get('/wiki/template', function(req, res) {
    request('https://eo.wikipedia.org/api/rest_v1/page/mobile-sections/francio', function(error, response, body) {
        if (error) {
            return console.log('Error:', error);
        }
        if (response.statusCode !== 200) {
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        var parsingThing = JSON.parse(body);
        res.render('wiki/articleTemplate', {
            "wikiData": parsingThing
        })



    })
})



//la subo donas al mi la bezonajxon.
//https://eo.wikipedia.org/api/rest_v1/page/mobile-sections/usono
