const {Document} = require("dommini")
var doc = new Document()
var doc2 = doc.clone()
console.log(doc.toString() === doc2.toString()) // true
doc.attr({title:"title"})
console.log(doc.toString() === doc2.toString()) // false
