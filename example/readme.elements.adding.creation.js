const {div,span,h1} = require("dommini").tags
// add one element
var e = div(span())
console.log(e.toString())
// add elements
var e = div(h1(),span())
console.log(e.toString())
// add array of elements
var e = div([h1(),span()])
console.log(e.toString())
// context
var e = div(function(){
   h1()
   span()
})
console.log(e.toString())
