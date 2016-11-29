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

var util = require('util');

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



// app.get('/', function(request, response){
//   var tempFile="antologio1.pdf";
//   fs.readFile(tempFile, function (err,data){
//      response.contentType("application/pdf");
//      response.send(data);
//   });
// });

app.get('/', function (req, res) {
request('https://eo.wikipedia.org/api/rest_v1/page/mobile-sections/usono', function (error, response, body) {
    if(error){
        return console.log('Error:', error);
    }
    if(response.statusCode !== 200){
        return console.log('Invalid Status Code Returned:', response.statusCode);
}
          var parsingThing=JSON.parse(body);
          // console.log('parsingThing:');
          // console.log(util.inspect(parsingThing));
          // console.log('some text:');
          // console.log(parsingThing.lead.sections[0].text);

          var $ = cheerio.load(parsingThing.lead.sections[0].text);
          // console.log('cheerio test:');
          // console.log(util.inspect($.root().text()));
          // console.log($('*').map(function(i, el){return $(el).text();}).get());


             res.render('index',
                {"hello" : parsingThing,
                  "someText": $.root()
                    .text()
                    .split('\n\n')
                    .map(function(el){
                      return  '<p> '+el +'</p>'
                    })
                    .join('')
                }
              );
})
;})


                    // .split('\n')
                    // .map(function(t){
                    //   return '<span class="heyClowns">' + t  +'</span>'+ ' '
                    // })
                    // .join('')


                //     .split('</table>')
                //     .map(function(t){
                //       return '</table>'
                //     })
                //     .join('')
//la subo donas al mi la bezonajxon.
//https://eo.wikipedia.org/api/rest_v1/page/mobile-sections/usono



