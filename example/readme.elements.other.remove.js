const {div,span} = require("dommini").tags
var d = div()
var s = d.put(span())
console.log(d.toString()) // <div><span></span></div>
s.remove()
console.log(d.toString()) // <div></div>
