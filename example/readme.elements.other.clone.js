const {div,span} = require("dommini").tags
var d = div()
var s = span().id("span1")
d.add(s)
d.add(s) // s is removed before adding! so d has only 1 child
console.log(d.toString())
d.add(s.clone().id("span2")) // now it has 2 children
console.log(d.toString())
