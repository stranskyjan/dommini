const {tags,utils} = require("dommini")
const {html,body,h1} = tags
const {text,comment} = utils
var e = html(body(
   comment("some comment"),
   h1("Hello"),
   text("world!")
))
console.log(e.toString())
