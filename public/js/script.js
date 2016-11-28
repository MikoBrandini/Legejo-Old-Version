// $('a').contents().unwrap();





















// $( "p" )
//   .contents()
//   .filter(function(){
//     return this.nodeType !== 1;
//   })
//   .wrap( "<a class='test123'></a>" );

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

// $('*')
//   .contents()
//  .filter(function(x) {
// return this.nodeType === 3;//Node.TEXT_NODE
//   })
// .wrap('<span class="test123"></span>')
// $('.test123').css('color', 'green')

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
