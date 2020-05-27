const {Element,utils} = require("dommini")
const {shortcut} = utils
const [customdiv,customspan] = [shortcut("customdiv"),shortcut("customspan")]
var e = customdiv([
   new Element("customh1"),
   customspan(),
])
console.log(e.toString())
