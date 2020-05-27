const {Element,tags} = require("dommini")
Element.prototype.href = function(address) {
   return this.attr("href",address)
}
var e = tags.a().href("https://github.com/")
console.log(e.toString())
