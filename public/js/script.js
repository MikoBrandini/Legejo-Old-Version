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
$('.wikipediaArticleText').click(function(event) {
  vorto = $(this).text()
    // console.log($(this).text())
  $('#popUpContainer').hide()
  $('#popUpTemplate').empty()
    // console.log(this)
    // $(this).append('<div id=popUpTemplate></div>')
  $.ajax({
    "url": "http://www.simplavortaro.org/api/v1/trovi/" + vorto,
    "method": "GET",
    "success": function(data) {
      console.log('ajax call was good.')
      $('#popUpContainer').show()
      $('#popUpContainer').css('position', 'fixed');
      // console.log(data)
      // console.log("this is something "+data.preciza )
      //second level ajax:
      $.ajax({
        "url": "http://www.simplavortaro.org/api/v1/vorto/" + data.preciza,
        "method": "GET",
        "success": function(dataB) {
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
      url: 'http://localhost:8015/addWord',
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
