$(".textHolders").each(function(index) {
  referencePoint = $(this)
  var text = $(this).text()
  var words = text.split(' ')
  $(this).text(' ')
  words.forEach(function(word) {
    return $(referencePoint).append("<span class = 'wikipediaArticleText'>" + word + " " + "</span>")
  })
});


//get definition
/*
I am going to need to make both API urls ito
*/
$('.wikipediaArticleText').click(function(event) {

  vorto = $(this).text().replace(/[^0-9a-zA-Z ĈĉĜĜĝĤĥĴĵŜŝŬŭ]/g, '');
  console.log("this is the word: " + vorto)
    // console.log($(this).text())
  $('#popUpContainer').hide()
  $('#popUpTemplate').empty()
    // console.log(this)
    // $(this).append('<div id=popUpTemplate></div>')
  $.ajax({
    "url": "//simplavortaro.org/api/v1/trovi/" + vorto,
    "method": "GET",
    "success": function(data) {
      console.log('ajax call was good.')
      // console.log("this is the preciza datumo")
      // console.log(data.preciza)
      $('#popUpContainer').show()
      $('#popUpContainer').css('position', 'fixed');
      // console.log(data)
      // console.log("this is something "+data.preciza )
      //second level ajax:
      //I need to pick either the precize definition if the first api finds it. Or the best guess.
      //the variable below will pick which path to follow:
      var processedWord;
      console.log("length of first word in preciza array"+data.preciza.length)
      var wordProcessor=function(){
                $('#saviorTheButton').show()
      if(data.preciza.length>0){
        console.log("check preciza 0")
        return processedWord=data.preciza[0]
      }
      else if(data.malpreciza.length>0){
        console.log("checking malpreciza 0")
             return processedWord=data.malpreciza[0]
      }
      else{
   //this happens if neither a precise or imprecise definition is found. save button removed.
        $('#saviorTheButton').hide()
        $('#popUpTemplate').append('<h1 id="popUpHeader">NENIO TROVITA!</h1>')
      }
  }
  theWordOkay=JSON.stringify(proccesedWord)
   cosole.log("theWordOkay: " + theWordOkay)
  wordProcessor()
      $.ajax({
        "url": "//simplavortaro.org/api/v1/vorto/" + theWordOkay,
        "method": "GET",
        "success": function(dataB) {
          console.log("dis da dataB")
          console.log(dataB)
            //set up save button
            //define listener here to grab dataB
          $('#popUpTemplate').append('<h1 id="popUpHeader">' + dataB.vorto + '</h1>')
          dataB.difinoj.forEach(function(x) {
            return $('#popUpTemplate').append('<p class="popUpText">' + x.difino + '</p>')
          })
        }
      })



      //this is the save word button


      //this close code is taken from: http://stackoverflow.com/questions/22052317/hide-parent-div-on-click-using-jquery
      $('.close').on("click", function() {
        $(this).parents('div').hide();
      });


    }
  })

});


$('#saviorTheButton').click(function(event) {
  event.preventDefault();
  var definitionFromDiv = $('.popUpText').each(function(x) {
    return this.innerHTML
  })

  //empty object
  var savedStuff = {};
  savedStuff["word"] = $('#popUpHeader').html();
  savedStuff['definition'] = definitionFromDiv.html();

  postData(savedStuff);

  $('#popUpContainer').hide()
  $('#popUpTemplate').empty()
})




var postData = function(savedStuff) {
  $.ajax({
      url: '/addWord',
      type: 'POST',
      data: savedStuff
    })
    .done(function() {
      console.log("word added to database");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log(".complete, completed with adding word to database");
    });
};
