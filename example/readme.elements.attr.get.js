const {div} = require("dommini").tags
var e = div().id("42").class("cls").attr("key","val")
console.log(e.attr())
