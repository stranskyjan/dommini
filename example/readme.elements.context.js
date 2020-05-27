const {tags,utils} = require("dommini")
const {section,div,span,h1} = tags
const {attr,addClass} = utils
var e = section()
e.context(function(){
   attr({id:"context",class:"cls"}) // attr of the context
   addClass("cls-2") // add class to the context
   var d = div().class("free") // "free" element
   var s = span().class("not-free") // NOT "free" element, added to "d"
   d.add(h1(),s)
})
console.log(e.toString())
