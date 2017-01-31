**[Legejo](https://legejo.herokuapp.com/)**
======
In Esperanto Legejo (Le-Gey-O) means "reading place". 
https://legejo.herokuapp.com/
This app allows users to read curated articles from wikipedia in Esperanto. If they run
into a word that they don't know, they can click on it and read the definition. Afterwards,
they may save the word for later review in a seperate part of the website.

User Story 
------
"As an  intermediate level Esperanto speaker, I want to be exposed to Esperanto text in realistic contexts and expand my vocabulary."

Technologies Used
------ 
* API's 
    * **[Wikimedia REST API](https://eo.wikipedia.org/api/rest_v1/#/)**
    * **[SimpleVortaro](http://www.simplavortaro.org/informo/api)**
* Node.js:
    * **[express](https://github.com/expressjs/express)** web application framework
    * **[mustache.js](https://github.com/janl/mustache.js)** templating system
    * **[session](https://github.com/expressjs/session)** session middleware
    * **[cheerio](https://github.com/cheeriojs/cheerio)** access to jQuery in Node.js
    * **[https://github.com/kelektiv/node.bcrypt.js](bcrpyt.js)** for hashing passwords
* CSS
    * **[Bootstrap](http://getbootstrap.com)**

* Javascript
    * **[jQuery](https://jquery.com)**

Bugs
------ 
* Mixed content error. 
    * The SimpleVortaro API is not available through a secure HTTPS connection.
     In order to utilize the onClick word definition feature in the *Artikolo* section, you must manually delete the S in the address bar. http://legejo.herokuapp.com/wiki/template
