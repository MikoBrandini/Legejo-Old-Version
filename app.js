var express = require("express");
var bdPars = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var pgp = require('pg-promise')();
var mustacheExpress = require('mustache-express');
var request = require('request');
var rp = require('request-promise');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public/"));
app.use(methodOverride('_method')); //method override
app.use(bdPars.urlencoded({ extended: false })); //body parser
app.use(bdPars.json()); //body parser



var port = process.env.PORT || 8015;
app.listen(port)
console.log("Callooh! Callay! Server is running on " + port);



app.get('/', function (req, res) {
request('https://eo.wikipedia.org/api/rest_v1/page/mobile-sections/usono', function (error, response, body) {
    if(error){
        return console.log('Error:', error);
    }
    if(response.statusCode !== 200){
        return console.log('Invalid Status Code Returned:', response.statusCode);
}
          var parsingThing=JSON.parse(body);
             res.render('index',  {"hello" : parsingThing});
})
;})
//la subo donas al mi la bezonajxon.
//https://eo.wikipedia.org/api/rest_v1/page/mobile-sections/usono



