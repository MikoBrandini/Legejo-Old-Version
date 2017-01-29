Legejo [Le-Gay-O] is the name of my app. In Esperanto it means "reading place". 
The goal of the app is to allow the user to read an article in Esperanto and click on words they don't understand. 
That way they get the definition. If they deem the word worthy of reviewing, 
they have the option of saving it on a list that they will have access to.

Technology: The most interesting thing I did was create an APP that utilizes three different APIs. One API loads the wikipedia article. Then I must iterate through the text nodes in the article and put them all in span tags. Then the second step is activated when a user clicks on a text node. The second API is called when a word in a span is clicked on. 
That API searches to see if the word exists. If the word does not exist. An error message appears. Otherwise, the word is sent into the third API. The third API pulls up the definition of the word.
My future goals for this project is to add the possibility to grab the translation of the word if available. I would also like to add multiple articles available to the user. 
I was also considering allowing users to post comments to each article. The comments would be about article content and linguistic questions. 

User Story: "As an  intermediate level Esperanto speaker, I want to be exposed to Esperanto text in realistic contexts and expand my vocabulary."
Wireframes: https://trello.com/b/9wq9G3BI/duaprojekto

In order to correctly interact with the provided article (hard-coded article about France), you must make the connection insecure in the browser. Remove the S from HTTPS.
