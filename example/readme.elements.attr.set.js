const {tags,utils} = require("dommini")
const {div} = tags
const {attr,addClass} = utils
// key-value two parameters
var e = div().attr("k1","val1")
console.log(e.toString())
// key-value object
var e = div().attr({k1:"val1",k2:"val2"})
console.log(e.toString())
// attr shortcuts
var e = div().id("42").class("cls")
console.log(e.toString())
// addClass - one string
var e = div().class("cls").addClass("cls-2")
console.log(e.toString())
// addClass - strings
var e = div().class("cls").addClass("cls-2","cls-3")
console.log(e.toString())
// addClass - array of strings
var e = div().class("cls").addClass(["cls-2","cls-3"])
console.log(e.toString())
// context
var e = div().context(function(){
   addClass("cls")
   attr({k1:"val1",k3:"val3"})
   addClass("cls-2")
})
console.log(e.toString())
