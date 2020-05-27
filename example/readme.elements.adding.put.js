const {div,span} = require("dommini").tags
var d = div()
var a = d.add(span())
console.log(a.toString()) // <div><span></span></div>
var s = d.put(span())
console.log(s.toString()) // <span></span>
