const {Document,tags} = require("dommini")
var {meta} = tags

var doc = new Document()
doc.attr({
   description:"document.attr",
   title:"attr",
   whatever: "anything",
})
doc.head.add(meta().attr({name:"some-name",content:"some-content"}))
console.log(doc.attr())
console.log(doc.toString())
