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

var db = pgp('postgres://student_12@localhost:5432/secondProject_db');

var port = process.env.PORT || 8015;
app.listen(port)
console.log("Callooh! Callay! Server is running on " + port);

//log in and user creation stuff begins here

app.use(session({
    secret: 'theTruthIsOutThere51',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))

app.get("/", function(req, res) {
    var logged_in;
    var email;
    if (req.session.user) {
     logged_in = true;
     email = req.session.user.email;
    }
    var data = {
        "logged_in": logged_in,
        "email": email
            //variables columns from table
    }
    res.render('index', data)
    //this sends over data, even if data is empy due to incorrect log in values
})






app.get("/signup", function(req, res) {
    res.render('signup/index')
})


//to create a new user
app.post("/signup", function(req, res) {
    //save user to the database
    //ni bezonas savi uzanton kaj poste meti la kasxvorton en la datumbazo
    var data = req.body

    //bcrypt needs to use callbacks instead of promises, unfortunately.
    bcrypt.hash(data.password, 10, function(err, hash) {

        db.none(
            "INSERT INTO users (name, email, password_digest) VALUES ($1, $2, $3)", [data.name, data.email, hash]
        ).then(function() {
            console.log("user created")
                res.render('index')
        })
    })
})





//from the get thing up there, it redirects me up here.
app.post('/login', function(req, res) {
  //there is no actual /login that's accessible to the client.
    //we need to grab stuff off the body
    //grabing from forms
    var data = req.body;
    //check if user exists is step one.
    db.one(
        "SELECT * FROM users WHERE email=$1", [data.email]
        //the above in brackets sanatizes
    ).catch(function() {
        res.send('Email/Password not found')
        console.log('Email/Password not found')
            //we are ambigious above to make it easier. but it should just saw user.
    }).then(function(user) {
        //the order of the values in the comparison below matter.the first one must be the plaintext pw
        bcrypt.compare(data.password, user.password_digest, function(err, cmp) {
            if (cmp) {
                req.session.user = user;
                //sort of like a variable, it contains the data user, the row of the user database
                //like a particular row in a user database
                console.log("cmp succesful, email matches pw")
                    res.redirect('/');
                    //i need to be sent to the index page and just show the content meant for loggedin users
            } else{
              res.send('Email/Password not found')
            }

        })



    })
})



//end of sign up and log in stuff






//how to save a new word
//
app.post("/addWord", function(req, res) {
    //save user to the database
    //ni bezonas savi uzanton kaj poste meti la kasxvorton en la datumbazo
    var data = req.body
    //uncomment out the console log below later
    // console.log(data)
     // var userID=
     // console.log(userID);
        db.none(
            "INSERT INTO lists (word, definition) VALUES ($1, $2)", [data.word, data.definition]
        )
        .catch(function(){
          console.log("word not added, error.")
        })
        .then(function() {
            console.log("word added")
                res.render('wiki/articleTemplate')
        })
    })
//
//end of saving a new word


//render index page
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
