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


const bcrypt = require('bcryptjs')

var util = require('util');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public/"));
app.use(methodOverride('_method')); //method override
app.use(bdPars.urlencoded({
  extended: false
})); //body parser
app.use(bdPars.json()); //body parser

var db = pgp(process.env.DATABASE_URL || 'postgres://miko@localhost:8015/secondproject_db');
// var db = pgp('postgres://student_12@localhost:5432/secondProject_db');

var port = process.env.PORT || 8015;
app.listen(port)
console.log("Callooh! Callay! Server is running on " + port);


app.use(session({
  secret: 'theTruthIsOutThere51',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}))



//this renders the front page
app.get("/", function(req, res) {
  var logged_in;
  var email;
  var name;
  var id;
  if (req.session.user) {
    logged_in = true;
    email = req.session.user.email;
    name=req.session.user.name;
    id = req.session.user.id
  }
  var data = {
    "logged_in": logged_in,
    "email": email,
    "id": id,
    "name":name
  }
  res.render('index', data)
})


//this renders the login page
app.get("/login", function(req, res) {
  res.render('login/index')
})

//this renders the signup page
app.get("/signup", function(req, res) {
  res.render('signup/index')
})

//to create a new user
app.post("/signup", function(req, res) {

  var data = req.body

  bcrypt.hash(data.password, 10, function(err, hash) {

    db.none(
      "INSERT INTO users (name, email, password_digest) VALUES ($1, $2, $3)", [data.name, data.email, hash]
    ).then(function() {
      console.log("user created")
      res.render('login/index')
    })
  })
})



app.post('/login', function(req, res) {

  var data = req.body;
  db.one(
    "SELECT * FROM users WHERE email=$1", [data.email]
  ).catch(function() {
    res.send('Email/Password not found')
    console.log('Email/Password not found')
  }).then(function(user) {
    bcrypt.compare(data.password, user.password_digest, function(err, cmp) {
      if (cmp) {
        req.session.user = user;

        console.log("cmp succesful, email matches pw")
        res.redirect('/');
      } else {
        res.send('Email/Password not found')
      }

    })



  })
})




//how to save a new word
app.post("/addWord", function(req, res) {

    var data = req.body
    theId=req.session.user.id
    db.none(
        "INSERT INTO lists (word, definition, user_id) VALUES ($1, $2, $3)", [data.word, data.definition, theId]
      )
      .catch(function() {
        console.log("word not added, error.")
      })
      .then(function() {
        console.log("word added")
        res.render('wiki/articleTemplate')
      })
  })


//this renders the article available to the user
app.get('/wiki/template', function(req, res) {
  var logged_in;

  if (req.session.user) {
    logged_in = true;

  }
  var data = {
    "logged_in": logged_in,
  }



  request('https://eo.wikipedia.org/api/rest_v1/page/mobile-sections/francio', function(error, response, body) {
    if (error) {
      return console.log('Error:', error);
    }
    if (response.statusCode !== 200) {
      return console.log('Invalid Status Code Returned:', response.statusCode);
    }
    var parsingThing = JSON.parse(body);
    // var id = req.session.user.id
    res.render('wiki/articleTemplate', {
      "wikiData": parsingThing,
      // "id":id
    })
  })
})
//this renders the wikipedia article
app.get('/wiki/template', function(req, res) {
  var logged_in;

  if (req.session.user) {
    logged_in = true;

  }
  var data = {
    "logged_in": logged_in,
  }

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


//this renders the list of words belonging to the currently logged in user
app.get('/words/:user_id',function(req, res, err){
    user_id=req.session.user.id
  db.many('SELECT * FROM lists where user_id= $1', [user_id])
    .catch(function(){
    console.log("error in word list rendering, sorry. ")
  })
  .then(function(data){
    res.render('words/words:show', {"vortoj":data});

  });

});

//delete a word from the word list
app.delete('/:id',function(req, res){
  id = req.params.id
  console.log(id)
  db.none("DELETE FROM lists WHERE id=$1", [id])
  res.redirect('/words/words:show')
});

//update user's name

app.put('/update/:id',function(req, res){
  user = req.body
  id = req.params.id

  db.none("UPDATE users SET name=$1, email=$2 WHERE id=$3",
    [user.name,user.email,id]).then(function(){
          req.session.destroy()
          res.redirect('/')
    })
});


//to log
app.get('/logout', function(req, res){
            req.session.destroy()
          res.redirect('/')
})
