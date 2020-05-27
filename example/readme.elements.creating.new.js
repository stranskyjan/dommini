const {Element,TextNode,CommentNode} = require("dommini")
var e = new Element("html", new Element("body",
   new CommentNode("some comment"),
   new Element("h1", "Hello"),
   new TextNode("world!")
))
console.log(e.toString())
