// $('a').contents().unwrap();


$( ".textHolders" ).each(function( index ) {
  // console.log( index + ": " + $( this ).text() );
  referencePoint=$(this)
  var text=$(this).text()
  var words=text.split(' ')

 //  console.log(words)
 $(this).text(' ')

 words.forEach(function(word){

  return $(referencePoint).append("<span class = 'word'>"+word+ " " +"</span>") })
});



//get definition
$('.word').click(function(event) {
 vorto=$(this).text()
    $.ajax({
      "url": "http://www.simplavortaro.org//api/v1/trovi/"+vorto,
      "method": "GET",
      "success": function(data){
        console.log('ajax call was good.')
        console.log(data)
        // console.log(typeof(data))
        // console.log(JSON.stringify(data))
      }
    })
});


// var text = $('#textHolder').text()
// var words = text.split(' ')
// console.log(words)

// $('#textHolder').text(' ')
//     words.forEach(function(word){

//   return $('#textHolder').append("<span class = 'word'>"+word+ " " +"</span>") })




//below I will attempt to target each paragraph and seperate each words within a paragraph
// into seperate span tags. Instead of what is happening above, which is removing all the distrinctions
//with in the previously rendered paragraphs with in app.js










// words.forEach(function(word){
//   var clickWord = $("<span class = 'word "+word+"''>"+word+"</span>")
//   $('#textHolder').append(clickWord)
// })

//        res.render('index',
//                 {"hello" : parsingThing,
//                   "someText": $.root()
//                     .text()
//                     .split('\n\n')
//                     .map(function(el){

//                       return  '<p>'+el +'</p>'
//                     })
//                     .join('')




// $('*')
//   .contents()
//                     // .text()
//  .filter(function(x) {
//   // console.log("this is this hey there "+ this)
// return this.nodeType === 3;//Node.TEXT_NODE
//   })



// console.log($('*').contents() .filter(function(x) {
//   // console.log("this is this hey there "+ this)
// return this.nodeType === 3;//Node.TEXT_NODE
//   }))



// .wrap('<span class="test123"></span>')
// $('.test123').css('color', 'green')








// $( "*" )
//   .contents()
//   .filter(function(){
//     return this.nodeType === 3;
//   })
//   .wrap( "<span class='test123'></span>" );

// splittedText=$(".test123").text().split(" ")
// console.log($(".test123").text() + "<br>")



// $(".test123").text().split(splittedText)

// $('p')
//   .contents().split(' ')
//   .wrap('<span class="test123"><h6></h6></span>')


// var arr= $('p').each(function(x){
//   console.log( this)
// return $('p').text().split(' ')
// })
// console.log(arr)



// $('.test123').each(function(x){
// if ($('.test123').is(':empty')){
// return this.remove()}
//   console.log("removal in process ")
// })


// $('.test123').each(function(x){
//   console.log(typeof this)
//   console.log( this)
// return $('.test123').text().split(' ', 423)
// })








// $('body').contents().addClass('testing123')

// var alltextnodes=function(el){
// var n
// var a=[]
// walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
//   while(n=walk.nextNode()) a.push(n);
//   return a}
// console.log(alltextnodes(document.body))




//mi multe klopodis dum pluraj horoj sed ne sukcesis. sube oni trovos notojn de mia laboro kaj eble
//mi relegos ĝin poste

// $('a').contents().unwrap();



// var text = $('#textHolder').text()
// var words = text.split(' ')
// console.log(words)

// $('#textHolder').text(' ')
//     words.forEach(function(word){
//        console.log('hey there')
//   return $('#textHolder').append("<span class = 'word'>"+word+ " " +"</span>") })

//below I will attempt to target each paragraph and seperate each words within a paragraph
// into seperate span tags. Instead of what is happening above, which is removing all the distrinctions
//with in the previously rendered paragraphs with in app.js



// $('#textHolder').children('p') .contents()

// console.log(
// $('#textHolder').children('p') .contents()
// )
// .map(function(x){
//   wordsParaphs=$(this).text().split(' ')


// console.log(wordsParaphs)
//   return wordsParaphs
// })

// // .map(function(word){

// //   // console.log(this)

// // return $('#textHolder').children('p').append("<button class = 'word'>"+this.toString()+ " " +"</button>")
// // })


//     .filter(
//         function(){
//             return this.nodeType != 1;
//         })
//     .wrap("<span/>");






// words.forEach(function(word){
//   var clickWord = $("<span class = 'word "+word+"''>"+word+"</span>")
//   $('#textHolder').append(clickWord)
// })

//        res.render('index',
//                 {"hello" : parsingThing,
//                   "someText": $.root()
//                     .text()
//                     .split('\n\n')
//                     .map(function(el){

//                       return  '<p>'+el +'</p>'
//                     })
//                     .join('')




// $('*')
//   .contents()
//                     // .text()
//  .filter(function(x) {
//   // console.log("this is this hey there "+ this)
// return this.nodeType === 3;//Node.TEXT_NODE
//   })



// console.log($('*').contents() .filter(function(x) {
//   // console.log("this is this hey there "+ this)
// return this.nodeType === 3;//Node.TEXT_NODE
//   }))



// .wrap('<span class="test123"></span>')
// $('.test123').css('color', 'green')








// $( "*" )
//   .contents()
//   .filter(function(){
//     return this.nodeType === 3;
//   })
//   .wrap( "<span class='test123'></span>" );

// splittedText=$(".test123").text().split(" ")
// console.log($(".test123").text() + "<br>")



// $(".test123").text().split(splittedText)

// $('p')
//   .contents().split(' ')
//   .wrap('<span class="test123"><h6></h6></span>')


// var arr= $('p').each(function(x){
//   console.log( this)
// return $('p').text().split(' ')
// })
// console.log(arr)



// $('.test123').each(function(x){
// if ($('.test123').is(':empty')){
// return this.remove()}
//   console.log("removal in process ")
// })


// $('.test123').each(function(x){
//   console.log(typeof this)
//   console.log( this)
// return $('.test123').text().split(' ', 423)
// })








// $('body').contents().addClass('testing123')

// var alltextnodes=function(el){
// var n
// var a=[]
// walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
//   while(n=walk.nextNode()) a.push(n);
//   return a}
// console.log(alltextnodes(document.body))

