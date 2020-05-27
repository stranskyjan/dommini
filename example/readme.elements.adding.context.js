const {div,span,h1} = require("dommini").tags
var e = div().context(function(){
   h1()
   span()
})
console.log(e.toString())
