const {html,body,h1} = require("dommini").tags
var e = html(body(h1('Hello, world!')))
console.log(e.toString())
