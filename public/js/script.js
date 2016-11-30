$( ".textHolders" ).each(function( index ) {
  referencePoint=$(this)
  var text=$(this).text()
  var words=text.split(' ')
 $(this).text(' ')
 words.forEach(function(word){
  return $(referencePoint).append("<span class = 'word'>"+word+ " " +"</span>") })
});



//get definition
$('.word').click(function(event) {
 vorto=$(this).text()
 console.log($(this).text())
             $('#popUpTemplate').remove()
 $(this).append('<div id=popUpTemplate></div>')
    $.ajax({
      "url": "http://www.simplavortaro.org/api/v1/trovi/"+vorto,
      "method": "GET",
      "success": function(data){
        console.log('ajax call was good.')
                      $('#popUpTemplate').css('position', 'relative');

        // console.log(data)
        // console.log("this is something "+data.preciza )
        //second level ajax:
        $.ajax({

          "url": "http://www.simplavortaro.org/api/v1/vorto/"+data.preciza,
          "method": "GET",
          "success": function(dataB){


              $('#popUpTemplate').show()
      $('#popUpTemplate').append('<h3>'+dataB.vorto+'</h3>' )
     dataB.difinoj.forEach(function(x){return    $('#popUpTemplate').append('<p>'+x.difino+'</p>' )})
          }
        })


        // console.log(typeof(data))
        // console.log(JSON.stringify(data))
      }
    })
});
